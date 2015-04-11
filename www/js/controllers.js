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
    $scope.Categoria = data[0].Category;
    for (var i = 0; i < data.length; i++) {
      $scope.objectHeaders.push(data[i].Curso);
    }
    $scope.cursos = $scope.objectHeaders;
    
      
     
   }, function (err){
     $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
   });
})

.controller('CursoCtrl', function($sce, $scope, $stateParams, LoginService, $ionicLoading, $controller) {
  $scope.categoria = $stateParams.playlistId;
   var result = LoginService.individualCategory($stateParams.playlistId);
   result.then(function (data){
    $scope.objectHeaders2 = [];
    for (var i = 0; i < data.length; i++) {
      $scope.objectHeaders2.push(data[i].Curso);
    }
    $scope.cursos2 = $scope.objectHeaders2;
    $scope.curso = [];
    $scope.idDeLaPlaylist = [];
    for (var i = 0; i < $scope.cursos2.length; i++) {
      if ($scope.cursos2[i].id==$stateParams.cursoId) {
        $scope.curso.push($scope.cursos2[i]);
        $scope.curso = $scope.curso[0];
        
        $scope.idDeLaPlaylist = $scope.curso.url;
        $scope.idDeLaPlaylist = $scope.idDeLaPlaylist.split('http://www.youtube.com/playlist?list=');
        var res = LoginService.jsonVideo($scope.idDeLaPlaylist[1]);
        res.then(function (data){
          //console.log(data);
          $scope.imgVideo = [];
          $scope.cabs = data.feed.entry;
          $scope.cab1 = [];
          $scope.cab2 = [];
          angular.forEach($scope.cabs, function(cab) {
            $scope.cab1.push(cab.title.$t);
            $scope.cab2.push(cab.media$group.media$thumbnail[0].url);
          })
         $scope.videos = $scope.cab1;
         $scope.imgsVideos = $scope.cab2;
         //console.log($scope.videos);
         //console.log($scope.imgsVideos);
         $scope.imgVideo.push(data.feed.media$group.media$thumbnail[1].url);


        })
        
      };
    }
    
    var movie = {
      src:"http://www.youtube.com/embed/?listType=playlist&list="+$scope.idDeLaPlaylist[1]+"&autoplay=1&disablekb=1&enablejsapi=1&fs=0&hl=es&modestbranding=1&rel=0&iv_load_policy=3&theme=light"};
    $scope.lv = movie.src;
    $scope.VideoID = $sce.trustAsResourceUrl($scope.lv);

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

   }, function (err){
     $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
   });
})

 