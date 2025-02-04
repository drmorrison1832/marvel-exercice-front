import { Link } from "react-router-dom";
import marvelLogo from "../assets/marvel-logo.svg";
import { useLocation } from "react-router-dom";

const Header = () => {
  let navigation = useLocation();

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={marvelLogo} alt="Marvel Logo" />
        </Link>
      </div>
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
          <Link to="/user">User</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
