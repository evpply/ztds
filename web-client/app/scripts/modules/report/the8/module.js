'use strict';
var the8 = angular.module('the8',
                 ['ngGrid',
                  'chieffancypants.loadingBar',
                  'ngRoute',
                  'The8DetailCtrl',
                  'The8ListCtrl',
                  'The8ChartCtrl'
                 ]);

the8.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
  $routeProvider
    .when('/report',{label:'报表'})
    .when('/report/the8',
          {label:'八项规定',
           redirectTo: '/report/the8/chart'})
    .when('/report/the8' + '/chart',
          {controller: 'The8ChartCtrl',
           templateUrl: ztds.template.report.the8.chart,
           label:'汇总'})
    .when('/report/the8' + '/detail',
          {controller: 'The8DetailCtrl',
           templateUrl: ztds.template.report.the8.detail,
           label:'填报'})
    .when('/report/the8' + '/list',
          {controller: 'The8ListCtrl',
           templateUrl: ztds.template.report.the8.list,
           label:'明细'});
}]);
