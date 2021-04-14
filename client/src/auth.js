import React from 'react';
import axios from 'axios';
export async function Authenticate() {
    //alert("hey!");
    
    if(document.cookie){
    
        axios
            .post('http://localhost:3001/login/auth',document.cookie)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
    }
    return false;
}

