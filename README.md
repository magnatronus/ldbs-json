# Live Departure Board Service (ldbs-json)
This is a node module that will interface to the National Rail Enquiries **Live Departure Boards Service** which powers the Live Departure Boards and the **Live Departure Boards Staff Service** which powers the Staff Version of the Live Departure Boards. More details can be found here:

 * [user service OpenLDBWS](https://lite.realtime.nationalrail.co.uk/OpenLDBWS/)
 * [staff service OpenLDBSVWS](https://lite.realtime.nationalrail.co.uk/OpenLDBSVWS/)

 It is designed to deliver the XML data returned by both API's in JSON format.


 # Using the module
 The first step is to install the module into your node project
  - **npm install -s ldbs-json**

Then to test just do the following
```
const useStaffVersion = false;
const LiveDepartureBoardService = require('ldbs-json');
const token = "0000-0000-0000-0000"; // put a valid token here

// Set up the options for the call
const options = {
  numRows: 2,
  crs:"KGX",
};

// Now do the required query
// note that if in an async function you can use await rather that .then
const api = new LiveDepartureBoardService(token, useStaffVersion);
api.call("GetDepBoardWithDetails", options).then(board => {
  console.log(board);
});

```

There are 2 examples ( one STAFF version and one USER version that can be found in the included *examples* directory of the project).

This module is a continuation from my other module https://www.npmjs.com/package/ldbws-json which was only for use with the USER version of the OpenLDBWS web service.


# Acknowledgements
- The LDBS_JSON is powered by National Rail Enquiries.
