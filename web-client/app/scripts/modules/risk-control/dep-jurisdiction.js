'use strict';
var dj = angular.module('dj', [ 'ngGrid', 'chieffancypants.loadingBar', 'ngRoute']);

dj.controller('DjListCtrl',['$scope','$http',function($scope,$http){
  $('.gridStyle').css('height',ztds.device.height * 0.65);

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

dj.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
    .when('/risk-control',{label:'廉政风险防控'})
    .when('/risk-control/dep-jurisdiction',{label:'部门职权'})
    .when('/risk-control/dep-jurisdiction/list',
          {
            controller: 'DjListCtrl',
            templateUrl: ztds.template.riskControl.dj.list,
            label:'汇总'
          });
}]);
