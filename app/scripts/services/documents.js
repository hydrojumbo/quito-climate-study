'use strict';

angular.module('quitoClimateStudyApp')
  .service('Documents', function Documents() {
    // (list of documents)
    var documentRoot = 'documents/';    
    var documents = [
        {
            name: 'Agenda Taller 20 Feb, 2014',
            file: 'Agenda Taller 20_feb_2014.pdf'
        },
        {
    		name: 'Informe Percepciones CC DMQ mar 13',
    		file: 'Informe Percepciones CC DMQ mar_13.rar'
    	},
    	{
    		name: 'WP1 Análisis Integrado de Amenazas Relacionada con  el Cambio Climático, aspectos naturales y socioeconómicos',
    		file: 'WP1-Analisis_Climatico-DMQ_Final_24abril14pdf'
    	},
    	{
    		name: 'WP2 3 Metodología Vulnerabilidad DMQ',
    		file: 'WP2-3-Metodologia-Vulnerabilidad-DMQ.pdf'
    	},
    	{
    		name: 'WP5-6 Vuln. CC Agricultura DMQ 17_feb_14',
    		file: 'WP5-6-Vuln-CC-Agricultura-DMQ-17_feb_14.pdf'
    	},
    	{
    		name: 'WP5 6 Vuln. CC Agua DMQ 17_feb_14',
    		file: 'WP5-6-Vuln.-CC-Agua-DMQ-17_feb_14.pdf'
    	},
    	{
    		name: 'WP5 6 Vuln. CC Ecosistemas DMQ 17_feb_14',
    		file: 'WP5-6-Vuln.-CC-Ecosistemas-DMQ-17_feb_14.pdf'
    	},
        {
            name: 'WP5 6 Vuln. CC Riesgos DMQ 17_feb_14',
            file: 'WP5-6-Vuln.-CC-Riesgos-DMQ-17_feb_14.pdf'
        },
        {
            name: 'White Paper: Propuesta metodológica para la Estimación de la Vulnerabilidad al Cambio Climático en el DMQ',
            file: 'White Paper Metodologia-VFinal.pdf'
        }
    ];

    return {
        getDocumentList: function(){
            return _.map(documents, function(doc) {
                return {
                    name: doc.name,
                    file: documentRoot + doc.file
                };
            });
        }
    };
  });
