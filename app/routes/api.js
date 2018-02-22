var User = require('../models/user');
var prod = require('../models/prod'); 
var Track = require('../models/track'); 
var mapp = require('../models/mapp'); 
var Scan = require('../models/scan');
var secret = 'harrypotter';
var jwt = require('jsonwebtoken'); 
var qr = require('qr-js');
var where = require('node-where');
var getmac = require('getmac');
var getmac = require('getmac');
const publicIp = require('public-ip');
var geolocate = require('ip-geolocate');
var JSZip = require('jszip');
var zip = new JSZip();
var myIP = require('my-ip');


var loginTime, mac, mip,latitude, longitude, pusername,ma,da,ma1,Parent ;

module.exports = function(router){
	router.post('/users', function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email; 
		user.Regdate = new Date(Date.now());
   		user.Expdate =  new Date(Date.now() +(7*24*60*60*1000));
    	user.QRGenerated = 0;
        user.QRRemain = 100;
        user.paid = false;
		if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '') {
	            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
	        } else {
	        	user.save(function(err){
					if(err){
						 res.json({ success: false, message: 'already exixts' });
					}else{
						res.json({ success: true, message: 'Account registered! Please check your e-mail for activation link.' });
					}
				});
	        }
	});



	router.post('/authenticate', function(req, res) {
		User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
			if (err) throw err;
			if(!user){
				res.json({ success: false, message: 'authen failedd' });
			}else if(user){
				if(req.body.password) {
					var validPassword = user.comparePassword(req.body.password);
				}else{
					res.json({ success: false, message: 'passwordd nt provoded' });
				}
				if(!validPassword){
					res.json({ success: false, message: 'could nt authenticate' });
				}else{
					var token = jwt.sign({ username: user.username, email: user.email, regDate: user.Regdate }, secret, { expiresIn: '24h' }); // Logged in: Give user token
                    res.json({ success: true, message: 'User authenticated!', token: token });
				}
			}		
		});
	});

	router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token']; 
        // console.log(myIP());// return external IPv4
		if (token) {
            // Function to verify token
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' }); 
                } else {
                    req.decoded = decoded; 
                    //console.log(decoded);
                    pusername = decoded.username;
                   // console.log('pusername' + pusername);
                       	loginTime = new Date(Date.now());
				    	require('getmac').getMac(function(err,macAddress1){
				            if (err)  throw err
				            mac   = macAddress1;
				        //console.log('mac' + mac );
				        });
				 
						// publicIp.v4().then(ip => {
				  //       	mip = myIP('IPv6',true);
				  //       	geolocate.getLocation(mip, function(err, location) {
					 //    		if(err){
					 //    			console.log(err);
					 //    		}else {
					 //    			latitude = location.latitude;
					 //    			longitude = location.longitude ; 
					 //    			//console.log(location.latitude+""+ location.longitude );
					 //    		}
						// 	});
				  //       });
          publicIp.v4().then(ip => {
          mipp = ip;
          where.is(ip, function(err, result) {
            if (result) {
              latitude=result.get('lat');
              longitude=result.get('lng');
              }
          });
        });
                    next(); 
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });  
        }
    });

  //   router.use(function(req,res, next){
  //   	loginTime = new Date(Date.now());
  //   	require('getmac').getMac(function(err,macAddress1){
  //           if (err)  throw err
  //           mac   = macAddress1;
  //       console.log('mac' + mac );
  //       });
 
		// publicIp.v4().then(ip => {
  //       	mip = ip;
  //       	geolocate.getLocation(ip, function(err, location) {
	 //    		if(err){
	 //    			console.log(err);
	 //    		}else {
	 //    			latitude = location.latitude;
	 //    			longitude = location.longitude ; 
	 //    			console.log(location.latitude+""+ location.longitude );
	 //    		}
		// 	});
  //       });
  //   });
    
    router.post('/me', function(req, res) {
        res.send(req.decoded);  
    });

    router.get('/permission', function(req, res){
    	User.findOne({username: req.decoded.username}, function(err,user){
    		if(err) throw err;
    		if(!user){
    			res.json({success:false, message:'no user was found'});
    		} else{
    			res.json({success:true, permission: user.permission});
    		}
    	});
    });


    router.post('/gqr', function(req, res){
   		console.log('inside gqr');
     	var n = 10;
      	console.log('number ' +n );
	  	User.findOne({username: req.decoded.username}).exec(function(err, user){
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
		      }
				created = created + 10;
	    		rem = rem-10;   
				User.findOneAndUpdate({username: req.decoded.username}, {$set:{QRGenerated:created , QRRemain:rem }},function(err, doc){
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
	    User.findOne({username: req.decoded.username}).exec(function(err, user){
		   	rem1 = user.QRRemain;
		    exp = user.Expdate;
		    exp.setDate(exp.getDate()+30);
			console.log(exp);
		    console.log('remaning in pay ' + rem1 );
		    rem1 = rem1 + 100; 
		    console.log('remaning after payment is done ' + rem1 );
			User.findOneAndUpdate({username: req.decoded.username}, {$set:{paid:'true', QRRemain:rem1, Expdate:exp}},function(err, doc){
		   		if(err){
		      		res.json({success: false, message: "Something wrong during payment"});
		        	console.log("Something wrong when updating QRGenerated and QRRemain in DB!");
		    	}else{
		       		res.json({success: true, message: "Payment done"});
		      		console.log("successfully updated qr count +100");
		    	}
		    });
		});
	});


	 router.post('/sc', function(req, res) {     
     var j = req.body.i;
     console.log('value of J: '+j);
     var scan = new Scan();
     scan.QID = req.body.i;
     scan.LoggedIn = new Date(Date.now()); 
     scan.DeviceId   = mac ;
	 var tracknew = new Track();
     tracknew.QID = req.body.i;
     tracknew.uname = req.decoded.username;
     tracknew.LoggedIn = loginTime;
     tracknew.UserLat = latitude;
     tracknew.UserLong = longitude;
     tracknew.DeviceId = mac;
     tracknew.DeviceGeo = mipp;
     tracknew.save(function(err){
        if(err){
            	console.log(err);
        }else{
               console.log('saved');
               scan.save(function(err){
            	if(err){
            		console.log('error');
                }else{
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



            }
        });

 });

// 	 router.get('/tc', function(req, res) {
//     if(ma == null){
//       console.log('in tc null');
//       res.json({success: false, message:'ID not present', da });
//     }else
//     { 
//       prod.findOne({ ProID: ma }, function(error, product) {
//         if(error){
//          console.log('error getting data');
//         }else{
//          //res.send(product);
//          res.json({da,product});
//         }
//       });
//     }
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


    router.post('/sh',function(req,res){

    var prQid = req.body.i;
		Track.find({QID:prQid},function(error, product) { 
  		if(error){
         	console.log('error getting data');
        }else{
        	if(product.length>0){
        		   res.json({success:true,product});
        	}else{
        		res.json({success:false});
        	}
         //res.send(product);
         
        }
    });

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

   router.get('/tc1', function(req, res) {
    if(ma == null){
      console.log('in tc1 null');
      res.json({success: false, message:'ID not present' });
    }else{ 
        prod.findOne({ProID: ma}).select("Parent").exec(function(err,n){
     if(err){
        console.log('error getting data');
      }else{
        //da = data. 
        console.log('in prod');
        console.log(n.Parent);
          ma1 = n.Parent;
          Parent=ma1;
    prod.aggregate([ { 
  $lookup: {
    from: "package", localField: "Parent", foreignField:"PacID", as: "pac"} 
  },
  {
        $unwind: "$pac"
    },
    {
    $lookup: {
    from: "palatte", localField: "pac.Parent", foreignField:"PalID", as: "pal"} 
  },
  {
        $unwind: "$pal" 
    },
    {
    $lookup: {
    from: "container", localField: "pal.Parent", foreignField:"CID", as: "con"} 
  },
   {
        $unwind: "$con"
    }


  ]).exec(function(err, book) {
            if (err) {
                res.send(err); 
            } else {
                console.log('vook here');
                console.log(book);
              res.send(book);
              //console.log(book[0].docs[0]["bookTitle"]);
            }
        });
        

      }
  });
}
    });





	return router;

}

//      router.get('/tc', function(req, res) {
//     if(ma == null){
//       console.log('in tc null');
//       res.json({success: false, message:'ID not present', da });
//     }else
//     { 
//       prod.findOne({ ProID: ma }, function(error, product) {
//         if(error){
//          console.log('error getting data');
//         }else{
//          //res.send(product);
//          res.json({da,product});
//         }
//       });
//     }
// });


