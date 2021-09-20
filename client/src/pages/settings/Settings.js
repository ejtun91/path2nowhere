import { Add, Face } from "@material-ui/icons";
import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./settings.scss";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "https://pathblog.herokuapp.com/images/";
  const [cat, setCat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profileImg = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleCat = async (e) => {
    e.preventDefault();
    const newCat = {
      name: cat,
    };
    try {
      await axiosInstance.post("/categories", newCat);
    } catch (error) {}
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <form className="settingsForm" onSubmit={handleSubmit}>
          <div className="settingsFormGroup">
            <label htmlFor="addImageInput" className="inputSettingsAdd">
              <Face className="iconSettings" />
              <Add className="addImg" />
            </label>
            <input
              type="file"
              id="addImageInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <img
              className="settingsImg"
              src={file ? URL.createObjectURL(file) : PF + user.profileImg}
              alt=""
            />

            <input
              type="text"
              placeholder={user.username}
              className="inputSettingsUsername"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder={user.email}
              className="inputSettingsEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              className="inputTextPassword"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="settingsSubmitBtn" type="submit">
              Submit
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  alignSelf: "center",
                  marginTop: "1em",
                }}
              >
                Profile updated...
              </span>
            )}
          </div>
        </form>
        <form className="createCat" onSubmit={handleCat}>
          <span className="titleCat">CREATE NEW CATEGORY</span>
          <label htmlFor="name">Category</label>
          <input
            onChange={(e) => setCat(e.target.value)}
            type="text"
            id="name"
            placeholder="enter new category..."
          />
          <button className="createCatBtn" type="submit">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
