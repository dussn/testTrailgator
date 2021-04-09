import "./App.css";
import React from "react";
import {Router, Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login/login";
import Signup from "./Login/signup";
import Signout from './Login/signout';
import Profile from './User/profile';
import Calendar from './User/calendar';
import history from './history';
import {Authenticate} from './auth';



function App() {
  //const token = getToken();

  if(Authenticate()) {
    //alert(document.cookie);
    return (
      <div className="App">
      <Header />
      <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/signout" component={Signout} />
      </Router>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Router>
    </div>
  );
}
//
export default App;
