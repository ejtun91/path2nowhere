import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { axiosInstance } from "../../config";
import "./single.scss";
import Footer from "../../components/footer/Footer";

const Single = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [cats, setCats] = useState([]);

  const axiosInst = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInst.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  const handleComment = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInst.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="single">
      <div className="wrapperSingle">
        <SinglePost />
        <div className="otherPostDetails">
          <div className="container">
            <span className="commentTitle">Leave a Reply</span>
            <span className="commentSub">
              Your email address will not be published. Required fields are
              marked *<br />
              <span
                style={{
                  color: "crimson",
                  display: "inline-block",
                  fontSize: "1.3em",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Comment section in progress...
              </span>
            </span>
            <form className="commentForm" onSubmit={handleComment}>
              <label htmlFor="comment">Comment</label>
              <textarea className="commentText" id="comment"></textarea>
              <label htmlFor="name">Name*</label>
              <input
                className="input"
                id="name"
                type="text"
                placeholder="name"
              />
              <label htmlFor="email">Email*</label>
              <input
                className="input"
                type="email"
                placeholder="email"
                id="email"
              />
              <button className="commentBtn" type="submit">
                Post Comment
              </button>
            </form>
          </div>
          <Sidebar cats={cats} posts={posts} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Single;
