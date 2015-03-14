angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, LoginService) {
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, LoginService) {
 var result = LoginService.primera();
  result.then(function (data){
    $scope.objectHeaders = [];
    for (var i = 0; i < data.length; i++) {
      $scope.objectHeaders.push(data[i].Category);
    }
    //console.log($scope.objectHeaders)
    
    $scope.categories = $scope.objectHeaders;
    //console.log(data)
  });
  // Form data for the login modal
  $scope.loginData = {};
})

.controller('PlaylistCtrl', function($scope, $stateParams, LoginService, $ionicLoading) {
   var result = LoginService.individualCategory($stateParams.playlistId);
   result.then(function (data){
    $scope.objectHeaders = [];
    $scope.nombreCategoria = data[0].Category.nombre;
    for (var i = 0; i < data.length; i++) {
      $scope.objectHeaders.push(data[i].Curso);
    }
    console.log($scope.nombreCategoria);

    //console.log($scope.objectHeaders)
    
    $scope.cursos = $scope.objectHeaders;
    console.log(data);
      
      
     
   }, function (err){
     $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
   });


});
