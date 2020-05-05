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

There are 3 examples ( two STAFF versions and one USER version that can be found in the included *examples* directory of the project). The additional staff version is to access the Reference Data Enpoint calls (this example uses **GetStationList**).

This module is a continuation from my other module https://www.npmjs.com/package/ldbws-json which was only for use with the USER version of the OpenLDBWS web service.


## Updates May 2020
This update has replaced the user of the **request** module and it now uses **node-fetch**. Some simple error checks on the return status of the API are now made and the examples have also been updated.

## New Options for the api.call() method (Dec 2019)
The API will still work as it did but there are 2 new (optional) flags that can be past in when making an API call. The call now :

- api.call(*method*, *options*, *useRef*, *withAttributes*)

The parameters **method** and **options** are the same as they were but there are 2 new options **useRef** and **withAttributes** (both default to false so have no impact if not specified).

 - **useRef** can be set to true so that a Staff API call can access the Reference Data Endpoint
 - **withAttributes** can be set to true to stop the attributes  being stripped from the result. **NB: setting this to true will change the JSON data structure returned**.



# Acknowledgements
- The LDBS-JSON module is powered by National Rail Enquiries.
