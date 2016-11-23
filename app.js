/* global angular */
(function(){
    'use strict';

    var app = angular.module('myYSApp',['ngMaterial','ngMessages']);
    var checkURlforImg = function(url){
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    app.controller('imgdata', function($scope, $http, $mdDialog) {
        $http.get("https://www.reddit.com/r/pics/.json?jsonp=").then(function (response) {
        $scope.myData = response.data.data.children;
        $scope.showFullData = function(ev, xx) {

        $mdDialog.show({
            controller: Dcont ,
            templateUrl: 'dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            resolve: {
                x: function () {
                  return xx;
                }
            },
            fullscreen: $scope.customFullscreen
        });
        };

        var Dcont = function($scope, $mdDialog, x){
            console.log(x);
                 $scope.title = x.data.title;
                 $scope.author = x.data.author;
                 $scope.thumb = (checkURlforImg(x.data.url)) ? x.data.url:x.data.thumbnail;
                 $scope.adult = x.data.over_18;
                 $scope.name = x.data.name;
                 $scope.domain = x.data.domain;
                 $scope.score = x.data.score;
                     $scope.hide = function() {
                          $mdDialog.hide();
                        };

                        $scope.cancel = function() {
                          $mdDialog.cancel();
                        };

                        $scope.answer = function(answer) {
                          $mdDialog.hide(answer);
                        };
            };


    });

    });


})();
