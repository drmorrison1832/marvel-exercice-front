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
  const [action, setAction] = useState("login");

  async function handleSubmit() {
    setError(null);
    setIsConnecting(true);

    console.log("action is", action);

    if (action === "login") {
      console.log("Logging in...");
    } else {
      console.log("Signing in...");
    }

    try {
      if (username === "" || password === "") {
        setIsConnecting(false);
        throw new Error("Missing username or password");
      }

      const route = action.replace(" ", "");

      console.log("route es", route);

      let userResponse = await axios.post(
        `https://site--marvel-back--44tkxvkbbxk5.code.run/user/${route}`,
        // `http://localhost:3000/user/${route}`,
        { username, password }
      );

      if (action === "login") {
        console.log("Login sucessfull");
      } else {
        console.log("Signed up sucessfull");
      }

      console.log("Retrieving saved items...");

      const config = {
        headers: { authorization: `Bearer ${userResponse.data.token}` },
      };
      const savedItemsResponse = await axios.get(
        "https://site--marvel-back--44tkxvkbbxk5.code.run/saved",
        // "http://localhost:3000/saved",
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
      className="login-form"
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
      <input
        className="button"
        type="submit"
        value={action}
        disabled={isConnecting}
      />
      <p>
        Or{" "}
        <span
          className="change-action"
          onClick={() => {
            action === "login" ? setAction("sign up") : setAction("login");
            setError(null);
          }}
        >
          {action === "login" ? "sign up" : "login"}
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
