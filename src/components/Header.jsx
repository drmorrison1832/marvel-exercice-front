import { Link } from "react-router-dom";
import marvelLogo from "../assets/marvel-logo.svg";
import { useLocation } from "react-router-dom";

const Header = ({
  currentUser,
  // setCurrentUser,
  // currentUserSavedItems,
  // setCurrentUserSavedItems,
}) => {
  let navigation = useLocation();

  return (
    <header className="header">
      <Link to="/">
        <div className="logo-container">
          <img src={marvelLogo} alt="Marvel Logo" />
        </div>
      </Link>
      <nav>
        <div
          className={
            navigation.pathname.indexOf("comics") === -1
              ? `header-navigator on`
              : `header-navigator off`
          }
        >
          <Link to="/comics">Comics</Link>
        </div>
        <div
          className={
            navigation.pathname.indexOf("character") === -1
              ? `header-navigator on`
              : `header-navigator off`
          }
        >
          <Link to="/characters">Characters</Link>
        </div>
        <div
          className={
            navigation.pathname.indexOf("user") === -1
              ? `header-navigator on`
              : `header-navigator off`
          }
        >
          <Link
            to="/user"
            // currentUser={currentUser}
            // setCurrentUser={setCurrentUser}
            // currentUserSavedItems={currentUserSavedItems}
            // setCurrentUserSavedItems={setCurrentUserSavedItems}
          >
            {/* Account */}
            {currentUser ? `${currentUser.username}` : "Account"}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
