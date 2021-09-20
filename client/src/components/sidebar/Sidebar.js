import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { axiosInstance } from "../../config";

const Sidebar = ({ posts, cats }) => {
  const { user } = useContext(Context);
  const PF = "https://path2nowhere.com/images/";

  return (
    <div className="sidebar">
      <div className="wrapperSidebar">
        <div className="aboutMeSection column">
          <span className="aboutTitle columnTitle">ABOUT ME</span>
          <img src="https://path2nowhere.com/images/profile.jpg" alt="" />
          <p className="descAbout">
            Hi, I am Antonio and here you will find my latest critiques of the
            world and society. I will try to be consistent on this blog, and if
            you have any questions, contact me. :)
          </p>
          <span className="signAbout">Antonio K.</span>
        </div>
        <div className="socialMeSection column">
          <span className="socialTitle columnTitle">SOCIAL ME</span>
          <ul className="socialList">
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
        <div className="otherPostsSection column">
          <span className="otherPostsTitle columnTitle">OTHER POSTS</span>
          {posts &&
            posts
              .slice(0, 3)
              .map((p) => (
                <Link className="link postSections" to={`/post/${p._id}`}>
                  <div className="postSection">
                    <img src={p.img} alt="" className="otherPostsImg" />
                    <div className="postInfo">
                      <span className="dateOther">
                        {new Date(p.createdAt).toDateString()}
                      </span>
                      <span className="otherTitle">{p.title}</span>
                    </div>
                  </div>
                </Link>
              ))
              .sort(() => Math.random() - 0.5)}
        </div>
        <div className="categoriesSection column">
          <span className="otherPostsTitle columnTitle">CATEGORIES</span>
          <ul className="categoriesList">
            {cats &&
              cats.map((c) => {
                return (
                  <Link to={`?cat=${c.name}`} className="link">
                    <li className="categoryItem">{c.name}</li>
                  </Link>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
