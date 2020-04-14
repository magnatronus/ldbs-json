/**
 * Simple example code for running the STAFF version of the DepartureBoard Info
 * NB: You will need a valid Token to access the SV version of the api
 */
const LiveDepartureBoardService = require('../index');
const token = "0000-0000-0000-0000"; // put a valid token here


// Set up the options for the call
const options = {
  crs:"SVG",
  filterList: ["KGX"],
  time: "2020-04-14T08:30:00",
  timeWindow:120
};

const api = new LiveDepartureBoardService(token, true);
api.call("GetNextDepartures", options).then(board => {
  console.log(board);
});