angular.module('userControllers', ['userServices'])

// Controller: regCtrl is used for users to register an account
// , $location, $timeout, User, $scope
.controller('regCtrl', function($http,$location,$timeout,User) {

    var app = this;

    // Custom function that registers the user in the database      
    this.regUser = function(regData) {
        app.loading = true;
        app.errorMsg = false; 
        User.create(app.regData).then(function(data){
      //$http.post('/api/users',this.regData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message;
                 $timeout(function() {
                        $location.path('/');
                    }, 2000);

            }else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };
});
