//dependence: ../../main/ztds.js
'use strict';
ztds.module.report.the8 = angular.module('ztds.module.report.the8',
                                         ['ngGrid',
                                          'ngResource',
                                          'chieffancypants.loadingBar']);
ztds.module.report.the8.controller('The8DetailCtrl', function($scope,$location,$http,$timeout) {
  // $http.get(ztds.resource.the8 + '/' + ztds.user.department).success(function(result){
  //   $scope.research  = result.research;
  //   $scope.research.push({});
  //   $scope.outlay = result.outlay;
  //   $scope.outlay.push({});
  //   $scope.conferenceFile = result.conferenceFile;
  //   $scope.conferenceFile.push({});
  // });

  var addBasicOptions = function(data,columnDefs) {
     return { data: data,
              width: '100%',
              enableCellSelection: true,
              enableRowSelection: false,
              enableColumnResize:true,
              beforeSelectionChange: function(rowItem,event){
                if(rowItem.rowIndex===$scope[data].length-1) {
                  $scope[data].push({});
                }
                return true;
              },
              columnDefs: columnDefs };
  };
  var numberTemplate = '<input type="number" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  var textTemplate =  '<input ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  var cellTemplate = '<div style="border-bottom:1px solid rgb(212,212,212);" class="ngCellText"'+
                     'ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD}}</span></div>';
  var ngGridColumnDef = function(field){

    for (var i in field) {
      field[i].enableCellEdit = true;
      field[i].cellTemplate = cellTemplate;

      switch(field[i].type)
      {
      case "text":
        field[i].editableCellTemplate = textTemplate;
        break;
      case "number":
        field[i].editableCellTemplate = numberTemplate;
        break;
      default:
        break;
      }
    }

    return field;
  };
  var mergeConferenceAndFile = function(conference, file){
    for (var i in file){
      if (file[i].field == "date"){
        file.splice(i,1);
        break;
      }
    }
    return conference.concat(file);
  };
  var setOptions = function(def){
    $scope.researchOptions = addBasicOptions('research', ngGridColumnDef(def.fields.research));
    $scope.outlayOptions = addBasicOptions('outlay', ngGridColumnDef(def.fields.outlay));
    $scope.conferenceAndFileOptions =
      addBasicOptions('conferenceAndFile', ngGridColumnDef(mergeConferenceAndFile(def.fields.conference, def.fields.file)));
  };
  $.ajax({url:'http://localhost/resource/the8-entity-definition',
          async:false,
          success:setOptions});
  $scope.research = [{}];
  $scope.outlay = [{}];
  $scope.conferenceAndFile = [{}];

  var removeEmpty = function(arr){
    for(var i in arr) {
      if ($.isEmptyObject(arr[i])){
        arr.splice(i,1);
      }
    }
    return arr;
  };

  $scope.cancel = function(){
    $location.path('/');
  };

  $scope.save = function(){
    $('#the8DetailSubmit').prop('disabled', true);

    var data = {
      _id: ztds.user.department,
      research: removeEmpty(this.research),
      outlay: removeEmpty(this.outlay),
      conferenceFile: removeEmpty(this.conferenceFile)
    };

    $http.post(ztds.resource.the8, data)
      .success(function(result){
        $('#the8DetailSubmit').attr('class', 'btn btn-success');
        $timeout(function(){
          $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);
      })
      .error(function(){
        $('#the8DetailSubmit').attr('class', 'btn btn-danger');
        $timeout(function(){
          $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);
      });
  };

});

ztds.module.report.the8.controller('The8ReportCtrl',function($scope,$location,$http){
  if(ztds.user.department != "ztds") {
    $location.path('/report/the8/detail');
  } else {
    $http.get(ztds.resource.the8).success(function(data){
    var outlay = data[0].outlay;
    var file = data[0].conferenceFile;
    var date = [],
        sum = [],
        sumLast = [],fileData = [];

    for (var j in file){
      if(!$.isEmptyObject(file[j])) {
        fileData.push(file[j].numFiles);
      }
    }
    for(var i in outlay){
      if(!$.isEmptyObject(outlay[i])){
        if(outlay[i].date > "2013-01"){
          date.push(outlay[i].date);
          sum.push(outlay[i].cars + outlay[i].accomCost + outlay[i].dinnerCost + outlay[i].officeExpenses);
        }

        if(outlay[i].date < "2013-01"){
          sumLast.push(outlay[i].cars + outlay[i].accomCost + outlay[i].dinnerCost + outlay[i].officeExpenses);
        }
      }
    }
    //
    (function($){
      $(function () {
        $('#lineCharts').highcharts(ztds.config.the8Charts(date,sum,sumLast,fileData));
      });
    })(jQuery);
  });
  }
});

ztds.module.report.the8.config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/report',{label:'报表'})
    .when('/report/the8',
          {label:'八项规定',
           redirectTo: '/report/the8/all'})
    .when('/report/the8' + '/all',
         {controller: 'The8ReportCtrl',
         templateUrl: ztds.template.report.the8.all,
         label:'汇总'})
    .when('/report/the8' + '/detail',
         {controller: 'The8DetailCtrl',
          templateUrl: ztds.template.report.the8.detail,
         label:'填报'});
});
