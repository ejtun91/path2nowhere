import axios from "axios";
import { useState } from "react";
import "./register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      // const res = await axiosInstance.post("/auth/register", {
      //   username,
      //   email,
      //   password,
      // });
      // res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputRegister"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="inputRegister"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="inputRegister"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerBtn" type="submit">
            REGISTER
          </button>
          {error && (
            <span style={{ color: "crimson", marginTop: 20 }}>
              Something went wrong!
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
