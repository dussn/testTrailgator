import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar';

export default class EventCalendar extends React.Component {
  render() {
    return (
        <div>
            <nav>
                <div className="form-check form-check-inline nowrap">
                    <a className="nav-link" href="/"> Home</a> |
                    <a className="nav-link" href="/profile"> Profile</a> |
                    <a className="nav-link" href="/signout"> Sign Out</a>
                </div>
        
             </nav>
            <iframe src="https://calendar.google.com/calendar/embed?src=c_4hamaug2ns0tcivss6kg3hk2ug%40group.calendar.google.com&ctz=America%2FNew_York"  width="800" height="600" frameborder="0" scrolling="no"></iframe>

        </div>
   
    )}
  
}



