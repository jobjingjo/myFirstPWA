
'use strict';

const express = require('express');
//const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

function getBooking(req, resp) {
  const pnr = req.params.pnr || '40.7720232,-73.9732319';
  resp.json({
    pnr:pnr,
    from:"somewhere",
    to:"someplace"
  });
}

function getBookings(req, resp) {
 const bookings = [{
   pnr:'XM8KTN',
   from:'MEL',
   to:'BKK',
   image:"https://www.jetstar.com/nz/en//~/_media/Global/Images/Destination/BKK/BKK_MMBW_Past_Trip.jpg"
 },{
  pnr:'JJ5S5D',
  from:'BKK',
  to:'NRT',
  image:"https://www.jetstar.com/nz/en//~/_media/Global/Images/Destination/NRT/NRT_MMBW_MyTrip.jpg"
},{
  pnr:'AMI6HH',
  from:'MEL',
  to:'SYD',
  image:"https://www.jetstar.com/nz/en//~/_media/Global/Images/Destination/SYD/SYD_MMBW_MyTrip.jpg"
}]
  resp.json(bookings);
}

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
 function startServer() {
    const app = express();
  
    // Redirect HTTP to HTTPS,
    app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
  
    
    app.use((req, resp, next) => {
      const now = new Date();
      const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
      const path = `"${req.method} ${req.path}"`;
      const m = `${req.ip} - ${time} - ${path}`;
      // eslint-disable-next-line no-console
      console.log(m);
      next();
    });
    
  
    app.get('/bookings/:pnr', getBooking);
    app.get('/bookings', getBookings);
    app.use(express.static('public'));
  
    const server = app.listen('8000', () => {
      // eslint-disable-next-line no-console
      console.log('Local DevServer Started on port 8000...');
    });
    return server;
  }
  
  startServer();