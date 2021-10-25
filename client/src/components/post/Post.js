import "./post.scss";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="wrapperPost">
        {post.categories.map((c) => (
          <span className="catTitle">{c}</span>
        ))}
        <Link
          to={`/post/${post._id}`}
          className="link"
          style={{ textAlign: "center" }}
        >
          <span className="postMainTitle">{post.title}</span>
        </Link>
        <span className="dateMainTitle">
          {new Date(post.createdAt).toDateString()}
        </span>
        {post.img && (
          <div className="borderImg">
            <Link to={`/post/${post._id}`} className="link">
              <img src={post.img} alt="" className="postMainImg" />
            </Link>
          </div>
        )}
        <p className="postDesc">{post.desc}</p>
        <div className="postDetailInfo">
          <div className="postLinks">
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
            <div className="line"></div>
            <Link to={`/post/${post._id}`} className="link">
              <button className="continuePostBtn">CONTINUE READING</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
