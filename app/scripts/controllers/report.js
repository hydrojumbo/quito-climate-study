'use strict';

angular.module('quitoClimateStudyApp')
  .controller('ReportCtrl', ['$scope', '$routeParams', 'Vulnerabilidad', 'Introduction', 'Amenazas', 'Documents', 
  	function ($scope, $routeParams, Vulnerabilidad, Introduction, Amenazas, Documents) {  		  		

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

  		$scope.changeFocus = function(itemType, item) {  			  		
  			if (itemType === 'vulnerability') {
				  $scope.currentVulnerability = Vulnerabilidad.getIntroOfVulnerabilityByName(item);
	  			console.log($scope.currentVulnerability);		
          $scope.currentQuestions = Vulnerabilidad.getQuestionsOfVulnerability(item);                  
  			}  			
  		};

      $scope.select = function(layer) {
        console.log(layer);
      };

  		$scope.changeView = function(item) {
  			console.log(item);
  			$scope.currentView = item;
  		};
	}]);
