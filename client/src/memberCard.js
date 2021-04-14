import React from "react";
import { siteData } from "./info/data";


function getImage(name,ret) {
    import('./info/images/' + name)
    .then(image => ret =  image);
}
function memberCard(mn) {
    //alert(src);
    /*window.onload = function(){
        const dog = images(siteData.homePage.clubInfo.clubmembers[mn]['img']);
        //document.getElementById("load-img").src = dog;
        //siteData.homePage.clubInfo.clubmembers[mn]['img'];
    };*/
    //const image = require.context('./info/images/',true);
    //loadImage  =imageName => ()
    
    const img = './images/' + siteData.homePage.clubInfo.clubmembers[mn]['img'];
    //var img;
    //const image = getImage(siteData.homePage.clubInfo.clubmembers[mn]['img'],img);
    //alert(process.env.PUBLIC_URL + img)
    return (
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" id  = 'load-img' src = {process.env.PUBLIC_URL + img}/>
            <div className="card-block">
              <h5 className="card-title">
                {siteData.homePage.clubInfo.clubmembers[mn].name}
              </h5>
              <p className="card-text">
                {siteData.homePage.clubInfo.clubmembers[mn].about}
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