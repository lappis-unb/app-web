import { useState } from 'react'
import { Modal, Button, Row, Col, Container, Card, Table, Spinner, Form, InputGroup, Dropdown, Image } from 'react-bootstrap';
import { URL_API_LOCAL } from '../../api';
import axios from 'axios'
import { ChartJsMatomo } from "../MatomoDias/ChartJsMatomo";

const MatomoSoma = () => {
    const [loading, setLoading] = useState(false)

    const [dataGeral, setDataGeral] = useState('2023-10-30');
    const [apiSelecionada, setApiSelecionada] = useState('');
    // let first = {date: '2023-05-01',
    //              aux: [{'sss': 111}, {'xxx': 222}] }
    const [resultado, setResultado] = useState([]);
    const [resumoIndividual, setResumoIndividual] = useState([]);
    const [mostraLabel, setMostraLabel] = useState('');
    const [selecLabel, setSelecLabel] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);    

    const [dadosLabel, setDadosLabel] = useState([]);
    const [dadosVisitas, setDadosVisitas] = useState([]);
    const [dadosVisitasUnicas, setDadosVisitasUnicas] = useState([]);
    const [tipoGrafico, SetTipoGrafico] = useState(0);
    const nomeGrafico = ["Doughnut", "Pie", "Bar", "Horizontal Bar", "Line"]    
    //const tamanhoGrafico = ["modal-sm", "modal-md", "modal-lg", "modal-xl", "modal-xxl"]    
    const tamanhoGrafico = ["modal-md", "modal-lg", "modal-lg", "modal-xl", "modal-xl"]    
    const [limite, SetLimite] = useState(15);

    const nomeApis = [
        { 'nome': 'DevicesDetection.getType', 'descricao': 'Dispositivos - Tipos', 'cor': "#ADFF2F" },
        { 'nome': 'DevicesDetection.getBrand', 'descricao': 'Dispositivos - Marcas', 'cor': "#ADFF2F" },
        { 'nome': 'DevicesDetection.getModel', 'descricao': 'Dispositivos - Modelos', 'cor': "#ADFF2F" },
        { 'nome': 'DevicesDetection.getOsFamilies', 'descricao': 'Dispositivos - Sistemas Operacionais', 'cor': "#ADFF2F" },
        { 'nome': 'DevicesDetection.getOsVersions', 'descricao': 'Dispositivos - Sist Operac Versões', 'cor': "#ADFF2F" },
        { 'nome': 'DevicesDetection.getBrowsers', 'descricao': 'Navegadores', 'cor': "#DAA520" },
        { 'nome': 'DevicesDetection.getBrowserVersions', 'descricao': 'Navegadores - Versões', 'cor': "#DAA520" },
        { 'nome': 'DevicesDetection.getBrowserEngines', 'descricao': 'Navegadores - Renderização', 'cor': "#DAA520" },

        { 'nome': 'UserCountry.getCountry', 'descricao': 'Geográfico - Países', 'cor': "#FFDEAD" },
        { 'nome': 'UserCountry.getContinent', 'descricao': 'Geográfico - Continentes', 'cor': "#FFDEAD" },
        { 'nome': 'UserCountry.getRegion', 'descricao': 'Geográfico - Regiões', 'cor': "#FFDEAD" },
        { 'nome': 'UserCountry.getCity', 'descricao': 'Geográfico - Cidades', 'cor': "#FFDEAD" },
        // {'nome': 'UserCountry.getCountryCodeMapping', 'descricao': 'Navegadores','cor' : ""},
        // {'nome': 'UserCountry.getLocationFromIP', 'descricao': 'Navegadores','cor' : ""},
        // {'nome': 'UserCountry.setLocationProvider', 'descricao': 'Navegadores','cor' : ""},
        // {'nome': 'UserCountry.getNumberOfDistinctCountries', 'descricao': 'Navegadores','cor' : ""},

        // {'nome': 'Referrers.get', 'descricao': 'Navegadores','cor' : ""}, 
        { 'nome': 'Referrers.getReferrerType', 'descricao': 'Origem Acesso - Tipo', 'cor': "#FFC0CB" },
        { 'nome': 'Referrers.getAll', 'descricao': 'Origem Acesso - Todos', 'cor': "#FFC0CB" },
        { 'nome': 'Referrers.getKeywords', 'descricao': 'Origem Acesso - Palavras', 'cor': "#FFC0CB" },
        // {'nome': 'Referrers.getSearchEnginesFromKeywordId', 'descricao': 'Navegadores','cor' : ""}, 
        { 'nome': 'Referrers.getSearchEngines', 'descricao': 'Origem Acesso - Buscadores', 'cor': "#FFC0CB" },
        // {'nome': 'Referrers.getKeywordsFromSearchEngineId', 'descricao': 'Navegadores','cor' : ""}, 
        { 'nome': 'Referrers.getCampaigns', 'descricao': 'Origem Acesso - Campanhas', 'cor': "#FFC0CB" },
        // {'nome': 'Referrers.getKeywordsFromCampaignId', 'descricao': 'Navegadores','cor' : ""}, 
        { 'nome': 'Referrers.getWebsites', 'descricao': 'Origem Acesso - Web sites', 'cor': "#FFC0CB" },
        // {'nome': 'Referrers.getUrlsFromWebsiteId', 'descricao': 'Navegadores','cor' : ""}, 
        { 'nome': 'Referrers.getSocials', 'descricao': 'Origem Acesso - Redes Sociais', 'cor': "#FFC0CB" },
        { 'nome': 'Referrers.getUrlsForSocial', 'descricao': 'Origem Acesso - URL Sociais', 'cor': "#FFC0CB" },
        // {'nome': 'Referrers.getNumberOfDistinctSearchEngines', 'descricao': 'Navegadores','cor' : ""}, 
        // {'nome': 'Referrers.getNumberOfDistinctSocialNetworks', 'descricao': 'Navegadores','cor' : ""}, 
        // {'nome': 'Referrers.getNumberOfDistinctKeywords', 'descricao': 'Navegadores','cor' : ""}, 
        // {'nome': 'Referrers.getNumberOfDistinctCampaigns', 'descricao': 'Navegadores','cor' : ""}, 
        // {'nome': 'Referrers.getNumberOfDistinctWebsites', 'descricao': 'Navegadores','cor' : ""}, 
        // {'nome': 'Referrers.getNumberOfDistinctWebsitesUrls', 'descricao': 'Navegadores','cor' : ""},



        // {'nome': 'VisitsSummary.get', 'descricao': 'Tipos','cor' : ""},
        // {'nome': 'VisitsSummary.getVisits', 'descricao': 'Tipos','cor' : ""},
        // {'nome': 'VisitsSummary.getUniqueVisitors', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitsSummary.getUsers', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitsSummary.getActions', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitsSummary.getMaxActions', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitsSummary.getBounceCount', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitsSummary.getVisitsConverted', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitsSummary.getSumVisitsLength', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitsSummary.getSumVisitsLengthPretty', 'descricao': 'Tipos','cor' : ""},
        // {'nome': 'VisitTime.getVisitInformationPerLocalTime', 'descricao': 'Tipos','cor' : ""}, 
        // {'nome': 'VisitTime.getVisitInformationPerServerTime', 'descricao': 'Tipos','cor' : ""},
        // {'nome': 'VisitTime.getByDayOfWeek', 'descricao': 'Tipos','cor' : ""},
        // {'nome': 'VisitFrequency.get', 'descricao': 'Tipos'}
    ]


    // label2.sort(function(a,b) {
    //     return a.nb_visits < b.nb_visits ? -1 : a.nb_visits > b.nb_visits ? 1 : 0;
    // });
    const OrdenarVisits = (array_ordenar) => {
        //console.log('ordenar: ', campo)
        array_ordenar.sort(function (a, b) {
          if (a.nb_visits > b.nb_visits) { return -1 } else { return true }
        })
      }    

    async function myFunction(label) {
        var resumo = [];
        resultado.map( (individual) => {
            //console.log('individual.label',individual.label)            
                if (individual.label === label) {
                    console.log('individual ===',individual)
                    resumo.push(individual);
                }
            })
            setLoading(false);
        return resumo;
        }

    const buscaDados = async (label) => {
        setLoading(true);
        var resumo = await myFunction(label);
        setResumoIndividual(resumo)        
    }

    function isNegative(element, index, array) {
        console.log(element.label,' ', selecLabel,' ',index,' ',array);
        return element.label === selecLabel;
        // return element < 0;
        return array.filter(r => r.label === selecLabel)
      }
    // const int8 = new Int8Array([10, -20, 30, -40, 50]);
    // console.log('-------->',int8.findIndex(isNegative));
    //   // Expected output: 1

    const ConsumoApiExterna = async (nomeApi, dataRequisicao) => {


        console.log('.',dataRequisicao,'.');
        //var limit = 10;
        if (dataRequisicao.indexOf("{") !== -1) {
            let aux = dataRequisicao.substr((dataRequisicao.indexOf("{") + 1),(dataRequisicao.length),'_');
            SetLimite(aux);
            dataRequisicao = dataRequisicao.substr(0,(dataRequisicao.indexOf("{")));
            console.log('.',dataRequisicao,'.',aux,'_', limite);
        }

        const data = {
            api: nomeApi,
            data: dataRequisicao,
            limite: limite
        };

        setLoading(true);

        await axios.post(`${URL_API_LOCAL}/apimatomo/requisicaogravando`, data)
            .then(todasMensagens => {
                    var resultadoX = todasMensagens.data;
                    var resultadoTeste = [];
                    var registro = [];

                    if (dataRequisicao.length < 11) {                      
                        Object.keys(resultadoX).forEach(key => {
                            console.log('resultadoX[key]', resultadoX[key])

                                registro = resultadoX[key];    

                                registro.data=dataRequisicao;             

                                resultadoTeste.push(registro);

                            })
                        }
                        else {
                            let dataConsumo = '9999-99-99'
                            Object.keys(resultadoX).forEach(key => {        
                                console.log('resultadoX[key]', key)   
                                dataConsumo = key; 

                                Object.keys(resultadoX[key]).forEach(key1 => {
                                    registro = resultadoX[key][key1];
                                    registro.data = dataConsumo;
                                    resultadoTeste.push(registro);
                                })
                            })
                        }


//construir primeiro todos os labels existentes
const labels = [];
for (let objeto of resultadoTeste){ 
    if (!labels.includes(objeto.label)){
        labels.push(objeto.label);
    }
}                        
console.log('lables=',labels);
//ler os labels e incluir os objetos (campos)
const labels_1 = [];
for (let objeto of labels){ 
        const filterApi = resultadoTeste.filter( r => r.label === objeto);
      //  console.log('selectLabel:', objeto,' ',filterApi);
        labels_1.push(filterApi);        
}                        
console.log('lables_1=',labels_1);

let g_labels = [];
let g_visitas = [];
let g_visitasUnicas = [];
const labels_2 = [];
Object.keys(labels_1).forEach(key => {        

   // console.log('labels_1[key]', key)   

    var registro;
    let bounce_count = 0;
    let max_actions = 0;
    let nb_actions = 0;
    let nb_uniq_visitors = 0;
    let nb_users = 0;
    let nb_visits = 0;
    let nb_visits_converted = 0;
    let sum_visit_length = 0;


    Object.keys(labels_1[key]).forEach(key1 => {
        registro = labels_1[key][key1];
        //console.log('registro=',registro)        

        bounce_count = bounce_count + registro.bounce_count;
        max_actions = max_actions + registro.max_actions;
        nb_actions = nb_actions + registro.nb_actions;
        nb_uniq_visitors = nb_uniq_visitors + registro.nb_uniq_visitors;
        nb_users = nb_users + registro.nb_users;
        nb_visits = nb_visits + registro.nb_visits;
        nb_visits_converted = nb_visits_converted + registro.nb_visits_converted;
        sum_visit_length = sum_visit_length + registro.sum_visit_length;
        // labels_2.push(registro);
        //console.log(registro.label,' ',nb_uniq_visitors,' ',registro.nb_uniq_visitors)
    })

    registro.data = dataRequisicao;
    registro.bounce_count = bounce_count;
    registro.max_actions = max_actions;
    registro.nb_actions = nb_actions;
    registro.nb_uniq_visitors = nb_uniq_visitors;
    registro.nb_users = nb_users;
    registro.nb_visits = nb_visits;
    registro.nb_visits_converted = nb_visits_converted;
    registro.sum_visit_length = sum_visit_length;    

    labels_2.push(registro);
})
console.log('antes lables_2=',labels_2);
OrdenarVisits(labels_2);
console.log('depois lables_2=',labels_2);

let quantidade = 0;
labels_2.forEach(key => {        

    console.log('quantidade', quantidade,' ',key.label)   
    if (quantidade < limite) {
        g_labels.push(key.label);
        g_visitas.push(key.nb_visits);
        g_visitasUnicas.push(key.nb_uniq_visitors);
    }

    quantidade++;
})

setDadosLabel(g_labels);
setDadosVisitas(g_visitas);
setDadosVisitasUnicas(g_visitasUnicas);


                // const filterApi = resultadoTeste.filter( r => r.label === selecLabel);
                // console.log('selectLabel:', selecLabel,' ',filterApi)

                // var objArray = []
                // resultadoTeste.forEach(key2 => {
                //     //const index = objArray.findIndex(objeto => objeto.label === key2.label);
                //     setSelecLabel(key2.label);
                //     console.log(selecLabel,' ',key2.label); //,' ',index);
                //     let idx = 0
                //     const index = objArray.findIndex(isNegative(key2,idx,resultadoTeste));
                    
                //         console.log(index);
                //         if (index > -1) {
                //             objArray = objArray[index];
                //             objArray.bounce_count =+ key2.bounce_count;
                //             // objArray.data = objArray.data
                //             // label
                //             // logo
                //             objArray.max_actions =+ key2.max_actions;
                //             objArray.nb_actions =+ key2.nb_actions;
                //             objArray.nb_uniq_visitors =+ key2.nb_uniq_visitors;
                //             objArray.nb_users =+ key2.nb_users;
                //             objArray.nb_visits =+ key2.nb_visits;
                //             objArray.nb_visits_converted =+ key2.nb_visits_converted;
                //             objArray.sum_visit_length =+ key2.sum_visit_length;
                //             objArray[index] = objArray; //{id: 2, nome: "Objeto Atualizado"};
                //             console.log('atualiza - objArray',objArray)
                //         } else {
                //             //console.log('objArray',objArray)                            
                //             objArray.push(key2);
                //             console.log('grava - objArray',objArray)
                //         }
                    
                // })
                //         //const index = array.findIndex(objeto => objeto.id === 2);
                //         //array[index] = {id: 2, nome: "Objeto Atualizado"};                        

                //     console.log('resultadoTeste=',resultadoTeste);
                //     console.log('ObjArray=', objArray);

                // // let aux=todasMensagens.data;
                // // const obj = {dataRequisicao};
                // // var getMensagens = { dataRequisicao: [aux] }

                // setResultado(resultadoTeste)





                setResultado(labels_2);  
 



                setLoading(false)

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <section className="formulario-container">
            <Row>

                <Container>
                <Row>
                    <Col sm={10}>
                    <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Analytics | APIs Matomo : referência (data AAAA-MM-DD,AAAA-MM-DD linhas)</b>
                    _ 
                        <Button variant="outline-success" 
                            onClick={() => {
                                setShow3(true)
                            }}                    
                        >?</Button>   
                     </InputGroup.Text>
                    <Form.Control
                        defaultValue={dataGeral}
                        onChange={evento => setDataGeral(evento.target.value)}
                    />

                    </Col>

                    <Col sm={2}>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                            {nomeGrafico[tipoGrafico]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item onClick={evento => SetTipoGrafico(0)}>Doughnut</Dropdown.Item>
                            <Dropdown.Item onClick={evento => SetTipoGrafico(1)}>Pie</Dropdown.Item>
                            <Dropdown.Item onClick={evento => SetTipoGrafico(2)}>Bar</Dropdown.Item>
                            <Dropdown.Item onClick={evento => SetTipoGrafico(3)}>Horizontal Bar</Dropdown.Item>
                            <Dropdown.Item onClick={evento => SetTipoGrafico(4)}>Line</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>                 

                        {/* <Button variant="outline-primary" disabled>
                                                {loading && <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    /> }
                                                    <span className="visually-hidden">Loading...</span>
                                                </Button>{' '} */}


                    </Col>
                </Row>
                </Container>
 
                <Col md="auto">
                    <Card style={{ backgroundColor: '#FFF' }}>
                        <Card.Body>
                            <Card.Title>
                            </Card.Title>
                            <Card.Text>
                                <Table striped bordered hover variant="light">
                                    <thead>
                                        <tr>
                                            {/* <th>Descrição</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nomeApis.map((api) => (
                                            <tr key={api.nome}
                                                onClick={( async () => {     
                                                    setApiSelecionada(api.descricao)
                                                    await ConsumoApiExterna(api.nome, dataGeral); 
                                                })}
                                            >
                                                {/* <td>{api.nome}</td> */}
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
                        <b> {apiSelecionada} </b> Top <b>{limite}</b> - Métricas Gerais

                    </Button>





                    <Button variant="outline-success" style={{ width: '50%' }} onClick={() => {
                        setShow1(true);
                    }}
                    > Gráfico -  {nomeGrafico[tipoGrafico]}
                    </Button>         

                    <Table striped bordered hover variant="info">
                        <thead style={{ backgroundcolor: "#FFF" }}>
                            <tr >
                                <th>Data</th>
                                <th>Rejeições</th>
                                <th>Título</th>
                                {/* <th>logo</th> */}
                                <th>Máximo Ações</th>
                                <th>Ações</th>
                                <th>Visitantes Únicos</th>
                                <th>Usuários</th>
                                <th>Visitantes</th>
                                <th>Conversões</th>
                                <th>Tempo Gasto</th>
                            </tr>

                        </thead>
                        <tbody>
                            {resultado.map((registro, index) => (
                                <tr key={index} onClick={() => {

                                    buscaDados(registro.label); 

                                    setMostraLabel(registro.label) 
                                    }}>
                                    <td>{registro.data}</td>
                                    <td>{registro.bounce_count}</td>
                                    <td>{registro.label}</td>
                                    <td>{registro.max_actions}</td>
                                    <td>{registro.nb_actions}</td>
                                    <td>{registro.nb_uniq_visitors}</td>
                                    <td>{registro.nb_users}</td>
                                    <td>{registro.nb_visits}</td>
                                    <td>{registro.nb_visits_converted}</td>
                                    <td>{registro.sum_visit_length}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                </Col>
            </Row>

            <Modal show={show} className='modal-lg'>
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
                            <tr> <td>Visitantes Únicos</td> <td>Número de visitantes únicos</td></tr>
                            <tr> <td>Visitantes</td> <td> Número de Visitas (30 min de inatividade considerada uma nova visita)</td></tr>
                            <tr> <td>Usuários</td> <td> Número de usuários ativos únicos (visitantes com ID de usuário conhecido ). Se você não estiver usando o User ID, essa métrica será definida como zero.</td></tr>
                            <tr> <td>Ações</td> <td> Número de ações (visualizações de páginas, outlinks e downloads)</td></tr>
                            <tr> <td>Tempo Gasto</td> <td> Tempo total gasto, em segundos</td></tr>
                            <tr> <td>Rejeições</td> <td> Número de visitas que foram rejeitadas (visualizaram apenas uma página)</td></tr>
                            <tr> <td>Máximo Ações</td> <td> Número máximo de ações em uma visita</td></tr>
                            <tr> <td>Conversões</td> <td> Número de visitas que converteram uma meta</td></tr>
                            {/* <tr> <td>nb_conversions</td> <td> Número de conversões de meta</td></tr>
                            <tr> <td>revenue</td> <td> Receita total de conversões de metas</td></tr> */}
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal>

            {/* <Modal show={show1} className='modal-xl'>
                <Modal.Header closeButton onClick={handleClose1}>
                    <h3 className="Auth-form-title">Resumo Individual - {mostraLabel}</h3>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>bounce_count</th>
                                <th>label</th>
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
                            {resumoIndividual.map((registro, index) => (
                                // console.log(resumoIndividual)
                                    (<tr key={index}>
                                        <td>{registro.data}</td>
                                        <td>{registro.bounce_count}</td>
                                        <td>{registro.label}</td>
                                        <td>{registro.max_actions}</td>
                                        <td>{registro.nb_actions}</td>
                                        <td>{registro.nb_uniq_visitors}</td>
                                        <td>{registro.nb_users}</td>
                                        <td>{registro.nb_visits}</td>
                                        <td>{registro.nb_visits_converted}</td>
                                        <td>{registro.sum_visit_length}</td>
                                    </tr>)
                            ))}
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal> */}


        <Modal show={show1} onHide={handleClose1} className={tamanhoGrafico[tipoGrafico]}> 
          <Modal.Header closeButton>
            <Modal.Title>
              <p style={{ color: "#03a9f4" }} >Processos Participativos</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div>
                <ChartJsMatomo
                    labelsDados={dadosLabel}
                    dadosPopulacao={dadosVisitas}
                    dadosVotantes={dadosVisitasUnicas}
                    numeros = {4}
                    tipo_grafico = {tipoGrafico}
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose1}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>




<Modal show={loading} className='modal-sm'> 
          {/* <Modal.Header closeButton>
            <Modal.Title>
              <p style={{ color: "#03a9f4" }} >Processando ...</p>
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <Form>
                        {/* <Button variant="outline-primary" disabled> */}
                                                {loading && <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="xxl"
                                                    role="status"
                                                    aria-hidden="true"
                                                    /> }
                                                    {/* <p>nhnhnhnhnhnhnhnhnhnh</p> */}
                                                    <span>   -   Matomo loading...</span>

                                                {/* </Button>{' '} */}
            </Form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose1}>
              OK
            </Button>
          </Modal.Footer> */}
        </Modal>


      <Modal show={show3} onHide={handleClose3} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >Ajuda</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             <Image src='/imagens/help_matomo.png' rounded />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose3}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> 


        </section>
    )
}

export default MatomoSoma;