import { Link } from "react-router-dom";
import marvelLogo from "../../public/marvel-logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={marvelLogo} alt="Marvel Logo" />
        </Link>
      </div>
      <nav>
        <div className="header-navigator">
          <Link to="/comics">Comics</Link>
        </div>
        <div className="header-navigator">
          <Link to="/characters">Characters</Link>
        </div>
        <div className="header-navigator">
          <Link to="/user">User</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
