var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var MappSchema = new Schema({ QID: String, PID: String}, 
           { collection : 'mapp' });

// var MappSchema = new Schema({
//   : {type: String, required: true},
//     : {type: String, required: true}

// });



module.exports = mongoose.model('Mapp', MappSchema);