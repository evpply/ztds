var The8DetailCtrl = function($scope,$location,$http,$timeout) {
  var addBasicOptions = function(data,columnDefs) {
     return { data: data,
              width: '100%',
              enableCellSelection: true,
              enableRowSelection: false,
              enableColumnResize:true,
              beforeSelectionChange: function(rowItem,event){
                if(rowItem.rowIndex===$scope[data].length-1) {
                  $scope[data].push({});
                }
                return true;
              },
              columnDefs: columnDefs };
  };
  var numberTemplate = '<input type="number" ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  var textTemplate =  '<input ng-model="COL_FIELD" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />';
  var cellTemplate = '<div style="border-bottom:1px solid rgb(212,212,212);" class="ngCellText"'+
                     'ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD}}</span></div>';
  var ngGridColumnDef = function(field){

    for (var i in field) {
      field[i].enableCellEdit = true;
      field[i].cellTemplate = cellTemplate;

      switch(field[i].type)
      {
      case "text":
        field[i].editableCellTemplate = textTemplate;
        break;
      case "number":
        field[i].editableCellTemplate = numberTemplate;
        break;
      default:
        break;
      }
    }

    return field;
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

  var setOptions = function(def){
    $scope.researchOptions = addBasicOptions('research', ngGridColumnDef(def.fields.research));
    $scope.outlayOptions = addBasicOptions('outlay', ngGridColumnDef(def.fields.outlay));
    $scope.conferenceAndFileOptions =
      addBasicOptions('conferenceAndFile', ngGridColumnDef(mergeConferenceAndFile(def.fields.conference, def.fields.file)));
  };
  $.ajax({url:ztds.resource.the8Def,
          async:false,
          success:setOptions});

  var fillData = function(){
    $http.get(ztds.resource.the8 + '/' + ztds.user.department).success(function(result){
    $scope.research  = result.research;
    $scope.research.push({});
    $scope.outlay = result.outlay;
    $scope.outlay.push({});
    $scope.conferenceAndFile = mergeConferenceAndFileData(result.conference,result.file);
    $scope.conferenceAndFile.push({});
  });
  };
  fillData();
  var removeEmpty = function(arr){
    var returnValue = [];
    for (var i in arr){
      !$.isEmptyObject(arr[i]) && returnValue.push(arr[i]);
    }
    return returnValue;
  };

  $scope.cancel = function(){
    $location.path('/');
  };
  $scope.save = function(){
    $('#the8DetailSubmit').prop('disabled', true);
    var cfs = removeEmpty(this.conferenceAndFile);

    var conference = [];
    var file = [];
    for (var i in cfs) {
      conference.push(selectJSON(cfs[i],["date","normalConference","videoConference","peoples","duration","expenses"]));
      file.push(selectJSON(cfs[i],["date","num","length","newFiles","abolishFiles"]));
    }

    var data = {
      id: ztds.user.department,//ztds.user.department,
      research: removeEmpty(this.research),
      outlay: removeEmpty(this.outlay),
      conference:conference,
      file:file
    };

    $http.post(ztds.resource.the8, data)
      .success(function(result){
        $('#the8DetailSubmit').attr('class', 'btn btn-success');
        $timeout(function(){
          $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);

        fillData();
      })
      .error(function(){
        $('#the8DetailSubmit').attr('class', 'btn btn-danger');
        $timeout(function(){
          $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);
      });
};

  $scope.getXls = function(){
    window.location.href = ztds.resource.base + '/the8-xls/' + ztds.user.department;
  };

};

angular.module("The8DetailCtrl",[]).controller("The8DetailCtrl",The8DetailCtrl);
