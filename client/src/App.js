import "./App.css";
import React, { Component, useEffect  } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login/login";
import Signup from "./Login/signup";
import Signout from './Login/signout';
import Profile from './User/profile';
import Calendar from './User/calendar';
import Settings from './Admin/settings';
import history from './history';
import Auth from './Login/authCheck';
import AdminAuth from './Admin/authCheck';
import auth from './Login/auth';
import Cookies  from 'universal-cookie';




class App extends Component{
  componentDidMount(){
    //checks token every 5 seconds
    this.timer = setInterval(()=> auth(false), 5000)
  }

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Router history={history}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/calendar" render={props => <Auth><Calendar {...props} /></Auth>} />
          <Route exact path="/signout" component={Signout} />
          <Route path="/profile" render={props => <Auth><Profile {...props} /></Auth>} />
          <Route path="/settings" render={props => <AdminAuth><Settings {...props} /></AdminAuth>} />
        </Router>
      </div>
    );
  }
}

export default App;
//<Route path="/signout" render={props => <Auth><Signout {...props} /></Auth>} />