import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div>
          <Link to="/">Logotype</Link>
        </div>
        <div>
          <Link to="/comics">Comics</Link>
        </div>
        <div>
          <Link to="/characters">Characters</Link>
        </div>
        <div>
          <Link to="/user">User</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
