'use strict';
/**
 * index.js
 * Class used to provide the SOAP functionality for the Darwin OpenLDBWS/OpenLDBSVWS calls
 * It takes a Token, Namespace, Request and a set of JSON objects and generates the required SOAP call for use with the LDBWS endpoint
 */

class DepartureBoardSoap {

  /**
   * Create a new SOAP call 
   * @param {*} token  - a valid access token
   * @param {*} namespace  - the target namespace - depends on staff or user version
   * @param {*} request - the operation to perform
   * @param {*} options - a JSON object of values to pass to the request
   */
  constructor(token, namespace, request, options){
    this.token      = token;
    this.namespace  = namespace;
    this.request    = request;
    this.options    = options;
  }

  /**
   * Generate the complete SOAP call based on the params passed to the class constructor
   */
  generateCall() {
    return  `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="${this.namespace}">` +
            `${this._header()}` +
            `${this._payload(this.options)}` +
            `</soap:Envelope>`;
  }

  // Generate the SOAP payload
  _payload(options) {
    let body = ``;
    Object.keys(options).forEach(function(key){
      let val="";
      if(key == "filterList"  || key == "CRSList"){
        options[key].forEach((crs) => {
          val += `<ldb:crs>${crs}</ldb:crs>`;
        });
      } else {
        val = `${options[key]}`                
      }
      body += `<ldb:${key}>${val}</ldb:${key}>`;
    });
    return `<soap:Body><ldb:${this.request}Request>${body}</ldb:${this.request}Request></soap:Body>`;
  }

  // generate the SOAP header
  _header() {
    return  `<soap:Header>` +
            `<typ:AccessToken>` +
            `<typ:TokenValue>${this.token}</typ:TokenValue>` +
            `</typ:AccessToken>` +
            `</soap:Header>`;        
  }

}

module.exports = DepartureBoardSoap;
