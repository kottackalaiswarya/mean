angular.module('trackController',[])

.controller('trackCtrl',function($timeout,  $location){
	var app = this;
  
  app.ptracker = function(){
     $timeout(function() {
                        $location.path('/ptracker');
                    }, 2000);
  }; 
 
  app.agg = function(){
     $timeout(function() {
                        $location.path('/agg');
                    }, 2000);
  }; 
}); 