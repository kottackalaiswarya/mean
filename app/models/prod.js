var mongoose = require('mongoose');
var Schema = mongoose.Schema;




// var ProductSchema = new Schema({
//   PID: {type: String, required: true, unique: true},
//   p_name: {type: String, default:'null' },
//   height: {type: String, default:'null'},
//   width: {type: String, default:'null'},
//   collectionType: {type: String,default:'null'},
//   QRCode:{type: String, default:'null'}
// });



// var prodSchema = new Schema({
//   ProID: {type: String},
//   type: {type: String},
//   Parent: {type: String}
//   collection : 'question'
// });

var prodSchema = new Schema({ ProID: String, type: String, Parent: String}, 
           { collection : 'prod' });

module.exports = mongoose.model('prod',prodSchema);



// // db.containers.insert([{CID: 'C123',destination: 'India'}])


// db.containers.insert([{CID: 'C124',destination: 'USA'}])

// db.containers.insert([{CID: 'C125',destination: 'India'}])

// // db.palatte.insert([{PalID: 'PL123',NoOfP: '50',Parent:'C123'}])
// // db.package.insert([{PacID: 'PA123',NoOfPro: '100',Parent:'PL123'}])

// db.palatte.insert([{PalID: 'PL124',NoOfP: '150',Parent:'C124'}])
// db.package.insert([{PacID: 'PA124',NoOfPro: '150',Parent:'PL124'}])
// db.prod.insert([{ProID: 'PR124',type: 'Wood',Parent:'PA124'}])

// // db.prod.insert([{ProID: 'PR123',type: 'Metal',Parent:'PA123'}])


//  prod.aggregate([ { 
//  	$lookup: {
//  		from: "package", localField: "Parent", foreignField:"PacID", as: "pac"} 
//  	},
//  	{
//         $unwind: "$pac"
//     },
//     $lookup: {
//  		from: "palatte", localField: "pac.Parent", foreignField:"PalID", as: "pal"} 
//  	},
//  	{
//         $unwind: "$pal"
//     },
//     $lookup: {
//  		from: "container", localField: "pal.Parent", foreignField:"CID", as: "con"} 
//  	}


//  	])

// db.prod.aggregate([{
//         $lookup: {
//            from: "package",
//            localField: "Parent",
//            foreignField: "PacID",
//            as: "pac"}
//     },
//     {
//         $unwind: "$pac"
//     },
//     {
//         $lookup: {
//             from: "palatte",
//             localField: "pac.Parent",
//             foreignField: "PalID",
//             as: "pal"
//         }
//     },
//     {
//         $unwind: "$pal"
//     },
//     {
//         $lookup: {
//             from: "container",
//             localField: "pal.Parent",
//             foreignField: "CID",
//             as: "con"
//         }
//     },
//     {
//         $unwind: "$pal"
//     }
// ])



// db.prod.aggregate([{
//         $lookup: {
//            from: "package",
//            localField: "Parent",
//            foreignField: "PacID",
//            as: "pac"}
//     },
//     {
//         $unwind: "$pac"
//     }])




// db.users.aggregate([

//     // Join with user_info table
//     {
//         $lookup:{
//             from: "userinfo",       // other table name
//             localField: "userId",   // name of users table field
//             foreignField: "userId", // name of userinfo table field
//             as: "user_info"         // alias for userinfo table
//         }
//     },
//     {   $unwind:"$user_info" },     // $unwind used for getting data in object or for one record only

//     // Join with user_role table
//     {
//         $lookup:{
//             from: "userrole", 
//             localField: "userId", 
//             foreignField: "userId",
//             as: "user_role"
//         }
//     },
//     {   $unwind:"$user_role" },

//     // define some conditions here 
//     {
//         $match:{
//             $and:[{"userName" : "admin"}]
//         }
//     },

//     // define which fields are you want to fetch
//     {   
//         $project:{
//             _id : 1,
//             email : 1,
//             userName : 1,
//             userPhone : "$user_info.phone",
//             role : "$user_role.role",
//         } 
//     }
// ]);

