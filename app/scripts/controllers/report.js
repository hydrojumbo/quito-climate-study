'use strict';

angular.module('quitoClimateStudyApp')
  .controller('ReportCtrl', ['$scope', '$rootScope', '$routeParams', 'Vulnerabilidad', 'Introduction', 'Amenazas', 'Documents', 'Titleservice',
  	function ($scope, $rootScope, $routeParams, Vulnerabilidad, Introduction, Amenazas, Documents, Titleservice) {  		  		

      $scope.vulnerabilities = Vulnerabilidad.getVulnerabilityNames();
  		$scope.amenazaNames = Amenazas.getAmanazaNames();
  		$scope.documents = Documents.getDocumentList();  		  	
  		$scope.introduction = Introduction;
  		$scope.currentVulnerability = undefined;
      
  		$scope.hasCurrentVulnerability = function(){
  			return !(angular.isUndefined($scope.currentVulnerability) || $scope.currentVulnerability === null);
  		};  	
      $scope.IsDefaultView = function(){
        return (angular.isUndefined($scope.currentVulnerability) || $scope.currentVulnerability === null);
      };

      $scope.chooseQuestion =function(question) {
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
