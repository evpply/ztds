'use strict';
var pj = angular.module('pj', [ 'ngGrid', 'chieffancypants.loadingBar', 'ngRoute']);

pj.controller('PjListCtrl',['$scope','$http',function($scope,$http){
  $scope.filterOptions = {
    filterText: '',
    useExternalFilter: true};

  $http.get(ztds.resource.pj).success(function(data){
    $scope.pjData = data;
  });



  $scope.schema = {
    data: 'pjData',
    width: '100%',
    enableCellSelection: true,
    enableRowSelection: false,
    enableColumnResize:false,
    rowHeight:'105',
    filterOptions: $scope.filterOptions,
    columnDefs: [{field:'org',displayName:'单位',width:'13%', cellTemplate:ztds.template.cell},
                 {field:'department',displayName:'部门',width:'6%', cellTemplate:ztds.template.cell},
                 {field:'post',displayName:'岗位',width:'14%', cellTemplate:ztds.template.cell},
                 {field:'pj',
                  displayName:'职权',
                  //enableCellEdit:true,
                  cellTemplate:ztds.template.largeCell
                  //editableCellTemplate:ztds.template.input.textarea
                 }]
  };
}]);

pj.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
    .when('/risk-control',{label:'廉政风险防控'})
    .when('/risk-control/post-jurisdiction',{label:'岗位职权'})
    .when('/risk-control/post-jurisdiction/list',
          {
            controller: 'PjListCtrl',
            templateUrl: ztds.template.riskControl.pj.list,
            label:'汇总'
          });
}]);
