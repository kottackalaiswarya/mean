angular.module('userApp', ['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','managementController','profileController','trackController','prController','showaggControllers','shControllers','aggController','tControllers','bpController','iControllers','genQRController','scController','ngTouch', 'ui.grid', 'ui.grid.treeView', 'ui.grid.pagination'
])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
    // console.log('testing appjs');
}); 




// 'prController','showaggControllers','shControllers','aggController','tControllers','trController','bpController','iControllers','genQRController','energyControllers','scController','ngTouch', 'ui.grid', 'ui.grid.treeView', 'ui.grid.pagination'
