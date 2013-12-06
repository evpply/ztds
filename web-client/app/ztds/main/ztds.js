//dependence:null
var ztdsBase = {
  resource: 'http://localhost/resource'
};

var ztds = {
  user:{
    department: null
  },
  resource: {
    base: ztdsBase.resource,
    department: ztdsBase.resource + '/query-department',
    the8: ztdsBase.resource + '/the8',
    the8Def: ztdsBase.resource + '/the8-entity-definition',
    the8Report: ztdsBase.resource + '/the8-report'
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
    navTree: [
      {
        label: '报表',
        children: [{url:'/report/the8/all', label: '八项规定'}]
      }
    ]
  }
};
