/**
 * Simple example code for running the user version of the DepartureBoard Info
 * NB: You will need a valid Token to access the SV version of the api
 */
const settings = require('../settings.json');
const LiveDepartureBoardService = require('../index');


// Set up the options for the call
const options = {
  crs:"SVG",
  filterList: ["KGX"],
  time: "2020-04-14T08:30:00",
  timeWindow:120,
  timeOffset: 0
};

const api = new LiveDepartureBoardService(settings.tokens.user, false);
api.call("GetNextDepartures", options)
  .then(board => {
    console.log(board);
  })
  .catch(error => console.error(error));
