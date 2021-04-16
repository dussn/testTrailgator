import React from "react";
import Cookies  from 'universal-cookie';
import "./memberCard.css";
import getData from "./getData"



function memberCard(mn) {
  
   try {
    var data = {};
    getData().then(

      data = JSON.parse(localStorage.getItem("data")),
      
    );
    var ref = "mailto:"+data.DisplayedClubMembers[mn].email
    //alert(dat)
    //const data = {}//JSON.parse(dat);
     
   //const encodedData = data.image;
    return (
        <div className="col-md-4">
          <div className="card">
            <div className = "img-holder">
              <img className="card-img-top" id ='load-img' src = {"data:image/jpeg;base64", data.DisplayedClubMembers[mn].image}/>
            </div>
            <div className="card-block">
              <h5 className="card-title">
                {data.DisplayedClubMembers[mn].name}
              </h5>
              <h5 className="card-title">
                {data.DisplayedClubMembers[mn].position}
              </h5>
              <p className="card-text">
                {data.DisplayedClubMembers[mn].about}
              </p>
              <p>
              
                <a className="btn btn-primary" href={ref}>Contact</a>
              </p>
            </div>
          </div>
        </div>
    );
   }
    catch (error) {
      console.log(error);
      return <div></div>
   }
   
}
export default memberCard;