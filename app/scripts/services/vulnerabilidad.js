'use strict';

angular.module('quitoClimateStudyApp')
  .service('Vulnerabilidad', function Vulnerabilidad() {
    // vulnerabilities
    var vulnerabilities = [
    	{
    		name: 'Agua',
    		description: 'Please add text describing the sector for the Description del sector',
    		furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
    		analysisNarrative: 'Please add text for the Narrativa sobre el análisis para el sector Exposure, Sensitivity, Adaptative Capacity',

            questions:
            [
                {
                    name: 'Potable Urbano',
                    description: 'Explicación sobre cómo genera los escenarios utilizando las diferentes opciones del menú de la izquierda.',
                    base:
                    [
                        {
                            section: '',
                            layers: // name for title, data for source file (raster directory if tiles, name minus type suffix if vector), type for ui binding
                            [
                                {
                                    name: 'Digital Elevation Map',
                                    data: 'dem',                                    
                                    type: 'raster',
                                    isSelected: false
                                },
                                {
                                    name: 'DMQ Outline',
                                    data: 'DMQ_outline',
                                    type: 'vector',
                                    isSelected: false                           
                                },
                                {
                                    name: 'Lines of Conduction',
                                    data: 'lines_of_conduction',                                    
                                    type: 'vector',
                                    isSelected: false
                                },
                                {
                                    name: 'Catchment Watersheds ',
                                    data: 'cuencas_final_weap_4',
                                    type: 'vector',
                                    isSelected: false                            
                                },
                                {
                                    name: 'Urban Service Areas',
                                    data: 'service_areas_final',                                    
                                    type: 'vector',
                                    isSelected: false
                                }
                            ]
                        }                        
                    ],
                    exposures: 
                    [
                       {
                            section: 'Temperatura Promedio',
                            layers: 
                            [
                                {
                                    name: 'Historic (1960 - 1990)',
                                    data: 'hist_tmed_an',                                    
                                    type: 'raster',
                                    isSelected: false
                                },
                                {
                                    name: 'Future (2050)',
                                    data: 'tmed_an_2050',
                                    type: 'raster',
                                    isSelected: false                           
                                },
                                {
                                    name: 'Change (+ °C)',
                                    data: 'tmed_dif_alto',                                    
                                    type: 'raster',
                                    isSelected: false
                                }
                            ]
                        },
                        {
                            section: 'Precipitacion (Cuencas de Captacion)',
                            layers: 
                            [
                                {
                                    name: 'Historic (1971 - 2007)',
                                    data: 'annual_precip_historic',                                    
                                    type: 'vector',
                                    isSelected: false
                                },
                                {
                                    name: 'Drought',
                                    data: 'annual_precip_drought',
                                    type: 'vector',
                                    isSelected: false                           
                                }
                            ]
                        },
                        {
                            section: 'Paramo Land Use (Cuencas de Captacion)',
                            layers: 
                            [
                                {
                                    name: 'Historic (1971 - 2007)',
                                    data: 'Paramo_Historical',                                    
                                    type: 'vector'
                                },
                                {
                                    name: 'Drought',
                                    data: 'Paramo_Future',
                                    type: 'vector',
                                    isSelected: false                           
                                },
                                {
                                    name: 'Percent Loss (2050)',
                                    data: 'Paramo_Loss',
                                    type: 'vector',
                                    isSelected: false                           
                                }
                            ]
                        }
                    ],
                    sensitivityAnalysis: 
                    [
                        {
                            section: 'Population (Zonas de Servicio)',
                            layers: 
                            [
                                {
                                    name: 'Historic (1971 - 2007)',
                                    data: 'Paramo_Historical',                                    
                                    type: 'vector',
                                    isSelected: false
                                },
                                {
                                    name: 'Drought',
                                    data: 'Paramo_Future',
                                    type: 'vector',
                                    isSelected: false                           
                                },
                                {
                                    name: 'Percent Loss (2050)',
                                    data: 'Paramo_Loss',
                                    type: 'vector',
                                    isSelected: false                           
                                }
                            ]
                        }
                    ],
                    vulnerability2050:
                    [
                        {
                            section: 'Satisfecha de Demandas - Agua Potable Urbano Frente',
                            layers: 
                            [
                                
                            ]
                        }
                    ]
                }
            ]    		    
    	}    
    ];

    return {
        getVulnerabilityNames: function() {
            return _.pluck(vulnerabilities, 'name');
        },

        getIntroOfVulnerabilityByName: function(name){
            var vuln = _.findWhere(vulnerabilities, { name: name });
            return {
                name: name,
                description: vuln.description,
                furtherInfoReport: vuln.furtherInfoReport,
                analysisNarrative: vuln.analysisNarrative,
                questionNames: _.pluck(vuln.questions, 'name')
            };
        },

        getQuestionsOfVulnerability: function(name){
            return _.map(_.findWhere(vulnerabilities, {name : name }).questions, function(q){
                return {
                    vulnerability: name,
                    name: q.name,
                    description: q.description
                };
            });
        },

        getQuestionByName: function(vulnerability, name){
            return _.findWhere(_.findWhere(vulnerabilities, {name : vulnerability }).questions, {name : name });
        }
    };
  });
