
'use strict';

const express = require('express');
//const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

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
    
  
    //app.get('/forecast/:location', getForecast);
    //app.get('/forecast/', getForecast);
    //app.get('/forecast', getForecast);
    app.use(express.static('public'));
  
    const server = app.listen('8000', () => {
      // eslint-disable-next-line no-console
      console.log('Local DevServer Started on port 8000...');
    });
    return server;
  }
  
  startServer();