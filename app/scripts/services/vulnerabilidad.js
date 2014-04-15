'use strict';

angular.module('quitoClimateStudyApp')
  .service('Vulnerabilidad', ['$http', function Vulnerabilidad($http) {
    // vulnerabilities
    var vulnerabilities = [
    	{
    		name: 'Agua',
    		description: 'Please add text describing this vulnerability.',
    		furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
    		analysisNarrative: 'Please add a brief analysis narrative.',

            questions:
            [
                {
                    name: 'Potable Urbano',
                    description: 'Explicación sobre cómo genera los escenarios utilizando las diferentes opciones del menú de la izquierda.',
                    categories: [
                        {        
                            id: 'base',                    
                            title: 'Base Map',
                            isOpen: true,
                            sections: [
                                {
                                    section: '',
                                    layers: // name for title, data for source file (raster directory if tiles, name minus type suffix if vector), type for ui binding
                                    [
                                        {
                                            name: 'Digital Elevation Map',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'DMQ Outline',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Lines of Conduction',
                                            data: 'lines_of_conduction',                                    
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Catchment Watersheds ',
                                            data: 'cuencas_final_weap_4',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1                            
                                        },
                                        {
                                            name: 'Urban Service Areas',
                                            data: 'Urban_Service_Areas',                                    
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {              
                            id: 'exposures',              
                            title: 'Exposures',
                            isOpen: false,
                            sections: [                                
                                {
                                    section: 'Temperatura Promedio',
                                    layers: 
                                    [
                                        {
                                            name: 'Historic (1960 - 1990)',
                                            data: 'hist_tmed_an',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Future (2050)',
                                            data: 'tmed_an_2050',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                          
                                        },
                                        {
                                            name: 'Change (+ °C)',
                                            data: 'tmed_dif_alto',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
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
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Drought',
                                            data: 'annual_precip_drought',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        }
                                    ]
                                },
                                {
                                    section: 'Paramo Land Use (Cuencas de Captacion)',
                                    layers: 
                                    [
                                        {
                                            name: 'Historic (2007)',
                                            data: 'Paramo_Historical',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Future (2050)',
                                            data: 'Paramo_Future',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Percent Loss (2050)',
                                            data: 'Paramo_Loss',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        }
                                    ]
                                }
                            ]
                        },
                        {                 
                            id: 'sensitivity',   
                            title: 'Sensitivity Analysis',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Population (Zonas de Servicio)',
                                    layers: 
                                    [
                                        {
                                            name: 'Historic (2010 Census)',
                                            data: 'Population_2010',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Future (2050)',
                                            data: 'Population_2050',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Percent Growth (2010 - 2050)',
                                            data: 'Population_Growth_2010_2050',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Levels of Sensitivity (Bajo, Medio, Alto)',
                                            data: 'Population_Sensitivity',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        }
                                    ]
                                }
                            ]
                        },
                        {                     
                            id: 'vulnerability',
                            title: 'Vulnerability (2050)',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Satisfecha de Demandas - Agua Potable Urbano Frente',
                                    layers: 
                                    [
                                        {
                                            name: 'Temp Increase + Population Growth Sensitivity ',
                                            data: 'Scenario2_Coverage',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Temp Increase + Drought + Population Growth Sensitivity',
                                            data: 'Scenario3_Coverage',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Temp Increase + Loss of Paramo + Population Growth Sensitivity',
                                            data: 'Scenario4_Coverage',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Temp Increase + Drought + Loss of Paramo + Population Growth Sensitivity',
                                            data: 'Scenario5_Coverage',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        }
                                    ]
                                }
                            ]
                        }
                    ]                    
                }
            ]    		    
    	},
        {
            name: 'Clima',
            description: 'Please add text describing this vulnerability.',
            furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
            analysisNarrative: 'Please add a brief analysis narrative.',

            questions:
            [
                {
                    name: 'Datos Historicos y Futuros (2050)',
                    description: 'Explicación sobre cómo genera los escenarios utilizando las diferentes opciones del menú de la izquierda.',
                    categories: [
                        {        
                            id: 'base',                    
                            title: 'Base Map',
                            isOpen: true,
                            sections: [
                                {
                                    section: '',
                                    layers: // name for title, data for source file (raster directory if tiles, name minus type suffix if vector), type for ui binding
                                    [
                                        {
                                            name: 'Digital Elevation Map',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'DMQ Outline',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Parroquias',
                                            data: 'Parrishes',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },         
                                        {
                                            name: 'Poblados',
                                            data: 'Poblados',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }, 
                                        {
                                            name: 'Red Vial',
                                            data: 'Red_Vial',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Rios',
                                            data: 'Rios',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {              
                            id: 'estacionesHistoricasInamhi',              
                            title: 'Estaciones Historicas (fuente: INAMHI)',
                            isOpen: false,
                            sections: [                                
                                {
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Temperatura (4 estaciones)',
                                            data: 'INAMHI_estaciones_temp',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Precipitacion (11 estaciones)',
                                            data: 'INAMHI_estaciones_precip',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }                                
                            ]
                        },
                        {              
                            id: 'estacionesHistoricasSadmq',              
                            title: 'Estaciones Historicas (fuente: SADMQ)',
                            isOpen: false,
                            sections: [                                
                                {
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Temperatura y Precipitacion',
                                            data: 'SA_estaciones_Agustin',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }                                
                            ]
                        },
                        {              
                            id: 'mapasDeTemperaturaAnual',              
                            title: 'Temperatura Anual (fuente: WorldClim)',
                            isOpen: false,
                            sections: [                                
                                {
                                    section: 'Temperatura Minima',
                                    layers: 
                                    [
                                        {
                                            name: 'Historica (1960 - 1990)',
                                            data: 'hist_tmin_an',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Futuro (2050)',
                                            data: 'tmin_an_2050',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                },
                                {
                                    section: 'Temperatura Mediana',
                                    layers: 
                                    [
                                        {
                                            name: 'Historica (1960 - 1990)',
                                            data: 'hist_tmed_an',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Futuro (2050)',
                                            data: 'tmed_an_2050',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Cambio (+ °C)',
                                            data: 'tmed_dif_alto',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                },
                                {
                                    section: 'Temperatura Maxima',
                                    layers: 
                                    [
                                        {
                                            name: 'Historica (1960 - 1990)',
                                            data: 'hist_tmax_an',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Futuro (2050)',
                                            data: 'tmax_an_2050',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {              
                            id: 'mapasDeTemperaturaAnual',              
                            title: 'Temperatura Mensual (fuente: WorldClim)',
                            isOpen: false,
                            sections : [
                                {
                                    section: 'Temperatura Minima',
                                    layers: 
                                    [
                                        {
                                            name: "Historica (1960-1990) Jan 1",
                                            data: "jan_1_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                        },
                                        {
                                            name: "Historica (1960-1990) Feb 2",
                                            data: "feb_2_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Mar 3",
                                            data: "mar_3_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Abr 4",
                                            data: "abr_4_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) May 5",
                                            data: "may_5_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Jun 6",
                                            data: "jun_6_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Jul 7",
                                            data: "jul_7_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Aug 8",
                                            data: "aug_8_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Sep 9",
                                            data: "sep_9_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Oct 10",
                                            data: "oct_10_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Nov 11",
                                            data: "nov_11_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960-1990) Dec 12",
                                            data: "dec_12_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Jan 1",
                                            data: "jan_1_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Feb 2",
                                            data: "feb_2_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Mar 3",
                                            data: "mar_3_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Abr 4",
                                            data: "abr_4_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) May 5",
                                            data: "may_5_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Jun 6",
                                            data: "jun_6_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Jul 7",
                                            data: "jul_7_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Aug 8",
                                            data: "aug_8_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Sep 9",
                                            data: "sep_9_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Oct 10",
                                            data: "oct_10_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Nov 11",
                                            data: "nov_11_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Futuro (2050) Dec 12",
                                            data: "dec_12_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          }
                                    ]
                                },
                                {
                                    section: 'Temperatura Mediana',
                                    layers: 
                                    [
                                      {
                                        name: "Historica (1960 - 1990) Jan 1",
                                        data: "jan_1_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Feb 2",
                                        data: "feb_2_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Mar 3",
                                        data: "mar_3_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Abr 4",
                                        data: "abr_4_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) May 5",
                                        data: "may_5_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Jun 6",
                                        data: "jun_6_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Jul 7",
                                        data: "jul_7_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Aug 8",
                                        data: "aug_8_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Sep 9",
                                        data: "sep_9_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Oct 10",
                                        data: "oct_10_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Nov 11",
                                        data: "nov_11_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Dec 12",
                                        data: "dec_12_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      }
                                    ]
                                },
                                {
                                    section: 'Temperatura Maxima',
                                    layers: 
                                    [
                                      {
                                        name: "Historica (1960 - 1990) Jan 1",
                                        data: "jan_1_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Feb 2",
                                        data: "feb_2_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Mar 3",
                                        data: "mar_3_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Abr 4",
                                        data: "abr_4_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) May 5",
                                        data: "may_5_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Jun 6",
                                        data: "jun_6_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Jul 7",
                                        data: "jul_7_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Aug 8",
                                        data: "aug_8_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Sep 9",
                                        data: "sep_9_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Oct 10",
                                        data: "oct_10_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Nov 11",
                                        data: "nov_11_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Historica (1960 - 1990) Dec 12",
                                        data: "dec_12_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'precipHistoricaDmq',
                            title: 'Precipitacion DMQ Historica',
                            isOpen: false,
                            sections: [
                                {
                                    section: '',
                                    layers:
                                    [
                                        {
                                            name: 'Precipitacion DMQ Historica (SADMQ)',
                                            data: 'precip_hist',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        }                                        
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'precipitacionMapas',
                            title: 'Precipitacion Anual (fuente: WorldClim)',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Precipitacion',
                                    layers:
                                    [
                                        {
                                            name: 'Historica (1960 - 1990)',
                                            data: 'hist_prec_tot',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                                            
                                        },
                                        {
                                            name: 'Futuro (2050)',
                                            data: 'pre_tot_2050',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                                            
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'precipitacionMapasMensual',
                            title: 'Precipitacion Mensual (fuente: WorldClim)',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Precipitacion Minima',
                                    layers:
                                    [
                                          {
                                            name: "Historica (1960 - 1990) Jan",
                                            data: "jan_1_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Feb",
                                            data: "feb_2_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Mar",
                                            data: "mar_3_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Abr",
                                            data: "abr_4_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) May",
                                            data: "may_5_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Jun",
                                            data: "jun_6_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Jul",
                                            data: "jul_7_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Aug",
                                            data: "aug_8_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Sep",
                                            data: "sep_9_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Oct",
                                            data: "oct_10_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Nov",
                                            data: "nov_11_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Dec",
                                            data: "dec_12_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Ene",
                                            data: "ene_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },                                        
                                          {
                                            name: "Historica (1960 - 1990) Feb",
                                            data: "feb_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Mar",
                                            data: "mar_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Abr",
                                            data: "abr_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) May",
                                            data: "may_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Jun",
                                            data: "jun_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Jul",
                                            data: "jul_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Aug",
                                            data: "aug_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Sep",
                                            data: "sep_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Oct",
                                            data: "oct_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Nov",
                                            data: "nov_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Historica (1960 - 1990) Dic",
                                            data: "dic_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          }  
  
                                    ]
                                }
                            ]
                        }                     
                    ]                    
                }
            ]               
        },
        {
            name: 'Agricultura',
            description: 'Please add text describing this vulnerability.',
            furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
            analysisNarrative: 'Please add a brief analysis narrative.',
            questions:[
                {
                    name: 'Reduccion en Ciclo de Crecimiento',
                    description: 'Please add description of Reduccion en Ciclo de Crecimiento',
                    categories: [
                        {        
                            id: 'base',                    
                            title: 'Base Map',
                            isOpen: true,
                            sections: [
                                {
                                    section: '',
                                    layers: // name for title, data for source file (raster directory if tiles, name minus type suffix if vector), type for ui binding
                                    [
                                        {
                                            name: 'Digital Elevation Map',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'DMQ Outline',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Cultivos',
                                            data: 'Cultivos_1',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },         
                                        {
                                            name: 'Regiones Climaticas',
                                            data: 'regiones_climaticas',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }                                
                            ]
                        },
                        {
                            id: 'exposures',              
                            title: 'Exposures',
                            isOpen: false,
                            sections: [                                
                                {
                                    section: 'Temperatura Promedio',
                                    layers: 
                                    [
                                        {
                                            name: 'Historic (1960 - 1990)',
                                            data: 'hist_tmed_an',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Future (2050)',
                                            data: 'tmed_an_2050',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                          
                                        },
                                        {
                                            name: 'Change (+ °C)',
                                            data: 'tmed_dif_alto',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'sensitivity',
                            title: 'Sensitivity',
                            isOpen: false,
                            sections:[
                                {
                                    section: '',
                                    layers:[
                                        {
                                            name: 'Sensibilidad de los Ciclos de Crecimiento por Cultivos',
                                            data: 'Growth_Season_Sensitivity',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'vulnerability',
                            title: 'Vulnerabilidad (2050)',
                            isOpen: false,
                            sections:[
                                {
                                    section: '',
                                    layers:[
                                        {
                                            name: 'Vulnerabilidad de Regiones Climaticas ',
                                            data: 'Growth_Season_Vulnerability',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ]                    
                },
                {
                    name: 'Reduccion de Paramo frente la Frontera Agricultura',
                    description: 'Please add description of Reduccion en Ciclo de Crecimiento',
                    categories: [
                        {        
                            id: 'base',                    
                            title: 'Base Map',
                            isOpen: true,
                            sections: [
                                {
                                    section: '',
                                    layers: // name for title, data for source file (raster directory if tiles, name minus type suffix if vector), type for ui binding
                                    [
                                        {
                                            name: 'Digital Elevation Map',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'DMQ Outline',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Regiones de Paramo',
                                            data: 'Paramo_Elevation_Bands',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }
                                    ]
                                }                                
                            ]
                        },
                        {
                            id: 'exposures',              
                            title: 'Exposures',
                            isOpen: false,
                            sections: [                                
                                {
                                    section: 'Temperatura Promedio',
                                    layers: 
                                    [
                                        {
                                            name: 'Historic (1960 - 1990)',
                                            data: 'hist_tmed_an',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Future (2050)',
                                            data: 'tmed_an_2050',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                          
                                        },
                                        {
                                            name: 'Change (+ °C)',
                                            data: 'tmed_dif_alto',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'sensitivity',
                            title: 'Sensitivity',
                            isOpen: false,
                            sections:[
                                {
                                    section: '',
                                    layers:[
                                        {
                                            name: 'Aumento en Areas Cultivadas Potencial',
                                            data: 'Paramo_Sensitivity',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'vulnerability',
                            title: 'Vulnerabilidad (2050)',
                            isOpen: false,
                            sections:[
                                {
                                    section: '',
                                    layers:[
                                        {
                                            name: 'Vulnerabilidad de Regiones Climaticas ',
                                            data: 'Growth_Season_Vulnerability',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ]      
                }
            ]
        }, 
        {
            name: 'Incendios',
            description: 'Please add text describing this vulnerability.',
            furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
            analysisNarrative: 'Please add a brief analysis narrative.',
            questions:[
                {
                    name: 'Forestales',
                    description: 'Please add description of Forestales',
                    categories: []
                }
            ]
        },
        {
            name: 'Ecosystems',
            description: 'Please add text describing this vulnerability.',
            furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
            analysisNarrative: 'Please add a brief analysis narrative.',
            questions:[
                {
                    name: 'Current, No C.C.',
                    description: 'Please add description of Current, No C.C.',
                    categories: []
                },
                {
                    name: 'Future, C.C.',
                    description: 'Please add description of Future, C.C.',
                    categories: []
                }
            ]
        }
    ];

    return {
        getVulnerabilityNames: function() {
            return _.pluck(vulnerabilities, 'name');
        },

        getVectorLayers: function(vulnerability, questionName) {
            var selectedLayers = [];
            var question = 
                _.findWhere(
                    _.findWhere(vulnerabilities, {name : vulnerability }).questions, 
                    {name: questionName});


            _.each(question.categories, function(category) {
                _.each(category.sections, function(section){
                    selectedLayers.push(getSelectedLayersOfSection(section));    
                });
            });                        
            
            return _.flatten(selectedLayers);
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

        getQuestionByName: function(vulnerability, questionName){
            return _.findWhere(_.findWhere(vulnerabilities, {name : vulnerability }).questions, {name : questionName });
        },

        getPathOfVector: function(name) {
            return 'vector/' + name + '.json';
        },

        getPathToRootOfRaster: function(name) {
            return 'raster/' + name + '/';
        }
    };

  }]);
