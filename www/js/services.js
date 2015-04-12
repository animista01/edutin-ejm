angular.module('starter.services', [])

.service('LoginService', function ($q, $http) {
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  return {
    login: function(email, password) {
      var defer = $q.defer(); 
      var xsrf = { Useremail: email, Userpassword: password };
      $http({
        method: 'POST',
        url: 'http://edutin.com/users/login/',
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: xsrf
      }).success(function (data) {
        defer.resolve(data);
      }).error(function (err){
       defer.reject(err);
      });      
      return defer.promise;
    },
    add: function (data){
      var defer = $q.defer(); 
      var xsrf = { Username: email, Userlastname: password, Userusername: password, Useremail: password, Userpassword: password};
      $http({
        method: 'POST',
        url: 'http://edutin.com/users/add/',
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: xsrf
      }).success(function (data) {
        // presume data contains json {token: some token}
        defer.resolve(data);
      }).error(function (err){
       defer.reject(err);
      });      
      return defer.promise;
    },
    primera: function () {
      var defer = $q.defer(); 
      $http({
        method: 'GET',
        url: 'http://edutin.com/categories/index/json'
      }).success(function (data) {
        defer.resolve(data);
      }).error(function (err){
       defer.reject(err);
      });      
      return defer.promise;
    },
    individualCategory: function (id) {
      var defer = $q.defer(); 
      $http({
        method: 'GET',
        url: 'http://edutin.com/cursos/categoria/'+id+'/Nuevo%20-%20Antiguo/json'
      }).success(function (data) {
        defer.resolve(data);
      }).error(function (err){
       defer.reject(err);
      });      
      return defer.promise;
    },
    jsonVideo: function(idLista) {
      var defer = $q.defer(); 
      $http({
        method: 'GET',
        url: 'http://gdata.youtube.com/feeds/api/playlists/'+idLista+'/?v=2&alt=json&feature=plcp'
      }).success(function (data) {
        defer.resolve(data);
      }).error(function (err){
       defer.reject(err);
      });      
      return defer.promise;
    }
  }     
});