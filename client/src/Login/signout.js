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
    //unauthenticate user
    cookies.set("isAuth",false);
    //remove all tokens

    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("email");
    window.location.reload();
    }, []);

    //redirects the page to home
    return( 
    <div>
    <Redirect from="/signout" to="/" />
    </div>
    );
} 


export default Signout;