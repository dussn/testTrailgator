import React from "react";
import Cookies  from 'universal-cookie';
import getAccounts from './getAccounts'

function feed() {
    //const data = JSON.parse(localStorage.getItem("data"));
    getAccounts();
    var list = [];
    const data = JSON.parse(localStorage.getItem("account"))
    try {
        for (var i = 0; i < data.length; i++) {
        list[i] = <li className="list-group-item">
                    {data[i].name},  {data[i].email}, {data[i].role}</li>;
        }
        return(list)
    } catch (e) {     
        return <div></div>;
    }
    
}

export default function accountDisp() {
    return(
        <div>
            {feed()}
        </div>
        );
}