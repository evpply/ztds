var The8ReportCtrl = function($scope,$location,$http){
  var myChart = function (date,outlay,outlayLast,file,fileLast){
    return {
      chart: {zoomType: 'xy'},
      title: {text: '昭通市地方税务局落实“八项规定”情况'},
      xAxis: [{categories:date}],
      yAxis: [{labels: {formatter: function() {return this.value;}, style: {color: '#89A54E'}},
               title: {text: '发文件数', style: {color: '#89A54E'}}, opposite: true},
              {gridLineWidth: 0,
               title: {text: '经费支出(万元)', style: {color: '#4572A7'}},
               labels: {formatter: function() {return this.value/10000;}, style: {color: '#4572A7'}}}],
      tooltip: {ValuesSuffix: '元', shared: true},
      legend: {layout: 'vertical', align: 'left', x: 120, verticalAlign: 'top',
               y: 80, floating: true, backgroundColor: '#FFFFFF'},

      series: [{name: '2013年经费支出', type: 'column', color: '#4572A7', yAxis: 1, data: outlay},
               {name: '2012年经费支出',type:'column',color:'#000000',yAxis:1,data:outlayLast},
               {name: '2013年发文数', color: '#89A54E', type: 'line', data:file},
               {name: '2012年发文数', color: '#89A54E', type: 'line', data:fileLast,dashStyle:'shortdot'}]
    };
  };


  $http.get(ztds.resource.the8Report).success(function(data){
    var month = [],
        file = [],
        outlay = [],
        outlayLast = [],
        fileLast = [];
    var ds = data.sort(function(a, b) { return a.date > b.date;});
    for(var i in ds){
      month.push(ds[i].date);
      file.push(ds[i].file);
      outlay.push(ds[i].outlay);
    }

    $('#lineCharts').highcharts(myChart(month,outlay,[],file,[]));
  });
};

angular.module('The8ReportCtrl',[]).controller('The8ReportCtrl',The8ReportCtrl);
