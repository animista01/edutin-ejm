angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, LoginService) {
  var result = LoginService.primera();
  result.then(function (data){
    $scope.objectHeaders = [];
    for (var i = 0; i < data.length; i++) {
      $scope.objectHeaders.push(data[i].Category);
    }
    console.log($scope.objectHeaders)
 
    $scope.categories = data;
    console.log(data)
  });
  // Form data for the login modal
  $scope.loginData = {};

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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Champeta', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.champeteros = [
    { nombre: "El Carlos", id: 1},
    { nombre: "El Marcos", id: 2},
    { nombre: "El Albert", id: 3},
  ]

  // var result = Edutin.champeteros();
  // result.then(function (data){
  //   if(data.status == 200){
  //     $scope.champeteros = data.champeteros;
  //     $ionicLoading.hide();
  //   }else{
  //     $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2500, showBackdrop: false});
  //   }
  // }, function (err){
  //   $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
  // });
});
