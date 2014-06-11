'use strict';

angular.module('quitoClimateStudyApp')
  .controller('ReportCtrl', ['$scope', '$rootScope', '$routeParams', 'Vulnerabilidad', 'Introduction', 'Documents', 'Titleservice',
  	function ($scope, $rootScope, $routeParams, Vulnerabilidad, Introduction, Documents, Titleservice) {  		  		

      $scope.setPercentHeight = true;
      $scope.vulnerabilities = Vulnerabilidad.getVulnerabilityNames();  		
  		$scope.documents = Documents.getDocumentList();  		  	
  		$scope.introduction = Introduction;
  		$scope.currentVulnerability = undefined;
      
  		$scope.hasCurrentVulnerability = function(){
  			return !(angular.isUndefined($scope.currentVulnerability) || $scope.currentVulnerability === null);
  		};  	
      $scope.IsDefaultView = function(){
        return (angular.isUndefined($scope.currentVulnerability) || $scope.currentVulnerability === null);
      };

      $scope.chooseQuestion = function(question) {
        Titleservice.setAppLocation(question, 'question');
      };    

  		$scope.changeFocus = function(itemType, item) {  			  		
  			if (itemType === 'vulnerability') {
				  $scope.currentVulnerability = Vulnerabilidad.getIntroOfVulnerabilityByName(item);	  			
          $scope.currentQuestions = Vulnerabilidad.getQuestionsOfVulnerability(item);
          Titleservice.setAppLocation($scope.currentVulnerability.name, 'vulnerability');
  			}  			
  		};
	}]);
