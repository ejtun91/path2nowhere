import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./context";
import { ContextProvider } from "./context/Context";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
