import "./App.css";
//import "./Home.css";
import React from "react";


function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function Home() {
  const token = getToken();
  if (token)
  {
    return (
      <div class="home-container">
      <nav>
      <div class="form-check form-check-inline nowrap">
        <a class="nav-link" href="/profile"> Profile</a> |
        <a class="nav-link" href="/calendar"> Calendar</a> |
        <a class="nav-link" href="/signout"> Signout</a>
      </div>
        
      </nav>
      home
    </div>
    );
  }
  return (
    <div class="home-container">
      <nav>
        <a class="nav-link" href="/login"> Login</a> 
      </nav>
      home
    </div>
  );
}

export default Home;