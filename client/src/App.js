import "./App.css";
import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./login";
import Signup from "./signup";

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();

  if(token) {
    return (
      <div className="App">
      <Header />
      <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Login} />
      <Route exact path="/calendar" component={Login} />
      <Route exact path="/signout" component={Login} />
      </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </BrowserRouter>
    </div>
  );
}
//
export default App;
