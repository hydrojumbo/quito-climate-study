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
    		name: 'WP1 Análisis Climático DMQ',
    		file: 'WP1-Analisis_Climatico-DMQ.pdf'
    	},
    	{
    		name: 'WP2 3 Metodología Vulnerabilidad DMQ.pdf',
    		file: 'WP2-3-Metodologia-Vulnerabilidad-DMQ.pdf'
    	},
    	{
    		name: 'WP5-6 Vuln. CC Agricultura DMQ 17_feb_14.pdf',
    		file: 'WP5-6-Vuln-CC-Agricultura-DMQ-17_feb_14.pdf.pdf'
    	},
    	{
    		name: 'WP5 6 Vuln. CC Agua DMQ 17_feb_14.pdf',
    		file: 'WP5-6-Vuln.-CC-Agua-DMQ-17_feb_14.pdf'
    	},
    	{
    		name: 'WP5 6 Vuln. CC Ecosistemas DMQ 17_feb_14.pdf',
    		file: 'WP5-6-Vuln.-CC-Ecosistemas-DMQ-17_feb_14.pdf'
    	},
        {
            name: 'WP5 6 Vuln. CC Riesgos DMQ 17_feb_14.pdf',
            file: 'WP5-6-Vuln.-CC-Riesgos-DMQ-17_feb_14.pdf'
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
