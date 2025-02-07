import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginForm = ({
  //   currentUser,
  setCurrentUser,
  //   currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("Rendering LoginForm");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isConnecting, setIsConnecting] = useState(false);

  async function handleSubmit() {
    console.log("Logging in...");
    setError(null);
    setIsConnecting(true);

    try {
      if (username === "" || password === "") {
        setIsConnecting(false);
        throw new Error("Missing username or password");
      }

      let userResponse = await axios.post(
        // "https://site--marvel-back--44tkxvkbbxk5.code.run/login",
        "http://localhost:3000/user/login",
        { username, password }
      );
      console.log("Login sucessfull");

      console.log("Retrieving saved items...");

      const config = {
        headers: { authorization: `Bearer ${userResponse.data.token}` },
      };
      const savedItemsResponse = await axios.get(
        // "https://site--marvel-back--44tkxvkbbxk5.code.run/login",
        "http://localhost:3000/saved",
        config
      );
      console.log("Saved Items retrieved:");
      console.log(savedItemsResponse.data);

      const userCookie = {
        username: userResponse.data.username,
        token: userResponse.data.token,
      };
      Cookies.set("userCookie", JSON.stringify(userCookie));

      localStorage.removeItem(`${userCookie.username}`);

      localStorage.setItem(
        `${userCookie.username}`,
        JSON.stringify(savedItemsResponse.data)
      );

      setCurrentUser(userCookie);
      setCurrentUserSavedItems(savedItemsResponse.data);
      setUsername("");
      setPassword("");
      setIsConnecting(false);
    } catch (error) {
      console.log(error.message);
      console.log(
        "Server response:",
        error.response?.data?.message ?? error?.message
      );
      setError(error.response?.data?.message ?? error?.message);
      setIsConnecting(false);
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
      {error && <div className="error-message">{error}</div>}
      <input type="submit" value="Login" disabled={isConnecting} />
    </form>
  );
};

export default LoginForm;
