/**
 * Simple example code for running the staff version of the DepartureBoard Info
 * NB: You will need a valid Token to access the SV version of the api
 */
const settings = require('../settings.json');
const LiveDepartureBoardService = require('../index');

// Set up the options for the call
const options = {
  numRows: 2,
  crs:"CHI",
  time: "2019-11-10T12:15:00",
  timeWindow:120,
  filterType: "to"
};

const api = new LiveDepartureBoardService(settings.tokens.staff, true);
api.call("GetArrivalBoardByCRS", options)
  .then(board => {
    console.log(board);
  })
  .catch(error => console.error(error));
