

angular.module("tControllers", ['userServices'])
.controller('tCtrl', function($scope, $http, $interval,User){
  var uPermission;
 


  
  $http.get('/api/tc').then(function(data1) {
    console.log("got the data");
    console.log(data1);
      User.getPermission().then(function(data) {
       console.log('permission here '+data.data.permission);
    if (data.data.permission === 'admin') {
        uPermission = true; // Set user's current permission to allow management
          console.log(uPermission);
      } else {
              uPermission = false;
                console.log(uPermission);
        }
  });
    
    // if(data1.data.success == false){
    //   if (window.confirm('Scanned Qr code is not mapped with any product. Click ok to mapp the product')) 
    //       {
    //             // window.location.href = '/input'+'?id='+ data1.data.da;
    //             if(uPermission == true){
    //               window.location.href = '/input'+'?id='+ data1.data.da;
    //             }else{
    //               window.location.href = '/profile';
    //             }
    //       };
    // }
        if(data1.data.success == false){
         if (uPermission === 'true'){
           if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to mapp the product')){
              window.location.href = '/input'+'?id='+ data1.data.da;
            }
          }else{
            if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to go back')){
            window.location.href = '/profile';
            }

          }
    }else{
  
    console.log('check here');
    $scope.ProID = data1.data.product.ProID;
    $scope.height = data1.data.product.height;
    $scope.weight = data1.data.product.weight;
    $scope.type = data1.data.product.type;
    $scope.id = data1.data.da;
  }
   });


});