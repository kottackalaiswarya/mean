var User = require('../models/user');
var  prod = require('../models/prod'); 
var  Track = require('../models/track'); 
var mapp = require('../models/mapp'); 
var Scan = require('../models/scan'); 
//var Machine = require('../models/machine');
var jwt   = require('jsonwebtoken');
var secret = 'cryptography'
var request = require('request');
var qr = require('qr-js');

var puname = 'null';
var ma, ma1;
module.exports = function(router) {
var previous=0;

var mypubip;
var where = require('node-where');
var getmac = require('getmac');
var macAddress;
var lat;
var lng;
const publicIp = require('public-ip');
 // var m;
 //  var la;
 //  var ln;
 //  var mip;

var loginTime;
    var mc;
         var mipp;
         var lang;
         var long;

var imgData = require('images');
//var zip = new JSZip();
 // var zip = require('jszip');
var JSZip = require('jszip');
var zip = new JSZip();
var blob = require('blob');

 require('getmac').getMac(function(err,macAddress1){
             if (err)  throw err
              mc = macAddress1;
            });
 
          publicIp.v4().then(ip => {
          mipp = ip;
          where.is(ip, function(err, result) {
            if (result) {
              lang=result.get('lat');
              long=result.get('lng');
              }
          });
        });

console.log(mipp+" "+ lang);

 router.post('/register', function(req, res) {
        var user = new User(); 
        user.email    = req.body.email;
    user.password   = req.body.pass;
    user.username = req.body.uname;
    user.Regdate = new Date(Date.now());
    user.Expdate =  new Date(Date.now() +(7*24*60*60*1000));
    user.QRGenerated = 0;
        user.QRRemain = 100;
        user.paid = false;
 if(req.body.email == null || req.body.email == "" || req.body.pass == null || req.body.pass == "" || req.body.uname == null || req.body.uname == "")  {
            
            res.json({success: false, message:'Provide User name /Email ' })
        }else{
            // Save new user to database
        user.save(function(err){
            if(err){
                res.json({success: false, message:"User name /Email already exits"});
                        } 
                         else{
                res.json({success: true , message:'user created'});
            }
        });
    }
    
    });


router.post('/authenticate', function(req,res){
  puname = req.body.uname;
  loginTime = new Date(Date.now());
   require('getmac').getMac(function(err,macAddress1){
             if (err)  throw err
              mc = macAddress1;
            });
 
          publicIp.v4().then(ip => {
          mipp = ip;
          where.is(ip, function(err, result) {
            if (result) {
              lang=result.get('lat');
              long=result.get('lng');
              }
          });
        });
      

  User.findOne({username: req.body.uname}).select(" username password").exec(function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "could not authenticate User"});

    }
    else if(user){
      if(req.body.pass)
      {
        var validPassword = user.comparePassword(req.body.pass);

      }
      else{
             res.json({success: false, message: "no password provided"});
 
      }
      if(!validPassword){
      res.json({success: false, message: "could not authenticate password"});

    } else{
     var token =  jwt.sign({username: user.username},secret, {expiresIn: '24h'});
      res.json({success: true, message: " authenticated password", token: token});
    }
    }
  });
});


  router.use(function(req,res,next){

  var token = req.body.token || req.body.query || req.headers['x-access-token'];
  if(token){
    //verify token

    jwt.verify(token, secret, function(err, decoded) {
      if(err) {
        res.json({success: false, message:"Toke Invalid"});
      }
        else{
            req.decoded = decoded;
            next();
        }
});

  }
  else{
    res.json({succes: false, message: "No Token Provided"});
  }

  });



  router.post('/me', function(req, res){
    res.send(req.decoded);

  });




 router.post('/gqr', function(req, res){
   console.log('inside gqr');
     var n = 10;
      console.log('number ' +n );

  User.findOne({username: puname}).exec(function(err, user){
    var curr_date = Date.now();
    var f_date = user.Expdate;
    var created = user.QRGenerated;
    var rem = user.QRRemain;
    console.log('current date ' +curr_date );
    console.log('fetched date '+f_date);
    console.log('qr remaining ' + rem );
    var t=10;
    var img = zip.folder("images");

    if((curr_date<=f_date) && (rem>0)){

      for(var i = (created+1); i<=(created+t); i++){
        qr.saveSync('i', '/home/kottackal/Desktop/QRCODES/'+i+'.png'); 
      // qr.saveSync('i', i+'.png'); 
      // img.file((qr.saveSync('i', i+'.png')), imgData, {binary: true});
     
        
      }

//   zip.generateAsync({type:"blob"})
// .then(function(content) {
//     // see FileSaver.js
//     saveAs(content, "example.zip");
// });
// var promise
// if (JSZip.support.uint8array) {
//   promise = zip.generateAsync({type : "uint8array"});
// } else {
//   promise = zip.generateAsync({type : "string"});
// }
// if (JSZip.support.uint8array) {
//   zip.file("hello.txt").async("uint8array").then(function (data) {
//     // data is Uint8Array { 0=72, 1=101, 2=108, more...}
//   });
// }

 
// zip.generateAsync({type:"blob"}).then(function(content) {
//     // see FileSaver.js
//     saveAs(content, "example.zip");
// });








    created = created + 10;
    rem = rem-10;

///////////////////
 
   
User.findOneAndUpdate({username: puname}, {$set:{QRGenerated:created , QRRemain:rem }},function(err, doc){
  if(err) throw err;
    if(err){
      res.json({success: false, message: "Something wrong when updating QRGenerated and QRRemain in DB"});
        console.log("Something wrong when updating QRGenerated and QRRemain in DB!");
    }else{
       res.json({success: true, message: "successfully generated a batch of 10 qrcodes"});
      console.log("successfully generated a batch of 10 qrcodes");
    }

    
});

}else{
   res.json({success: false, message: "u have generated 100 qrcodes"});
      console.log('u have generated 100 qrcodes');
    }

  });

    
  });




   router.post('/pay', function(req, res){
    var rem1;
    var exp, exp1;
    User.findOne({username: puname}).exec(function(err, user){
   // dt.setDate(dt.getDate() + 5);
    rem1 = user.QRRemain;
    exp = user.Expdate;
    exp.setDate(exp.getDate()+30);
console.log(exp);
    console.log('remaning in pay ' + rem1 );
    rem1 = rem1 + 100; 
    console.log('remaning after payment is done ' + rem1 );


 User.findOneAndUpdate({username: puname}, {$set:{paid:'true', QRRemain:rem1, Expdate:exp}},function(err, doc){
   if(err) throw err;
    if(err){
      res.json({success: false, message: "Something wrong during payment"});
        console.log("Something wrong when updating QRGenerated and QRRemain in DB!");
    }else{
       res.json({success: true, message: "Payment done"});
      console.log("successfully generated a batch of 10 qrcodes");
    }

    
    
  });


    });
    
    /////////////////////////////////
   
////////////////    

  });
// '/edit/:id'
//route for getting prodct details from qrcode scanner ID  
  //  router.get('/track/:id',function(req,res){

  //   var PID = req.params.id;
  //   console.log('fetched PID:  '+PID);
  // });

//route for getting device details for trackschema 
 // router.get('/g/:id',function(req,res){

 //    var PID = req.params.id;
 //    console.log('fetched PID:  '+PID);
 //  });


 router.post('/sc', function(req, res) {
     
     var j = req.body.i;
     console.log('value of J: '+j);
      var scan = new Scan();
       scan.QID = req.body.i;
       scan.LoggedIn = new Date(Date.now()); 
      scan.DeviceId   = mc ;



    var tracknew = new Track();
    tracknew.QID = req.body.i;
    tracknew.uname = puname;
    tracknew.LoggedIn = loginTime;
    tracknew.UserLat = lang;
    tracknew.UserLong = long;
    tracknew.DeviceId = mc;
    tracknew.DeviceGeo = mipp;
    tracknew.save(function(err){
            if(err){
                console.log(err);
                        } 
                         else{
                         console.log('saved');
                         scan.save(function(err){
            if(err){
              // res.json({success: false, message:"unable to save"});
                 console.log('error');
                        } 
                         else{

                          Scan.find().limit(1).sort({$natural:-1}).exec(function(err, data){
                if(err){
                       console.log('error getting data');
                  }else{
        //da = data. 
        console.log('in scan');
        console.log(data);
        //console.log('verde');
        console.log(data[0].QID)
        // console.log(data[0].QID);
         da = data[0].QID;
         console.log('da: '+ da);
        //res.send(data);

mapp.findOne({QID: da}).exec(function(err,data){
     if(err){
        console.log('error getting data');
      }else{
        //da = data. 
        console.log('in mapp');
                console.log(data);
                if(data == null){
                  ma = null;
                  //res.json({success: false , message:'both data saved but mapping not present'});

                }
                else{
        console.log('verude pid');

        console.log(data.PID);
        ma = data.PID;
      }
     }
  });

  }
    });
              res.json({success: true , message:'both data saved '});
                console.log('saved');
            }
        });
                // res.json({success: true , message:'mapping of QR code to ID done'});


            }
        });

//       scan.save(function(err){
//             if(err){
//               // res.json({success: false, message:"unable to save"});
//                  console.log('error');
//                         } 
//                          else{

//                           Scan.find().limit(1).sort({$natural:-1}).exec(function(err, data){
//                 if(err){
//                        console.log('error getting data');
//                   }else{
//         //da = data. 
//         console.log('in scan');
//         console.log(data);
//         //console.log('verde');
//         console.log(data[0].QID)
//         // console.log(data[0].QID);
//          da = data[0].QID;
//          console.log('da: '+ da);
//         //res.send(data);

// mapp.findOne({QID: da}).exec(function(err,data){
//      if(err){
//         console.log('error getting data');
//       }else{
//         //da = data. 
//         console.log('in mapp');
//                 console.log(data);
//                 if(data == null){
//                   ma = null;
//                   //res.json({success: false , message:'both data saved but mapping not present'});

//                 }
//                 else{
//         console.log('verude pid');

//         console.log(data.PID);
//         ma = data.PID;
//       }
//      }
//   });

//   }
//     });
//               res.json({success: true , message:'both data saved '});
//                 console.log('saved');
//             }
//         });
 });

router.get('/tc', function(req, res) {
    if(ma == null){
      console.log('in tc null');
      res.json({success: false, message:'ID not present', da });
    }else
    { 
      prod.findOne({ ProID: ma }, function(error, product) {
        if(error){
         console.log('error getting data');
        }else{
         //res.send(product);
         res.json({da,product});
        }
      });
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////
//    router.get('/showaggr', function(req, res) {
//     if(ma == null){
//       console.log('in tc null');
//       res.json({success: false, message:'ID not present', da });
//     }
// //////////////here///////////////
// else{ prod.findOne({ProID: ma}).select("Parent").exec(function(err,n){
//      if(err){
//         console.log('error getting data');
//       }else{


//         // console.log('in prod');
//         // prod.findOne({ id : req.params.id }, function(error, user) { 
//         // });
        
//         console.log('in prod');
//                 console.log(n.Parent);
//           ma1 = n.Parent;
//         var Parent=ma1;
//     prod.aggregate([ { 
//   $lookup: {
//     from: "package", localField: Parent, foreignField:"P", as: "pac"} 
//   },
//   {
//         $unwind: "$pac"
//     },
//     {
//     $lookup: {
//     from: "palatte", localField: "pac.Parent", foreignField:"PalID", as: "pal"} 
//   },
//   {
//         $unwind: "$pal"
//     },
//     {
//     $lookup: {
//     from: "container", localField: "pal.Parent", foreignField:"CID", as: "con"} 
//   },
//    {
//         $unwind: "$con"
//     }


//   ]).exec(function(err, book) {
//             if (err) {
//                 res.send(err); 
//             } else {
//               res.send(book);
//               //console.log(book[0].docs[0]["bookTitle"]);
//             }
//         });
        

//       }
//   });
// }
//     });
//////////////here//////////////////////////////////////////////////////////////////////////

    //      prod.aggregate([ { $lookup: {from: "package", localField: "Parent", foreignField:"PacID", as: "pac"} }]).exec(function(err, book) {
    //         if (err) {
    //             res.send(err); 
    //         } else {
    //           res.send(book);
    //           //console.log(book[0].docs[0]["bookTitle"]);
    //         }
    //     });
    // });

   

 // prod.aggregate([ { $lookup: {from: "package", localField: "Parent", foreignField:"PacID", as: "pac"}},
 //    {
 //        $unwind: "$pac"
 //    },
 //    {
 //        $lookup: {
 //            from: "palatte",
 //            localField: "pac.Parent",
 //            foreignField: "PalID",
 //            as: "pal"
 //        }
 //    },
 //    {
 //        $unwind: "$pal"
 //    },
 //    {
 //        $lookup: {
 //            from: "container",
 //            localField: "pal.Parent",
 //            foreignField: "CID",
 //            as: "con"
 //        }
 //    } ]).exec(function(err, book) {
 //            if (err) {
 //                res.send(err); 
 //            } else {
 //              res.send(book);
 //              //console.log(book[0].docs[0]["bookTitle"]);
 //            }
        


        // });




//     Product.aggregate([{
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
// ]).exec(function(err, book) {
//             if (err) {
//                 res.send(err); 
//             } else {
//               res.send(book);
//               //console.log(book[0].docs[0]["bookTitle"]);
//             }
//         });
    // });



    //    prod.aggregate([ { $lookup: {from: "books", localField: "bookISBN", foreignField:"ISBN", as: "docs"} }]).exec(function(err, book) {
    //         if (err) {
    //             res.send(err); 
    //         } else {
    //           res.send(book);
    //           //console.log(book[0].docs[0]["bookTitle"]);
    //         }
    //     });
    // });

 router.post('/ip', function(req, res) {
        var mapp1 = new mapp(); 
        mapp1.PID    = req.body.pid;
    mapp1.QID   = req.body.qid;
   
 if(req.body.pid == null || req.body.pid == "")  {
            
            res.json({success: false, message:'Provide  qid /pid ' })
        }else{
            // Save new user to database
        mapp1.save(function(err){
            if(err){
                res.json({success: false, message:"mapping already exits"});
                        } 
                         else{
                res.json({success: true , message:'mapping of QR code to ID done'});
            }
        });
    }
    
    });
  // router.post('/pr', function(req, res) {
        
    
  //   });

   router.post('/sh',function(req,res){

    var prQid = req.body.i;

    // var track1 = new Track();
    // track1.QID = req.body.i;
    // track1.uname = uname
    // track1.LoggedIn = loginTime;
    // track1.UserLat = lang;
    // track1.UserLong = long;
    // track1.DeviceId = mc;
    // track1.DeviceGeo = mipp;
    // track1.save(function(err){
    //         if(err){
    //             console.log(err);
    //                     } 
    //                      else{

    //             // res.json({success: true , message:'mapping of QR code to ID done'});


    //         }
    //     });

Track.find({QID:prQid},function(error, product) { 
  if(error){
         console.log('error getting data');
        }else{
         //res.send(product);
         res.json({product});
        }

});




  });


    return router;

}

