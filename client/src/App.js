import "./App.css";
import React, { Component, useEffect  } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login/login";
import Signup from "./Login/signup";
import Signout from './Login/signout';
import Profile from './User/profile';
import Calendar from './User/calendar';
import history from './history';
//import {Authenticate} from './auth';
import Auth from './Login/authCheck';
import auth from './Login/auth';
import Cookies  from 'universal-cookie';



//        <Route path="/profile" render={props => <Auth><Profile {...props} /></Auth>} />


class App extends Component{
  constructor(props) {
    super();
    const cookies = new Cookies();
    const jwt = cookies.get('token');
    auth(jwt);
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
          <Route path="/signout" render={props => <Auth><Signout {...props} /></Auth>} />
          <Route path="/profile" render={props => <Auth><Profile {...props} /></Auth>} />
          
        </Router>
      </div>
    );
  }
}
//
export default App;
