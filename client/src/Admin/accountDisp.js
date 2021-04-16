import React from "react";
import Cookies  from 'universal-cookie';
import getAccounts from './getAccounts'

function feed() {
    const data = JSON.parse(localStorage.getItem("data"));
    var list = [];
    getAccounts()


    /*for (var i = 0; i < data.DisplayedClubMembers.length; i++) {
        //list[i] = []
    }*/
    return(<div></div>)
}

export default function accountDisp() {
    return(
        <div>
            {feed()}
        </div>
        );
}