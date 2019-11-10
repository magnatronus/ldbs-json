/**
 * Simple example code for running the staff version of the DepartureBoard Info
 * NB: You will need a valid Token to access the SV version of the api
 */
const LiveDepartureBoardService = require('../index');
const token = "0000-0000-0000-0000"; // put a valid token here

// Set up the options for the call
const options = {
  numRows: 2,
  crs:"CHI",
  time: "2019-11-10T12:15:00",
  timeWindow:120,
  filterType: "to"
};

const api = new LiveDepartureBoardService(token, true);
api.call("GetArrivalBoardByCRS", options).then(board => {
  console.log(board);
});