angular.module('mainController', ['authServices', 'userServices'])

// Controller: mainCtrl is used to handle login and main index functions (stuff that should run on every page)  
.controller('mainCtrl', function(Auth, $timeout, $location,$rootScope,User) {
	var app = this;
    //EVERYTIME WE LOGOUT, WE TRY TO REFRESH THE PAGE AUTOMATICALLY AND CHECK FOR THE USERNAME AND WE DNT NEED TO REFRESH IT
    // ant time a new view is loaded it refresh automatically for the username to fetched vorr displayed on tyhe fromnt end
    app.loadme = false;
    $rootScope.$on('$routeChangeStart', function(){
            if(Auth.isLoggedIn()){
            // console.log('success:user logged in');
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                //GET TOKEN DATA FROM HERE
                // console.log(data);
                // console.log(data.data.username);
                app.username = data.data.username;
                app.useremail = data.data.email;

                User.getPermission().then(function(data) {
                    // console.log(data);
                        if (data.data.permission === 'admin' || data.data.permission === 'moderator') {
                            app.authorized = true; // Set user's current permission to allow management
                            app.loadme = true; // Show main HTML now that data is obtained in AngularJS
                        } else {
                            app.authorized = false;
                            app.loadme = true; // Show main HTML now that data is obtained in AngularJS
                        }
                    });               
            }); 
        }else{
            // console.log('user faliure not logged in ');
            app.isLoggedIn = false;
            app.username = '';
            app.loadme = true;
        }
    });
 
    // Custom function that registers the user in the database      
    this.doLogin = function(loginData) {
        app.loading = true;
        app.errorMsg = false; 
        Auth.login(app.loginData).then(function(data){
      //$http.post('/api/users',this.regData).then(function(data){
            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message;
                 $timeout(function() {
                        $location.path('/profile');
                        app.loginData = '';
                        app.successMsg = false;
                    }, 2000);

            }else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };

    this.logout = function(){
    	Auth.logout();
    	$location.path('/logout');
    	$timeout(function(){
    		$location.path('/');
    			},2000);
    	};
   
});