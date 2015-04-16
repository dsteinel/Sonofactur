'use strict';

// script.js
/*global $ */


$('#EN, #DE').hide(); 
$(document).ready(function() {
  $('#DE').fadeIn(300); 

   $('.en_language').click(function() {
      $('#DE').hide();
      $('#EN').show();
   });

   $('.de_language').click(function() {
      $('#EN').hide();
      $('#DE').show();
   });
});

var ngApp = angular.module('ngApp', ['ngRoute', 'ngAnimate']);

// configure our routes
ngApp.config(function($routeProvider) {
	$routeProvider

    .when('/de', {
    	templateUrl : '../views/de/home.html',
    	controller  : 'homeController'
    })

    .when('/de/ueber', {
    	templateUrl : '../views/de/ueber.html',
    	controller  : 'aboutController'
    })

    .when('/de/medien', {
        templateUrl : '../views/de/medien.html',
        controller  : 'medienController'
    })
    .when('/de/kontakt', {
        templateUrl : '../views/de/kontakt.html',
    })

    .when('/en', {
      templateUrl : '../views/en/home.html',
    })

    .when('/en/about', {
      templateUrl : '../views/en/about.html',
    })

    .when('/en/media', {
        templateUrl : '../views/en/media.html',
    })
    .when('/en/contact', {
        templateUrl : '../views/en/contact.html',
    }).
    otherwise({
      redirectTo: '/de'
    });
});

/***** ANIMATION || PAGE TRANSITION ******/
ngApp.controller('homeController', function($scope) {
    $scope.pageClass = 'page-home';
});

ngApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';
});

ngApp.controller('medienController', function($scope) {
    $scope.pageClass = 'page-medien';
});
ngApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});

/***** IMPRESSUM *****/
ngApp.controller('MyCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
});


ngApp.directive('modal', function () {
  return {
    template: '<div class="modal">' + 
        '<div class="modal-dialog">' + 
          '<div class="modal-content">' + 
            '<div class="modal-header">' + 
              '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
              '<h4 class="modal-title">{{ title }}</h4>' + 
            '</div>' + 
            '<div class="modal-body" ng-transclude></div>' + 
          '</div>' + 
        '</div>' + 
      '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value){
        if(value === true){
          $(element).modal('show');
        }
        else{
          $(element).modal('hide');
        }
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});