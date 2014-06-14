'use strict';

angular.module('quitoClimateStudyApp')
  .service('Vulnerabilidad', ['$http', function Vulnerabilidad($http) {
    // vulnerabilities
    var vulnerabilities = [
        {
            name: 'Clima',
            description: 'En el Reporte “Análisis Integrado de Amenazas Relacionada con el Cambio Climático, aspectos naturales y socioeconómicos” se describe un conjunto de datos climáticos a escala reducida de las Parroquias del DMQ con temperatura media mínima y máxima mensual y precipitación total mensual en una resolución de 0.5°. Para la corrección del sesgo se utilizó el método de desagregación espacial (BCSD) de Maurer et al. 2007 que consigna los datos de clima a una resolución gruesa de los GCMs (Modelos de Clima Global) y reduce la escala a la resolución más fina de 0.5° para varios modelos de circulación general, y para muchos de estos GCMs y miembros de ensamblaje múltiple.',
            furtherInfoReport: 'Analisis_Amenazas_CambioClimático', //'WP1-Analisis_Climatico-DMQ_Final_24abril14',
            analysisNarrative: '',
            questions:
            [
                {
                    name: 'Datos Históricos y Futuros (2050)',
                    description: 'Explicación sobre cómo se genera los escenarios utilizando las diferentes opciones del menú de la izquierda.',
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
                                            name: 'Mapa de elevación digital',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: false,
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
                                            isSelected: false,
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
                                            name: 'Red Vial',
                                            data: 'Red_Vial',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Ríos',
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
                            title: 'Estaciones Históricas (fuente: SADMQ)',
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
                                    section: 'Temperatura Mínima',
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
                                            name: "Histórica (1960-1990) Sep 9",
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
                                    section: 'Temperatura Máxima',
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
                            title: 'Precipitación DMQ Histórica',
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
                                    section: 'Precipitacion Mínima',
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
                                            name: "Histórica (1960 - 1990) Jul",
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
                                            name: "Histórica (1960 - 1990) Feb",
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
            name: 'Ecosistemas',
            description: 'El estudio de vulnerabilidad en el sector ecosistemas constituye la primera evaluación del grado de exposición y sensibilidad del DMQ frente a diferentes amenazas antrópicas y climáticas. Si bien es cierto que los ecosistemas nativos del DMQ representan el 60% de su territorio, el crecimiento acelerado de la mancha urbana entre otros factores socioeconómicos, está ejerciendo una fuerte presión sobre los ecosistemas nativos, la cobertura vegetal y el uso del suelo.   La Secretaría de Ambiente del DMQ, identificó cinco tipos de ecosistemas de particular interés, que son evaluados a continuación: (1) arbustales secos y relictos de bosque seco, (2) vegetación paramuna, (3) bosques húmedos y plantaciones forestales, (4) arbustos húmedos, y (5) vegetación en regeneración. Bajo este contexto los factores de exposición en este sector se definen en función de las amenazas climáticas y no climáticas. Se debe considerar que la sensibilidad es evaluada en dos diferentes aspectos: (1) la capacidad de recuperación del ecosistema en el área directamente destruida o degradada por una amenaza, y (2) la capacidad de resiliencia y/o resistencia del ecosistema en el área indirectamente afectada por ella.  Adicionalmente, para evaluar la vulnerabilidad “actual” frente amenazas no-climáticas se analizó el mapa de exposición de cada una de estas amenazas con el mapa de cobertura vegetal del año 2009. A su vez, el índice de vulnerabilidad frente a la amenaza climática fue desarrollado mediante la integración espacial de un indicador de exposición y cinco indicadores de sensibilidad que se calcularon para cada fragmento de ecosistema.  A continuación se describen los principales resultados: El ecosistema de arbustales secos y relictos de bosque seco se reconoce como el más vulnerable frente a las amenazas antrópicas. Es decir el 17% de su área total es considerada con altos niveles de vulnerabilidad. La vegetación paramuna (88%) de su área y los bosques húmedos (80%) de su área,  presenta niveles de vulnerabilidad bajos frente a factores antrópicos. La mayor parte del DMQ cubierta por arbustales secos y relictos de bosque seco (70%) y bosques húmedos/plantaciones forestales (68%) tiene una vulnerabilidad climática relativamente baja. Se evidencia que frente al incremento de temperatura bajo un escenario pesimista de emisiones de carbono, el ecosistema de páramo presenta niveles medios y altos de vulnerabilidad; 47% de su área total y  53% de su área total, respectivamente. Finalmente, se recomienda mejorar la generación de información a detalle, de tal manera que sea posible profundizar en estudios específicos sobre la biología/ecología de las especies y su respuesta frente a diferentes amenazas antrópicas y climáticas.',
            furtherInfoReport: 'Análisis_Vulnerabilidad_Climática_DMQ', //'WP5 6 Vuln. CC Ecosistemas DMQ 17_feb_14',
            analysisNarrative: '',
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
                                            isSelected: false,
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
                                            isSelected: false,
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
                                            name: 'Cobertura Vegetal',
                                            data: 'cob_veg_II',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Ecosistemas 1986',
                                            data: 'Ecosistema_1986',
                                            type: 'raster',
                                            isSelected: false,
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
                                    section: '',
                                    layers: // name for title, data for source file (raster directory if tiles, name minus type suffix if vector), type for ui binding
                                    [ 
                                        {
                                            name: 'Alta Tensión Líneas Eléctricas',
                                            data: 'Alta_Tension',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Oleoductos',
                                            data: 'Oleoductos',
                                            type: 'vector',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Cultivos',
                                            data: 'Cultivos',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Recurrencia de Incendios (1991 - 2009)',
                                            data: 'incendios_recurrencia',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Mancha Urbana 2009',
                                            data: 'mancha_urbana',
                                            type: 'raster',
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
                                            name: 'Exposición Agregada',
                                            data: 'Ind_Exp',
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
                                            name: 'Ecosistemas 2009',
                                            data: 'Ecosistema_2009',
                                            type: 'raster',
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
                                    section: 'Población (Zonas de Servicio)',
                                    layers: 
                                    [
                                        {
                                            name: 'Índice de Vulnerabilidad',
                                            data: 'IND_VULNER_NO_CC',
                                            type: 'raster',
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
                                            isSelected: false,
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
                                            isSelected: false,
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
                                            name: 'Cobertura Vegetal',
                                            data: 'cob_veg_II',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Ecosistemas',
                                            data: 'Ecosistema_2009',
                                            type: 'raster',
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
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Exposición de Ecosistemas',
                                            data: 'estrcutura_ecosistema',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
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
                            sections: [
                                {
                                    section: '',
                                    layers: 
                                    [
                                        {
                                            name: 'Funcionalidad de Ecosistemas',
                                            data: 'FuncionalidadEcosistema',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Índice de Aislamiento',
                                            data: 'ind_aislamiento',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Índice Área de Fragmento',
                                            data: 'ind_area_de_fragmento',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Índice del Área Núcleo',
                                            data: 'ind_areanucleo_areaborde',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Índice Perímetro',
                                            data: 'ind_perimetro',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Sensibilidad Promedio',
                                            data: 'sensibilidad_promedio',
                                            type: 'raster',
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
                                            data: 'vulnerabilidad',
                                            type: 'raster',
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
            description: 'Si bien es cierto, la seguridad alimentaria de la población del DMQ no depende exclusivamente de la producción del sector agrícola del Distrito, los diferentes tipos de cultivos existentes en su territorio, pone en evidencia la vulnerabilidad de este sector frente a la variación climática en los diferentes rangos altitudinales de producción, que van desde los 500 hasta los 3600 metros sobre el nivel del mar (msnm), y que comprenden zonas de clima templado, sub-templado hasta subtropical. Con respecto a los factores de exposición y sensibilidad inherentes a este sector, en primer lugar se evaluó el nivel de exposición al incremento de temperatura y se estimó la acumulación de Unidades de Calor (UC)  de los cultivos tradicionales, a fin de establecer cómo los períodos de crecimiento de los cultivo pueden ser afectados.  En segundo lugar, para determinar el nivel de sensibilidad de los cultivos a cambios de temperaturas, se cuantificaron las UC proyectadas al año 2050 para el escenario climático más adverso, es decir, con base en la ruta de mayores emisiones de carbono (RCP 8.5) . En forma específica se evaluaron dos componentes de sensibilidad; (I) sensibilidad en función del crecimiento y producción, a partir de la determinación del factor de  reducción de crecimiento por temperatura (RCT), y (II) sensibilidad del ciclo de crecimiento de cultivos; análisis que se fundamenta en el cálculo y acumulación de las UC requeridas para alcanzar la madurez fisiológica de los cultivos. Como caso de interés y relacionado con el sector agua, se determinó la vulnerabilidad de los páramos frente al incremento de temperatura en el rango de elevación superior a los 3600 msnm. Definidos los componentes de vulnerabilidad, en primera instancia se espera que el incremento de temperaturas tenga un efecto positivo en el desarrollo de los cultivos, principalmente cultivos anuales y en menor medida frutales y caña de azúcar. Esto debido a que las temperaturas medias pronosticadas a futuro, serán similares a las temperaturas óptimas de desarrollo de los cultivos. Ahora bien, debido al incremento de temperaturas habrá una acumulación más rápida de las UC, con ello, los ciclos de crecimiento de los cultivos en el DMQ se pueden ver acortados en tiempo y duración. A su vez, se observa que la superficie en las bandas de elevación desde los 3600 a 4200 msnm, son susceptibles al incremento del área cultivada debido a los aumentos de temperatura. Así por ejemplo, podría ocurrir una migración de áreas de cultivo de papa a altitudes mayores, razón por la cual, las áreas de los páramos se verán amenazadas por la expansión de la frontera agrícola. Es imposible predecir con exactitud cuánto se expandirá la frontera agrícola, pero posiblemente, los páramos enfrentarán una amenaza significativa debido al avance de los cultivos, principalmente el cultivo de la papa y a la presión poblacional producida por el crecimiento de la mancha urbana entre otros factores. Considerando los resultados obtenidos, se recomienda la implementación del modelo de crecimiento de plantas (PGM -  Plant Growth Method) de WEAP (Water Evaluation And Planning System), para determinar con mayor detalle y precisión la vulnerabilidad del  sector agrícola ante el cambio climático. El modelo PGM de WEAP estima el efecto potencial del cambio climático y el incremento en las concentraciones atmosféricas de CO2 en los rendimientos de cultivos agrícolas y sus requerimientos hídricos bajo condiciones futuras cambiantes. También se sugiere el estudio de los sistemas agroforestales, los cuales son de importancia regional.',
            furtherInfoReport: 'Análisis_Vulnerabilidad_Climática_DMQ', //'WP5-6 Vuln. CC Agricultura DMQ 17_feb_14',
            analysisNarrative: '', 
            questions:[
                /*{
                    name: 'q1',
                    description: '¿Cuál es la vulnerabilidad de los cultivos agrícolas a la variabilidad climática?',
                    categories: []
                },*/
                {
                    name: 'Reducción en el Ciclo de Crecimiento',
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
                                            name: 'Mapa de elevación digital',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: false,
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
                                            isSelected: false,
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
                                            name: 'Tipos de Cultivos',
                                            data: 'Cultivos_spec',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Cobertura Vegetal',
                                            data: 'cob_veg_II',
                                            type: 'raster',
                                            isSelected: false,
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
                                            name: 'Future (2050)',
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
                                            data: 'Sensibilidad_regiones_ciclos',                                    
                                            type: 'raster',
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
                                            name: 'Mapa de elevación digital',
                                            data: 'dem',                                    
                                            type: 'raster',
                                            isSelected: false,
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
                                            isSelected: false,
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
                                            name: 'Cobertura Vegetal',
                                            data: 'cob_veg_II',
                                            type: 'raster',
                                            isSelected: false,
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
                                            name: 'Future (2050)',
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
                                            name: 'Aumento en Áreas Potenciales Cultivadas ',
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
            name: 'Salud',
            description: 'Las implicaciones directas o indirectas de las variaciones del clima en la salud de los habitantes del DMQ es un tema de creciente interés institucional. Instituciones como la Secretaría del Ambiente, la Secretaría y el Ministerio de Salud del Distrito, Universidades e Institutos de investigación, han orientado sus esfuerzos en identificar y reducir los factores que afectan la salud humana, particularmente, aquellos relacionados con el clima.  Es así como este estudio de vulnerabilidad, apunta a identificar que tan vulnerable es la población del DMQ frente enfermedades relacionadas con el clima y su relación con variables socioeconómicas. En el estudio se analizan únicamente las condiciones actuales de la región. Los factores de exposición se determinan a partir de dos factores (I)  la presencia de enfermedades; neumonía, bronquitis y asma, (II) variables climáticas temperatura y precipitación. En segundo lugar los factores de sensibilidad a partir de factores socioeconómicos (I)porcentaje de adultos mayores de 65 años, (II) nivel de escolaridad en mujeres mayores de 24 años y (III) acceso al servicio de agua potable. En base a los factores de sensibilidad y exposición se calcula el índice de vulnerabilidad para el sector salud. Los principales resultados determinan que las parroquias con mayor vulnerabilidad se ubican en la zona Noroccidental del DMQ. Esta región presenta altos índices de sensibilidad, es decir, bajos niveles de escolaridad y una población de adultos mayores. Adicionalmente se tiene presencia constante y frecuente de  enfermedades relacionadas con el clima y altos niveles  de precipitación. La zona urbana de Quito presenta altos niveles de exposición a enfermedades respiratorias, así como precipitaciones frecuentes. Sin embargo, tiene un nivel de vulnerabilidad moderada debido a las condiciones socioeconómicas favorables de la región. Es probable que este escenario cambie en un futuro, debido al incremento de eventos climáticos extremos u otros factores. Por otro lado, la mayoría las parroquias rurales muestran niveles de vulnerabilidad alta ó moderada, principalmente ocasionada por condiciones socioeconómicas bajas. Excepto la zona oriental con bajos niveles de enfermedades y calidad de vida aceptable. Cabe resaltar que a partir de este estudio se cuenta con un modelo sólido de análisis de vulnerabilidad para el sector salud. Se recomienda mejorar la integralidad de la información para garantizar calidad y cantidad de datos para generar análisis de vulnerabilidad más completo y objetivos. Para una segunda fase, se hace pertinente evaluar escenarios futuros de vulnerabilidad hacia el año 2050, así como un análisis complementario que relacione cáncer de piel y variables climáticas.',
            furtherInfoReport: 'Análisis_Vulnerabilidad_Climática_DMQ', //'WP1-Analisis_Climatico-DMQ_Final_24abril14',
            analysisNarrative: '',

            questions:
            [
                {
                    name: 'Q1',
                    description: '¿Cuál es la vulnerabilidad de la población a distintas enfermedades frente al cambio climático?',
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
                                            isSelected: false,
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
                                            isSelected: false,
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
                            title: 'Sensibilidad',
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
                },
                /*{
                    name: 'Q2',
                    description: '¿Cuáles enfermedades que afectan a la población del DMQ tienen una mayor relación con las variables climáticas?',
                    categories: []                 
                },
                {
                    name: 'Q3',
                    description: '¿Qué rol juegan las condiciones socioeconómicas y la prevalencia de enfermedades, en el marco del análisis de la vulnerabilidad al cambio climático en el sector salud?',
                    categories: []                 
                },
                {
                    name: 'Q4',
                    description: '¿Cómo se interrelacionan los tres tipos de variables consideradas en el análisis?',
                    categories: []                 
                }*/
            ]               
        },
        {
            name: 'Agua',
            description: 'El análisis de  vulnerabilidad del sector agua en el DMQ, radica principalmente en estimar la sensibilidad y exposición de las fuentes de agua para el abastecimiento de agua potable de una población estimada en 2´4 millones de habitantes. Cabe resaltar, que este estudio comprende el análisis de vulnerabilidad en función del abastecimiento de agua potable en las áreas de servicio atendidas por la Empresa Metropolitana de Alcantarillado y Agua Potable de Quito (EPMAPS), ubicadas en zonas aledañas al Distrito. El estudio, considera dos tipos de unidades de análisis: (I) las cuencas hidrográficas aportantes de agua “cruda” y (II) las zonas de servicio de agua potable. En relación a los factores de exposición y sensibilidad, en primer lugar se definen dos componentes para exposición: (I) la variación climática en las cuencas aportantes en función de la temperatura y  la precipitación, y (II) el área que es ocupada por el páramo en las cuencas aportantes. En segundo lugar, para estimar el nivel de sensibilidad se analiza (I) la cobertura del suministro de agua potable en relación al consumo per cápita y  (II) el número de habitantes en las zonas de servicio del DMQ. Finalmente, para determinar la vulnerabilidad en el caso particular del sector agua, se utiliza el modelo WEAP (Water Evaluation And Planning System) (Sieber and Purkey 2011) . Con los componentes mencionados anteriormente, se evaluaron cinco escenarios de vulnerabilidad que podrían perturbar el servicio de abastecimiento de agua potable del EPMAPS al año 2050. A continuación se describen los principales resultados; se evidencia que la demanda de agua potable en el área urbana del DMQ durante la década del 2000 al 2010 fue cubierta en un 100%. De la misma manera, se determina que la cobertura del servicio de agua potable para el área urbana del DMQ, proyectada al año 2050 será afectada parcialmente por la variación climática, se debe destacar que este escenario es sin considerar futuros proyectos como es el caso de Ríos Orientales. Considerando los resultados de modelamiento en WEAP en la última década 2040-2050, se puede pensar que en un futuro habrá problemas en el abastecimiento de agua potable en el DMQ. Esta aseveración se la realiza bajo los supuestos considerados en los Escenarios 1 a 5 (ver figura) del presente estudio: (1) crecimiento de población, (2) crecimiento de la población y aumento de la temperatura, (3) crecimiento de población, aumento de la temperatura y períodos prolongados de sequía, (4) crecimiento de población, aumento de la temperatura y la pérdida del páramo, (5) crecimiento de población, aumento de temperatura, períodos prolongados de sequía, y la pérdida de páramo. En los escenarios más extremos (Escenario 3 y 5), se estima que habrá una reducción de la cobertura en el servicio urbano de agua potable en un 10%. Es decir, solo el 90% de la demanda podrá ser atendida, de ahí que el sistema es considerado altamente vulnerable. A partir de los resultados obtenidos, se sugiere implementar una segunda fase en colaboración con EPMAPS que incluya incertidumbres no consideradas en el estudio. Por ejemplo las interacciones con el sector agrícola, las cuales son caracterizadas por grandes volúmenes demandados de agua e incluir el sector rural dentro del análisis de las demandas. Cabe resaltar la importancia de considerar además el uso de herramientas, como la toma de decisiones robustas bajo escenarios de incertidumbre en sistemas hídricos, para desarrollar análisis integrados de recursos hídricos.',
            furtherInfoReport: 'Análisis_Vulnerabilidad_Climática_DMQ', //'WP5 6 Vuln. CC Agua DMQ 17_feb_14',
            analysisNarrative: '',
            questions:
            [
                {
                    name: 'Pregunta 1 dentro de un contexto de servicion de agua potable en el sector urbano',
                    description: '¿Qué tan vulnerable es el sistema de abastecimiento de agua potable en el DMQ en función de la oferta y demanda de agua actual y futura?',
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
                                            isSelected: false,
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
                                            isSelected: false,
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
                                },
                                {
                                    section: 'Precipitación (Cuencas de Captación)',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórico (1971 - 2007)',
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
                                    section: 'Uso de Área de Páramo (Cuencas de Captacion)',
                                    layers: 
                                    [
                                        {
                                            name: 'Histórico (2007)',
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
                                            name: 'Porcentaje de Pérdida (2050)',
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
                            title: 'Análisis de sensibilidad',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Población (Zonas de Servicio)',
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
                            title: 'Vulnerabilidad',
                            isOpen: false,
                            sections: [
                                {
                                    section: 'Satisfacción de Demandas - Agua Potable Urbano Frente',
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
                                            name: 'Aumento de Temperatura + Pérdida de Área de Páramo + Sensibilidad al Aumento de Población',
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
            name: 'Riesgos',
            description: 'El Distrito Metropolitano de Quito es uno de los municipios más afectados en el Ecuador por los incendios forestales. Cada verano la problemática se agudiza poniendo de manifiesto la situación de vulnerabilidad del Distrito. Existen 15 años de evidencia de una elevada intensidad y cantidad de incendios, particularmente durante el periodo 2001 al  2009. Así mismo, el año 2012 estuvo marcado por temperaturas extremas y fuertes sequías; factores que incrementaron la intensidad y frecuencia de los  incendios, causando daños en áreas protegidas de gran biodiversidad, en espacios de propiedad pública y privada de diferentes usos y, en general, efectos en el  bienestar de la población. Por lo tanto, la  Secretaria de Seguridad y Gobernabilidad y su Dirección de Riesgos y la Secretaria del Ambiente han venido implementado acciones de prevención, así como de mejoramiento en los planes de emergencia de incendios. Sin embargo, las formas de gestión son aún limitadas. Para complementar este esfuerzo, el estudio de vulnerabilidad apunta a desarrollar una herramienta para mejorar el conocimiento del comportamiento de los incendios en el DMQ frente a factores relacionados con actividades antrópicas y variables climáticas. ',
            furtherInfoReport: 'Análisis_Vulnerabilidad_Climática_DMQ', //'WP5 6 Vuln. CC Riesgos DMQ 17_feb_14',
            analysisNarrative: 'Para el análisis frente amenazas antrópicas se definen dos indicadores de sensibilidad: (I) un indicador espacial de inicio de fuego (ISMF)  (II) un indicador histórico de inicio de fuego (IHMF) . El análisis de estos indicadores determinan los niveles de presión antrópica sobre las áreas de incendios forestales. Por otro lado, se establece un indicador de sensibilidad climática (ISC) compuesto por (I) un indicador de régimen pluviométrico (IRP), (II) un indicador de régimen térmico (IRT). Finalmente, las zonas expuestas son las áreas en “riesgo o peligro”. El resultados de presión de inicio de fuego y del Indicador de sensibilidad climática determina las zonas donde, además de presión antropogénica, existen tendencias elevadas de propagación. El análisis del riesgo presente indica que el  78% del territorio del DMQ está en riesgo de incendio forestal alto ó moderado (35% y 43%) respectivamente. Las zonas más vulnerables son las parroquias ubicadas al nororiente del Municipio, en particular, Ilalo, Calacalí, Puellaro,  Perucho, Llano Chico, Calderón, Nayón y ciertas zonas muy puntuales de Calacali,  Nono y Lloa. Esto debido a una fuerte presión antropogénica, así como factores de iniciación y propagación de incendios. A su vez, son regiones en desarrollo, con alta densidad de población y varios proyectos estratégicos en proceso de implementación; factores que incrementan su condición de vulnerabilidad. Cabe resaltar que en un escenario a partir del incremento en los índices de sensibilidad climática al 2050, la tendencia de los riesgos de incendio forestal aumenta considerablemente en Quito y sus zonas aledañas. Se recomienda para futuros estudios complementar el análisis de factores antropogénicos considerando variables como: proyecciones de población, movilidad en función de las vías, y asentamientos humanos dispersos. Así como, mejorar la información geográfica de aquellas áreas donde se aplica la práctica de quemas voluntarias en agricultura. Además, mejorar la calidad y cantidad de información  histórica de incendios con indicadores de intensidad, superficie y tipología. Finalmente, se recomienda el uso de  esta herramienta para identificar en otros sectores relevantes como ecosistemas, las zonas de riesgo de incendios forestales.',
            questions:[
                /*{
                    name: 'Zonas de mayor propagación',
                    description: '¿Cuáles son las zonas de mayor propagación del fuego?',
                    categories: []
                },
                {
                    name: 'Incendios Relacionan',
                    description: '¿Cómo se relacionan las acciones antrópicas en la generación de los incendios?',
                    categories: []
                },*/
                {
                    name: 'Incendios Forestales',
                    description: '¿Cuál es el efecto de la variabilidad climática en el aumento de los incendios?',
                    categories:
                    [
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
                                            isSelected: false,
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
                                            isSelected: false,
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
                                            name: 'Cobertura Vegetal',
                                            data: 'cob_veg_II',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Recurrencia de Incendios (1991 - 2009)',
                                            data: 'incendios_recurrencia',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Uso de Suelo 2009',
                                            data: 'USO_SUELO_2009',
                                            type: 'raster',
                                            isSelected: false,
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
                                },
                                {
                                    section: 'Amenaza Actual (Fuente: SADMQ)',
                                    layers: 
                                    [
                                        {
                                            name: 'Amenaza Incendios Forestales Potencial',
                                            data: 'amenaza_incendios_forestales_potencial',
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1                           
                                        },
                                        {
                                            name: 'Incendio Inicio Histórico',
                                            data: 'incendio_inicio_historico_ipmf',
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
                                            name: 'Sensibilidad a Incendios Histórico (1960 - 1990) - Julio, Agosto, Septiembre',
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
                                            name: 'Factor de Amenaza de Incendio Histórico (1960 - 1990)',
                                            data: 'inicio_propagacion_iipf_h',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Factor de Amenaza de Incendio a Futuro (2010 - 2050)',
                                            data: 'inicio_propagacion_iipf_f',                                    
                                            type: 'raster',
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
                                            name: 'Peligro de Incendios Histórico (1960 - 1990)',
                                            data: 'Peligro_isip_h',                                    
                                            type: 'raster',
                                            isSelected: false,
                                            opacity: 1
                                        },
                                        {
                                            name: 'Peligro de Incendios Futuro (2010 - 2050)',
                                            data: 'Peligro_isip_h',                                    
                                            type: 'raster',
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
                    description: q.description,
                    isEmptyQuestion: _.isEmpty(q.categories)
                };
            });
        },    

        getQuestionByName: function(vulnerability, questionName){
            return _.findWhere(_.findWhere(vulnerabilities, {name : vulnerability }).questions, {name : questionName });
        },

        getPathOfVector: function(name) {
            return 'vector/' + name + '.json';
            // return 'vector/' + name + '.topojson';
        },

        getPathToRootOfRaster: function(name) {
            return 'raster/' + name + '/';
        }
    };

  }]);