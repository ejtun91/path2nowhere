import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./singlepost.scss";
import axios from "axios";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://pathblog.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <div className="singlePost">
      <div className="wrapperSinglePost">
        <span className="catTitle">{post.categories}</span>
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <span className="postMainTitle">{title}</span>
        )}
        <span className="dateMainTitle">
          {new Date(post.createdAt).toDateString()}
        </span>
        {post.img && <img src={post.img} alt="" className="postMainImg" />}
        {post.username === user?.username && (
          <div className="singlePostEdit">
            <EditOutlined
              className="singlePostIcon"
              onClick={() => setUpdateMode(true)}
            />
            <DeleteOutline className="singlePostIcon" onClick={handleDelete} />
          </div>
        )}
        {updateMode ? (
          <CKEditor
            editor={ClassicEditor}
            data={desc}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDesc(data);
            }}
          />
        ) : (
          <p className="postDesc">{parse(desc)}</p>
        )}
        {updateMode && (
          <button className="singlePostBtn" onClick={handleUpdate}>
            Update Post
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
