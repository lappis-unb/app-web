import { useState } from 'react'
import { Modal, Button, Row, Col, Container, Card, Table, Spinner, Form, InputGroup } from 'react-bootstrap';
import { URL_API_LOCAL } from '../../api';
import axios from 'axios'
import { ChartJsMatomo } from "../MatomoDias/ChartJsMatomo";

const MatomoDias = () => {

const [dataGeral, setDataGeral] = useState('2023-10-30');
const [apiSelecionada, setApiSelecionada] = useState('');
const [resultado, setResultado] = useState('');
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);   

const [dadosData, setDadosData] = useState([]);
const [dadosNumeros, setDadosNumeros] = useState([]);

const nomeApis = [   
{'nome': 'VisitsSummary.get', 'descricao': 'Tipos','cor' : ""},
{'nome': 'VisitsSummary.getVisits', 'descricao': 'Tipos','cor' : ""},
{'nome': 'VisitsSummary.getUniqueVisitors', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitsSummary.getUsers', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitsSummary.getActions', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitsSummary.getMaxActions', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitsSummary.getBounceCount', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitsSummary.getVisitsConverted', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitsSummary.getSumVisitsLength', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitsSummary.getSumVisitsLengthPretty', 'descricao': 'Tipos','cor' : ""},
{'nome': 'VisitTime.getVisitInformationPerLocalTime', 'descricao': 'Tipos','cor' : ""}, 
{'nome': 'VisitTime.getVisitInformationPerServerTime', 'descricao': 'Tipos','cor' : ""},
{'nome': 'VisitTime.getByDayOfWeek', 'descricao': 'Tipos','cor' : ""},
{'nome': 'VisitFrequency.get', 'descricao': 'Tipos'}
]

const ConsumoApiExterna = async (nomeApi, dataRequisicao) => {
    
     console.log('data requisicao ', dataRequisicao)

    const data = {
        api: nomeApi,
        data: dataRequisicao
      };

    console.log('api = ', nomeApi, ' data-nomeApi = ',dataRequisicao,' resultado= ', resultado, '<-');

    //await axios.post(`${URL_API_LOCAL}/apimatomo/requisicao`, data)
    await axios.post(`${URL_API_LOCAL}/apimatomo/requisicao`, data)
        .then(todasMensagens => {
            let getMensagens = todasMensagens.data;
              
                setResultado(getMensagens);
                console.log('getMensagens ', getMensagens, resultado)
                console.log('resultado ',typeof resultado ,' ', resultado);

                var auxresultado = JSON.stringify(resultado);
                auxresultado = auxresultado.replaceAll("{", "");
                auxresultado = auxresultado.replaceAll("}", "");

                console.log(auxresultado);

                const myArray = auxresultado.split(",");

                let i=0;
                let auxDadosData = [];
                let auxDadosNumeros = [];
                for(i=0; (i < myArray.length); i++) {
                    let aux = myArray[i].split(":");
                    let data = aux[0];
                    data = data.replaceAll('"',"");
                    let dado = aux[1];
                    dado = dado.replaceAll(" ", "");
                    let numero = +dado;

                    //let auxstr = "{ data: " + data + ", quantidade:" + dado +"}"; 

                    auxDadosData.push(data);
                    auxDadosNumeros.push(numero);
                }

                setDadosData(auxDadosData);
                setDadosNumeros(auxDadosNumeros)
                console.log('dadosData == ',dadosData, dadosNumeros);

            // }

      })
      .catch(error => {
        console.log(error);
      })
  }

    return (
        <section className="formulario-container">
            <Row>
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>APIs Matomo - referência (data AAAA-MM-DD)</b> </InputGroup.Text>
                <Form.Control
                    defaultValue={dataGeral}
                    onChange={evento => setDataGeral(evento.target.value)}
                />            

                <Col md="auto">
                    <Card style={{ backgroundColor: '#FFF' }}>  
                        <Card.Body>
                            <Card.Title>
                            </Card.Title>
                            <Card.Text>
                                <Table striped bordered hover variant="light"> 
                                    {/* <thead>
                                        <tr>
                                            <th>Apis Matomo</th>
                                            <th>Descrição</th>
                                        </tr>
                                    </thead> */}
                                    <tbody>
                                        {nomeApis.map((api) => (
                                            <tr key={api.nome}
                                                onClick={(() => {     //#E0FFFF    #f44336
                                                        setApiSelecionada(api.nome)
                                                        ConsumoApiExterna(api.nome, dataGeral); // '2023-10-30') //'2023-05-01,today'
                                                })}
                                                // style={ {backgroundColor: `${api.cor}`} }
                                                >
                                                <td>{api.nome}</td>
                                                <td>{api.descricao}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Text>

                        </Card.Body>
                    </Card>

                </Col>
                <Col>
                    <Button variant="outline-dark" style={{ width: '50%' }} onClick={() => {
                        setShow(true)
                    }}>
                        <b> {apiSelecionada} </b> - Métricas Gerais (legenda colunas)
                    </Button>


                    {/* <Button variant="outline-success" style={{ width: '100%' }} onClick={() => {
                        setNumeros([totalPpa, totalJuve]);
                        setShow(true)
                    }}>
                        Gráfico
                    </Button> */}





                    <Button variant="outline-success" style={{ width: '40%' }} onClick={() => { 

                        setShow(true);
                                    //   <ChartJsMatomo
                                    //   dadosData
                                    //   dadosNumeros
                                    //   auxDadosNumeros
                                    //   numeros = {4}
                                    //   tipo_grafico = {4}
                                    // />
                    }}>
                        <b> {apiSelecionada} </b> - Gráfico 
                    </Button>                               
                    <Table striped bordered hover variant="info">
                        <thead style={{ backgroundcolor: "#FFF" }}>
                            <tr>
                                    <th>bounce_count</th>
                                    <th>label</th>
                                    {/* <th>logo</th> */}
                                    <th>max_actions</th>
                                    <th>nb_actions</th>
                                    <th>nb_uniq_visitors</th>
                                    <th>nb_users</th>
                                    <th>nb_visits</th>
                                    <th>nb_visits_converted</th>
                                    <th>sum_visit_length</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{resultado.toString}</td>
                            </tr>
                            { dadosData.map(( data, index ) => (                                                                
                                  <tr key={index}> 
                                    <td>{index}</td>
                                    <td>{data}</td>
                                    <td>{dadosNumeros[index]}</td>
                                </tr>
                                ))}                            
                        </tbody>
                    </Table>

                </Col>
            </Row>

        <Modal show={show} onHide={handleClose} className='modal-lg'>
          <Modal.Header closeButton>
            <Modal.Title>
              <p style={{ color: "#03a9f4" }} >Processos Participativos</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div>
                <ChartJsMatomo
                    labelsDados={dadosData}
                    dadosPopulacao={dadosNumeros}
                    dadosVotantes={dadosNumeros}
                    numeros = {4}
                    tipo_grafico = {4}
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>






            {/* <Modal show={show} className='modal-lg'>
                <Modal.Header closeButton onClick={handleClose}>
                    <h3 className="Auth-form-title">Métricas Gerais</h3>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                                <tr>
                                    <td> Legenda </td>
                                    <td> Finalidade </td>
                                </tr>
                        </thead>
                        <tbody>
                            <tr> <td>nb_uniq_visitors</td> <td>Número de visitantes únicos</td></tr>
                            <tr> <td>nb_visits</td> <td> Número de Visitas (30 min de inatividade considerada uma nova visita)</td></tr>
                            <tr> <td>nb_users</td> <td> Número de usuários ativos únicos (visitantes com ID de usuário conhecido ). Se você não estiver usando o User ID, essa métrica será definida como zero.</td></tr>
                            <tr> <td>nb_actions</td> <td> Número de ações (visualizações de páginas, outlinks e downloads)</td></tr>
                            <tr> <td>sum_visit_length</td> <td> Tempo total gasto, em segundos</td></tr>
                            <tr> <td>bounce_count</td> <td> Número de visitas que foram rejeitadas (visualizaram apenas uma página)</td></tr>
                            <tr> <td>max_actions</td> <td> Número máximo de ações em uma visita</td></tr>
                            <tr> <td>nb_visits_converted</td> <td> Número de visitas que converteram uma meta</td></tr>
                            <tr> <td>nb_conversions</td> <td> Número de conversões de meta</td></tr>
                            <tr> <td>revenue</td> <td> Receita total de conversões de metas</td></tr>
                        </tbody>                        
                    </Table>

                </Modal.Body>
            </Modal> */}
        </section>            
    )
}

export default MatomoDias;