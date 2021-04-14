import React from "react";
import { siteData } from "./info/data";
import memberCard from './memberCard';
//import pres from './info/images/test.PNG';

function feed() {
    var list = [];
    for (var i = 0; i < siteData.homePage.clubInfo.clubmembers.length; i++) {
        list[i] = memberCard(i);
    }
    return(list);
}

function members() {
//

return (
    <div className="row">
        {feed()}
    </div>
    );
}
export default members;