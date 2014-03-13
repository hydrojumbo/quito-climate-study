'use strict';

angular.module('quitoClimateStudyApp', [
  'ngResource',
  'ngRoute',
  'leaflet-directive',
  'ui.bootstrap'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {        // this sets the home view
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      
      .when('/Report/:currentReport', {      
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })

      .when('/Vulnerability/:vulnerability', {
        templateUrl: 'views/vulnerability.html',
        controller: 'VulnerabilityCtrl'
      })
      
      .when('/Somos', {        
        templateUrl: 'views/somos.html',        
      })
      
      .when('/Metodologia', {        
        templateUrl: 'views/metodologia.html',        
      })
     
      .when('/Principales', {        
        templateUrl: 'views/principales.html',        
      })
     
      .when('/Medidas', {        
        templateUrl: 'views/medidas.html',        
      })
     
      .otherwise({
        redirectTo: '/'
      });
  }]);
