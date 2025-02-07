import Cookies from "js-cookie";

const LogoutButton = ({ cuurentUser, setCurrentUser }) => {
  return (
    <button
      onClick={() => {
        Cookies.remove("userCookie");
        setCurrentUser(null);
        console.log(JSON.parse(localStorage.getItem("localUser")));
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
