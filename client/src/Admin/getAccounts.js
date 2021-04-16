import accountDisp from './accountDisp';
import React from "react";
import axios from 'axios';
import auth from '../Login/auth'
import Cookies  from 'universal-cookie';


export default function getAccounts() {
    const cookies = new Cookies();
    const jwt = cookies.get('token');
    

}
