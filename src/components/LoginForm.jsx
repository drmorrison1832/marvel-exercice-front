import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginForm = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("Rendering LoginForm");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

  async function handleSubmit() {
    setError(null);

    if (username === "" || password === "") {
      return setError("Missing username or password");
    }

    console.log("Logging in...");
    try {
      let userResponse = await axios.post(
        // "https://site--marvel-back--44tkxvkbbxk5.code.run/login",
        "http://localhost:3000/user/login",
        { username, password }
      );
      console.log("Logged in");

      const cookieContent = {
        token: userResponse.data.token,
        username: userResponse.data.username,
      };

      console.log("Retrieving user collection...");

      const token = userResponse.data.token;

      let collectionResponse = await axios.get(
        // "https://site--marvel-back--44tkxvkbbxk5.code.run/login",
        "http://localhost:3000/saved",
        { headers: { authorization: `Bearer ${token}` } }
      );
      //   console.log("Collection retrieved:");
      //   console.log(collectionResponse.data);

      Cookies.set("userCookie", JSON.stringify(cookieContent));

      localStorage.setItem(
        `${userResponse.data.username}`,
        JSON.stringify(collectionResponse.data)
      );

      setCurrentUser(cookieContent);
      setCurrentUserSavedItems(collectionResponse.data);

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Server response:", error.response.data.message);
      setError(error.response.data.message);
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Username"
        id="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {error && <div>{error}</div>}
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
