/**
 * Simple example code for running the staff version to access the DisruptionList
 * NB: You will need a valid Token to access the SV version of the api
 */
const settings = require('../settings.json');
const LiveDepartureBoardService = require('../index');

// Set up the options for the call (Not the CRS list should be CRSList  NOT crsList as in OpenLDBSVWS docs)
const options ={
  CRSList: ["KGX", "LET"]
};

// create a staff version of the API
const api = new LiveDepartureBoardService(settings.tokens.staff, true);

// make sure we set userRef to true
api.call("GetDisruptionList", options, false)
  .then(list => {
    console.log(list);
  })
  .catch(error => console.error(error));
