import React from "react";
import axios from 'axios';
import Cookies  from 'universal-cookie';
import auth from '../Login/auth';

function navBar() {
  const cookies = new Cookies();
  const isAuth = cookies.get('isAuth') == 'true';
  const isAdmin = cookies.get('role') == 'admin' || cookies.get('role') == 'owner';
  if(isAdmin)
  {
    return (
      <div className="form-check form-check-inline nowrap">
        <a className="nav-link" href="/"> Home</a> |
        <a className="nav-link" href="/calendar"> Calendar</a> |
        <a className="nav-link" href="/settings"> Settings</a> |
        <a className="nav-link" href="/signout"> Sign Out</a>
      </div>
    );
  }
  else return (
     <div className="form-check form-check-inline nowrap">
        <a className="nav-link" href="/"> Home</a> |
        <a className="nav-link" href="/calendar"> Calendar</a> |
        <a className="nav-link" href="/signout"> Sign Out</a>
    </div>
    
    );
}

class profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className = "profileApp">
                <div>
                    <nav>
                        {navBar()}
                    </nav>
                </div>
                <br></br>
                <div className = "container-fluid">
                    <h2>Profile</h2>
                    
                </div>
            </div>
    )};
        
}
export default profile
