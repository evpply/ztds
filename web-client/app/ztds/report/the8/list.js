var The8ListCtrl = function($scope,$location,$http) {
  $scope.filterOptions = {
    filterText: ''
  };

  var addBasicOptions = function(data,columnDefs) {
    return { data: data,
             width: '100%',
             enableCellSelection: true,
             enableRowSelection: true,
             enableColumnResize:true,

             filterOptions: $scope.filterOptions,
             columnDefs: columnDefs };
  };

  var selectJSON = function(o,k){
    var t = {};
    for (var i in k){
      t[k[i]] = o[k[i]];
    }
    return t;
  };
  var mergeConferenceAndFile = function(conference, file){
    for (var i in file){
      if (file[i].field == "date"){
        file.splice(i,1);
        break;
      }
    }
    return conference.concat(file);
  };
  var mergeConferenceAndFileData = function(conference, file){

    var t = [];
    for (var i = 0; i < conference.length; i++) {
      var o = {};
      $.extend(o,conference[i],file[i]);
      t.push(o);
    }

    return t;
  };

  var ngGridColumnDef = function(field){
    var cellTemplate = '<div style="border-bottom:1px solid rgb(212,212,212);" class="ngCellText"'+
                     'ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD}}</span></div>';
    for (var i in field) {
      field[i].cellTemplate = cellTemplate;
    }
    return field;
  };


  var setOptions = function(def){
   // alert(JSON.stringify(def.fields.research));
    def.fields.research.splice(1,0,{field:'department',displayName:'单位'});

    $scope.researchOptions = addBasicOptions('research', ngGridColumnDef(def.fields.research));
    $scope.outlayOptions = addBasicOptions('outlay', def.fields.outlay);
    $scope.conferenceAndFileOptions =
      addBasicOptions('conferenceAndFile', mergeConferenceAndFile(def.fields.conference, def.fields.file));
  };
  $.ajax({url:ztds.resource.the8Def,
          async:false,
          success:setOptions});

  var fillData = function(){
    $http.get(ztds.resource.the8).success(function(result){
      $scope.research  = result.research;
      $scope.outlay = result.outlay;
      $scope.conferenceAndFile = mergeConferenceAndFileData(result.conference,result.file);
    });
  };
  fillData();
};

angular.module('The8ListCtrl',[]).controller('The8ListCtrl',The8ListCtrl);
