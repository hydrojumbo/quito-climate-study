'use strict';

angular.module('quitoClimateStudyApp')
  .service('Vulnerabilidad', ['$http', function Vulnerabilidad($http) {
    // vulnerabilities
    var vulnerabilities = [
        {
            name: 'Clima',
            description: 'En el Reporte “Análisis Integrado de Amenazas Relacionada con el Cambio Climático, aspectos naturales y socioeconómicos” describe un conjunto de datos climáticos a escala reducida de las Parroquias del DMQ con temperatura media mínima y máxima mensual y precipitación total mensual en una resolución de 0.5°. Para la corrección del sesgo se utilizó el método de desagregación espacial (BCSD) de Maurer et al. 2007 que consigna los datos de clima a una resolución gruesa de los GCMs (Modelos de Clima Global) y reduce la escala a la resolución más fina de 0.5° para varios modelos de circulación general, y para muchos de estos GCMs y miembros de ensamblaje múltiple.',
            furtherInfoReport: 'Please make this the file name of a PDF document for more information as on Pagina 3 of spreadsheet',
            analysisNarrative: '',

            questions:
            [
                {
                    name: 'Datos Historicos y Futuros (2050)',
                    description: 'Explicación sobre cómo genera los escenarios utilizando las diferentes opciones del menú de la izquierda.',
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
                                            opacity: 1,
                                            isTopo: true
                                        },         
                                        {
                                            name: 'Poblados',
                                            data: 'Poblados',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }, 
                                        {
                                            name: 'Red Vial',
                                            data: 'Red_Vial',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Rios',
                                            data: 'Rios',
                                            type: 'vector',
                                            isSelected: false,
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
            name: 'Ecosistemas',
            description: 'El estudio sectorial de vulnerabilidad en el sector ecosistemas constituye la primera evaluación del grado de exposición y sensibilidad del DMQ frente a diferentes amenazas antrópicas y climáticas. Si bien es cierto que los ecosistemas nativos del DMQ representan el 60% de su territorio, el crecimiento acelerado de la mancha urbana entre otros factores, está ejerciendo una fuerte presión sobre los ecosistemas nativos, la cobertura vegetal y el uso del suelo. Cinco categorías de ecosistemas de interés del Municipio del DMQ son evaluados: (1) arbustales secos y relictos de bosque, (2) vegetación paramuna, (3) bosques húmedos y plantaciones forestales, (4) arbustos húmedos, y (5) vegetación en regeneración. ',
            furtherInfoReport: 'WP5 6 Vuln. CC Ecosistemas DMQ 17_feb_14',
            analysisNarrative: 'El siguiente punto trata los factores de exposición y sensibilidad. Para empezar, los factores de exposición en este sector se definen en función de las amenazas climáticas y no climáticas. Por otro lado para las amenazas climáticas, la sensibilidad es evaluada en dos diferentes aspectos: (1) la capacidad de recuperación del ecosistema en el área directamente destruida o degradada por una amenaza, y (2) la capacidad de resiliencia y/o resistencia del ecosistema en el área indirectamente afectada por ella.  Adicionalmente, para evaluar la vulnerabilidad “actual” frente amenazas no-climáticas se cruzó el mapa de exposición de cada una de estas amenazas con el mapa de cobertura vegetal del año 2009. A su vez, el índice de vulnerabilidad frente a la amenaza climática fue desarrollado mediante la integración espacial de un indicador de exposición y cinco indicadores de sensibilidad que se calcularon para cada fragmento de ecosistema.  A continuación se describen los principales resultados: El ecosistema de arbustales secos y relictos de bosque seco se reconoce como el más vulnerable frente a las amenazas antrópicas. Es decir el 17% de su área total es considerada con altos niveles de vulnerabilidad. La vegetación paramuna (88%) de su área y los bosques húmedos (80%) de su área,  presenta niveles de vulnerabilidad bajos frente a factores antrópicos. La mayor parte del DMQ cubierta por arbustales secos y relictos de bosque seco (70%) y bosques húmedos/plantaciones forestales (68%) tiene una vulnerabilidad climática relativamente baja. Se evidencia que frente al incremento de temperatura bajo un escenario pesimista de emisiones de carbono, el ecosistema de páramo presenta niveles medios y altos de vulnerabilidad; 47% de su área total y  53% de su área total, respectivamente. Finalmente, se recomienda mejorar la calidad y cantidad de la información disponible. De tal manera que sea posible profundizar en estudios específicos sobre la biología/ecología de las especies y su respuesta frente a diferentes amenazas antrópicas y climáticas. Lo anterior, con el propósito de evaluar de manera más objetiva la vulnerabilidad de los ecosistemas en el DMQ.',
            questions:[
                {
                    name: 'Amenaza No Climáticas',
                    description: '¿Cuál es la vulnerabilidad actual de los ecosistemas de interés frente a las amenazas no climáticas de origen antrópico?',
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
                                            name: 'Delimitación del DMQ',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Alta Tension Lineas Electricas',
                                            data: 'Alta_Tension',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Oleoductos',
                                            data: 'Oleoductos',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }/* ==> TOO BIG,,
                                        {
                                            name: 'Cultivos',
                                            data: 'Cultivos',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }*/,
                                        {
                                            name: 'Recurrencia de Incendios (1991 - 2009)',
                                            data: 'Incendios_Recurrencia',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }/* ==> TOO BIG,
                                        {
                                            name: 'Uso de Suelo 1986',
                                            data: 'USO_SUELO_1986',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Uso de Suelo 2009',
                                            data: 'USO_SUELO_2009',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }*/
                                    ]
                                }
                            ]
                        },
                        {                 
                            id: 'vulnerability',   
                            title: 'Vulnerabilidad',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Population (Zonas de Servicio)',
                                    layers: 
                                    [
                                        {
                                            name: 'Indice de Vulnerabilidad',
                                            data: 'IND_VULNER_NO_CC',
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
                    name: 'Amenaza Climática',
                    description: '¿Cuál es la vulnerabilidad futura de los ecosistemas de interés frente a la amenaza climática de incremento gradual de temperatura promedio anual?',
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
                                            name: 'Delimitación del DMQ',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }/* ==> TOO BIG,
                                        {
                                            name: 'Ecosistemas',
                                            data: 'Ecosistemas',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }*/
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
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Exposición de Ecosistemas',
                                            data: 'Estrcutura_Ecosistema',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Historico (1960 - 1990)',
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
                            sections: [
                                {
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Funcionalidad de Ecosistemas',
                                            data: 'FuncionalidadEcosistema',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Indice de Aislamiento',
                                            data: 'IND_Aislamiento',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Indice Área de Fragmento',
                                            data: 'IND_Area_de_Fragmento',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Indice del Área Núcleo',
                                            data: 'IND_AreaNucleo_AreBorde',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Indice Perímetro',
                                            data: 'Ind_Perimetro',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Sensibilidad Promedio',
                                            data: 'Sensibilidad_Promedio',
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
                            title: 'Vulnerabilidad',
                            isOpen: false,
                            sections: [
                                {
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Vulnerabilidad',
                                            data: 'Vulnerabilidad_ECO',
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
            name: 'Agricultura',
            description: 'Si bien cierto que la seguridad alimentaria de la población del DMQ no depende de la producción del sector agrícola del Distrito, los diferentes tipos de cultivos existentes y su relación con la elevación sobre el nivel del mar, pone en evidencia la  vulnerabilidad del sector frente a la variación climática en las diferentes zonas del DMQ (templada, sub-templada, y subtropical). Este estudio abarca el análisis de vulnerabilidad de los cultivos tradicionales producidos en la zona del Distrito.',
            furtherInfoReport: 'WP5-6 Vuln. CC Agricultura DMQ 17_feb_14',
            analysisNarrative: 'Con respecto a los factores de exposición y sensibilidad. En primer lugar para determinar el nivel de exposición al incremento de temperatura, se estimó la acumulación de Unidades de Calor (UC) , a fin de establecer cómo los períodos de crecimiento del cultivo pueden ser afectados.  En segundo lugar, para determinar el nivel de sensibilidad de los cultivos a cambios de temperaturas, se cuantificaron las UC proyectadas al año 2050 para el escenario climático más adverso, es decir, con base en la ruta de mayores emisiones de carbono (RCP 8.5) . En particular se evalúan dos componentes de sensibilidad: I) sensibilidad en función del crecimiento y producción, a partir de la determinación del factor de  reducción de crecimiento por temperatura (RCT),  y (II) sensibilidad del ciclo de crecimiento de cultivos; análisis que se fundamenta en el cálculo y acumulación de las UC requeridas para alcanzar la madurez fisiológica de los cultivos. Finalmente, para determinar la vulnerabilidad de los páramos frente al incremento de temperatura, se analizaron las regiones con páramos en el DMQ y con elevación superior a los 3400 msnm. Examinaremos brevemente los principales resultados. En primera instancia se espera que el incremento de temperaturas tenga un efecto positivo en el desarrollo de los cultivos. Esto debido a que las temperaturas medias pronosticadas a futuro, serán similares a las temperaturas óptimas de desarrollo de los cultivos. Ahora bien, debido al incremento de temperaturas habrá una acumulación más rápida de las UC, con ello, los ciclos de crecimiento de los cultivos en el DMQ se pueden ver acortados en tiempo y duración. A su vez, se observa que la superficie en las bandas de elevación desde los 3600 a 4200 msnm, son susceptibles al incremento del área cultivada debido a los aumentos de temperatura. Así por ejemplo, podría ocurrir una migración de áreas de cultivo de papa a altitudes mayores, razón por la cual, las áreas de los páramos se verán amenazadas por la expansión de la frontera agrícola. Es imposible predecir con exactitud cuánto se expandirá la frontera agrícola, pero posiblemente, los páramos enfrentarán una amenaza significativa debido al avance de los cultivos, principalmente el cultivo de la papa y al crecimiento de la mancha urbana entre otros factores. Considerando los resultados obtenidos, se recomienda la implementación del modelo de crecimiento de plantas (PGM -  Plant Growth Method) de WEAP (Water Evaluation And Planning System), para determinar con mayor detalle y precisión la vulnerabilidad del  sector agrícola ante el cambio climático. El modelo PGM de WEAP estima el efecto potencial del cambio climático y el incremento en las concentraciones atmosféricas de CO2 en los rendimientos de cultivos agrícolas y sus requerimientos hídricos bajo condiciones futuras cambiantes.',
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
                                            name: 'DMQ Outline',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }/* ==> TOO BIG,,
                                        {
                                            name: 'Cultivos',
                                            data: 'Cultivos',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }*/,
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
            name: 'Salud',
            description: 'La vulnerabilidad del sector salud en el DMQ',
            furtherInfoReport: 'Input Text',
            analysisNarrative: 'Input Text',

            questions:
            [
                {
                    name: 'Input Text',
                    description: 'Input Text',
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
                                            name: 'Parroquias',
                                            data: 'Parroquias_Poly',                                    
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Cabeceras Parroquiales',
                                            data: 'cabeceras_parroquiales',                                    
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Delimitación del DMQ',
                                            data: 'DMQ_outline_wgs1984',
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
                                            name: 'Historico (1960 - 1990)',
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
                                        },
                                        {
                                            name: 'Indicador de egresos hospitalarios por neumonía',
                                            data: 'Indicador_egresos_neum',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Indicador de egresos hospitalarios por bronquitis',
                                            data: 'Indicador_egresos_bron',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Indicador de egresos hospitalarios por asma',
                                            data: 'Indicador_egresos_asma',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Índice de Exposición Inferido (en base a Índice de Exposición e Índice Climático)',
                                            data: 'Indicador_exp_inferido',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Índicede climático (normalizado)',
                                            data: 'Indice_climatico',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Índice Climático, proyectado al 2050',
                                            data: 'Indice_climatico_2050',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        }
                                    ]
                                },
                            ]
                        },                
                        {                 
                            id: 'sensitivity',   
                            title: 'Sensitivity Analysis',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Indicadores de Sensibilidad',
                                    layers: 
                                    [
                                        {
                                            name: 'Indicador de población mayor de 64 años',
                                            data: 'Indicador_de_poblacion_mayor_de_64_anios',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Indicador de acceso a agua potable',
                                            data: 'Indicador_acceso_agua_potable',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Indicador de años de escolaridad de mujeres',
                                            data: 'Indicador_escolaridad_mujeres',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Índicede sensibilidad (normalizado)',
                                            data: 'Indicador_sens_norm',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
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
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Índice de Vulnerabilidad (normalizado)',
                                            data: 'Indice_vuln',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
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
            name: 'Agua',
            description: 'La vulnerabilidad del sector agua en el DMQ radica principalmente en que las fuentes de agua para el abastecimiento de la población (urbana y rural) se encuentran fuera del territorio del DMQ. Cabe resaltar, que este estudio comprende el análisis de vulnerabilidad en función del abastecimiento de agua potable en las áreas de servicio atendidas por la Empresa Metropolitana de Alcantarillado y Agua Potable de Quito (EMAAP-Q). Además, considera dos tipos de unidades de análisis: (I) las cuencas hidrográficas aportantes de agua “cruda” y (II) las zonas de servicio agua potable. ',
            furtherInfoReport: 'WP5 6 Vuln. CC Agua DMQ 17_feb_14',
            analysisNarrative: 'El análisis busca responder a una pregunta específica mencionada a continuación. En relación a los factores de exposición y sensibilidad, en primer lugar se definen dos componentes para exposición: (I) la variación climática en las cuencas aportantes en función de la temperatura y  la precipitación, y (II) el área en las cuencas aportantes que es ocupada por el páramo. En segundo lugar, para estimar el nivel de sensibilidad se analiza (I) la cobertura del suministro de agua potable en relación al consumo per cápita y  (II) el número de habitantes en las zonas de servicio del DMQ. Finalmente, para determinar la vulnerabilidad en el caso particular del sector agua, se utiliza el modelo WEAP (Water Evaluation And Planning System) (Sieber and Purkey 2011) . Con los componentes mencionados anteriormente, se evaluaron cinco escenarios de vulnerabilidad que podrían afectar el servicio de abastecimiento de agua potable del EPMAAP-Q al año 2050.',

            questions:
            [
                {
                    name: 'Pregunta 1 dentro de un contexto de servicion de agua potable en el sector urbano',
                    description: '¿Qué tan vulnerable es el sistema de abastecimiento de agua potable en el DMQ  en función de la oferta y demanda de agua  actual y futura?',
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
                                            name: 'Historico (1960 - 1990)',
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
                                    section: 'Precipitacion (Cuencas de Captacion)',
                                    layers: 
                                    [
                                        {
                                            name: 'Historico (1971 - 2007)',
                                            data: 'annual_precip_historic',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Sequía',
                                            data: 'annual_precip_drought',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        }
                                    ]
                                },
                                {
                                    section: 'Uso de Area de Paramo (Cuencas de Captacion)',
                                    layers: 
                                    [
                                        {
                                            name: 'Historico (2007)',
                                            data: 'Paramo_Historical',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Futuro (2050)',
                                            data: 'Paramo_Future',
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Porcentaje de Perdida (2050)',
                                            data: 'Paramo_Loss',
                                            type: 'vector',
                                            isSelected: false,
                                            isOutlined: true,
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
                                            name: 'Historico (2010 Census)',
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
                                            name: 'Niveles de Sensitividad (Bajo, Medio, Alto)',
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
                                            name: 'Aumento de Temperatura + Sequía + Perdida de Area de Paramo + Sensibilidad al Aumento de Población',
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
            name: 'Riesgos',
            description: 'El Distrito Metropolitano de Quito es uno de los municipios más afectados en el Ecuador por los incendios forestales. Cada verano la problemática se agudiza poniendo de manifiesto la situación de vulnerabilidad del Distrito. Existen 15 años de evidencia de una elevada intensidad y cantidad de incendios, particularmente durante el periodo 2001 al  2009. Así mismo, el año 2012 estuvo marcado por temperaturas extremas y fuertes sequías; factores que incrementaron la intensidad y frecuencia de los  incendios, causando daños en áreas protegidas de gran biodiversidad, en espacios de propiedad pública y privada de diferentes usos y, en general, efectos en el  bienestar de la población. Por lo tanto, la  Secretaria de Seguridad y Gobernabilidad y su Dirección de Riesgos y la Secretaria del Ambiente han venido implementado acciones de prevención, así como de mejoramiento en los planes de emergencia de incendios. Sin embargo, las formas de gestión son aún limitadas. Para complementar este esfuerzo, el estudio de vulnerabilidad apunta a desarrollar una herramienta para mejorar el conocimiento del comportamiento de los incendios en el DMQ frente a factores relacionados con actividades antrópicas y variables climáticas. ',
            furtherInfoReport: 'WP5 6 Vuln. CC Riesgos DMQ 17_feb_14',
            analysisNarrative: 'Para el análisis frente amenazas antrópicas se definen dos indicadores de sensibilidad: (I) un indicador espacial de inicio de fuego (ISMF)  (II) un indicador histórico de inicio de fuego (IHMF) . El cruce de estos indicadores determinan los niveles de presión antrópica sobre las áreas de incendios forestales. Por otro lado, se establece un indicador de sensibilidad climática (ISC) compuesto por (I) un indicador de régimen pluviométrico (IRP), (II) un indicador de régimen térmico (IRT). Finalmente, las zonas expuestas son las áreas en “riesgo o peligro”. El cruce de resultados de presión de inicio de fuego y del Indicador de sensibilidad climática determina las zonas donde, además de presión antropogénica, existen tendencias elevadas de propagación. El análisis del riesgo presente indica que el  78% del territorio del DMQ está en riesgo de incendio forestal alto ó moderado (35% y 43%) respectivamente. Las zonas más vulnerables son las parroquias ubicadas al nororiente del Municipio, en particular, Ilalo, Calacalí, Puellaro,  Perucho, Llano Chico, Calderón, Nayón y ciertas zonas muy puntuales de Calacali,  Nono y Lloa. Esto debido a una fuerte presión antropogénica, así como factores de iniciación y propagación de incendios. A su vez, son regiones en desarrollo, con alta densidad de población y varios proyectos estratégicos en proceso de implementación; factores que incrementan su condición de vulnerabilidad. Cabe resaltar que en un escenario a partir del incremento en los índices de sensibilidad climática al 2050, la tendencia de los riesgos de incendio forestal aumenta considerablemente en Quito y sus zonas aledañas. Se recomienda para futuros estudios complementar el análisis de factores antropogénicos considerando variables como: proyecciones de población, movilidad en función de las vías, y asentamientos humanos dispersos. Así como, mejorar la información geográfica de aquellas áreas donde se aplica la práctica de quemas voluntarias en agricultura. Además, mejorar la calidad y cantidad de información  histórica de incendios con indicadores de intensidad, superficie y tipología. Finalmente, se recomienda el uso de  esta herramienta para identificar en otros sectores relevantes como ecosistemas, las zonas de riesgo de incendios forestales.',
            questions:[
                {
                    name: 'Incendios Forestales',
                    description: '¿Cuál es el efecto de la variabilidad climática en el aumento de los incendios?  ',
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
                                            name: 'Delimitación del DMQ',
                                            data: 'DMQ_outline_wgs1984',
                                            type: 'vector',
                                            isSelected: true,
                                            opacity: 1
                                        }/* ==> TOO BIG,,
                                        {
                                            name: 'Cultivos',
                                            data: 'Cultivos',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }*/,
                                        {
                                            name: 'Recurrencia de Incendios (1991 - 2009)',
                                            data: 'Incendios_Recurrencia',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }/* ==> TOO BIG,,
                                        {
                                            name: 'Uso de Suelo 2009',
                                            data: 'USO_SUELO_2009',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }*/
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
                                            name: 'Historico (1960 - 1990)',
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
                                    section: 'Amenaza Actual (Fuente: SADMQ)',
                                    layers: 
                                    [
                                        {
                                            name: 'Amenaza Incendios Forestales Potencial',
                                            data: 'amenaza_incendios_Forestales_Potencial',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Incendio Inicio Historico',
                                            data: 'Incendio_Inicio_Historico_IPMF',
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
                            title: 'Sensibilidad',
                            isOpen: false,
                            sections: [
                                {
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Sensibilidad a Incendios Historico (1960 - 1990) - Julio, Agosto, Septiembre',
                                            data: 'Sensibilidad_climatica_isc_h',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Sensibilidad a Incendios Futuro (2010 - 2050) - Julio, Agosto, Septiembre',
                                            data: 'Sensibilidad_climatica_isc_f',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Susceptibilidad (Producto de combustabilidad, biomasa, topo-morfología)',
                                            data: 'Susceptibilidad_spif',                                    
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
                            title: 'Vulnerabilidad',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Amenaza de Incendio',
                                    layers: 
                                    [
                                        {
                                            name: 'Factor de Amenaza de Incendio Historico (1960 - 1990)',
                                            data: 'Inicio_Propagación_iipf_h',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Factor de Amenaza de Incendio a Futuro (2010 - 2050)',
                                            data: 'Inicio_Propagación_iipf_h',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        }
                                    ]
                                },
                                {
                                    section: 'Riesgo (Susceptibilidad, Inicio, y Propogación)',
                                    layers: 
                                    [
                                        {
                                            name: 'Peligro de Incendios Historico (1960 - 1990)',
                                            data: 'Peligro_isip_h',                                    
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Peligro de Incendios Futuro (2010 - 2050)',
                                            data: 'Peligro_isip_h',                                    
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
            // return 'vector/' + name + '.json';
            return 'vector/' + name + '.topojson';
        },

        getPathToRootOfRaster: function(name) {
            return 'raster/' + name + '/';
        }
    };

  }]);
