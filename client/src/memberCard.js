import React from "react";
import axios from 'axios';
import Cookies  from 'universal-cookie';



function memberCard(mn) {
    const data = JSON.parse(localStorage.getItem("data"));
    
    const encodedData = data.homePage.clubInfo.clubMembers[mn].image;
    return (
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" id  = 'load-img' src = {"data:image/jpeg;base64", data.homePage.clubInfo.clubMembers[mn].image}/>
            <div className="card-block">
              <h5 className="card-title">
                {data.homePage.clubInfo.clubMembers[mn].name}
              </h5>
              <p className="card-text">
                {data.homePage.clubInfo.clubMembers[mn].about}
              </p>
              <p>
                <a className="btn btn-primary" href="#">Contact</a>
              </p>
            </div>
          </div>
        </div>
    );
}
export default memberCard;