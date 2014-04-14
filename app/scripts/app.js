'use strict';

angular.module('quitoClimateStudyApp', [
  'ngResource',
  'ngRoute',
  'leaflet-directive',
  'ui.bootstrap'/*,
  'ngSlider'*/
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
        controller: 'LongflowcontrollerCtrl'   
      })
      
      .when('/Metodologia', {        
        templateUrl: 'views/metodologia.html',        
        controller: 'LongflowcontrollerCtrl'
      })
     
      .when('/Principales', {        
        templateUrl: 'views/principales.html',        
        controller: 'LongflowcontrollerCtrl'
      })
     
      .when('/Medidas', {        
        templateUrl: 'views/medidas.html',        
        controller: 'LongflowcontrollerCtrl'
      })
     
      .otherwise({
        redirectTo: '/'
      });
  }]);
