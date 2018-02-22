angular.module('aggController',[])

.controller('aggCtrl',function($http,$scope,$location){

     let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

       
        console.log('inside scanner controler');
       
        scanner.addListener('scan', function (id) {
          var i = id;
          console.log('id:'+i);
        $http.post('/api/sc',{i}).then(function(data){
          if(data.data.success){
            if (window.confirm('Click Ok to get the hierarchy')) 
          {
                //window.location.href='/showagg'+'?'+i;
                window.location.href='/showagg';
         
          };

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








