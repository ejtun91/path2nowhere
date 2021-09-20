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

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInstance.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(
        `https://yts.unblockit.ws/api/v2/list_movies.json`,
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      setMovies(res.data.data.movies);
    };
    getMovies();
  }, []);
  console.log(movies);
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
