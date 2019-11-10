/**
 * Simple example code for running the user version of the DepartureBoard Info
 * NB: You will need a valid Token to access the normal user version of the api
 */
const LiveDepartureBoardService = require('../index');
const token = "0000-0000-0000-0000"; // put a valid token here

// Set up the options for the call
const options = {
  numRows: 2,
  crs:"KGX",
};

const api = new LiveDepartureBoardService(token, false);
api.call("GetDepBoardWithDetails", options).then(board => {
  console.log(board);
});