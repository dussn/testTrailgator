import React, { useEffect } from 'react';
import history from './../history';
import Cookies  from 'universal-cookie';


function Signout() {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("token");
    history.push('/');
    

    }, []);

    return( <div></div>);
} 


export default Signout;