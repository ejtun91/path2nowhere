import { Add, ImageSearch } from "@material-ui/icons";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.scss";
import { axiosInstance } from "../../config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const { user } = useContext(Context);

  const firebaseConfig = {
    apiKey: "AIzaSyB4gzpovnBYAtF_-8ZMeqlpygBMk-CsVho",
    authDomain: "blog-c048e.firebaseapp.com",
    projectId: "blog-c048e",
    storageBucket: "blog-c048e.appspot.com",
    messagingSenderId: "318507256837",
    appId: "1:318507256837:web:a823be85370ce63298e06c",
    measurementId: "G-KDEGXH3WGV",
  };

  initializeApp(firebaseConfig);
  const metadata = {
    contentType: "image/jpeg",
  };
  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      img: file.img,
    };
    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   newPost.img = filename;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (error) {}
    // }
    //   }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + " % done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFile((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded(true);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: file, label: "img" }]);
  };
  if (uploaded) {
    console.log(file);
  }

  return (
    <div className="write">
      <div className="writeWrapper">
        {file && <img src="" alt="" className="writeImg" />}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="addImageInput" className="inputWriteAdd">
              <ImageSearch className="iconWrite" />
            </label>
            <input
              type="file"
              id="addImageInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Enter Title"
              className="inputWriteTitle"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CKEditor
              editor={ClassicEditor}
              data={desc}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDesc(data);
              }}
            />
            {uploaded && (
              <button className="writeSubmitBtn" type="submit">
                Publish
              </button>
            )}
          </div>
        </form>
        {!uploaded && (
          <button
            style={{
              alignSelf: "left",
              width: "max-content",
              padding: "5px 10px",
              color: "darkgoldenrod",
              backgroundColor: "white",
              border: "none",
              border: "1px solid darkgoldenrod",
              cursor: "pointer",
            }}
            className="writeSubmitBtn"
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default Write;
