import "./App.css";
//import "./Home.css";
import React from "react";
import Auth from './Login/auth';
import Cookies  from 'universal-cookie';

function Home() {
  const cookies = new Cookies();
  const isAuth = cookies.get('isAuth') == 'true';
  if (isAuth)
  {
    return (
      <div className="home-container">
      <nav>
      <div className="form-check form-check-inline nowrap">
        <a className="nav-link" href="/profile"> Profile</a> |
        <a className="nav-link" href="/calendar"> Calendar</a> |
        <a className="nav-link" href="/signout"> Sign Out</a>
      </div>
        
      </nav>
      home
    </div>
    );
  }
  return (
    <div className="home-container">
      <nav>
        <a className="nav-link" href="/login"> Log In</a> 
      </nav>
      home
    </div>
  );
}

export default Home;