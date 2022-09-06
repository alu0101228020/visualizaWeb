import React, {useState, useEffect} from 'react';
import {Chart, registerables } from 'chart.js';
import {Bar, Doughnut } from 'react-chartjs-2';
import './BajasLaborales.css';
import Select from 'react-select';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosArrowRoundBack } from "react-icons/io";
import {
    Link
  } from "react-router-dom";

Chart.register(...registerables);

const BajasLaborales = () => {

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

    const [sexoOptions, setSexoOptions] = useState("Ambos");

    const [añoOptions, setAñoOptions] = useState();

    const [añoSelected, setAñoSelected] = useState('2020');

    const handlerSexoOptions = e => {
        setSexoOptions(e.label);
    }

    const handlerAñosOptions = value => {
        setAñoSelected(value.label);
    }

    const [chartATAnnualTotalTotal, setChartATAnnualTotalTotal] = useState({});
    const [chartRAnnualTotalTotal, setChartRAnnualTotalTotal] = useState({});
    const [chartNRAnnualTotalTotal, setChartNRAnnualTotalTotal] = useState({});
    const [chartRPercent, setChartRPercent] = useState({});

    useEffect(() => {
        window.scroll(0,0);
        function años() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/recaidasDeAccidentes', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                var año = {};
                let array2 = [];
                let index2 = 0;
                for (let i = 0; i < array.annualTotalTotal[1].length; i++) {
                    año.value = (i + index2);
                    año.label = array.annualTotalTotal[1][i];
                    array2.push({...año});
                    index2++;
                }
                setAñoOptions(array2);
            })
            .catch(error => console.log(error))
        }
        function chartAccidentesDeTrabajo() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/accidentesDeTrabajo', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                if (sexoOptions === 'Ambos') {
                    setChartATAnnualTotalTotal(array.annualTotalTotal);
                }
                if (sexoOptions === 'Hombres') {
                    setChartATAnnualTotalTotal(array.annualMenTotal);
                }
                if (sexoOptions === 'Mujeres') {
                    setChartATAnnualTotalTotal(array.annualWomenTotal);
                }
            })
            .catch(error => console.log(error))
        };
        function chartRecaidasDeAccidentes() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/recaidasDeAccidentes', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                let arrayPercent= [];

                let index2 = 0;
                let index3 = 0;
                if (sexoOptions === 'Ambos') {
                    if (añoSelected === undefined) {
                        index2 = 0;
                        index3 = 0;
                    } else {
                        index2 = (array.annualTotalMild[1]).indexOf(añoSelected);
                        index3 = (array.annualTotalSerious[1]).indexOf(añoSelected);
                    }
                    
                    arrayPercent.push(((array.annualTotalMild[0][index2] * 100) / array.annualTotalTotal[0][index2]).toFixed(2));
                    arrayPercent.push(((array.annualTotalSerious[0][index3] * 100) / array.annualTotalTotal[0][index3]).toFixed(2));
                    setChartRAnnualTotalTotal(array.annualTotalTotal);
                }
                if (sexoOptions === 'Hombres') {
                    if (añoSelected === undefined) {
                        index2 = 0;
                        index3 = 0;
                    } else {
                        index2 = (array.annualMenMild[1]).indexOf(añoSelected);
                        index3 = (array.annualMenSerious[1]).indexOf(añoSelected);
                    }
                    
                    arrayPercent.push(((array.annualMenMild[0][index2] * 100) / array.annualMenTotal[0][index2]).toFixed(2));
                    arrayPercent.push(((array.annualMenSerious[0][index3] * 100) / array.annualMenTotal[0][index3]).toFixed(2));
                    setChartRAnnualTotalTotal(array.annualMenTotal);
                }
                if (sexoOptions === 'Mujeres') {
                    if (añoSelected === undefined) {
                        index2 = 0;
                        index3 = 0;
                    } else {
                        index2 = (array.annualWomenMild[1]).indexOf(añoSelected);
                        index3 = (array.annualWomenSerious[1]).indexOf(añoSelected);
                    }
                    
                    arrayPercent.push(((array.annualWomenMild[0][index2] * 100) / array.annualWomenTotal[0][index2]).toFixed(2));
                    arrayPercent.push(((array.annualWomenSerious[0][index3] * 100) / array.annualWomenTotal[0][index3]).toFixed(2));
                    setChartRAnnualTotalTotal(array.annualWomenTotal);
                }

                setChartRPercent(arrayPercent);
            })
            .catch(error => console.log(error))
        };
        function chartNoRecaidasDeAccidentes() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/noRecaidasDeAccidentes', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                if (sexoOptions === 'Ambos') {
                    setChartNRAnnualTotalTotal(array.annualTotalTotal);
                }
                if (sexoOptions === 'Hombres') {
                    setChartNRAnnualTotalTotal(array.annualMenTotal);
                }
                if (sexoOptions === 'Mujeres') {
                    setChartNRAnnualTotalTotal(array.annualWomenTotal);
                }
            })
            .catch(error => console.log(error))
        };
        años();
        chartAccidentesDeTrabajo();
        chartRecaidasDeAccidentes();
        chartNoRecaidasDeAccidentes();
    }, [sexoOptions, añoSelected]);

    var dataAccidentesDeTrabajo = {
        labels: chartATAnnualTotalTotal[1],
        datasets: [{
            label: "Total de accidentes",
            data: chartATAnnualTotalTotal[0],
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
            label: "Recaidas",
            data: chartRAnnualTotalTotal[0],
            backgroundColor: 'rgba(27,49,177,0.3)',
            borderColor: 'rgba(27,49,177,1)',
            hoverBackgroundColor: 'rgba(27,49,177,0.4)',
            borderWidth: 1
        },
        {
            label: "No recaidas",
            data: chartNRAnnualTotalTotal[0],
            backgroundColor: 'rgba(201,73,43,0.3)',
            borderColor: 'rgba(201,73,43,1)',
            hoverBackgroundColor: 'rgba(201,73,43,0.4)',
            borderWidth: 1
        }],
    }

    var dataRecaidas = {
        labels: [
            'Leves',
            'Graves o muy graves'
          ],
          datasets: [{
            data: [chartRPercent[0], chartRPercent[1]],
            backgroundColor: [
              'rgba(18, 157, 136, 0.5)',
              'rgba(124, 45, 127, 0.5)'
            ],
            hoverOffset: 4
        }]
    }
    
    var optionsAccidentesDeTrabajo = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Cantidad de accidentes (miles)',
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
                    text: 'Fecha de accidentes (Anual)',
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

    var optionsRecaidas = {
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
                    <h3 style={{'margin-top': '15px', 'letter-spacing': '3px', 'font-weight': 'bold'}}>BAJAS LABORALES</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="text-start titleFilter">Escoja los filtros que desee:</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row className="filterStyle">
                        <Col>
                            <p class="text-end">Sexo:</p>
                        </Col>
                        <Col>
                            <Select defaultValue={sexoOpciones[0]} styles={customStyles} options={sexoOpciones} onChange={handlerSexoOptions}/>
                        </Col>
                    </Row>
                </Col>
                <Col className="filterStyle" style={{'margin-right': '200px'}}>
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
                            <h4>Accidentes de trabajo con baja con y sin recaídas en los últimos años</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoBar">
                            <Bar data={dataAccidentesDeTrabajo} options={optionsAccidentesDeTrabajo}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="styleChartPoblaciones">
                    <Row>
                        <Col>
                            <h4>Recaidas en accidentes de trabajo con baja en {añoSelected}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tamanoPie">
                            <Doughnut data={dataRecaidas} plugins={[ChartDataLabels]} options={optionsRecaidas}/>
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

export default BajasLaborales;