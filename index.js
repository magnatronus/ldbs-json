'use strict';
/**
 * index.js
 * Package main entry point
 */

const request             = require('request-promise-native'),
      parseString         = require('xml2js').parseString,
      stripNS             = require('xml2js').processors.stripPrefix,
      DepartureBoardSoap  = require('./soap');



/**
 * This is the main LiveDepartureBoardService class
 * It will allow access to both the user and staff versions of the Live Departureboard Services
 * This access depend on the type of token that you have and which service it is valid for.
 * 
 * For more details on each service see:
 * user service - https://lite.realtime.nationalrail.co.uk/OpenLDBWS/
 * staff service - https://lite.realtime.nationalrail.co.uk/OpenLDBSVWS/
 */
class LiveDepartureBoardService {

  /**
   * Create an instance of the service to allow access to the operations
   * @param {*} accessToken this MUST be a valid registered token
   * @param {*} staffVersion true to access the staff version (token should be a staff token) or false to access the user version. Defaults to the user version.
   */
  constructor(accessToken = "0000-0000-0000-0000", staffVersion = false) {
    this.staffVersion = staffVersion;
    this.refUrl = "https://lite.realtime.nationalrail.co.uk/OpenLDBSVWS/ldbsvref.asmx";
    this.refTargetNamespace = "http://thalesgroup.com/RTTI/2015-05-14/ldbsv_ref/";
    this.baseURL = (staffVersion) ? "https://lite.realtime.nationalrail.co.uk/OpenLDBSVWS/ldbsv12.asmx": "https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb11.asmx";
    this.targetNamespace = (staffVersion) ? "http://thalesgroup.com/RTTI/2017-10-01/ldbsv/" : "http://thalesgroup.com/RTTI/2017-10-01/ldb/";
    this.accessToken = accessToken;
  }

  /**
   * Query the LiveDepartureBoardService for the requested data
   * @param {String} method - the LDBWS or LDBSVWS to perform 
   * @param {Object} options  - a JSON object consisting of the key/value pairs for the requested method
   * @param {Bool} userRef - only applies for the staff version of the API and allows access to those calls that use the reference data endpoint
   */
  async call(method, options, useRef = false) {
    const soapCall = new DepartureBoardSoap(this.accessToken, (useRef) ? this.refTargetNamespace : this.targetNamespace, method, options).generateCall();
    const body = await request({
        method: 'POST',
        url: (useRef) ? this.refUrl: this.baseURL,
        headers: {
            'content-type' : "text/xml"
        },
        body: soapCall
    });
    return await this._parseResult(body, method);
  }

  // Private method to parse result to JSON
  _parseResult(body, method) {
    return new Promise((resolve, reject) => {
      parseString(body, {
        tagNameProcessors: [stripNS],
        explicitArray : false,
        ignoreAttrs : true
      }, function(err, result){
        if(!err){
          const data = result.Envelope.Body[`${method}Response`];
          resolve(data);
        } else {
          reject(err);
        }
      });        
    });
  }

}

module.exports = LiveDepartureBoardService;