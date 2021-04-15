import React from "react";
import "./calendar.css";
import Calendar from "@ericz1803/react-google-calendar";
import { css } from "@emotion/react";

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

class EventCalendar extends React.Component {
    render() {
        return (
            
            <div className="CalendarApp">
            <div>
                    <nav>
                        <div className="form-check form-check-inline nowrap">
                            <a className="nav-link" href="/"> Home</a> |
                            <a className="nav-link" href="/profile"> Profile</a> |
                            <a className="nav-link" href="/signout"> Sign Out</a>
                        </div>
                
                    </nav>
                </div>
            <body>
                <div
                style={{
                    width: "90%",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                    margin: "auto",
                    maxWidth: "1200px",
                    
                }}>
                <Calendar apiKey={API_KEY} calendars={calendars} styles={styles}/>
                </div>
            </body>
            </div>
        );
    }
}
export default EventCalendar;


