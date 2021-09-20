import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="wrapper">
        <Link className="link" to="/">
          <span className="logo">PATH TO NOWHERE</span>
        </Link>
        <span className="logoSub">REWIRE YOUR BRAIN</span>
      </div>
    </div>
  );
};

export default Header;
