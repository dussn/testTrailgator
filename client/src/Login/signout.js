import React, { useEffect } from 'react';
import history from './../history';
import Cookies  from 'universal-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function Signout() {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.set("isAuth",false);
    history.push('/');
    

    }, []);

    return( 
    <div>
    <Redirect from="/signout" to="/" />
    </div>
    );
} 


export default Signout;