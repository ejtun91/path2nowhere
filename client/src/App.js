import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import ScrollToTop from "react-router-scroll-top";
import { ThemeContext } from "./context";

function App() {
  const { user } = useContext(Context);
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <Router>
      <div
        style={{
          backgroundColor: darkMode ? "#333333" : "white",
          color: darkMode && "white",
        }}
      >
        <ScrollToTop>
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/post/:id">
              <Single />
            </Route>
            <Route path="/write">{user ? <Write /> : <Login />}</Route>
            <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
            <Route path="/register">{user ? <Home /> : <Register />}</Route>
            <Route path="/login">{user ? <Home /> : <Login />}</Route>
          </Switch>
        </ScrollToTop>
      </div>
    </Router>
  );
}

export default App;
