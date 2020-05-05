/**
 * Simple example code for running the user version of the DepartureBoard Info
 * NB: You will need a valid Token to access the normal user version of the api
 */
const settings = require('../settings.json');
const LiveDepartureBoardService = require('../index');


// Set up the options for the call
const options = {
  numRows: 2,
  crs:"KGX",
};

const api = new LiveDepartureBoardService(settings.tokens.user, false);
api.call("GetDepBoardWithDetails", options)
  .then(board => {
    console.log(board);
  })
  .catch(error => console.error(error));
