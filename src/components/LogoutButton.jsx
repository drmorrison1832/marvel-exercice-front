import Cookies from "js-cookie";

const LogoutButton = ({
  currentUser,
  setCurrentUser,
  setCurrentUserSavedItems,
}) => {
  return (
    <button
      onClick={() => {
        console.log("Logging out", currentUser.username);
        localStorage.removeItem(currentUser.username);
        Cookies.remove("userCookie");
        setCurrentUser(null);
        setCurrentUserSavedItems(null);
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
