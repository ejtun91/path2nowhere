import { useContext } from "react";
import { ThemeContext } from "../../context";
import Sun from "../../images/sun.png";
import Moon from "../../images/moon.png";
import "./toggle.scss";

const Toggle = () => {
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    theme.dispatch({ type: "TOGGLE" });
  };

  return (
    <div
      className="wrapperToggle"
      style={{
        backgroundColor: theme.state.darkMode ? "#333" : "#8eddf1",
      }}
    >
      <img className="iconToggle" src={Sun} />
      <img className="iconToggle" src={Moon} />
      <span
        className="btnToggle"
        onClick={handleClick}
        style={{ left: theme.state.darkMode ? "0px" : "25px" }}
      ></span>
    </div>
  );
};

export default Toggle;
