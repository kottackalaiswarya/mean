var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var TrackSchema = new Schema({
 
//   QID: {type: String, required: true, }, 
//   uname: {type:String, lowercase: true}, 
//   LoggedIn: {type:Date } ,
//   UserLat: {type: String},
//   UserLong: {type:String},									// Tracking table 
//   DeviceId: {type: String},
//   DeviceGeo: {type: String}
// },{ collection : 'track' });


var TrackSchema = new Schema({ 
	QID: String, uname: String, 
	LoggedIn: Date,UserLat: String, 
	UserLong: String, 
	DeviceId: String, 
	DeviceGeo: String}, 
 { collection : 'track' });

module.exports = mongoose.model('Track',TrackSchema); 