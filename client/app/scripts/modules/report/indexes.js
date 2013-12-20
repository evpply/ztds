'use strict';
var mIndexes = angular.module('mIndexes', ['ngGrid', 'chieffancypants.loadingBar', 'ngRoute']);

// mIndexes.controller('IndexesChartCtrl',['$scope','$location','$http',function ($scope,$location,$http){
//   var myChart = function (date,outlay,file,conference){
//     return {
//       chart: {zoomType: 'xy',marginBottom: 65,style:{ fontFamily:'"Microsoft YaHei"'}},
//       title: {text: '昭通市地方税务局落实“八项规定”情况'},
//       xAxis: [{categories:date}],
//       yAxis: [{title: {text: '经费(万元)', style: {color: '#4572A7'}},
//                labels: {formatter: function() {return this.value/10000;}, style: {color: '#4572A7'}}},
//               {labels: {formatter: function() {return this.value;}, style: {color: '#89A54E'}},
//                title: {text: '文件', style: {color: '#89A54E'}}, opposite: true},
//               {labels: {formatter: function() {return this.value;}, style: {color: '#AA4643'}},
//                title: {text: '会议', style: {color: '#AA4643'}}, opposite: true}],
//       tooltip: {shared: true},
//       series: [{name: '经费', type: 'column', color: '#4572A7', yAxis: 0, data: outlay},
//                {name: '文件', color: '#89A54E', type: 'line', yAxis: 1, data:file},
//                {name: '会议', color: '#AA4643', type: 'line',yAxis: 2, data:conference, dashStyle:'shortdot'}]};
//   };

//   if(ztds.user.department != "ztds"){
//     $location.path('/report/indexes/detail');
//   }
//   else{
//     // $http.get(ztds.resource.indexesChart).success(function(data){
//     //   var month = [], file = [], outlay = [], conference = [];

//     //   var ds = data.sort(function(a, b) {
//     //     return (a.date >= b.date)? 1 : -1;
//     //   });

//     //   for(var i in ds){
//     //     var d = ds[i].date;
//     //     if (d >= "2013-01" && d <= "2013-12") {
//     //       month.push(d);
//     //       file.push(ds[i].file);
//     //       outlay.push(ds[i].outlay);
//     //       conference.push(ds[i].conference);
//     //     }
//     //   }

//     //   $(function(){
//     //     Highcharts.setOptions({
//     //       chart: {
//     //         style: {
//     //           fontFamily: 'Microsoft YaHei'
//     //         }
//     //       }
//     //     });

//     //     $('#lineCharts').highcharts(myChart(month,outlay,file,conference));
//     //   });
//     // });
//   }
//   $scope.toGrid = function(){
//     $location.path('/report/indexes/list');
//   };
// }]);

// mIndexes.controller('IndexesListCtrl',['$scope','$location','$http',function ($scope,$location,$http) {
//   $('.gridStyle').css('height',ztds.device.height * 0.5);

//   $scope.filterOptions = { filterText: ''};

//   var grid = function(data,colDef) {
//     var f = function(x){
//       var t = x.split('.');
//       return $scope[t[0]][t[1]];
//     };
//     return { data: data,
//              width: '100%',
//              enableCellSelection: true,
//              enableRowSelection: false,
//              enableColumnResize:true,
//              filterOptions: $scope.filterOptions,
//              columnDefs: colDef };
//   };

//   var schema = function(def){
//     for (var i in def){
//       def[i].splice(1,0,{field:'department',displayName:'单位'});
//       for (var j in def[i]){
//         def[i][j].cellTemplate = ztds.template.cell;
//       }
//     }

//     $scope.schema =  {
//       research: grid('the8.research',def.research),
//       outlay: grid('the8.outlay',def.outlay),
//       conference: grid('the8.conference',def.conference),
//       file: grid('the8.file',def.file)
//     };
//   };

//   $.ajax({url:ztds.resource.the8Schema,
//           async:false,
//           success:schema});
//   //grid def end

//   $http.get(ztds.resource.the8) .success(function(result){
//     $scope.the8 = result;
//   });
// }]);

mIndexes.controller('IndexesEditCtrl',['$scope','$location','$http','$timeout',function($scope,$location,$http,$timeout) {
  // var grid = function(data,colDef) {
  //   var f = function(x){
  //     var t = x.split('.');
  //     return $scope[t[0]][t[1]];
  //   };
  //   return { data: data,
  //            width: '100%',
  //            enableCellSelection: true,
  //            enableRowSelection: false,
  //            enableColumnResize:true,
  //            beforeSelectionChange: function(rowItem,event){
  //              if(rowItem.rowIndex===f(data).length-1) {
  //                f(data).push({});
  //              }
  //              return true;
  //            },
  //            columnDefs: colDef };
  // };
  // var col = function(field){
  //   for (var i in field) {
  //     field[i].enableCellEdit = true;
  //     field[i].cellTemplate = ztds.template.cell;
  //     switch(field[i].type)
  //     {
  //     case "date[yyyy-mm]":
  //       field[i].editableCellTemplate = ztds.strTemplate.input.date;
  //       break;
  //     case "number":
  //       field[i].editableCellTemplate = ztds.strTemplate.input.number;
  //       break;
  //     default:
  //       break;
  //     }
  //   }

  //   return field;
  // };

  // var fillData = function(){
  //   $http.get(ztds.resource.the8 + '/' + ztds.user.department) .success(function(result){
  //     $scope.the8 = ($.isEmptyObject(result)) ? {research: [], outlay: [], conference: [], file: []} : result;

  //     for (var i in $scope.the8){
  //       $scope.the8[i].sort(function(a, b) {
  //         return (a.date >= b.date)? 1 : -1;
  //       });
  //       $scope.the8[i].push({});
  //     }
  //   });
  // };

  // $scope.cancel = function(){
  //   $location.path('/');
  // };

  // $scope.save = function(){
  //   $('#the8DetailSubmit').prop('disabled', true);

  //   for (var i in $scope.the8){
  //     $scope.the8[i] = removeEmpty($scope.the8[i]);
  //   }

  //   $.extend($scope.the8, {_id: ztds.user.department});

  //   $http.post(ztds.resource.the8, $scope.the8)
  //     .success(function(result){
  //       fillData();
  //       $('#the8DetailSubmit').attr('class', 'btn btn-success');
  //       $timeout(function(){
  //         $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
  //       },2000);
  //     })
  //     .error(function(){
  //       $('#the8DetailSubmit').attr('class', 'btn btn-danger');
  //       $timeout(function(){
  //         $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
  //       },2000);
  //     });
  // };
}]);

mIndexes.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
  $routeProvider
    // .when('/report',{label:'报表'})
    // .when('/report/indexes',
    //       {label:'八项规定',
    //        redirectTo: '/report/indexes/chart'})
    // .when('/report/indexes' + '/chart',
    //       {controller: 'IndexesChartCtrl',
    //        templateUrl: ztds.template.report.indexes.chart,
    //        label:'汇总'})
    .when('/report/indexes' + '/edit',
          {controller: 'IndexesEditCtrl',
           templateUrl: ztds.template.report.indexes.edit,
           label:'填报'})
    // .when('/report/indexes' + '/list',
    //       {controller: 'IndexesListCtrl',
    //        templateUrl: ztds.template.report.indexes.list,
    //        label:'明细'})
  ;
}]);
