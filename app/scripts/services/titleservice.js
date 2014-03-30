'use strict';

angular.module('quitoClimateStudyApp')
  .service('Titleservice', [ '$rootScope', function Titleservice($rootScope) {
    return {    	
    	setAppLocation: function(name, type) {
    		if (type === 'vulnerability') {
				$rootScope.$broadcast('vulnerability.update', name);
    		}
    		else if (type === 'question') {
				$rootScope.$broadcast('question.update', name);
    		}
    		else if (type === 'clear'){
    			$rootScope.$broadcast('title.clear', '');	
    		}    	
    	}
    };
  }]);
