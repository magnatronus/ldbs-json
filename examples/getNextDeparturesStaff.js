/**
 * Simple example code for running the STAFF version of the DepartureBoard Info
 * NB: You will need a valid Token to access the SV version of the api
 */
const settings = require('../settings.json');
const LiveDepartureBoardService = require('../index');

// Set up the options for the call
const options = {
  crs:"SVG",
  filterList: ["KGX"],
  time: "2020-05-05T08:00:00",
  timeWindow: 120
};

const api = new LiveDepartureBoardService(settings.tokens.staff, true);
api.call("GetNextDepartures", options)
  .then(board => {
    console.log(board);
  })
  .catch(error => console.error(error));
