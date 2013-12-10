//util.js
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
