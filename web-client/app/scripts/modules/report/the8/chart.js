'use strict';

angular.module('The8ChartCtrl',[]).controller('The8ChartCtrl',['$scope','$location','$http',function The8ChartCtrl($scope,$location,$http){
  var myChart = function (date,outlay,file,conference){
    return {
      chart: {zoomType: 'xy',marginBottom: 65},
      title: {text: '昭通市地方税务局落实“八项规定”情况'},
      xAxis: [{categories:date}],
      yAxis: [
        {title: {text: '经费(万元)', style: {color: '#4572A7'}},
         labels: {formatter: function() {return this.value/10000;}, style: {color: '#4572A7'}}},

        {labels: {formatter: function() {return this.value;}, style: {color: '#89A54E'}},
         title: {text: '文件', style: {color: '#89A54E'}}, opposite: true},


        {labels: {formatter: function() {return this.value;}, style: {color: '#AA4643'}},
         title: {text: '会议', style: {color: '#AA4643'}}, opposite: true}],

      tooltip: {shared: true},
      series: [{name: '经费', type: 'column', color: '#4572A7', yAxis: 0, data: outlay},
               //{name: '2012年经费',type:'column',color:'#000000',yAxis:0,data:outlayLast},
               {name: '文件', color: '#89A54E', type: 'line', yAxis: 1, data:file},
               //{name: '2012年文件', color: '#89A54E', type: 'line',yAxis: 1, data:fileLast,dashStyle:'shortdot'},
               {name: '会议', color: '#AA4643', type: 'line',yAxis: 2, data:conference, dashStyle:'shortdot'}//,
               //{name: '2012年会议', color: '#AA4643', type: 'line',yAxis: 2, data:conferenceLast, dashStyle:'shortdot'}
              ]
    };

  };

  //todo:modify
  if(ztds.user.department != "ztds"){
    $location.path('/report/the8/detail');
  }
  else{
    $http.get(ztds.resource.the8Chart).success(function(data){
      var month = [], file = [], outlay = [], conference = [];

      var ds = data.sort(function(a, b) { return a.date > b.date;});
      for(var i in ds){
        var d = ds[i].date;
        if (d >= "2013-01" && d <= "2013-12") {
          month.push(d);
          file.push(ds[i].file);
          outlay.push(ds[i].outlay);
          conference.push(ds[i].conference);
        }
      }

      $('#lineCharts').highcharts(myChart(month,outlay,file,conference));
    });
  }

  $scope.toGrid = function(){
   $location.path('/report/the8/list');
  };
}]);
