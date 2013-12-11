var The8DetailCtrl = function($scope,$location,$http,$timeout) {
  //grid def start
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
             beforeSelectionChange: function(rowItem,event){
               if(rowItem.rowIndex===f(data).length-1) {
                 f(data).push({});
               }
               return true;
             },
             columnDefs: colDef };
  };
  var col = function(field){
    for (var i in field) {
      field[i].enableCellEdit = true;
      field[i].cellTemplate = ztds.template.cell;
      switch(field[i].type)
      {
      case "date[yyyy-mm]":
        field[i].editableCellTemplate = ztds.template.input.date;
        break;
      case "number":
        field[i].editableCellTemplate = ztds.template.input.number;
        break;
      default:
        break;
      }
    }

    return field;
  };
  var schema = function(def){
    $scope.schema =  {
      research: grid('the8.research',col(def.research)),
      outlay: grid('the8.outlay',col(def.outlay)),
      conference: grid('the8.conference',col(def.conference)),
      file: grid('the8.file',col(def.file))
    };
  };

  $scope.dateOptions = ['','2013-12','2013-11','2013-10','2013-09','2013-08','2013-07','2013-06','2013-05',
                        '2013-04','2013-03','2013-02','2013-01',
                        '2012-12','2012-11','2012-10','2012-09','2012-08','2012-07','2012-06','2012-05',
                        '2012-04','2012-03','2012-02','2012-01'];

  $.ajax({url:ztds.resource.the8Schema,
          async:false,
          success:schema});
  //grid def end

  var fillData = function(){
    $http.get(ztds.resource.the8 + '/' + ztds.user.department) .success(function(result){
      $scope.the8 = ($.isEmptyObject(result)) ? {research: [], outlay: [], conference: [], file: []} : result;

      for (var i in $scope.the8){
          $scope.the8[i].push({});
      }
    });
  };
  fillData();

  $scope.cancel = function(){
    $location.path('/');
  };

  $scope.save = function(){
    $('#the8DetailSubmit').prop('disabled', true);

    for (var i in $scope.the8){
      $scope.the8[i] = removeEmpty($scope.the8[i]);
    }

    $.extend($scope.the8, {_id: ztds.user.department});

    $http.post(ztds.resource.the8, $scope.the8)
      .success(function(result){
        fillData();
        $('#the8DetailSubmit').attr('class', 'btn btn-success');
        $timeout(function(){
          $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);
      })
      .error(function(){
        $('#the8DetailSubmit').attr('class', 'btn btn-danger');
        $timeout(function(){
          $('#the8DetailSubmit').removeAttr('disabled').attr('class', 'btn btn-primary');
        },2000);
      });
  };

};

angular.module("The8DetailCtrl",[]).controller("The8DetailCtrl",The8DetailCtrl);
