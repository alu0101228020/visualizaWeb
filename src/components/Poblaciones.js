import React, {useState, useEffect} from 'react';
import {Chart, registerables } from 'chart.js';
import {Bar, Pie } from 'react-chartjs-2';
import './Poblaciones.css';
import Select from 'react-select';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoIosArrowRoundBack } from "react-icons/io";
import {
    Link
  } from "react-router-dom";

Chart.register(...registerables);

const Poblaciones = () => {

    var sexoOpciones = [
        {
            value: 1,
            label: "Ambos"
        },
        {
            value: 2,
            label: "Hombres"
        },
        {
            value: 3,
            label: "Mujeres"
        }
    ];

    var graficoOpciones = [
        {
            value: 1,
            label: "Barras"
        },
        {
            value: 2,
            label: "Lineal"
        }
    ];

    var fechaOpciones = [
        {
            value: 1,
            label: "Anual"
        },
        {
            value: 2,
            label: "Trimestral"
        }
    ];

    const [fechaOptions, setFechaOptions] = useState("Anual");

    const [graficoOptions, setGraficoOptions] = useState("line");

    const [sexoOptions, setSexoOptions] = useState("Ambos");

    const [añoOptions, setAñoOptions] = useState();

    const [añoSelected, setAñoSelected] = useState('2021');

    const handlerSexoOptions = e => {
        setSexoOptions(e.label);
    }

    const handlerGraficoOptions = e => {
        if (e.value === 1) {
            setGraficoOptions("bar");
        }
        else {
            setGraficoOptions("line");
        }
    }

    const handlerFechaOptions = e => {
        setFechaOptions(e.label);
    }

    const handlerAñosOptions = value => {
        setAñoSelected(value.label);
    }

    const [chartPoblacionActiva, setChartPoblacionActiva] = useState({});
    const [chartPATotal, setChartPATotal] = useState({});
    const [chartPAMen, setChartPAMen] = useState({});
    const [chartPAWomen, setChartPAWomen] = useState({});
    const [chartPoblacionOcupada, setChartPoblacionOcupada] = useState({});
    const [chartPoblacionParada, setChartPoblacionParada] = useState({});

    const [chartPoblacionesPercent, setChartPoblacionesPercent] = useState({});

    useEffect(() => {
        window.scroll(0,0);
        function años() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/poblacionOcupada', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                var año = {};
                let array2 = [];
                let index2 = 0;
                for (let i = 0; i < array.annualMen[1].length; i++) {
                    año.value = (i + index2);
                    año.label = array.annualMen[1][i];
                    array2.push({...año});
                    index2++;
                }
                setAñoOptions(array2);
            })
            .catch(error => console.log(error))
        }
        function chartPoblacionActiva() {
        axios.get('https://visualizaapp.herokuapp.com/api/empleo/poblacionActiva', {}).then (
            response => {
            let index = response.data.length - 1;
            let array = response.data[index];
            let array2 = response.data[index];
            if (sexoOptions === "Ambos" && fechaOptions === "Anual") {
                array = array.annualTotal;
            } 
            if (sexoOptions === "Hombres" && fechaOptions === "Anual"){
                array = array.annualMen;
            }
            if (sexoOptions === "Mujeres" && fechaOptions === "Anual"){
                array = array.annualWomen;
            }

            if (sexoOptions === "Ambos" && fechaOptions === "Trimestral") {
                array = array.quarterlyTotal;
            }
            if (sexoOptions === "Hombres" && fechaOptions === "Trimestral"){
                array = array.quarterlyMen;
            }
            if (sexoOptions === "Mujeres" && fechaOptions === "Trimestral"){
                array = array.quarterlyWomen;
            }
            setChartPoblacionActiva(array);
            if (fechaOptions === "Anual") {
                setChartPATotal(array2.annualTotal);
                setChartPAMen(array2.annualMen);
                setChartPAWomen(array2.annualWomen);
            } else {
                setChartPATotal(array2.quarterlyTotal);
                setChartPAMen(array2.quarterlyMen);
                setChartPAWomen(array2.quarterlyWomen);
            }
           })
           .catch(error => console.log(error))
        };

        function chartPoblacionOcupada() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/poblacionOcupada', {}).then (
            response => {
            let index = response.data.length - 1;
            let array = response.data[index];
            let array2 = response.data[index];
            if (sexoOptions === "Ambos" && fechaOptions === "Anual") {
                array = array.annualTotal;
            } 
            if (sexoOptions === "Hombres" && fechaOptions === "Anual"){
                array = array.annualMen;
            }
            if (sexoOptions === "Mujeres" && fechaOptions === "Anual"){
                array = array.annualWomen;
            }

            if (sexoOptions === "Ambos" && fechaOptions === "Trimestral") {
                array = array.quarterlyTotal;
            }
            if (sexoOptions === "Hombres" && fechaOptions === "Trimestral"){
                array = array.quarterlyMen;
            }
            if (sexoOptions === "Mujeres" && fechaOptions === "Trimestral"){
                array = array.quarterlyWomen;
            }

            let index2 = 0;
            let index3 = 0;
            if (añoSelected === undefined) {
                index2 = 0;
                index3 = 0;
            } else {
                index2 = (array2.annualMen[1]).indexOf(añoSelected);
                index3 = (array2.annualWomen[1]).indexOf(añoSelected);
            }

            let array3 = [];
            array3.push(((array2.annualMen[0][index2] * 100) / array2.annualTotal[0][index2]).toFixed(2));
            array3.push(((array2.annualWomen[0][index3] * 100) / array2.annualTotal[0][index3]).toFixed(2));

            setChartPoblacionesPercent(array3);
            setChartPoblacionOcupada(array);
            })
            .catch(error => console.log(error))
        };
        
        function chartPoblacionParada() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/poblacionParada', {}).then (
            response => {
            let index = response.data.length - 1;
            let array = response.data[index];
            if (sexoOptions === "Ambos" && fechaOptions === "Anual") {
                array = array.annualTotal;
            } 
            if (sexoOptions === "Hombres" && fechaOptions === "Anual"){
                array = array.annualMen;
            }
            if (sexoOptions === "Mujeres" && fechaOptions === "Anual"){
                array = array.annualWomen;
            }

            if (sexoOptions === "Ambos" && fechaOptions === "Trimestral") {
                array = array.quarterlyTotal;
            }
            if (sexoOptions === "Hombres" && fechaOptions === "Trimestral"){
                array = array.quarterlyMen;
            }
            if (sexoOptions === "Mujeres" && fechaOptions === "Trimestral"){
                array = array.quarterlyWomen;
            }
            setChartPoblacionParada(array);
            })
            .catch(error => console.log(error))
        };
        años();
        chartPoblacionActiva();
        chartPoblacionOcupada();
        chartPoblacionParada();
    }, [sexoOptions, fechaOptions, añoSelected]);

    var dataPoblacionActiva = {
        labels: chartPATotal[1],
        datasets: [{
            label: "Total",
            data: chartPATotal[0],
            type: 'line',
            backgroundColor: 'rgba(117, 101, 80, 0.3)',
            borderColor: 'rgba(117, 101, 80, 0.7)',
            hoverBackgroundColor: 'rgba(117, 101, 80, 0.4)',
            borderWidth: 1,
            pointBorderWidth: 7,
            pointHoverBorderWidth: 8,
            pointHitRadius: 1
        },
        {
            label: "Hombres",
            data: chartPAMen[0],
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            borderColor: 'rgba(54, 162, 235, 1)',
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderWidth: 1
        },
        {
            label: "Mujeres",
            data: chartPAWomen[0],
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgba(255, 99, 132, 1)',
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            borderWidth: 1
        }],
    }

    var dataPoblacionParada = {
        labels: chartPoblacionParada[1],
        datasets: [{
            label: "Población parada",
            type: graficoOptions,
            fill: true,
            data: chartPoblacionParada[0],
            borderSkipped: 'bottom',
            backgroundColor: [
                'rgba(111, 202, 165, 0.5)'
            ],
            borderColor: [
                'rgba(111, 202, 165, 1)'
            ],
            hoverBackgroundColor: [
                'rgba(111, 202, 165, 0.4)'
            ],
            borderWidth: 1
        }],
    }

    var dataPoblaciones = {
        labels: chartPoblacionActiva[1],
        datasets: [{
            label: "Población activa",
            type: 'line',
            data: chartPoblacionActiva[0],
            borderSkipped: 'bottom',
            backgroundColor: [
                'rgba(255, 195, 0, 0.3)'
            ],
            borderColor: [
                'rgba(255, 195, 0, 1)'
            ],
            hoverBackgroundColor: [
                'rgba(255, 195, 0, 0.4)'
            ],
            borderWidth: 1
        },
        {
            label: "Población ocupada",
            data: chartPoblacionOcupada[0],
            borderSkipped: 'bottom',
            backgroundColor: [
                'rgba(255, 87, 51, 0.3)'
            ],
            borderColor: [
                'rgba(255, 87, 51, 1)'
            ],
            hoverBackgroundColor: [
                'rgba(255, 87, 51, 0.4)'
            ],
            borderWidth: 1
        },
        {
            label: "Población parada",
            data: chartPoblacionParada[0],
            borderSkipped: 'bottom',
            backgroundColor: [
                'rgba(111, 202, 165, 0.3)'
            ],
            borderColor: [
                'rgba(111, 202, 165, 1)'
            ],
            hoverBackgroundColor: [
                'rgba(111, 202, 165, 0.4)'
            ],
            borderWidth: 1
        }],
    }

    var dataPoblacionOcupada = {
        labels: [
            'Hombres',
            'Mujeres'
          ],
          datasets: [{
            data: [chartPoblacionesPercent[0], chartPoblacionesPercent[1]],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)'
            ],
            hoverOffset: 4
        }]
    }
    
    var optionsPoblacionParada = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Cantidad de población parada (miles)',
                    font: {
                        size: 18,
                        family: 'Serif'
                    },
                    color: 'rgba(0, 0, 0, 1)',
                    padding: 15
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                    font: {
                        size: 15,
                        family: 'Serif'
                    },
                },
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Fecha de población parada (' + fechaOptions + ')',
                    font: {
                        size: 18,
                        family: 'Serif'
                    },
                    color: 'rgba(0, 0, 0, 1)',
                    padding: 15
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                    font: {
                        size: 15,
                        family: 'Serif'
                    },
                },
            },
        }, 
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 17,
                        family: 'Serif',
                    },
                    color: 'rgba(0, 0, 0, 1)'
                },
            },
            tooltip: {
                titleFont: {
                    size: 14,
                    family: 'Serif',
                },
                titleMarginBottom: 5,
                bodyFont: {
                    size: 14,
                    family: 'Serif',
                },
                caretSize: 6,
                cornerRadius: 10,
            }
        }
    }

    const customStyles = {
        option: (provided) => ({
          ...provided,
          padding: 5,
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
    }

    var optionsPoblacionOcupada = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            borderRadius: 3,
            color: 'rgba(117, 101, 80, 1)',
            font: {
              size: 30,
              weight: 'bold'
            },
            formatter: (value) => {
              if (value == 0) {
                return '';
              } else {
                return value + '%';
              }
            }
          },
        }
    }

    var optionsPoblacionActiva = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Cantidad de población activa (miles)',
                    font: {
                        size: 18,
                        family: 'Serif'
                    },
                    color: 'rgba(0, 0, 0, 1)',
                    padding: 15
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                    font: {
                        size: 15,
                        family: 'Serif'
                    },
                },
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Fecha de población activa (' + fechaOptions + ')',
                    font: {
                        size: 18,
                        family: 'Serif'
                    },
                    color: 'rgba(0, 0, 0, 1)',
                    padding: 15
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                    font: {
                        size: 15,
                        family: 'Serif'
                    },
                },
            },
        }, 
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 17,
                        family: 'Serif',
                    },
                    color: 'rgba(0, 0, 0, 1)'
                },
            },
            tooltip: {
                titleFont: {
                    size: 14,
                    family: 'Serif',
                },
                titleMarginBottom: 5,
                bodyFont: {
                    size: 14,
                    family: 'Serif',
                },
                caretSize: 6,
                cornerRadius: 10,
            }
        } 
    }

    var optionsPoblaciones = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Cantidad de población (miles)',
                    font: {
                        size: 18,
                        family: 'Serif'
                    },
                    color: 'rgba(0, 0, 0, 1)',
                    padding: 15
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                    font: {
                        size: 15,
                        family: 'Serif'
                    },
                },
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Fecha de población (' + fechaOptions + ')',
                    font: {
                        size: 18,
                        family: 'Serif'
                    },
                    color: 'rgba(0, 0, 0, 1)',
                    padding: 15
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                    font: {
                        size: 15,
                        family: 'Serif'
                    },
                },
            },
        }, 
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 17,
                        family: 'Serif',
                    },
                    color: 'rgba(0, 0, 0, 1)'
                },
            },
            tooltip: {
                titleFont: {
                    size: 14,
                    family: 'Serif',
                },
                titleMarginBottom: 5,
                bodyFont: {
                    size: 14,
                    family: 'Serif',
                },
                caretSize: 6,
                cornerRadius: 10,
            }
        }
    }
    
    return (
        <Container>
            <Row>
                <Col className="backDashboard">
                    <Link to="/" style={{color: 'inherit', textDecoration: 'inherit'}}><IoIosArrowRoundBack size="30px" style={{'margin-right': '5px'}}></IoIosArrowRoundBack>Volver al Dashboard</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 style={{'margin-top': '15px', 'letter-spacing': '3px', 'font-weight': 'bold'}}>POBLACIONES</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="text-start titleFilter">Escoja los filtros que desee:</h5>
                </Col>
            </Row>
            <Row>
                <Col className="filterStyle">
                    <Row>
                        <Col>
                            <p class="text-end">Sexo:</p>
                        </Col>
                        <Col>
                            <Select defaultValue={sexoOpciones[0]} styles={customStyles} options={sexoOpciones} onChange={handlerSexoOptions}/>
                        </Col>
                    </Row>
                </Col>
                <Col className="filterStyle">
                    <Row>
                        <Col>
                            <p class="text-end">Gráfico:</p>
                        </Col>
                        <Col>
                            <Select defaultValue={graficoOpciones[1]} styles={customStyles} options={graficoOpciones} onChange={handlerGraficoOptions}/>
                        </Col>
                    </Row>
                </Col>
                <Col className="filterStyle">
                    <Row>
                        <Col>
                            <p class="text-end">Fecha:</p>
                        </Col>
                        <Col>
                            <Select defaultValue={fechaOpciones[0]} styles={customStyles} options={fechaOpciones} onChange={handlerFechaOptions}/>
                        </Col>
                    </Row>
                </Col>
                <Col className="filterStyle" style={{'margin-right': '100px'}}>
                    <Row>
                        <Col>
                            <p class="text-end">Año:</p>
                        </Col>
                        <Col>
                            <Select placeholder={añoSelected} defaultValue={añoSelected} styles={customStyles} options={añoOptions} onChange={handlerAñosOptions}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="styleChartPoblaciones">
                    <Row>
                        <Col>
                            <h4>Población activa según sexos en los últimos años</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoBar">
                            <Bar data={dataPoblacionActiva} options={optionsPoblacionActiva}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="styleChartPoblaciones">
                    <Row>
                        <Col>
                            <h4>Población activa, ocupada y parada en Canarias en los últimos años</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoBar">
                            <Bar data={dataPoblaciones} options={optionsPoblaciones}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="styleChartPoblaciones">
                    <Row>
                        <Col>
                            <h4>Población ocupada en Canarias en el año {añoSelected}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoPie">
                            <Pie data={dataPoblacionOcupada} plugins={[ChartDataLabels]} options={optionsPoblacionOcupada}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="styleChartPoblaciones">
                    <Row>
                        <Col>
                            <h4>Población parada en los últimos años</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoBar">
                            <Bar data={dataPoblacionParada} options={optionsPoblacionParada}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="backDashboard" style={{'margin-top': '20px'}}>
                    <Link to="/" style={{color: 'inherit', textDecoration: 'inherit'}}><IoIosArrowRoundBack size="30px" style={{'margin-right': '5px'}}></IoIosArrowRoundBack>Volver al Dashboard</Link>
                </Col>
            </Row>
        </Container>
    )
};

export default Poblaciones;