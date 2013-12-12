'use strict';


angular.module('The8ListCtrl',[]).controller('The8ListCtrl',['$scope','$location','$http',function The8ListCtrl($scope,$location,$http) {
  $scope.filterOptions = { filterText: ''};
  var grid = function(data,colDef) {
    var f = function(x){
      var t = x.split('.');
      return $scope[t[0]][t[1]];
    };
    return { data: data,
             width: '100%',
             enableCellSelection: true,
             enableRowSelection: false,
             enableColumnResize:true,
             filterOptions: $scope.filterOptions,
             columnDefs: colDef };
  };
  var schema = function(def){
    for (var i in def){
      def[i].splice(1,0,{field:'department',displayName:'单位'});
      for (var j in def[i]){
        def[i][j].cellTemplate = ztds.template.cell;
      }
    }

    $scope.schema =  {
      research: grid('the8.research',def.research),
      outlay: grid('the8.outlay',def.outlay),
      conference: grid('the8.conference',def.conference),
      file: grid('the8.file',def.file)
    };
  };

  $.ajax({url:ztds.resource.the8Schema,
          async:false,
          success:schema});
  //grid def end

  $http.get(ztds.resource.the8) .success(function(result){
    $scope.the8 = result;
  });
}]);
