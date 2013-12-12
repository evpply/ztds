'use strict';
var ztdsBase = {
  resource: 'http://localhost/resource'
};

var ztds = {
  user:{},
  resource: {
    base: ztdsBase.resource,
    user: ztdsBase.resource + '/current-user',
    the8: ztdsBase.resource + '/the8',
    the8Schema: ztdsBase.resource + '/the8-schema',
    the8Chart: ztdsBase.resource + '/the8-chart'
  },

  template: {
    mainPage: 'views/index/main-page.html',
    report :{
      the8:{
        chart: 'views/report/the8/chart.html',
        detail:'views/report/the8/detail.html',
        list : 'views/report/the8/list.html'
      }
    },
    input: {
      number: '<input type="number" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />',
      date:  '<select ng-options="d for d in dateOptions" ng-model="COL_FIELD" ' +
        'ng-class="\'colt\' + col.index" ng-input="COL_FIELD"></select>'
    },
    cell: '<div style="border-bottom:1px solid rgb(212,212,212);" class="ngCellText"'+
      'ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD}}</span></div>'
  },

  module: {
    report:{
      the8:{}
    },
    index:{}
  },

  config: {
    navTree: [
      {
        label: '报表',
        children: [{url:'/report/the8', label: '八项规定'}]
      },
      {
        label:'廉政风险防控',
        children: [{url:'/risk-control/ztsj', label: '昭通市地方税务局'}]
      }
    ]
  },

  util:{}
};
