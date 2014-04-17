'use strict';

angular.module('quitoClimateStudyApp')
  .service('Vulnerabilidad', ['$http', function Vulnerabilidad($http) {
    // vulnerabilities
    var vulnerabilities = [
        {
            name: 'Sector Agua',
            description: 'La vulnerabilidad del sector agua en el DMQ radica principalmente en que las fuentes de agua para el abastecimiento de la población (urbana y rural) se encuentran fuera del territorio del DMQ. Cabe resaltar, que este estudio comprende el análisis de vulnerabilidad en función del abastecimiento de agua potable en las áreas de servicio atendidas por la Empresa Metropolitana de Alcantarillado y Agua Potable de Quito (EMAAP-Q). Además, considera dos tipos de unidades de análisis: (I) las cuencas hidrográficas aportantes de agua “cruda” y (II) las zonas de servicio agua potable. ',
            furtherInfoReport: 'WP5 6 Vuln. CC Agua DMQ 17_feb_14',
            analysisNarrative: 'El análisis busca responder a una pregunta específica mencionada a continuación. En relación a los factores de exposición y sensibilidad, en primer lugar se definen dos componentes para exposición: (I) la variación climática en las cuencas aportantes en función de la temperatura y  la precipitación, y (II) el área en las cuencas aportantes que es ocupada por el páramo. En segundo lugar, para estimar el nivel de sensibilidad se analiza (I) la cobertura del suministro de agua potable en relación al consumo per cápita y  (II) el número de habitantes en las zonas de servicio del DMQ. Finalmente, para determinar la vulnerabilidad en el caso particular del sector agua, se utiliza el modelo WEAP (Water Evaluation And Planning System) (Sieber and Purkey 2011) . Con los componentes mencionados anteriormente, se evaluaron cinco escenarios de vulnerabilidad que podrían afectar el servicio de abastecimiento de agua potable del EPMAAP-Q al año 2050.',

            questions:
            [
                {
                    name: 'Pregunta 1: dentro de un contexto de servicion de agua potable en el sector urbano',
                    description: '¿Qué tan vulnerable es el sistema de abastecimiento de agua potable en el DMQ  en función de la oferta y demanda de agua  actual y futura?',
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
                                            name: 'Mapa de Elevación Digital',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Delimitación del DMQ',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Líneas de condución',
                                            data: 'lines_of_conduction',                                    
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Cuencas ',
                                            data: 'cuencas_final_weap_4',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1                            
                                        },
                                        {
                                            name: 'Áreas de Servicio Urbano',
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
                                            name: 'Histórico (1960 - 1990)',
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
                                    section: 'Precipitación (Cuencas de Captacion)',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórico (1971 - 2007)',
                                            data: 'annual_precip_historic',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1,
                                            isOutlined: true
                                        },
                                        {
                                            name: 'Sequía',
                                            data: 'annual_precip_drought',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1,
                                            isOutlined: true
                                        }
                                    ]
                                },
                                {
                                    section: 'Uso de Área de Páramo (Cuencas de Captacion)',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórico (2007)',
                                            data: 'Paramo_Historical',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Futuro (2050)',
                                            data: 'Paramo_Future',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Porcentaje de Pérdida (2050)',
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
                            title: 'Análisis de Sensibilidad',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Population (Zonas de Servicio)',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórico (2010 Census)',
                                            data: 'Population_2010',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Futuro (2050)',
                                            data: 'Population_2050',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Porcentaje de Crecimiento (2010 - 2050)',
                                            data: 'Population_Growth_2010_2050',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Niveles de Sensibilidad (Bajo, Medio, Alto)',
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
                                            name: 'Aumento de Temperatura + Sensibiliad al Aumento de Población ',
                                            data: 'Scenario2_Coverage',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Aumento de temperatura + Sequía + Sensibilidad al Aumento de Población',
                                            data: 'Scenario3_Coverage',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Aumento de Temperatura + Perdida de Area de Páramo + Sensibilidad al Aumento de Población',
                                            data: 'Scenario4_Coverage',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Aumento de Temperatura + Sequía + Pérdida de Área de Páramo + Sensibilidad al Aumento de Población',
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
            name: 'Análisis Climático',
            description: 'Please add text describing this vulnerability.',
            furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
            analysisNarrative: 'Please add a brief analysis narrative.',

            questions:
            [
                {
                    name: 'Datos Históricos y Futuros (2050)',
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
                                            name: 'Mapa de Elevación Digital',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Delimitación DMQ',
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
                                            name: 'Ríos',
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
                            title: 'Estaciones Históricas (fuente: INAMHI)',
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
                                            name: 'Precipitación (11 estaciones)',
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
                                            name: 'Temperatura y Precipitación',
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
                                    section: 'Temperatura Mínima',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórica (1960 - 1990)',
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
                                            name: 'Histórica (1960 - 1990)',
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
                                    section: 'Temperatura Máxima',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórica (1960 - 1990)',
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
                                            name: "Histórica (1960-1990) Jan 1",
                                            data: "jan_1_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                        },
                                        {
                                            name: "Histórica (1960-1990) Feb 2",
                                            data: "feb_2_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) Mar 3",
                                            data: "mar_3_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) Abr 4",
                                            data: "abr_4_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) May 5",
                                            data: "may_5_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) Jun 6",
                                            data: "jun_6_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) Jul 7",
                                            data: "jul_7_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) Aug 8",
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
                                            name: "Histórica (1960-1990) Oct 10",
                                            data: "oct_10_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) Nov 11",
                                            data: "nov_11_tmin",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960-1990) Dec 12",
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
                                        name: "Histórica (1960 - 1990) Jan 1",
                                        data: "jan_1_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Feb 2",
                                        data: "feb_2_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Mar 3",
                                        data: "mar_3_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Abr 4",
                                        data: "abr_4_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) May 5",
                                        data: "may_5_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Jun 6",
                                        data: "jun_6_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Jul 7",
                                        data: "jul_7_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Aug 8",
                                        data: "aug_8_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Sep 9",
                                        data: "sep_9_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Oct 10",
                                        data: "oct_10_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Nov 11",
                                        data: "nov_11_tmed",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Dec 12",
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
                                        name: "Histórica (1960 - 1990) Jan 1",
                                        data: "jan_1_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Feb 2",
                                        data: "feb_2_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Mar 3",
                                        data: "mar_3_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Abr 4",
                                        data: "abr_4_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) May 5",
                                        data: "may_5_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Jun 6",
                                        data: "jun_6_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Jul 7",
                                        data: "jul_7_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Aug 8",
                                        data: "aug_8_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Sep 9",
                                        data: "sep_9_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Oct 10",
                                        data: "oct_10_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Nov 11",
                                        data: "nov_11_tmax",
                                        type: "raster",
                                        isSelected: false,
                                        opacity: 1.0
                                      },
                                      {
                                        name: "Histórica (1960 - 1990) Dec 12",
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
                            title: 'Precipitacion DMQ Histórica',
                            isOpen: false,
                            sections: [
                                {
                                    section: '',
                                    layers:
                                    [
                                        {
                                            name: 'Precipitación DMQ Histórica (SADMQ)',
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
                            title: 'Precipitación Anual (fuente: WorldClim)',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Precipitacion',
                                    layers:
                                    [
                                        {
                                            name: 'Histórica (1960 - 1990)',
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
                            title: 'Precipitación Mensual (fuente: WorldClim)',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Precipitación Mínima',
                                    layers:
                                    [
                                          {
                                            name: "Histórica (1960 - 1990) Jan",
                                            data: "jan_1_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Feb",
                                            data: "feb_2_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Mar",
                                            data: "mar_3_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Abr",
                                            data: "abr_4_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) May",
                                            data: "may_5_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Jun",
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
                                            name: "Histórica (1960 - 1990) Aug",
                                            data: "aug_8_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Sep",
                                            data: "sep_9_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Oct",
                                            data: "oct_10_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Nov",
                                            data: "nov_11_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Dec",
                                            data: "dec_12_pr",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Ene",
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
                                            name: "Histórica (1960 - 1990) Mar",
                                            data: "mar_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Abr",
                                            data: "abr_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) May",
                                            data: "may_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Jun",
                                            data: "jun_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Jul",
                                            data: "jul_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Aug",
                                            data: "aug_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Sep",
                                            data: "sep_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Oct",
                                            data: "oct_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Nov",
                                            data: "nov_pr_2050",
                                            type: "raster",
                                            isSelected: false,
                                            opacity: 1.0
                                          },
                                          {
                                            name: "Histórica (1960 - 1990) Dic",
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
            description: 'Si bien es cierto, la seguridad alimentaria de la población del DMQ no depende exclusivamente de la producción del sector agrícola del Distrito, los diferentes tipos de cultivos existentes en su territorio, pone en evidencia la vulnerabilidad de este sector frente a la variación climática en los diferentes rangos altitudinales de producción, que van desde los 500 hasta los 3600 msnm. y que comprenden zonas de clima templado, sub-templado hasta subtropical',
            furtherInfoReport: 'WP5-6 Vuln. CC Agricultura DMQ 17_feb_14', // Laura: this should be the name of a pdf document you include in the app/documents/ directory before publishing the site
            analysisNarrative: 'Con respecto a los factores de exposición y sensibilidad inherentes a este sector, en primer lugar se evaluó el nivel de exposición al incremento de temperatura y se estimó la acumulación de Unidades de Calor (UC)  de los cultivos tradicionales, a fin de establecer cómo los períodos de crecimiento de los cultivo pueden ser afectados.  En segundo lugar, para determinar el nivel de sensibilidad de los cultivos a cambios de temperaturas, se cuantificaron las UC proyectadas al año 2050 para el escenario climático más adverso, es decir, con base en la ruta de mayores emisiones de carbono (RCP 8.5) . En forma específica se evaluó dos componentes de sensibilidad (I) sensibilidad en función del crecimiento y producción, a partir de la determinación del factor de  reducción de crecimiento por temperatura (RCT),  y (II) sensibilidad del ciclo de crecimiento de cultivos; análisis que se fundamenta en el cálculo y acumulación de las UC requeridas para alcanzar la madurez fisiológica de los cultivos. Como caso de interés y relacionado con el sector agua, se tomo un caso particular se determinó la vulnerabilidad de los páramos frente al incremento de temperatura en el rango de elevación superior a los 3600 msnm. Definidos los componentes de sensibilidad, en primera instancia se espera que el incremento de temperaturas tenga un efecto positivo en el desarrollo de los cultivos, principalmente caña de azúcar, maíz y cultivos anuales. Esto debido a que las temperaturas medias pronosticadas a futuro, serán similares a las temperaturas óptimas de desarrollo de los cultivos. Ahora bien, debido al incremento de temperaturas habrá una acumulación más rápida de las UC, con ello, los ciclos de crecimiento de los cultivos en el DMQ se pueden ver acortados en tiempo y duración. A su vez, se observa que la superficie en las bandas de elevación desde los 3600 a 4200 msnm, son susceptibles al incremento del área cultivada debido a los aumentos de temperatura. Así por ejemplo, podría ocurrir una migración de áreas de cultivo de papa a altitudes mayores, razón por la cual, las áreas de los páramos se verán amenazadas por la expansión de la frontera agrícola. Es imposible predecir con exactitud cuánto se expandirá la frontera agrícola, pero posiblemente, los páramos enfrentarán una amenaza significativa debido al avance de los cultivos, principalmente el cultivo de la papa y a la presión poblacional producida por el crecimiento de la mancha urbana entre otros factores. Considerando los resultados obtenidos, se recomienda la implementación del modelo de crecimiento de plantas (PGM -  Plant Growth Method) de WEAP (Water Evaluation And Planning System), para determinar con mayor detalle y precisión la vulnerabilidad del  sector agrícola ante el cambio climático. El modelo PGM de WEAP estima el efecto potencial del cambio climático y el incremento en las concentraciones atmosféricas de CO2 en los rendimientos de cultivos agrícolas y sus requerimientos hídricos bajo condiciones futuras cambiantes. También se sugiere el estudio de los sistemas agroforestales, los cuales son de importancia regional y un análisis más particular para determinar el efecto de la acumulación de horas frio entre otros factores.',
            questions:[
                {
                    name: 'Reduccion en el Ciclo de Crecimiento',
                    description: '¿Cuál es la sensibilidad de los cultivos y cómo pueden verse afectados en la duración de los ciclos de crecimiento por cambios en temperatura?',
                    categories: [
                        {        
                            id: 'base',                    
                            title: 'Mapa Base',
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
                                            name: 'Delimitaciones DMQ',
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
                                            name: 'Regiones Climáticas',
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
                                            name: 'Histórico (1960 - 1990)',
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
                                }
                            ]
                        },
                        {
                            id: 'sensitivity',
                            title: 'Sensibilidad',
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
                                            name: 'Vulnerabilidad de Regiones Climáticas ',
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
                    name: 'Reducción de Páramo frente la Frontera Agrícola',
                    description: '¿Cómo la variabilidad climática afectará la exposición de los cultivos a cambios en temperatura y su efecto en el crecimiento; así como los cambios de la frontera agrícola y, por consiguiente, la exposición de los páramos a cambios en dicha frontera?',
                    categories: [
                        {        
                            id: 'base',                    
                            title: 'Mapa Base',
                            isOpen: true,
                            sections: [
                                {
                                    section: '',
                                    layers: // name for title, data for source file (raster directory if tiles, name minus type suffix if vector), type for ui binding
                                    [
                                        {
                                            name: 'Mapa de Elevación Digital',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Delimitaciones DMQ',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Regiones de Páramo',
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
                            title: 'Exposición',
                            isOpen: false,
                            sections: [                                
                                {
                                    section: 'Temperatura Promedio',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórico (1960 - 1990)',
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
                                }
                            ]
                        },
                        {
                            id: 'sensitivity',
                            title: 'Sensibilidad',
                            isOpen: false,
                            sections:[
                                {
                                    section: '',
                                    layers:[
                                        {
                                            name: 'Aumento en Áreas  Cultivadas Potencialmente',
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
                                            name: 'Vulnerabilidad de Regiones Climáticas ',
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
            description: 'El Distrito Metropolitano de Quito es uno de los municipios más afectados en el Ecuador por los incendios forestales. Cada verano la problemática se agudiza poniendo de manifiesto la situación de vulnerabilidad del Distrito. Existen 15 años de evidencia de una elevada intensidad y cantidad de incendios, particularmente durante el periodo 2001 al  2009. Así mismo, el año 2012 estuvo marcado por temperaturas extremas y fuertes sequías; factores que incrementaron la intensidad y frecuencia de los  incendios, causando daños en áreas protegidas de gran biodiversidad, en espacios de propiedad pública y privada de diferentes usos y, en general, efectos en el  bienestar de la población. Por lo tanto, la  Secretaria de Seguridad y Gobernabilidad y su Dirección de Riesgos y la Secretaria del Ambiente han venido implementado acciones de prevención, así como de mejoramiento en los planes de emergencia de incendios. Sin embargo, las formas de gestión son aún limitadas. Para complementar este esfuerzo, el estudio de vulnerabilidad apunta a desarrollar una herramienta para mejorar el conocimiento del comportamiento de los incendios en el DMQ frente a factores relacionados con actividades antrópicas y variables climáticas.',
            furtherInfoReport: 'WP5 6 Vuln. CC Riesgos DMQ 17_feb_14',
            analysisNarrative: 'Para el análisis frente amenazas antrópicas se definen dos indicadores de sensibilidad: (I) un indicador espacial de inicio de fuego (ISMF)  (II) un indicador histórico de inicio de fuego (IHMF) . El análisis de estos indicadores determinan los niveles de presión antrópica sobre las áreas de incendios forestales. Por otro lado, se establece un indicador de sensibilidad climática (ISC) compuesto por (I) un indicador de régimen pluviométrico (IRP), (II) un indicador de régimen térmico (IRT). Finalmente, las zonas expuestas son las áreas en “riesgo o peligro”. El resultados de presión de inicio de fuego y del Indicador de sensibilidad climática determina las zonas donde, además de presión antropogénica, existen tendencias elevadas de propagación. El análisis del riesgo presente indica que el  78% del territorio del DMQ está en riesgo de incendio forestal alto ó moderado (35% y 43%) respectivamente. Las zonas más vulnerables son las parroquias ubicadas al nororiente del Municipio, en particular, Ilalo, Calacalí, Puellaro,  Perucho, Llano Chico, Calderón, Nayón y ciertas zonas muy puntuales de Calacali,  Nono y Lloa. Esto debido a una fuerte presión antropogénica, así como factores de iniciación y propagación de incendios. A su vez, son regiones en desarrollo, con alta densidad de población y varios proyectos estratégicos en proceso de implementación; factores que incrementan su condición de vulnerabilidad. Cabe resaltar que en un escenario a partir del incremento en los índices de sensibilidad climática al 2050, la tendencia de los riesgos de incendio forestal aumenta considerablemente en Quito y sus zonas aledañas. Se recomienda para futuros estudios complementar el análisis de factores antropogénicos considerando variables como: proyecciones de población, movilidad en función de las vías, y asentamientos humanos dispersos. Así como, mejorar la información geográfica de aquellas áreas donde se aplica la práctica de quemas voluntarias en agricultura. Además, mejorar la calidad y cantidad de información  histórica de incendios con indicadores de intensidad, superficie y tipología. Finalmente, se recomienda el uso de  esta herramienta para identificar en otros sectores relevantes como ecosistemas, las zonas de riesgo de incendios forestales.',
            questions:[
                {
                    name: 'Incendios Forestales',
                    description: '¿Cuál es el efecto de la variabilidad climática en el aumento de los incendios?  ',
                    categories: []
                }
            ]
        },
        {
            name: 'Ecosistemas',
            description: 'El estudio de vulnerabilidad en el sector ecosistemas constituye la primera evaluación del grado de exposición y sensibilidad del DMQ frente a diferentes amenazas antrópicas y climáticas. Si bien es cierto que los ecosistemas nativos del DMQ representan el 60% de su territorio, el crecimiento acelerado de la mancha urbana entre otros factores socioeconómicos, está ejerciendo una fuerte presión sobre los ecosistemas nativos, la cobertura vegetal y el uso del suelo. La Secretaría de Ambiente del DMQ, identificó cinco tipos de ecosistemas en el se tiene particular interés y que a continuación son evaluados: (1) arbustales secos y relictos de bosque seco, (2) vegetación paramuna, (3) bosques húmedos y plantaciones forestales, (4) arbustos húmedos, y (5) vegetación en regeneración. Identificado los elementos expuestos frente a la variación climática se presentan las preguntas relevantes del sector. ',
            furtherInfoReport: 'WP5 6 Vuln. CC Ecosistemas DMQ 17_feb_14',
            analysisNarrative: 'Bajo este contexto los factores de exposición en este sector se definen en función de las amenazas climáticas y no climáticas. Se debe considerar que las amenazas climáticas, la sensibilidad son evaluadas en diferentes aspectos: (1) la capacidad de recuperación del ecosistema en el área directamente destruida o degradada por una amenaza, y (2) la capacidad de resiliencia y/o resistencia del ecosistema en el área indirectamente afectada por ella.  Adicionalmente, para evaluar la vulnerabilidad “actual” frente amenazas no-climáticas se analizó el mapa de exposición de cada una de estas amenazas con el mapa de cobertura vegetal del año 2009. A su vez, el índice de vulnerabilidad frente a la amenaza climática fue desarrollado mediante la integración espacial de un indicador de exposición y cinco indicadores de sensibilidad que se calcularon para cada fragmento de ecosistema.  A continuación se describen los principales resultados:  El ecosistema de arbustales secos y relictos de bosque seco se reconoce como el más vulnerable frente a las amenazas antrópicas. Es decir el 17% de su área total es considerada con altos niveles de vulnerabilidad. La vegetación paramuna (88%) de su área y los bosques húmedos (80%) de su área,  presenta niveles de vulnerabilidad bajos frente a factores antrópicos. La mayor parte del DMQ cubierta por arbustales secos y relictos de bosque seco (70%) y bosques húmedos/plantaciones forestales (68%) tiene una vulnerabilidad climática relativamente baja. Se evidencia que frente al incremento de temperatura bajo un escenario pesimista de emisiones de carbono, el ecosistema de páramo presenta niveles medios y altos de vulnerabilidad; 47% de su área total y  53% de su área total, respectivamente. Finalmente, se recomienda mejorar la generación de información a detalle,de tal manera que sea posible profundizar en estudios específicos sobre la biología/ecología de las especies y su respuesta frente a diferentes amenazas antrópicas y climáticas. ',
            questions:[
                {
                    name: 'Amenaza No Climáticas',
                    description: '¿Cuál es la vulnerabilidad actual de los ecosistemas de interés frente a las amenazas no climáticas de origen antrópico?',
                    categories: []
                },
                {
                    name: 'Amenaza Climática',
                    description: '¿Cuál es la vulnerabilidad futura de los ecosistemas de interés frente a la amenaza climática de incremento gradual de temperatura promedio anual?',
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
