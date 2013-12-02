//dependence: ../../main/ztds.js
'use strict';
ztds.module.report.the8 = angular.module('ztds.module.report.the8',
                                         ['ngGrid',
                                          'ngResource',
                                          'chieffancypants.loadingBar']);
var the8ColumnDef = function(def){
  var result = [];
  var numberTemplate = '<input type="number" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  var textTemplate =  '<input ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  var myCellTemplate ='<div style="border-bottom:1px solid rgb(212,212,212);" class="ngCellText"'+
                     ' ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD}}</span></div>';
  for (var i in def){
    result.push({field:          def[i][0],
                 displayName:    def[i][1],
                 enableCellEdit: def[i][2],
                 width:          def[i][3],
                 cellTemplate: myCellTemplate,
                 editableCellTemplate: (def[i][4] == true)? textTemplate : numberTemplate
                });
  }
  return result;
};

ztds.module.report.the8.controller('The8DetailCtrl', function($scope,$location,$http,$timeout) {
  $http.get(ztds.resource.the8 + '/' + ztds.user.department).success(function(result){
    $scope.research  = result.research;
    $scope.research.push({});
    $scope.outlay = result.outlay;
    $scope.outlay.push({});
    $scope.conferenceFile = result.conferenceFile;
    $scope.conferenceFile.push({});
  });
  $scope.research = [{}];

  $scope.researchOptions = {
    data: 'research',
    width: '100%',
    enableCellSelection: true,
    enableRowSelection: false,
    enableColumnResize:true,
    beforeSelectionChange:function(a1){
      if(a1.rowIndex===$scope.research.length-1){
        $scope.research.push({});
      }
      return true;
    },
    columnDefs: the8ColumnDef(ztds.config.cellDef.research)
  };

  $scope.outlayOptions = {
    data: 'outlay',
    width: '100%',
    enableCellSelection: true,
    enableRowSelection: false,
    enableColumnResize: true,
    beforeSelectionChange:function(a1){
      if(a1.rowIndex===$scope.outlay.length-1){
        $scope.outlay.push({});
      }
      return true;
    },
    columnDefs: the8ColumnDef(ztds.config.cellDef.outlay)
  };

  $scope.conferenceFileOptions = {
    data: 'conferenceFile',
    width: '100%',
    enableCellSelection: true,
    enableRowSelection: false,
    beforeSelectionChange:function(a1){
      if(a1.rowIndex===$scope.conferenceFile.length-1){
        $scope.conferenceFile.push({});
      }
      return true;
    },
    columnDefs: the8ColumnDef(ztds.config.cellDef.conferenceFile)
  };

  var removeEmpty = function(arr){
    for(var i in arr) {
      if ($.isEmptyObject(arr[i])){
        arr.splice(i,1);
      }
    }
    return arr;
  };

  $scope.reportExport = function(){
    $location.path();
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
