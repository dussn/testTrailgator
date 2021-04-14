import React, { useEffect } from 'react';
import history from './../history';
import Cookies  from 'universal-cookie';
import {
  Redirect
} from "react-router-dom";

function Signout() {
  //this will remove the jwt access token and set isauth to false on load
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.set("isAuth",false);
    //in the case user is logged in as admin
    cookies.remove("isAdmin");
    }, []);

    //redirects the page to home
    return( 
    <div>
    <Redirect from="/signout" to="/" />
    </div>
    );
} 


export default Signout;