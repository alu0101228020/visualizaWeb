import React, {useState, useEffect} from 'react';
import {Chart, registerables } from 'chart.js';
import {Bar, PolarArea } from 'react-chartjs-2';
import './Tasas.css';
import Select from 'react-select';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosArrowRoundBack } from "react-icons/io";
import {
    Link
  } from "react-router-dom";

Chart.register(...registerables);

const Tasas = () => {

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

    const [añoOptions, setAñoOptions] = useState();

    const [añoSelected, setAñoSelected] = useState('2021');

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

    const [chartTasasPercent, setChartTasasPercent] = useState({});


    const [chartTAnnualTotalExercise, setChartTAnnualTotalExercise] = useState({});
    const [chartTAnnualTotalUnemployment, setChartTAnnualTotalUnemployment] = useState({});
    const [chartTAnnualTotalEmployment, setChartTAnnualTotalEmployment] = useState({});

    useEffect(() => {
        window.scroll(0,0);
        function chartDistintasTasas() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/distintasTasas', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                let array2 = response.data[index];
                array.annualTotalExercise[0] = array.annualTotalExercise[0].reverse();
                array.annualTotalExercise[1] = array.annualTotalExercise[1].reverse();

                array.annualTotalUnemployment[0] = array.annualTotalUnemployment[0].reverse();
                array.annualTotalUnemployment[1] = array.annualTotalUnemployment[1].reverse();

                array.annualTotalEmployment[0] = array.annualTotalEmployment[0].reverse();
                array.annualTotalEmployment[1] = array.annualTotalEmployment[1].reverse();

                if (fechaOptions === 'Anual') {
                    setChartTAnnualTotalExercise(array.annualTotalExercise);
                    setChartTAnnualTotalUnemployment(array.annualTotalUnemployment);
                    setChartTAnnualTotalEmployment(array.annualTotalEmployment);
                } else {
                    setChartTAnnualTotalExercise(array.quarterlyTotalExercise);
                    setChartTAnnualTotalUnemployment(array.quarterlyTotalUnemployment);
                    setChartTAnnualTotalEmployment(array.quarterlyTotalEmployment);
                }

                let index2 = 0;
                let index3 = 0;
                let index4 = 0;
                if (añoSelected === undefined) {
                    index2 = 0;
                    index3 = 0;
                    index4 = 0;
                } else {
                    index2 = (array2.annualTotalExercise[1]).indexOf(añoSelected);
                    index3 = (array2.annualTotalUnemployment[1]).indexOf(añoSelected);
                    index4 = (array2.annualTotalEmployment[1]).indexOf(añoSelected);
                }

                let total = array2.annualTotalExercise[0][index2] + array2.annualTotalUnemployment[0][index3] + array2.annualTotalEmployment[0][index4];
    
                let array3 = [];
                array3.push(((array2.annualTotalExercise[0][index2] * 100) / total).toFixed(2));
                array3.push(((array2.annualTotalUnemployment[0][index3] * 100) / total).toFixed(2));
                array3.push(((array2.annualTotalEmployment[0][index4] * 100) / total).toFixed(2));

                setChartTasasPercent(array3);
               })
               .catch(error => console.log(error))
        };
        function años() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/distintasTasas', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                array.annualTotalExercise[0] = array.annualTotalExercise[0].reverse();
                array.annualTotalExercise[1] = array.annualTotalExercise[1].reverse();
                var año = {};
                let array2 = [];
                let index2 = 0;
                for (let i = 0; i < array.annualTotalExercise[1].length; i++) {
                    año.value = (i + index2);
                    año.label = array.annualTotalExercise[1][i];
                    array2.push({...año});
                    index2++;
                }
                setAñoOptions(array2);
            })
            .catch(error => console.log(error))
        }
        chartDistintasTasas();
        años();
    }, [fechaOptions, añoSelected]);

    var dataDistintasTasas = {
        labels: chartTAnnualTotalExercise[1],
        datasets: [{
            label: "Tasa de Actividad",
            data: chartTAnnualTotalExercise[0],
            type: graficoOptions,
            backgroundColor: 'rgba(197,132,6,0.3)',
            borderColor: 'rgba(197,132,6,0.7)',
            hoverBackgroundColor: 'rgba(197,132,6,0.4)',
            borderWidth: 1,
            pointBorderWidth: 7,
            pointHoverBorderWidth: 8,
            pointHitRadius: 1
        },
        {
            label: "Tasa de paro",
            data: chartTAnnualTotalUnemployment[0],
            type: graficoOptions,
            backgroundColor: 'rgba(27,107,35,0.3)',
            borderColor: 'rgba(27,107,35,0.7)',
            hoverBackgroundColor: 'rgba(27,107,35,0.4)',
            borderWidth: 1,
            pointBorderWidth: 7,
            pointHoverBorderWidth: 8,
            pointHitRadius: 1
        },
        {
            label: "Tasa de empleo",
            data: chartTAnnualTotalEmployment[0],
            type: graficoOptions,
            backgroundColor: 'rgba(130,19,183,0.3)',
            borderColor: 'rgba(130,19,183,0.7)',
            hoverBackgroundColor: 'rgba(130,19,183,0.4)',
            borderWidth: 1,
            pointBorderWidth: 7,
            pointHoverBorderWidth: 8,
            pointHitRadius: 1
        }],
    }

    var dataTasas = {
        labels: [
            'Actividad',
            'Paro',
            'Empleo'
          ],
          datasets: [{
            data: [chartTasasPercent[0], chartTasasPercent[1], chartTasasPercent[2]],
            backgroundColor: [
              'rgb(197, 132, 6, 0.5)',
              'rgb(27, 107, 35, 0.5)',
              'rgb(130, 19, 183, 0.5)'
            ],
            hoverOffset: 4
        }]
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

    var optionsDistintasTasas = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Cantidad de población (%)',
                    color: 'rgba(0, 0, 0, 1)',
                    padding: 3
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                },
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Fecha de población (' + fechaOptions + ')',
                    color: 'rgba(0, 0, 0, 1)',
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                },
            },
        }, 
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(0, 0, 0, 1)',
                },
            },
            tooltip: {
                caretSize: 6,
                cornerRadius: 10,
            }
        }
    }

    var optionsTasas = {
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
              if (value === 0) {
                return '';
              } else {
                return value + '%';
              }
            }
          },
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
                    <h3 style={{'margin-top': '15px', 'letter-spacing': '3px', 'font-weight': 'bold'}}>TASAS</h3>
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
                <Col className="styleChartTasas">
                    <Row>
                        <Col>
                            <h4>Tasas de actividad, paro y empleo en los últimos años</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoBar">
                            <Bar data={dataDistintasTasas} options={optionsDistintasTasas}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="styleChartPoblaciones">
                    <Row>
                        <Col>
                            <h4>Tasas de actividad, paro y empleo en el año {añoSelected}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoBar">
                            <PolarArea data={dataTasas} plugins={[ChartDataLabels]} options={optionsTasas}/>
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

export default Tasas;