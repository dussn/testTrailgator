import React from "react";
import axios from 'axios';
import Cookies  from 'universal-cookie';



function memberCard(mn) {
    const data = JSON.parse(localStorage.getItem("data"));
    
    
    return (
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" id  = 'load-img' src = {process.env.PUBLIC_URL + "./images/test.PNG"}/>
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