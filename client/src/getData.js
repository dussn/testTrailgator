import React from "react";
import axios from 'axios';
import Cookies  from 'universal-cookie';

export default async function getData() {
    const cookies = new Cookies();
    const token = cookies.get('token')
    axios.post('http://localhost:3001/data')
    .then(function (response) {
      //alert(response.data)
    if(response.data){
      localStorage.setItem("data", JSON.stringify(response.data));
    }
  })
}