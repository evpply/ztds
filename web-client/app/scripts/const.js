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
    the8Chart: ztdsBase.resource + '/the8-chart',
    pj:ztdsBase.resource + '/post-jurisdiction'
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
    riskControl: {
      pj: {
        list:'views/risk-control/post-jurisdiction/list.html'
      }
    },
    input: {
      number: '<input type="number" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />',
      date:  '<select ng-options="d for d in dateOptions" ng-model="COL_FIELD" ' +
        'ng-class="\'colt\' + col.index" ng-input="COL_FIELD"></select>',
      textarea: '<textarea style="height:105px" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ></textarea>'
    },
    cell: '<div style="border-bottom:1px solid rgb(212,212,212);" class="ngCellText"'+
      'ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD}}</span></div>',
    largeCell: '<div style="border-bottom:1px solid rgb(212,212,212);" ng-class="col.colIndex()">'+
      '<div style="word-wrap:break-word" ng-cell-text>{{COL_FIELD}}</div></div>'

  },

  config: {
    navTree: [
      {
        label: '报表',
        children: [{url:'/report/the8', label: '八项规定'}]
      },
      {
        label:'廉政风险防控',
        children: [{url:'/risk-control/department-jurisdiction', label: '部门职权'},
                   {url:'/risk-control/post-jurisdiction/list', label: '岗位职权'}]
      }
    ]
  },

  util:{}
};
