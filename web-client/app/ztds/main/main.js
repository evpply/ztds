'use strict';
//dependence: ztds.js
//dependence: ../report/the8.js

ztds.module.index = angular.module('ztds.module.index',[
  'angularBootstrapNavTree',
  'ngRoute',
  'services.breadcrumbs']);

ztds.module.index.controller('IndexCtrl',function($scope,$location,breadcrumbs){
  $scope.breadcrumbs = breadcrumbs;

  $scope.navTreeHandler = function(branch) {
    var _ref;
    $location.path(branch.url);
    if ((_ref = branch.data) != null ? _ref.description : void 0) {
      return $scope.output += '(' + branch.data.description + ')';
    }
  };

  $scope.navTreeData = [
    {
      label: '报表',
      children: [
        {
          url:'/report/the8/all',
          label: '八项规定'
        }
      ]
    }
  ];

});

ztds.module.index.controller('MainCtrl', function($scope){

});

ztds.module.index.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: ztds.template.mainPage,
      controller: 'MainCtrl',
      label: '主页'
    });
    // . otherwise({
    //  redirectTo: '/index'
    // });
});

angular.bootstrap(document,['ztds.module.index',
                            'ztds.module.report.the8']);