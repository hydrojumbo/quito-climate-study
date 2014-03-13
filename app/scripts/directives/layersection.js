'use strict';

angular.module('quitoClimateStudyApp')
  .directive('layerSection', function () {
    return {
      templateUrl: 'views/layersection.html',
      restrict: 'E',
      scope:{
      	title: '=',
      	sectionCollection: '='
      }
    };
  });
