import { useContext } from "react";
import Footer from "../../components/footer/Footer";
import { Context } from "../../context/Context";
import "./about.scss";

const About = () => {
  const { user } = useContext(Context);
  const PF = "https://pathblog.herokuapp.com/images/";
  return (
    <div className="about">
      <div className="aboutWrapper">
        <span className="titleAbout">ABOUT ME</span>
        <img
          src="https://pathblog.herokuapp.com/images/profile.jpg"
          className="aboutImg"
          alt=""
        />
        <p className="descAbout">
          Welcome to my blog, feel free to search for your favorite posts and if
          you want to express something feel free to do so. I like to give my
          own personal opinions on current situations with the world and
          society. I am a hobbyist, web developer and critical thinker. I felt
          the need to make this blog and share some ideas and insights at a
          second glance, which you may not even be aware of. The blog is still
          in development mode as I plan to add a lot more to it.
        </p>
        <p className="descAbout"></p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
