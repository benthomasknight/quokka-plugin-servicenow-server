//let records = require('./dist/index');
//import {GlideRecord} from './dist/app.js';
var a = require('./dist/app');

module.exports = {
  
  before: config => {
    console.log('before');
  },

  beforeEach: config => {
    global.snow = config["quokka-plugin-servicenow-server"];
    global.GlideRecord = a.GlideRecord;
  }
};
