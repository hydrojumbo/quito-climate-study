'use strict';

angular.module('quitoClimateStudyApp')
  .controller('HeaderCtrl',[ '$scope', '$location', function ($scope, $location) {

  	var currentLocation = {
  		vuln: undefined,
  		question: undefined
  	};
	var resetTheTitle = function() {
		currentLocation.vuln = undefined;
		currentLocation.question = undefined;
    };  


    $scope.isActive = function (viewLocation) {      	
        return viewLocation === $location.path();        
    };
   
    $scope.resetTitle = function() {
    	resetTheTitle();
    };

    $scope.$on('vulnerability.update', function(event, name){
    	currentLocation.vuln = name;
    });
    $scope.$on('question.update', function(event, name){
    	currentLocation.question = name;
    });
    $scope.$on('title.clear', function(event, name){
    	resetTheTitle();
    });

    $scope.getTitle = function() {
    	var title = 'Estudio de Cambio Climático Quito';
    	if (!_.isUndefined(currentLocation.vuln)) {
    		title = title + ' / ' + currentLocation.vuln;
    	}
    	if (!_.isUndefined(currentLocation.question)){
    		title = title + ' / ' + currentLocation.question;
    	}
    	return title;
    };
  }]);
