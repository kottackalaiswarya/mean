angular.module('userServices', [])

.factory('User', function($http) {
    var userFactory = {}; // Create the userFactory object

    // Register users in database
    userFactory.create = function(regData) {
        return $http.post('/api/users', regData);
    };

    userFactory.getPermission = function(){
    	  return $http.get('/api/permission')
    };

    return userFactory; // Return userFactory object
});
