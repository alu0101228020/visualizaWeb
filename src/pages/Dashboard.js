import React, {useState, useEffect} from 'react';
import {Chart, registerables } from 'chart.js';
import {Bar, Pie, Radar} from 'react-chartjs-2';
import './Dashboard.css';
import axios from 'axios';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Link
  } from "react-router-dom";

Chart.register(...registerables);

const Dashboard = () => {

    const [chartPAAnnualTotal, setChartPAAnnualTotal] = useState({});
    const [chartPAAnnualMen, setChartPAAnnualMen] = useState({});
    const [chartPAAnnualWomen, setChartPAAnnualWomen] = useState({});

    const [chartPOAnnualMen, setChartPOAnnualMen] = useState({});
    const [chartPOAnnualWomen, setChartPOAnnualWomen] = useState({});

    const [chartTAnnualTotalExercise, setChartTAnnualTotalExercise] = useState({});
    const [chartTAnnualTotalUnemployment, setChartTAnnualTotalUnemployment] = useState({});
    const [chartTAnnualTotalEmployment, setChartTAnnualTotalEmployment] = useState({});

    const [chartGAMen, setChartGAMen] = useState({});
    const [chartGAWomen, setChartGAWomen] = useState({});

    const [chartATAnnualTotalTotal, setChartATAnnualTotalTotal] = useState({});
    const [chartRAnnualTotalTotal, setChartRAnnualTotalTotal] = useState({});
    const [chartNRAnnualTotalTotal, setChartNRAnnualTotalTotal] = useState({});

    useEffect(() => {
        window.scroll(0,0);
        function chartPoblacionActiva() {
        axios.get('https://visualizaapp.herokuapp.com/api/empleo/poblacionActiva', {}).then (
            response => {
            let index = response.data.length - 1;
            let array = response.data[index];
            setChartPAAnnualTotal(array.annualTotal);
            setChartPAAnnualMen(array.annualMen);
            setChartPAAnnualWomen(array.annualWomen);
           })
           .catch(error => console.log(error))
        };

        function chartPoblacionOcupada() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/poblacionOcupada', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                let total = array.annualTotal[0][0];
                let annualMen = [];
                annualMen.push(((array.annualMen[0][0] * 100) / total).toFixed(2));
                annualMen.push(array.annualMen[1][0]);
                setChartPOAnnualMen(annualMen);

                let annualWomen = [];
                annualWomen.push(((array.annualWomen[0][0] * 100) / total).toFixed(2));
                annualWomen.push(array.annualWomen[1][0]);
                setChartPOAnnualWomen(annualWomen);
               })
               .catch(error => console.log(error))
        };
        function chartDistintasTasas() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/distintasTasas', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                array.annualTotalExercise[0] = array.annualTotalExercise[0].reverse();
                array.annualTotalExercise[1] = array.annualTotalExercise[1].reverse();
                setChartTAnnualTotalExercise(array.annualTotalExercise);
                array.annualTotalUnemployment[0] = array.annualTotalUnemployment[0].reverse();
                array.annualTotalUnemployment[1] = array.annualTotalUnemployment[1].reverse();
                setChartTAnnualTotalUnemployment(array.annualTotalUnemployment);
                array.annualTotalEmployment[0] = array.annualTotalEmployment[0].reverse();
                array.annualTotalEmployment[1] = array.annualTotalEmployment[1].reverse();
                setChartTAnnualTotalEmployment(array.annualTotalEmployment);
               })
               .catch(error => console.log(error))
        };
        function chartGananciaMediaAnual() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/gananciaMediaAnual', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                let arrayMen = [[], []];
                arrayMen[0].push(array.annualMenInd[0][array.annualMenInd[0].length-1]);
                arrayMen[0].push(array.annualMenConst[0][array.annualMenConst[0].length-1]);
                arrayMen[0].push(array.annualMenServ[0][array.annualMenServ[0].length-1]);
                arrayMen[1].push(array.annualMenServ[1][array.annualMenServ[0].length-1]);

                let arrayWomen = [[], []];
                arrayWomen[0].push(array.annualWomenInd[0][array.annualWomenInd[0].length-1]);
                arrayWomen[0].push(array.annualWomenConst[0][array.annualWomenConst[0].length-1]);
                arrayWomen[0].push(array.annualWomenServ[0][array.annualWomenServ[0].length-1]);
                arrayWomen[1].push(array.annualWomenServ[1][array.annualWomenServ[0].length-1]);
                setChartGAMen(arrayMen);
                setChartGAWomen(arrayWomen);
               })
               .catch(error => console.log(error))
        };
        function chartAccidentesDeTrabajo() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/accidentesDeTrabajo', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                setChartATAnnualTotalTotal(array.annualTotalTotal);
            })
            .catch(error => console.log(error))
        };
        function chartRecaidasDeAccidentes() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/recaidasDeAccidentes', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                setChartRAnnualTotalTotal(array.annualTotalTotal);
            })
            .catch(error => console.log(error))
        };
        function chartNoRecaidasDeAccidentes() {
            axios.get('https://visualizaapp.herokuapp.com/api/empleo/noRecaidasDeAccidentes', {}).then (
                response => {
                let index = response.data.length - 1;
                let array = response.data[index];
                setChartNRAnnualTotalTotal(array.annualTotalTotal);
            })
            .catch(error => console.log(error))
        };
        chartPoblacionActiva();
        chartPoblacionOcupada();
        chartDistintasTasas();
        chartGananciaMediaAnual();
        chartAccidentesDeTrabajo();
        chartRecaidasDeAccidentes();
        chartNoRecaidasDeAccidentes();
    }, []);

    var dataPoblacionActiva = {
        labels: chartPAAnnualTotal[1],
        datasets: [{
            label: "Total",
            data: chartPAAnnualTotal[0],
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
            data: chartPAAnnualMen[0],
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            borderColor: 'rgba(54, 162, 235, 1)',
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderWidth: 1
        },
        {
            label: "Mujeres",
            data: chartPAAnnualWomen[0],
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgba(255, 99, 132, 1)',
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            borderWidth: 1
        }],
    }

    var dataPoblacionParada = {
        labels: [
            'Hombres',
            'Mujeres'
          ],
          datasets: [{
            data: [chartPOAnnualMen[0], chartPOAnnualWomen[0]],
            backgroundColor: [
              'rgb(54, 162, 235, 0.8)',
              'rgb(255, 99, 132, 0.8)'
            ],
            hoverOffset: 4
        }]
    }

    var dataDistintasTasas = {
        labels: chartTAnnualTotalExercise[1],
        datasets: [{
            label: "Tasa de Actividad",
            data: chartTAnnualTotalExercise[0],
            type: 'line',
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
            type: 'line',
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
            type: 'line',
            backgroundColor: 'rgba(130,19,183,0.3)',
            borderColor: 'rgba(130,19,183,0.7)',
            hoverBackgroundColor: 'rgba(130,19,183,0.4)',
            borderWidth: 1,
            pointBorderWidth: 7,
            pointHoverBorderWidth: 8,
            pointHitRadius: 1
        }],
    }

    var dataGananciaMediaAnual = {
        labels: [
          'Industria',
          'Construcción',
          'Servicio'
        ],
        datasets: [{
          label: 'Hombres',
          data: chartGAMen[0],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }, {
          label: 'Mujeres',
          data: chartGAWomen[0],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.4)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };

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
    };
    
    var optionsPoblacionActiva = {
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Cantidad de población activa (miles)',
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
                    text: 'Fecha de población activa (Anual)',
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

    var optionsPoblacionParada = {
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

    var optionsGananciaMediaAnual = {
        responsive: true,
        maintainAspectRatio: false,
        scale:{
            pointLabels:{
              fontSize: 5
            },
            ticks: {
              display: false,
            },
          },
          elements: {
            line: {
              borderWidth: 2,
            }
          },
          tooltips: {
            callbacks: {
              title: (tooltipItem, data) => data.labels[tooltipItem[0].index]
            }
        },
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

    var optionsDistintasTasas = {
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
                    text: 'Fecha de población (Anual)',
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
    
    return (
        <div className="me-5 ms-5">
            <Tabs defaultActiveKey="dashboard" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="dashboard" title="Dashboard" className="styleDashboard">
                    <Row>
                        <Col className="me-2 styleChart">
                            <Link to={`/poblaciones`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                <Row>
                                    <Col>
                                        <h4 className="text-start m-3" style={{'letter-spacing': '3px', 'margin-bottom': '0px !important', 'font-weight': 'bold'}}>POBLACIONES</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="m-3" style={{'margin-top': '0px !important'}}>
                                        <h5>Población activa según sexos en los últimos años</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Bar data={dataPoblacionActiva} options={optionsPoblacionActiva}/>
                                    </Col>
                                </Row>
                                <Row style={{'margin-top': '45px'}}>
                                    <Col className="m-3">
                                        <h5>Población ocupada según sexos en {chartPOAnnualMen[1]}</h5>
                                    </Col>
                                </Row>
                                <Row style={{'margin-bottom': '-110px'}}>
                                    <Col className ="tamanoPie">
                                        <Pie data={dataPoblacionParada}  plugins={[ChartDataLabels]} options={optionsPoblacionParada}/>
                                    </Col>
                                </Row>
                            </Link>
                        </Col>
                        <Col>
                            <Row style={{'margin-bottom': '8px'}}>
                                <Col className="styleChart">
                                    <Link to={`/tasas`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                        <Row>
                                            <Col>
                                                <h4 className="text-start m-3" style={{'letter-spacing': '3px', 'font-weight': 'bold'}}>TASAS</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="m-3">
                                                <h5>Tasas de actividad, paro y empleo en los últimos años</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Bar data={dataDistintasTasas} options={optionsDistintasTasas}/>
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="styleChart">
                                    <Link to={`/ganancias`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                        <Row>
                                            <Col>
                                                <h4 className="text-start m-3" style={{'letter-spacing': '3px', 'font-weight': 'bold'}}>GANANCIAS</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="m-3">
                                                <h5>Ganancia media anual por trabajador según sexos y sectores económicos (CNAE-09) en {chartGAMen[1]}</h5>
                                            </Col>
                                        </Row>
                                        <Row style={{'margin-bottom': '-110px'}}>
                                            <Col className="tamanoRadar">
                                                <Radar data={dataGananciaMediaAnual} options={optionsGananciaMediaAnual}/>
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="styleChart" style={{'margin-top': '8px'}}>
                        <Link to={`/bajasLaborales`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <Col>
                                <Row>
                                    <Col>
                                        <h4 className="text-start m-3" style={{'letter-spacing': '3px', 'font-weight': 'bold'}}>BAJAS LABORALES</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className="m-3">
                                                <h5>Accidentes de trabajo con baja con y sin recaídas en los últimos años</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="tamanoBar">
                                                <Bar data={dataAccidentesDeTrabajo} options={optionsAccidentesDeTrabajo}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Link>
                    </Row>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Dashboard;