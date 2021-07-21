'use strict';

function updateUI(bookings){
    const elBookings = document.getElementById('bookings');
    elBookings.innerHTML ="";
    bookings.forEach(booking => {
        let li = document.createElement("li");
        li.innerHTML=`<li>${booking.pnr}</li>`;
        elBookings.appendChild(li)
    });
}

function startSpinner(){

}

function showErrorMessage(){
    
}
function stopSpinner(){
    
}

function fetchData(){
    const BOOKINGS ="/bookings"
      
    var networkDataReceived = false;

    startSpinner();
    
    // fetch fresh data
    var networkUpdate = fetch(BOOKINGS)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        networkDataReceived = true;
        updateUI(data);
      });
    
    // fetch cached data
    caches
      .match(BOOKINGS)
      .then(function (response) {
        if (!response) throw Error('No data');
        return response.json();
      })
      .then(function (data) {
        // don't overwrite newer network data
        if (!networkDataReceived) {
          updateUI(data);
        }
      })
      .catch(function () {
        // we didn't get cached data, the network is our last hope:
        return networkUpdate;
      })
      .catch(showErrorMessage)
      .then(stopSpinner);
}

/**
 * Initialize the app, gets the list of locations from local storage, then
 * renders the initial data.
 */
 function init() {
    // Get the location list, and update the UI.



    fetchData();
    document.getElementById('fetch').addEventListener('click', fetchData);
  }
  
  init();
  