'use strict';
var removeEmpty = function(arr){
  var returnValue = [];
  for (var i in arr){
    !$.isEmptyObject(arr[i]) && returnValue.push(arr[i]);
  }
  return returnValue;
};
var selectJSON = function(o,k){
  var t = {};
  for (var i in k){
    t[k[i]] = o[k[i]];
  }
  return t;
};

var myGetMonth = function(date){
  var o = new Date(date);
  return o.getMonth() + 1;
};
