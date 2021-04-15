import "./App.css";
//import "./Home.css";
import React, { useEffect } from 'react';
import Auth from './Login/auth';
import Cookies  from 'universal-cookie';
import members from './members';
import auth from './Login/auth';
//import vp
//import sec
import getData from "./getData"


function HomeInfo() {
  const data = JSON.parse(localStorage.getItem("data"));
  try{
    return( 
      <div className = 'home-container'>
        <div className="container-fluid" id = "aboutus-info-container">
          <div className="col-md-12">
              <div className="jumbotron">
                <h2>
                  {data.homePage.clubInfo.about.header}
                </h2>
                <p>
                {data.homePage.clubInfo.about.body}
                </p>
              </div>
          </div>
      </div>
      <div className = "container-fluid">
        {members()}
    </div>
    </div>
    );
  }
  catch (error) {
    console.log(error);
    return <div></div>
  }
}

function Nav() {
  const cookies = new Cookies();
  const isAuth = cookies.get('isAuth') == 'true';
  const isAdmin = cookies.get('role') == 'admin' || cookies.get('role') == 'owner';
  if(isAdmin)
  {
    return (
      <div className = 'cotainer-fluid'>
        <nav>
          <div className="form-check form-check-inline nowrap">
            <a className="nav-link" href="/profile"> Profile</a> |
            <a className="nav-link" href="/calendar"> Calendar</a> |
            <a className="nav-link" href="/settings"> Settings</a> |
            <a className="nav-link" href="/signout"> Sign Out</a>
          </div>  
        </nav>
      </div>  
    );
  }
  if (isAuth)
  {
    return (
      <div className = 'cotainer-fluid'>
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
    <div className = 'cotainer-fluid'>
      <nav>
        <a className="nav-link" href="/login"> Log In</a> 
      </nav>
    </div>
    )
}

function Home() {
  getData()
  useEffect(() => {
    
    
    }, []);
  return (
    <div className="home-container">
      <Nav />
      <HomeInfo />
    </div>
  );
}

export default Home;