angular.module("bpController", [])

.controller('bpCtrl',function($http){

    var app = this;

    app.gen = function(){
    console.log('in batpay gen func');
    $http.post('/api/gqr').then(function(data){
        console.log('batch generation of qr done');
        if(data.data.success){
            alert(data.data.message);

        }
        else{
            alert(data.data.message);
        }

        });
    };

    app.pay = function(){
    console.log('in batpay pay func');
    $http.post('/api/pay').then(function(data){
        if(data.data.success){
            alert(data.data.message);

        }
        else{
            alert(data.data.message);
        }
        console.log('payment done');
        });
    };
    

});
 