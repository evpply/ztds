'use strict';
var pj = angular.module('pj', [ 'ngGrid', 'chieffancypants.loadingBar', 'ngRoute']);

pj.filter('zSearch',function(){
  return function(data,query){
    var x = [];
    var q = query.replace(/\s/g, '\\S+');
    x = data.filter(function(s){
      var r = new RegExp(q);
      return r.test(JSON.stringify(s));
    });
    return x;
  };
});

pj.controller('PjListCtrl',['$scope','$http', '$filter',function($scope,$http,$filter){
  $('.gridStyle').css('height',ztds.device.height * 0.6);

  $scope.filterOptions = {
    filterText: '',
    useExternalFilter: true};

  $http.get(ztds.resource.pj).success(function(data){
    $scope.pjData = data;
    $scope.pjFilteredData = data;
  });

  $scope.search = function(query){
    $scope.pjFilteredData = $filter('zSearch')($scope.pjData,query);
  };

  $scope.schema = {
    data: 'pjFilteredData',
    width: '100%',
    enableCellSelection: true,
    enableRowSelection: false,
    enableColumnResize:false,
    rowHeight:'105',
    filterOptions: $scope.filterOptions,
    columnDefs: [{field:'org',displayName:'单位',width:'13%', cellTemplate:ztds.template.cell},
                 {field:'dep',displayName:'部门',width:'6%', cellTemplate:ztds.template.cell},
                 {field:'post',displayName:'岗位',width:'14%', cellTemplate:ztds.template.cell},
                 {field:'jurisdiction',
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
