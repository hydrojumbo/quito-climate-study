'use strict';

angular.module('quitoClimateStudyApp')
  .directive('layerSection', function () {
    return {
      templateUrl: 'views/layersection.html',
      restrict: 'A',
      replace: true,      
      scope:{
      	title: '=',
      	sectionCollection: '='
      }
    };
  });
