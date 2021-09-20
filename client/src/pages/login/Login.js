import axios from "axios";
import { useContext, useRef } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./login.scss";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputLogin"
            placeholder="username"
            ref={userRef}
          />
          <input
            type="password"
            className="inputLogin"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="loginBtn" type="submit" disabled={isFetching}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
