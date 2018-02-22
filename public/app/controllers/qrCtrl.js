// angular.module("genQRController", [])

// .controller('gQRCtrl',function($http, $scope){
// 	var app = this;

// this.regUser = function(regData) {
//      	console.log('Data submitted to api gqr waiting for response');

// 				$http.get('/api/gqr', this.regData).then(function(data){
// 					console.log('trying');
				
//             });
//         } ;
// });
 
//   $http.get('/api/gqr').then(function(data) {
//   	console.log(data);
//   	 $scope.qrcodeString1= data.data;
    
//   });
// });





angular.module("genQRController", [])

.controller('gQRCtrl',function($http){
    
        console.log('Data submitted to api gqr waiting for response');
        console.log('after app');

        this.regUser = function(Data){
            console.log(this.Data);
             console.log('after app.regUser');
            $http.post('/api/gqr', this.regData).then(function(data){
                 console.log('inside httpget');
                console.log('trying');
            });
        }

});
 



// angular.module('bookControllers',[])     //add this in app.js file for the dependency

//     .controller('addCtrl',function($http){    //add this controller in routes.js under addbook.html 
        
//         this.addBook = function(bdata){        // function which is used in form tag invoked when we click on the add book button 
//             console.log('book added');
//             console.log(this.bdata);
//             //now we needto connect to back end to save this data into our db....we hav that in api.js
//             //we use http.post for this
//              $http.post('/api/books',this.bdata).then(function(data){
//                 console.log(data);
//              });      //router.post('/books',function(req,res){    from api.js
            
//         };
//     });
