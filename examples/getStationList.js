/**
 * Simple example code for running the staff version of the DepartureBoard Info to access one of the Reference Data Enpoint API calls "GetStationList"
 * NB: You will need a valid Token to access the SV version of the api
 */
const LiveDepartureBoardService = require('../index');
const token = "0000-0000-0000-0000"; // put a valid token here

// Set up the options for the call
const options ={
  currentVersion: ''
};

// create a staff version of the API
const api = new LiveDepartureBoardService(token, true);

// make sure we set userRef to true
api.call("GetStationList", options, true).then(list => {
  console.log(list);
});