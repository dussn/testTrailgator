import React from "react";
import axios from 'axios';
import Cookies  from 'universal-cookie';

export default function getData() {
    const cookies = new Cookies();
    const token = cookies.get('token')
    var data;
    axios.post('http://localhost:3001/data')
    .then(function (response) {
    data = response.data;
    localStorage.setItem("data",JSON.stringify(data));
  })
}