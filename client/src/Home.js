import "./App.css";
//import "./Home.css";
import React from "react";


function Home() {
  if (document.cookie)
  {
    return (
      <div class="home-container">
      <nav>
      <div class="form-check form-check-inline nowrap">
        <a class="nav-link" href="/profile"> Profile</a> |
        <a class="nav-link" href="/calendar"> Calendar</a> |
        <a class="nav-link" href="/signout"> Sign Out</a>
      </div>
        
      </nav>
      home
    </div>
    );
  }
  return (
    <div class="home-container">
      <nav>
        <a class="nav-link" href="/login"> Log In</a> 
      </nav>
      home
    </div>
  );
}

export default Home;