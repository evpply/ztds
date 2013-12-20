'use strict';
var mPerson = angular.module('mPerson', [ 'ngGrid', 'chieffancypants.loadingBar', 'ngRoute']);

mPerson.controller('PersonEditCtrl',['$scope','$http', '$filter', '$timeout',function($scope,$http,$filter,$timeout){
  $('.gridStyle').css('height',ztds.device.height * 0.6);

  var schema = function(def){
    $scope.schema = gridOptions('person',colDef(def),$scope);
  };

  $.ajax({url:ztds.resource.personSchema,
          async:false,
          success:schema});

  $scope.filterOptions = {
    filterText: '',
    useExternalFilter: false};

  // $http.get(ztds.resource.person).success(function(data){
  //   $scope.person = data;
  // });
  var fillData = function(){
    $http.get(ztds.resource.person).success(function(result){
      $scope.person = ($.isEmptyObject(result)) ? [{}] : (function(r){ r.push({});return r;})(result);
    });
  };

  fillData();

  $scope.cancel = function(){
    $location.path('/');
  };

  $scope.save = function(){
    $('#personSubmit').prop('disabled', true);
    $http.post(ztds.resource.person, removeEmpty($scope.person))
      .success(function(result){
        fillData();
        $('#personSubmit').attr('class', 'btn btn-success');
        $timeout(function(){
          $('#personSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);
      })
      .error(function(){
        $('#personSubmit').attr('class', 'btn btn-danger');
        $timeout(function(){
          $('#personSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);
      });
  };

}]);

mPerson.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
    .when('/clean-file',{label:'廉政档案'})
    .when('/clean-file/personal-info',{label:'个人信息'})
    .when('/clean-file/personal-info/edit',
          {
            controller: 'PersonEditCtrl',
            templateUrl: ztds.template.cleanFile.person.edit,
            label:'编辑'
          });
}]);
