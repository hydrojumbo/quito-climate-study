'use strict';

angular.module('quitoClimateStudyApp')
  .service('Introduction', function Introduction() {
    var terms = [
    	{
    		name: 'Adaptación',
    		definition: 'Ajuste  de  los  sistemas  humanos o naturales frente a entornos nuevos o cambiantes. La adaptación al cambio climático se refiere a los ajustes en sistemas humanos o naturales como  respuesta  a estímulos  climáticos proyectados o reales, o sus efectos, que  pueden moderar el  daño  o  aprovechar sus  aspectos  beneficiosos. Se  pueden distinguir  varios tipos de  adaptación, entre ellas  la  preventiva y  la  reactiva, la  pública y  privada, o  la autónoma y la planificada.'
    	},
		{
    		name: 'Antropogénico',
    		definition: 'Resultante o producido por acciones humanas.'
    	},
    	{
    		name: 'Cambio Climático',
    		definition: 'Importante variación estadística en el estado medio del clima o en su variabilidad, que persiste durante un período prolongado (normalmente decenios o incluso más).  El cambio climático se puede deber a procesos naturales internos o a cambios del forzamiento externo, o bien  a cambios persistentes antropogénicos en la composición de la atmósfera o en el uso de las tierras. Se debe  tener en cuenta que la Convención Marco  de las Naciones Unidas  sobre  el Cambio Climático (CMCC), en su Artículo 1, define ‘cambio climático’ como: ‘un cambio de clima atribuido directa o indirectamente a la actividad humana que altera la composición de la atmósfera mundial y que se suma  a la variabilidad natural del clima observada durante períodos de tiempo comparables’. La CMCC distingue entre ‘cambio climático’ atribuido a actividades humanas que alteran la composición atmosférica y ‘variabilidad climática’ atribuida a causas  naturales. Véase también Variabilidad climática.'
    	},
    	{
    		name: 'Capacidad de  adaptación',
    		definition: 'Capacidad de un sistema para  ajustarse al cambio climático (incluida la variabilidad climática y los cambios extremos) a fin de moderar los daños  potenciales, aprovechar las consecuencias positivas, o soportar las consecuencias negativas.'
    	},
    	{
    		name: 'tem',
    		definition: 'def'
    	},
    	{
    		name: 'tem',
    		definition: 'def'
    	},
    	{
    		name: 'tem',
    		definition: 'def'
    	},
    	{
    		name: 'tem',
    		definition: 'def'
    	},
    	{
    		name: 'tem',
    		definition: 'def'
    	},
    	{
    		
    		
    		
    ];

    var methodology = 'Please add a description of the methodology of this study';
    var methodologyDiagram = 'Filename of the workflow diagram of this study';
    var methodologyMoreInfo = 'Filename of a PDF document contiaining more information about methodology';

    return {
        terms: terms,
        methodology: methodology,
        methodologyDiagram: methodologyDiagram,
        methodologyMoreInfo: methodologyMoreInfo
    };
  });
