//dependence:null
var ztdsBase = {
  resource: 'http://localhost/resource'
};

var ztds = {
  user:{
    department: null
  },
  resource: {
    department: ztdsBase.resource + '/department/x',
    the8: ztdsBase.resource + '/the8'
  },
  template: {
    mainPage: 'ztds/main/main-page.html',
    report :{
      the8:{
        all: 'ztds/report/the8/all.html',
        detail:'ztds/report/the8/detail.html'
      }
    }
  },
  module: {
    report:{
      the8:{}
    }
  },
  config: {
    // /report/the8/all highcharts definition
    the8Charts: function (date,sum,sumLast,fileData){
      return {
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
      };
    },
    //nav tree in left
    navTree: [
      {
        label: '报表',
        children: [{url:'/report/the8/all', label: '八项规定'}]
      }
    ],
    // /report/the8/detail ng-grid cell definiton
    cellDef: {
      research: [['date', '月份', true,'10%',true],
                 ['times','调研次数',true,'10%'],
                 ['nLeaders','带队领导(人)',true,'14%'],
                 ['nAccompanies','陪同人数',true,'10%'],
                 ['days','调研天数',true,'10%'],
                 ['problems','发现问题(个)',true,'14%'],
                 ['problemsSolved','解决问题(个)',true,'16%'],
                 ['nReports','调研报告(篇)',true,'16%']],
      outlay: [['date', '月份', true,'10%',true],
               ['cars','公车费用',true,'16%'],
               ['accomPeoples','住宿：人次',true,'15%'],
               ['accomCost','住宿：费用',true,'14%'],
               ['dinnerPeoples','用餐：人次',true,'15%'],
               ['dinnerCost','用餐：费用',true,'14%'],
               ['officeExpenses','办公经费',true,'16%']],
      conferenceFile: [['date', '月份', true,'12%',true],
                       ['normalConference','会议：常规',true,'10%'],
                       ['videoConference','会议：视频',true,'10%'],
                       ['conferencePeriod','会期(天)',true,'10%'],
                       ['numParticipated','参会人数',true,'10%'],
                       ['expenses','会议经费',true,'10%'],
                       ['numFiles','发文数',true,'10%'],
                       ['length','篇幅',true,'8%'],
                       ['newFiles','文件：新增',true,'10%'],
                       ['abolishFiles','文件：废止',true,'10%']]
    }
  }
};
