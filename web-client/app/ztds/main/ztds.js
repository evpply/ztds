//dependence:null
var ztdsBase = {
  resource: 'http://localhost/resource'
};

var ztds = {
  user:{},
  resource: {
    base: ztdsBase.resource,
    user: ztdsBase.resource + '/current-user',
    the8: ztdsBase.resource + '/the8',
    the8Schema: ztdsBase.resource + '/the8-schema'
  },

  template: {
    mainPage: 'ztds/main/main-page.html',
    report :{
      the8:{
        chart: 'ztds/report/the8/chart.html',
        detail:'ztds/report/the8/detail.html',
        list : 'ztds/report/the8/list.html'
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
    }
  },
  config: {
    navTree: [
      {
        label: '报表',
        children: [{url:'/report/the8', label: '八项规定'}]
      }
    ]
  }
};
