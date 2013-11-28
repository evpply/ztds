//dependence: ../../main/ztds.js
'use strict';
ztds.module.report.the8 = angular.module('ztds.module.report.the8', ['ngGrid',
                                                  'ngResource',
                                                  'chieffancypants.loadingBar']
                                        );

var the8ColumnDef = function(def){
  var result = [];
  var numberTemplate = '<input type="number" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  var textTemplate =  '<input ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  for (var i in def){
    result.push({field:          def[i][0],
                 displayName:    def[i][1],
                 enableCellEdit: def[i][2],
                 width:          def[i][3],
                 editableCellTemplate: (def[i][4] == true)? textTemplate : numberTemplate
                });
  }
  return result;
};

ztds.module.report.the8.controller('The8DetailCtrl', function($scope,$location,$http) {
  $http.get('http://localhost/resource/the8/01').success(function(result){
    $scope.research  = result.research;
    $scope.research.push({});
    $scope.outlay = result.outlay;
    $scope.outlay.push({});
    $scope.conferenceFile = result.conferenceFile;
    $scope.conferenceFile.push({});
  });
  $scope.research = [{}];
  var researchColDef = [['date', '月份', true,'6%',true],
                        ['times','调研次数',true,'10%'],
                        ['nLeaders','带队领导(人)',true,'16%'],
                        ['nAccompanies','陪同人数',true,'10%'],
                        ['days','调研天数',true,'10%'],
                        ['problems','发现问题(个)',true,'16%'],
                        ['problemsSolved','解决问题(个)',true,'16%'],
                        ['nReports','调研报告(篇)',true,'16%']
                       ];
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
    columnDefs: the8ColumnDef(researchColDef)
  };

  var outlayColDef =  [['date', '月份', true,'6%',true],
                       ['cars','公车费用',true,'16%'],
                       ['accomPeoples','住宿：人次',true,'15%'],
                       ['accomCost','住宿：费用',true,'16%'],
                       ['dinnerPeoples','用餐：人次',true,'15%'],
                       ['dinnerCost','用餐：费用',true,'16%'],
                       ['officeExpenses','办公经费',true,'16%']];
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
    columnDefs: the8ColumnDef(outlayColDef)
  };

  var conferenceFileColDef =  [['date', '月份', true,'12%',true],
                               ['normalConference','会议：常规',true,'10%'],
                               ['videoConference','会议：视频',true,'10%'],
                               ['conferencePeriod','会期(天)',true,'10%'],
                               ['numParticipated','参会人数',true,'10%'],
                               ['expenses','会议经费',true,'10%'],
                               ['numFiles','发文数',true,'10%'],
                               ['length','篇幅',true,'8%'],
                               ['newFiles','文件：新增',true,'10%'],
                               ['abolishFiles','文件：废止',true,'10%']];

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
    columnDefs: the8ColumnDef(conferenceFileColDef)
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
//    $http.get('http://localhost/resource/the8-export').success(function(){});
    $location.path();
  };
  $scope.cancel = function(){
    $location.path('/report/the8/all');
  };

  $scope.save = function(){
    var data = {research: removeEmpty(this.research),
                outlay: removeEmpty(this.outlay),
                conferenceFile: removeEmpty(this.conferenceFile)};
    $http.post('http://localhost/resource/the8',data).success(function(){
      alert("保存成功");
    });
  };

});

ztds.module.report.the8.controller('The8ReportCtrl',function($scope,$location,$http){
  $http.get('http://localhost/resource/the8').success(function(data){

    var outlay = data[0].outlay;
    var file = data[0].conferenceFile;
    var date = [];

    var sum = [];
    var sumLast = [];

    var fileData = [];
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
        $('#lineCharts').highcharts({
          chart: {zoomType: 'xy'},
          title: {text: '昭通市地方税务局落实“八项规定”情况（一）'},
          xAxis: [{categories:date}],
          yAxis: [{labels: {formatter: function() {return this.value;}, style: {color: '#89A54E'}},
                   title: {text: '发文件数', style: {color: '#89A54E'}}, opposite: true},
                  {gridLineWidth: 0,
                   title: {text: '经费支出(万元)', style: {color: '#4572A7'}},
                   labels: {formatter: function() {return this.value/10000;}, style: {color: '#4572A7'}}}],



          tooltip: {ValuesSuffix: '元', shared: true},
          legend: {layout: 'vertical', align: 'left', x: 120, verticalAlign: 'top',
                   y: 80, floating: true, backgroundColor: '#FFFFFF'},

            series: [{name: '经费支出', type: 'column', color: '#4572A7', yAxis: 1, data: sum},

                     {name: '去年同期经费支出',type:'line',color:'#4572A7',yAxis:1,data:sumLast,dashStyle:'shortdot'},
                     {name: '发文数', color: '#89A54E', type: 'line', data:fileData}]
        });


      });
    })(jQuery);
  });

  $scope.detail = function(){
    $location.path('/report/the8/detail');
  };
});

ztds.module.report.the8.config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/report',{label:'报表'})
    .when('/report/the8',{label:'八项规定'})
    .when('/report/the8' + '/all',
         {controller: 'The8ReportCtrl',
         templateUrl: ztds.template.report.the8.all,
         label:'汇总'})
    .when('/report/the8' + '/detail',
         {controller: 'The8DetailCtrl',
          templateUrl: ztds.template.report.the8.detail,
         label:'填报'});
});
