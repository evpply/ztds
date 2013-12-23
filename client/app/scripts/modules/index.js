(function() {
    'use strict';
    angular .module('mMain',
                   ['angularBootstrapNavTree'
                    ,'ngCookies'
                    ,'ngRoute'
                    ,'services.breadcrumbs'
                    ,'http-auth-interceptor'])

        .factory('Base64', function(){
            var keyStr = 'ABCDEFGHIJKLMNOP' +
                    'QRSTUVWXYZabcdef' +
                    'ghijklmnopqrstuv' +
                    'wxyz0123456789+/' +
                    '=';
            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);

                    return output;
                },

                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                    var base64test = /[^A-Za-z0-9\+\/\=]/g;
                    if (base64test.exec(input)) {
                        alert("There were invalid base64 characters in the input text.\n" +
                              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                              "Expect errors in decoding.");
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    do {
                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";

                    } while (i < input.length);

                    return output;
                }
            };
        })

        .factory('Auth', ['Base64', '$cookieStore', '$http', function (Base64, $cookieStore, $http) {

            var auth = $cookieStore.get('authdata');

            if(auth) { $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;}

            return {
                setCredentials: function (username, password) {
                    var encoded = Base64.encode(username + ':' + password);
                    $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                    $cookieStore.put('authdata', encoded);
                },
                clearCredentials: function () {
                    document.execCommand("ClearAuthenticationCache");
                    $cookieStore.remove('authdata');
                    $http.defaults.headers.common.Authorization = 'Basic ';
                }
            };
        }])

        .directive('authentication', function() {
            return {
                restrict: 'C',
                link: function(scope, elem, attrs) {
                    elem.removeClass('waiting-for-angular');

                    var login = elem.find('#login-holder');
                    var loginSuccess = elem.find('#login-success');

                    if($.isEmptyObject(ztds.user)){
                        login.show();
                        loginSuccess.hide();
                    } else {
                        login.hide();
                        loginSuccess.show();
                    }

                    scope.$on('event:auth-loginRequired', function() {
                        login.show();
                        loginSuccess.hide();
                    });
                    scope.$on('event:auth-loginConfirmed', function(data) {
                        login.hide();
                        loginSuccess.show();
                    });
                }
            };
        })

        .controller('IndexCtrl', ['$scope','$location','$http','breadcrumbs', function($scope,$location,$http,breadcrumbs){
            var traverse = function (o) {
                for (var i in o) {
                    if (o[i] )
                    if (o[i] !== null && typeof(o[i])=="object") {
                        //going on step down in the object tree!!
                        traverse(o[i]);
                    }
                }
            };

            var genNavTree = function(config, data){

            };

            $http.get(ztds.resources.authorities).success(function(result) {

            });

            // $scope.breadcrumbs = breadcrumbs;
            $scope.navTreeHandler = function (branch) {
              var _ref;
              $location.path(branch.url);
              if ((_ref = branch.data) != null ? _ref.description : void 0) {
                return $scope.output += '(' + branch.data.description + ')';
              }
            };
            $scope.navTreeData = ztds.navTree;
        }])

        .controller('MainCtrl', ['$scope','$http',function($scope,$http){}])

        .controller(
            'LoginCtrl',
            ['$scope','$http','authService','Base64','Auth','$cookieStore',
             function ($scope,$http,authService,Base64,Auth,$cookieStore) {

                 var user = $cookieStore.get('user');
                 if(user){
                     $scope.user = JSON.parse(user);
                     ztds.user = $scope.user;
                     $('#login-success').show();
                 }

                 $scope.submit = function() {
                     var user = { username: $scope.username,
                                  password: $scope.password };

                     Auth.setCredentials(user.username,user.password);
                     $http({method: 'POST', url: ztds.resources.login, cache: false, data: user, ignoreAuthModule: true})
                         .success(function(result) {
                             authService.loginConfirmed();
                             $scope.user = result;
                             $cookieStore.put('user', JSON.stringify(result));
                         });
                     $scope.username = null;
                     $scope.password = null;
                 };

                 $scope.cancel = function(){
                     Auth.clearCredentials();
                     $scope.user = null;
                     ztds.user = {};
                     $('#login-success').hide();

                 };
             }])

        .config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: ztds.template.mainPage,
                    controller: 'MainCtrl',
                    label: '主页'
                });
        }]);
})();
