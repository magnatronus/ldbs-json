/**
 * Simple example code for running the staff version of the DepartureBoard Info to access one of the Reference Data Enpoint API calls "GetStationList"
 * NB: You will need a valid Token to access the SV version of the api
 */
const settings = require('../settings.json');
const LiveDepartureBoardService = require('../index');

// Set up the options for the call
const options ={
  currentVersion: ''
};

// create a staff version of the API
const api = new LiveDepartureBoardService(settings.tokens.staff, true);

// make sure we set userRef to true
api.call("GetStationList", options, true)
  .then(list => {
    console.log(list);
  })
  .catch(error => console.error(error));
