var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ScanSchema = new Schema({ QID: String, DeviceId: String, LoggedIn: Date}, 
           { collection : 'scan' });


module.exports = mongoose.model('Scan', ScanSchema);