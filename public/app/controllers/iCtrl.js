


angular.module("iControllers", [])
.controller('iCtrl', function($http, $location,$routeParams, $scope,$timeout){
	var app = this;

// app.get('/api/:tagId', function(req, res) {
//   console.log("tagId is set to " + req.params.tagId);
// });
// $http.get('/api/g/:id').then(function(data){
//     console.log(data);
// });
var id = $routeParams.id;
console.log('check here:'+ id);
$scope.qid = $routeParams.id;

     
 this.regUser = function(regData) {
     
        app.loading = true; // Activate bootstrap loading icon
        app.errorMsg = false;

		console.log('Form Submitted');
        console.log(this.regData);
        this.regData.qid = $routeParams.id;


				$http.post('/api/ip',this.regData).then(function(data){
				console.log(data.data.success);
				console.log(data.data.message);
				                if (data.data.success) {
                    app.loading = false; // Stop bootstrap loading icon
                     // Set class for message
                    app.successMsg = data.data.message + '...Redirecting'; // If successful, grab message from JSON object and redirect to login page
                    // Redirect after 2000 milliseconds (2 seconds)
                    $timeout(function() {
                       // $location.path('/mapshow'+'?id='+ data1.data.da);
                       $location.path('/profile');
                    }, 2000);
                } else {
                    app.loading = false; app.disabled = false; // If error occurs, remove disable lock from form
                   
                    app.errorMsg = data.data.message; // If not successful, grab message from JSON object
                }
            });
        } ;
	
});


