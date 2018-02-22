

// angular.module("tControllers", ['userServices'])
// .controller('tCtrl', function($scope, $http, $interval,User){
//   $http.get('/api/tc').then(function(data1) {
//     console.log("got the data");
//     console.log(data1);
//     if(data1.data.success == false){
//       User.getPermission().then(function(data) {
//         if (data.data.permission === 'admin') {
//           if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to mapp the product')){
//               window.location.href = '/input'+'?id='+ data1.data.da;
//           }
//         }else{
//             if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to go back')){
//                window.location.href = '/profile';
//             }
//         }

//       });
//     }else{
//           console.log('check here');
//           $scope.ProID = data1.data.product.ProID;
//            $scope.height = data1.data.product.height;
//          $scope.weight = data1.data.product.weight;
//          $scope.type = data1.data.product.type;
//          $scope.id = data1.data.da;
//         }

//    });


// });





angular.module("tControllers", ['userServices'])
.controller('tCtrl', function($scope, $http, $interval,User){
  $http.get('/api/tc').then(function(data1) {
    console.log("got the data");
    console.log(data1);
         if(data1.data.product == null){
              User.getPermission().then(function(data) {
        if (data.data.permission === 'admin') {
          if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to mapp the product')){
              window.location.href = '/input'+'?id='+ data1.data.da;
          }
        }else{
            if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to go back')){
               window.location.href = '/profile';
            }
        }

      });
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


 
