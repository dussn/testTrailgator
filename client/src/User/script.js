document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
	
      center: 'title',
      right: 'prev,next today',
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
	titleFormat: { month: 'long',year:'numeric'},
    displayEventTime: true, // don't show the time column in list view
    weekNumbers: true,
    navLinks: true,
	
    googleCalendarApiKey: 'AIzaSyDk4csiNvSTyVQE3aMZOZFJpqHuCasyqUg',

    
	eventBorderColor: 'black',
	eventTextColor: 'black',
	eventBackgroundColor: 'rgb(192,192,192)',
    events: 'c_4hamaug2ns0tcivss6kg3hk2ug@group.calendar.google.com',
	
    eventClick: function(arg) {

      // opens events in a popup window
      window.open(arg.event.url, '_blank', 'width=700,height=600');

      // prevents current tab from navigating
      arg.jsEvent.preventDefault();
    }

  });

  calendar.render();
});