'use strict';
//dependence:
var index = angular.module('index', ['angularBootstrapNavTree', 'ngRoute', 'services.breadcrumbs']);
index.controller(
  'IndexCtrl',
  ['$scope','$location','$http','breadcrumbs',
   function IndexCtrl($scope,$location,$http,breadcrumbs){
     $.ajax({url:ztds.resource.user,
             async:false,
             success:function(){}});

     $http.get(ztds.resource.user).success(function(user){
       ztds.user = user;
       $scope.user = user;
     });

     $scope.breadcrumbs = breadcrumbs;
     $scope.navTreeHandler = function (branch) {
       var _ref;
       $location.path(branch.url);
       if ((_ref = branch.data) != null ? _ref.description : void 0) {
         return $scope.output += '(' + branch.data.description + ')';
       }
     };
     $scope.navTreeData = ztds.config.navTree;
   }]);
index.controller('MainCtrl', ['$scope','$http',function($scope,$http){}]);
index.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: ztds.template.mainPage,
      controller: 'MainCtrl',
      label: '主页'
    });
}]);
