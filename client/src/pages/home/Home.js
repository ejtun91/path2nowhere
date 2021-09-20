import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { axiosInstance } from "../../config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [cats, setCats] = useState([]);
  const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInst.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="home">
      <div className="wrapper">
        <Posts posts={posts} />
        <Sidebar cats={cats} posts={posts} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
