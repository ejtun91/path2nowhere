import { useMediaQuery } from "@material-ui/core";
import { Facebook, Instagram, Menu, Search, Twitter } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./navbar.scss";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "https://path2nowhere.com/images/";
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div className="burgMenu">
        <Menu
          className="burger"
          style={{ fontSize: "2em" }}
          onClick={() => setOpenMenu(handleMenu)}
        />
      </div>
      {matches ? (
        <div className="navbar">
          <div className="wrapperNavbar">
            <div className="list">
              <ul className="itemsList">
                <li>
                  <Link className="item link" to="/">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link className="item link" to="/about">
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link className="item link" to="/contact">
                    CONTACT
                  </Link>
                </li>
                {!user && (
                  <li style={{ display: "none" }}>
                    <Link className="item link" to="/login">
                      LOGIN
                    </Link>
                  </li>
                )}
                {!user && (
                  <li style={{ display: "none" }}>
                    <Link className="item link" to="/register">
                      REGISTER
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link className="item link" to="/write">
                      WRITE
                    </Link>
                  </li>
                )}
                <li className="item link" onClick={handleLogout}>
                  {user && "LOGOUT"}
                </li>
              </ul>
            </div>
            <div className="social-links">
              <ul className="socialList">
                {user && (
                  <li className="socialItem">
                    <Link to="/settings">
                      <img
                        src={
                          user.profileImg
                            ? PF + user.profileImg
                            : "https://path2nowhere.com/images/profile.jpg"
                        }
                        alt=""
                        className="profileImg"
                      />
                    </Link>
                  </li>
                )}
                <li className="socialItem">
                  <Facebook className="icon" />
                </li>
                <li className="socialItem">
                  <Instagram className="icon" />
                </li>
                <li className="socialItem">
                  <Twitter className="icon" />
                </li>
              </ul>
            </div>
            <div className="searchBar">
              <input
                type="text"
                placeholder="SEARCH"
                className="searchInput"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link
                className="link"
                to={`/?search=` + searchTerm.toLowerCase()}
              >
                <Search className="searchIcon" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        openMenu && (
          <div className="navbar">
            <div className="wrapperNavbar">
              <div className="list">
                <ul className="itemsList">
                  <li onClick={() => setOpenMenu(false)}>
                    <Link className="item link" to="/">
                      HOME
                    </Link>
                  </li>
                  <li onClick={() => setOpenMenu(false)}>
                    <Link className="item link" to="/about">
                      ABOUT
                    </Link>
                  </li>
                  <li onClick={() => setOpenMenu(false)}>
                    <Link className="item link" to="/contact">
                      CONTACT
                    </Link>
                  </li>
                  {!user && (
                    <li
                      style={{ display: "none" }}
                      onClick={() => setOpenMenu(false)}
                    >
                      <Link className="item link" to="/login">
                        LOGIN
                      </Link>
                    </li>
                  )}
                  {!user && (
                    <li
                      style={{ display: "none" }}
                      onClick={() => setOpenMenu(false)}
                    >
                      <Link className="item link" to="/register">
                        REGISTER
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li>
                      <Link className="item link" to="/write">
                        WRITE
                      </Link>
                    </li>
                  )}
                  <li className="item link" onClick={handleLogout}>
                    {user && "LOGOUT"}
                  </li>
                </ul>
              </div>
              <div className="social-links">
                <ul className="socialList">
                  {user && (
                    <li className="socialItem">
                      <Link to="/settings">
                        <img
                          src={
                            user.profileImg
                              ? PF + user.profileImg
                              : "https://www.openhost.co.za/download/bootmin/img/avatar_lg.jpg"
                          }
                          alt=""
                          className="profileImg"
                        />
                      </Link>
                    </li>
                  )}
                  <li className="socialItem">
                    <Facebook className="icon" />
                  </li>
                  <li className="socialItem">
                    <Instagram className="icon" />
                  </li>
                  <li className="socialItem">
                    <Twitter className="icon" />
                  </li>
                </ul>
              </div>
              <div className="searchBar">
                <input
                  type="text"
                  placeholder="SEARCH"
                  className="searchInput"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link className="link" to={`/?search=${searchTerm}`}>
                  <Search className="searchIcon" />
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Navbar;
