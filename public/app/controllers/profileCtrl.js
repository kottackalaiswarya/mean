angular.module('profileController',[])

.controller('profileCtrl',function($http,$location, $timeout){

  var app = this;
  
    app.scan = function(){
       $timeout(function() {
                          $location.path('/scr');
                      }, 2000);
    }; 

   app.batpay = function(){
       $timeout(function() {
                          $location.path('/batpay');
                      }, 2000);
    }; 

   app.view = function(){
       $timeout(function() {
                          $location.path('/tracker');
                      }, 2000);
    };  

});






  