import React from "react";
import memberCard from './memberCard';


function feed() {
    const data = JSON.parse(localStorage.getItem("data"));
    var list = [];
    for (var i = 0; i < data.DisplayedClubMembers.length; i++) {
        list[i] = memberCard(i);
    }
    return(list);
}

function members() {


return (
    <div className="row">
        {feed()}
    </div>
    );
}
export default members;