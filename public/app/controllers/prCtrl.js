
angular.module('prController',[])

.controller('prCtrl',function($http,$scope,$location,User){

     let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

       
        console.log('inside scanner controler');
       
        scanner.addListener('scan', function (id) {
          var i = id;
          console.log('id:'+i);
        $http.post('/api/sh',{i}).then(function(data){
            //console.log('data'+ data.data.product);
            if(!data.data.success){
               if (window.confirm('Sorry, the QR code is not mapped to any product')){
                 window.location.href='/profile';
               };
            }else{
                
          window.location.href='/sh'+'?id='+i;
            }
        
            });

      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.log('No cameras found.');
        }
      }).catch(function (e) {
        console.log(e);
      });
                    
    

  });


 


    //          if(!data.data.success){
    //           User.getPermission().then(function(data) {

    //           });
    //         }else
    //            if (window.confirm('Sorry, the QR code is not mapped to any product')){
    //              window.location.href='/profile';
    //            };
    //         }else{
                
    //       window.location.href='/sh'+'?id='+i;
    //         }




    //             if(data1.data.success == false){
    //   User.getPermission().then(function(data) {
    //     if (data.data.permission === 'admin') {
    //       if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to mapp the product')){
    //           window.location.href = '/input'+'?id='+ data1.data.da;
    //       }
    //     }else{
    //         if(window.confirm('Scanned Qr code is not mapped with any product. Click ok to go back')){
    //            window.location.href = '/profile';
    //         }
    //     }

    //   });
    // }else{
    //       console.log('check here');
    //       $scope.ProID = data1.data.product.ProID;
    //        $scope.height = data1.data.product.height;
    //      $scope.weight = data1.data.product.weight;
    //      $scope.type = data1.data.product.type;
    //      $scope.id = data1.data.da;
    //     }