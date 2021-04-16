import React from "react";
import "./calendar.css";
import Calendar from "@ericz1803/react-google-calendar";
import { css } from "@emotion/react";
import Cookies  from 'universal-cookie';


//put your google calendar api key here
const API_KEY = "AIzaSyDk4csiNvSTyVQE3aMZOZFJpqHuCasyqUg";

//replace calendar id with one you want to test

let calendars = [
  { calendarId: "c_4hamaug2ns0tcivss6kg3hk2ug@group.calendar.google.com" },
  //{ calendarId: "en.usa#holiday@group.v.calendar.google.com" },
  /*{
    calendarId: "ncaaf_67_%46lorida+%47ators#sports@group.v.calendar.google.com"
  }*/
];

let styles = {
  //you can use object styles
  calendar: {
    borderWidth: "3px" //make outer edge of calendar thicker
  },

  //you can also use emotion's string styles (remember to add the line 'import { css } from "@emotion/react";')
  today: css`
    /* highlight today by making the text red and giving it a red border */
    color: red;
    border: 3px solid red;
  `
};

function navBar() {
  const cookies = new Cookies();
  const isAuth = cookies.get('isAuth') == 'true';
  const isAdmin = cookies.get('role') == 'admin' || cookies.get('role') == 'owner';
  if(isAdmin)
  {
    return (
      <div className="form-check form-check-inline nowrap">
        <a className="nav-link" href="/"> Home</a> |
        <a className="nav-link" href="/profile"> Profile</a> |
        <a className="nav-link" href="/settings"> Settings</a> |
        <a className="nav-link" href="/signout"> Sign Out</a>
      </div>
    );
  }
  else return (
     <div className="form-check form-check-inline nowrap">
        <a className="nav-link" href="/"> Home</a> |
        <a className="nav-link" href="/profile"> Profile</a> |
        <a className="nav-link" href="/signout"> Sign Out</a>
    </div>
    
    );
}

class EventCalendar extends React.Component {
    render() {
        return (
            
            <div className="CalendarApp">
              <div>
                  <nav>
                     {navBar()}
                  </nav>
              </div>
            <div>
              <iframe src="https://calendar.google.com/calendar/embed?src=c_4hamaug2ns0tcivss6kg3hk2ug%40group.calendar.google.com&ctz=America%2FNew_York"  width="1000" height="700" frameborder="0" scrolling="no"></iframe>      
            </div>
          </div>
        );
    }
}
export default EventCalendar;


