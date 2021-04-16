import accountDisp from './accountDisp';
import React from "react";
import axios from 'axios';
import auth from '../Login/auth'
import Cookies  from 'universal-cookie';


export default async function getAccounts() {
    const cookies = new Cookies();
    const jwt = cookies.get('token');
    let data;
    var refresh = false;
    if(!localStorage.getItem("account")) refresh = true;
    await axios.post('http://localhost:3001/settings/accounts',{code: jwt}).then(function(response) {
        localStorage.setItem("account",JSON.stringify(response.data));
        if(refresh) window.location.reload();
    });
    
    //return data;
}
