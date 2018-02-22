// console.log('testing');
var app = angular.module('appRoutes', ['ngRoute'])


.config(function($routeProvider, $locationProvider) {

   $routeProvider

                
    // .when('/', {
    //     templateUrl: 'app/views/pages/home.html'
    // })

    .when('/about', {
        templateUrl: 'app/views/pages/about.html'
    })

    .when('/register', {
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register',
        authenticated: false
    })
 
    // .when('/login', {
    //     templateUrl: 'app/views/pages/users/login.html',
    //     authenticated: false
    // })

     .when('/', {
        templateUrl: 'app/views/pages/users/login.html',
        authenticated: false
    })

    .when('/logout', {
        templateUrl: 'app/views/pages/users/logout.html',
        authenticated: true
    })

    .when('/profile', {
        templateUrl: 'app/views/pages/users/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'profile',
        authenticated: true
    })

    .when('/management', {
        templateUrl: 'app/views/pages/management/management.html',
        controller: 'managementCtrl',
        controllerAs: 'management',
        authenticated: true,
        permission: ['admin', 'moderator', 'user']
    })

    .when('/tracker',{
        templateUrl:'app/views/pages/users/track.html',
        controller: 'trackCtrl',
        controllerAs: 'track',
        authenticated: true
    })

    .when('/batpay',{
        templateUrl:'app/views/pages/users/qrcode.html',
        controller: 'bpCtrl',
        controllerAs: 'bp',
        authenticated: true

    })
        .when('/view',{
        templateUrl:'app/views/pages/users/view.html',
        controller: 'tCtrl',
        controllerAs: 'tc',
        authenticated: true

    })
        .when('/input',{
        templateUrl:'app/views/pages/users/input.html',
        controller: 'iCtrl',
        controllerAs: 'ip',
        authenticated: true

    })
     
    .when('/qrc',{
        templateUrl:'app/views/pages/users/qr.html',
        controller: 'gQRCtrl',
        controllerAs: 'gqr',
        authenticated: true
    })
.when('/sh',{
        templateUrl:'app/views/pages/users/sh.html',
        controller: 'shCtrl',
        controllerAs: 'sh',
        authenticated: true
    })
    
    
    .when('/scr',{

        templateUrl: 'app/views/pages/users/scanner.html',
        controller: 'scCtrl',
        controllerAs: 'sc',
        authenticated: true
    })
        .when('/agg',{
        templateUrl:'app/views/pages/users/aggscan.html',
        controller: 'aggCtrl',
        controllerAs: 'aggr',
        authenticated: true 
    })
        .when('/showagg',{
        templateUrl:'app/views/pages/users/showaggscan.html',
        controller: 'showaggCtrl',
        controllerAs: 'tc1',
        authenticated: true
    })

        .when('/ptracker',{
        templateUrl:'app/views/pages/users/prdscan.html',
        controller: 'prCtrl',
        controllerAs: 'prt',
        authenticated: true
    }) 
    .when('/energy',{
        templateUrl:'app/views/pages/energy.html',
        controller: 'energyCtrl',
        controllerAs: 'energy'
    })


    .when('/management',{
        templateUrl : 'app/views/pages/medit.html',
        controller :'managementCtrl',
        controllerAs:'management',
        authenticated : true,
        permission: true

    })
    // .when('/prshow',{

 //        templateUrl: 'app/views/pages/prshow.html',
 //        controller: 'prshowCtrl',
 //        controllerAs: 'prshow'
 //    })


    // .when('/track/:id',{
    //     templateUrl : 'app/views/pages/track.html',
    //     controller: 'trCtrl',
    //     controllerAs: 'track'

    // })


    .otherwise({ redirectTo: '/' }); // If user tries to access any other route, redirect to home page

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)

});


app.run(['$rootScope','Auth','$location','User', function($rootScope, Auth, $location, User){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
            console.log(Auth.isLoggedIn());
            if(next.$$route.authenticated == true){
                console.log('needs to be authenticated');
                if(!Auth.isLoggedIn()){
                   event.preventDefault(); 
                   $location.path('/');
                } else if(next.$$route.permission){
                   User.getPermission().then(function(data) {
                        // Check if user's permission matches at least one in the array
                        if (next.$$route.permission[0] !== data.data.permission) {
                            if (next.$$route.permission[1] !== data.data.permission) {
                                // if(next.$$route.permission[2] !== data.data.permission){
                                event.preventDefault(); // If at least one role does not match, prevent accessing route
                                $location.path('/'); // Redirect to home instead
                           // }
                            }
                        }
                    });
                }
            }else if(next.$$route.authenticated == false){
                console.log('does not needs to be authenticated');
                if(Auth.isLoggedIn()){
                   event.preventDefault(); 
                   $location.path('/profile');
                }
            }else{
                console.log('authentication does nt matter');
            }
            //console.log(next.$$route.authenticated);

    });
}]);

