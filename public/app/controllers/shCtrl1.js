
angular.module("shControllers", [])
.controller('shCtrl', function($http, $location,$routeParams, $scope,$timeout){
var app = this;
var i = $routeParams.id;
console.log(i);
$http.post('/api/sh',{i}).then(function(data){
				console.log('data'+ data);
				if(!data.data.success){
				 if (window.confirm('Sorry, the QR code is not mapped to any product')){
				 	window.location.href='/profile';
				 };
				}else{
                $scope.showdata = data.data.product;
            }
				
            });
        
	
});


