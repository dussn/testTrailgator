import "./App.css";
//import "./Home.css";
import React from "react";
import Auth from './Login/auth';
import Cookies  from 'universal-cookie';
import logo from './Imgs/test.PNG';

function HomeInfo() {
  return( 
    <div class = 'home-container'>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="jumbotron">
              <h2>
                About Us
              </h2>
              <p>
              Florida TrailGator is a group that promotes physical activity while discovering the local nature around Gainesville. We go on trail walks/runs, hikes, and have local nature outings.
              </p>
            </div>
          </div>
        </div>
    </div>
    <div class="container-fluid">
      <img class="card-img-top" alt="logo" src={logo} />
    </div>
   

  </div>

  )
}

function Nav() {
  const cookies = new Cookies();
  const isAuth = cookies.get('isAuth') == 'true';
  if (isAuth)
  {
    return (
      <div class = 'cotainer-fluid'>
        <nav>
          <div className="form-check form-check-inline nowrap">
            <a className="nav-link" href="/profile"> Profile</a> |
            <a className="nav-link" href="/calendar"> Calendar</a> |
            <a className="nav-link" href="/signout"> Sign Out</a>
          </div>  
        </nav>
      </div>  
    )
  }
  return (
    <div class = 'cotainer-fluid'>
      <nav>
        <a className="nav-link" href="/login"> Log In</a> 
      </nav>
    </div>
    )
}

function Home() {
  return (
    <div className="home-container">
      <Nav />
      <HomeInfo />
    </div>
  );
}

export default Home;