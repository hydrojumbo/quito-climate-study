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
    		name: 'Informe Percepciones al Cambio Climático DMQ',
    		file: 'Informe Percepciones CC DMQ mar_13.rar'
    	},
    	{
    		name: 'Análisis Integrado de Amenazas Relacionada con el Cambio Climático, aspectos naturales y socioeconómicos',
    		file: 'Analisis_Vulnerabilidad_Climatica_DMQ.pdf'
    	},
    	{
    		name: 'Estructura de la Metodología Para la Estimación de la Vulnerabilidad al Cambio Climático en el Distrito Metropolitano de Quito',
    		file: 'Metodologia_Vulnerabilidad_CambioClimatico_DMQ.pdf'
    	},
        {
            name: 'Distrito Metropolitano de Quito: Resultados del Análisis de Vulnerabilidad Climática para los sectores prioritarios: Agricultura, Ecosistemas, Agua, Riesgos y Salud',
            file: 'Analisis_Vulnerabilidad_Climatica_DMQ.pdf'
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
