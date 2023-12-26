import { useState } from 'react'
import { Modal, Button, Row, Col, Container, Card, Table, Spinner, Form, InputGroup } from 'react-bootstrap';
import { URL_API_LOCAL } from '../../api';
import axios from 'axios'

//import { Spinner } from "../Spinner";

const Matomo = () => {
    const [loading, setLoading] = useState(false)

    const [dataGeral, setDataGeral] = useState('2023-10-30');
    const [apiSelecionada, setApiSelecionada] = useState('');
    // let first = {date: '2023-05-01',
    //              aux: [{'sss': 111}, {'xxx': 222}] }
    const [resultado, setResultado] = useState([]);
    const [resumoIndividual, setResumoIndividual] = useState([]);
    const [mostraLabel, setMostraLabel] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

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


    // const AtualizaMatomo = async (nomeApi, resposta, dataRequisicao) => {

    //     const data = {
    //         'apinome': nomeApi,
    //         'resposta': resposta,
    //         'dataRequisicao': dataRequisicao
    //     }                    
    //     console.log('atualizando - api = ', nomeApi, ' data-nomeApi = ',data)
    //     await axios.post(`${URL_API_LOCAL}/apimatomo/create`, data)
    //         .then(matomo => {
    //             console.log('atualizaMatomo ', matomo)
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       })
    //   }

    //   const ConsumoDatasApiExterna = async (nomeApi) => {

    //     const data = {
    //         api: nomeApi
    //       };

    //     console.log('api = ', nomeApi, ' data-nomeApi = ',data)

    //     await axios.post(`${URL_API_LOCAL}/apimatomo/requisicao`, data)
    //         .then(todasMensagens => {
    //             let getMensagens = todasMensagens.data;

    //             AtualizaMatomo(data.api, getMensagens);

    //             if ( nomeApi.indexOf( "VisitsSummary.getUniqueVisitors") !== -1 ) { 
    //                 let resultArray = [ { 'label': getMensagens.value } ];
    //                 setResultado(resultArray);
    //                 console.log('>>>',nomeApi,resultArray, resultado)
    //             }
    //             if ( nomeApi.indexOf( "VisitsSummary.getVisitors") !== -1 ) { 
    //                 let resultArray = [ { 'label': getMensagens.value } ];
    //                 setResultado(resultArray);
    //                 console.log('>>>',nomeApi,resultArray, resultado)                
    //             }            
    //             if ( nomeApi.indexOf( "VisitsSummary.getUsers") !== -1 ) { 
    //                 let resultArray = [ { 'label': getMensagens.value } ];
    //                 setResultado(resultArray);
    //                 console.log('>>>',nomeApi,resultArray, resultado)                
    //             }                        
    //             else {
    //                 setResultado(getMensagens)
    //                 console.log('getMensagens ', getMensagens)
    //             }

    //       })
    //       .catch(error => {
    //         console.log(error);
    //       })
    //   }


    async function myFunction(label) {

            // setLoading(false)

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
        //console.log('chegou ',label, resultado)
        //var resumo = [];

        setLoading(true);
       // console.log(' >> 1 setLoading=',loading)

        var resumo = await myFunction(label);

        // setLoading(true);         
        // console.log('2 setLoading=',loading)        

        // resultado.map( (individual) => {
        //     //console.log('individual.label',individual.label)            
        //     if (individual.label === label) {
        //         console.log('individual ===',individual)
        //         resumo.push(individual);
        //     }
        // })


        console.log('resumo',resumo)
        setResumoIndividual(resumo)        
        
        console.log('resumoIndividual',resumoIndividual)
   
      }


    const ConsumoApiExterna = async (nomeApi, dataRequisicao) => {

        console.log('data requisicao ', dataRequisicao)

        const data = {
            api: nomeApi,
            data: dataRequisicao,
            //limite: 15
        };

        console.log('api = ', nomeApi, ' data-nomeApi = ', dataRequisicao, ' resultado= ', resultado, '<-');

        setLoading(true);

        //await axios.post(`${URL_API_LOCAL}/apimatomo/requisicao`, data)
        await axios.post(`${URL_API_LOCAL}/apimatomo/requisicaogravando`, data)
            .then(todasMensagens => {
        //        console.log('todasMensagens=', todasMensagens);

                // Object.values(todasMensagens.data).forEach(val => {console.log(val)})
                // console.log('passou ...')

                // if (dataRequisicao.length > 10) {
                //     Object.keys(todasMensagens.data).forEach(key => {
                //         console.log(key, todasMensagens.data[key])
                //         Object.keys(todasMensagens.data[key]).forEach(key1 => {
                //             console.log(key1, (todasMensagens.data[key])[key1])
                //         })
                //     })
                // }



                    var resultadoX = todasMensagens.data;
                    console.log('resultadoX', resultadoX);
                    var resultadoTeste = [];
                    var registro = [];

                    if (dataRequisicao.length < 11) {                      
                        Object.keys(resultadoX).forEach(key => {
                            console.log('resultadoX[key]', resultadoX[key])

                                registro = resultadoX[key];    

//                                console.log('registro=',registro);

                                registro.data=dataRequisicao;             

//                                console.log('registro depois do push=',registro);

                                resultadoTeste.push(registro);

//                                console.log('resultadoTeste=',resultadoTeste);
                            })
                        }
                        else {
                            let dataConsumo = '9999-99-99'
                            Object.keys(resultadoX).forEach(key => {        
                                console.log('resultadoX[key]', key)   
                                dataConsumo = key; 

                                Object.keys(resultadoX[key]).forEach(key1 => {
                 //                   console.log('resultadoX[key][key1]', resultadoX[key][key1])
                                    registro = resultadoX[key][key1];
                                    registro.data = dataConsumo;
                                    resultadoTeste.push(registro);
                                })
                            })
                        }
    
                    // console.log('--->>>>> ', registro);
                    // resultadoTeste.push(registro);


                    // Object.keys(resultadoX).forEach(key => {
                    //     console.log('resultadoX[key]', resultadoX[key])
                    //     if (dataRequisicao.length > 10) {    
                    //         Object.keys(resultadoX[key]).forEach(key1 => {
                    //             registro = resultadoX[key][key1];
                    //             // Object.keys(resultadoX[key][key1]).forEach(key2 => {
                    //             //     let registro = resultadoX[key][key1][key2];
                    //                 //                                    console.log('forEach ',resultado[key][key1][key2]);
                    //                 // console.log('--->>>>> ', registro);
                    //                 // resultadoTeste.push(registro);
                    //                 // })
                    //             // })
                    //         })
                    //         }
                    //         else {
                    //             registro = resultadoX[key];                        
                    //         }
                    //         console.log('--->>>>> ', registro);
                    //         resultadoTeste.push(registro);
                    //     })

                   // console.log('resultadoTeste=',resultadoTeste)

                //let getMensagens = dataRequisicao + todasMensagens.data;

                let aux=todasMensagens.data;
                const obj = {dataRequisicao};
                var getMensagens = { dataRequisicao: [aux] }

                // let apireg = { id: dataRequisicao, dados: aux}

                
                    // obj,
                    // aux}

        //        console.log('getMensagens', getMensagens)                  

                // if (dataRequisicao.length > 10) {
                //     console.log('data.length > 10',getMensagens)
                //     console.log('antes')

                //     // Object.keys(getMensagens).map(a => {
                //     //     console.log('&&&&&&&&',a, getMensagens(a))
                //     //     console.log('---')
                //     //     Object.keys(a).map(b => {console.log(b, a(b))})
                //     // })
                //     console.log('depois')
                // }


                setResultado(resultadoTeste)

                console.log('getMensagens -> RESULTADO ', resultado);
                // console.log('resultado ',typeof resultado ,' ', resultado);
                // var auxresultado = JSON.stringify(resultado);
                // // auxresultado = auxresultado.replaceAll("{", "");
                // // auxresultado = auxresultado.replaceAll("}", "");
                // console.log(auxresultado);                

                setLoading(false)


            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <section className="formulario-container">
            <Row>
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Analytics | APIs Matomo : referência (data AAAA-MM-DD)</b> </InputGroup.Text>
                <Form.Control
                    defaultValue={dataGeral}
                    onChange={evento => setDataGeral(evento.target.value)}
                />
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


                                            {/* <>
                    {!loading && <Spinner animation="border" variant="primary" />}
                    </> */}


                <Col md="auto">
                    <Card style={{ backgroundColor: '#FFF' }}>
                        <Card.Body>
                            <Card.Title>
                            </Card.Title>
                            <Card.Text>
                                <Table striped bordered hover variant="light">
                                    <thead>
                                        <tr>
                                            {/* <th>Apis Matomo


                                                {!loading && <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    />}         

                                            </th> */}





                                            {/* <th>Descrição</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nomeApis.map((api) => (
                                            <tr key={api.nome}
                                                onClick={( async () => {     //#E0FFFF    #f44336
                                                    setApiSelecionada(api.descricao)
                                                    await ConsumoApiExterna(api.nome, dataGeral); // '2023-10-30') //'2023-05-01,today'
                                                })}
                                            // style={ {backgroundColor: `${api.cor}`} }
                                            >
                                                {/* <td>{api.nome}</td> */}
                                                <td>{api.descricao}</td>


                                            </tr>
                                        ))}

{/* <Spinner animation="border" variant="primary" />
                                        {!loading && <Spinner />} */}

                                    </tbody>                                   
                                </Table>
                            </Card.Text>
                            {/* <Button variant="outline-success" 
              onClick={() => buscaComentarios(propostaSelecionada.id)}
             > Comments</Button>
           
            <Button variant="outline-success" onClick={handleShow}>
              {comentariosSoma}
            </Button> */}

                        </Card.Body>
                    </Card>

                </Col>
                {/* </Row> */}

                {/* <Button variant="primary"
                onClick={setShow()}
            >Atualizar Matomo</Button> */}

                {/* <Row> */}
                <Col>
                    <Button variant="outline-dark" style={{ width: '50%' }} onClick={() => {
                        setShow(true)
                    }}>
                        <b> {apiSelecionada} </b> - Métricas Gerais (legenda colunas)
                    </Button>
                    <Button variant="outline-success" style={{ width: '50%' }} onClick={() => {
                        setShow1(true);
                    }}
                    >
                        Resumo Individual <b> {mostraLabel} </b>
                    </Button>         

                    <Table striped bordered hover variant="info">
                        <thead style={{ backgroundcolor: "#FFF" }}>
                            <tr >
                                {/* <th>Data</th>
                                <th>bounce_count</th>
                                <th>label</th>
                                <th>max_actions</th>
                                <th>nb_actions</th>
                                <th>nb_uniq_visitors</th>
                                <th>nb_users</th>
                                <th>nb_visits</th>
                                <th>nb_visits_converted</th>
                                <th>sum_visit_length</th> */}

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

                                    // setLoading(true);
                                    // console.log('1 setLoading=',loading)

                                    buscaDados(registro.label); 

                                    // setLoading(false);
                                    // console.log('2 setLoading=',loading)


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

                            {/* <tr>
                                <td>
                                    estou aqui
                                </td>
                            </tr> */}

                            {/* {       Object.keys(resultado).forEach( key => {
                                    // console.log('R1:',key, 'R2:',resultado[key])
                                    let dataOK = key;

                                    Object.keys(resultado[key]).forEach( key1 => {

                                    Object.keys(resultado[key][key1]).forEach( key2 => {

                                    let registro = resultado[key][key1][key2];
//                                    console.log('forEach ',resultado[key][key1][key2]);
                                    console.log(registro);

                                    // Object.keys(resultado[key][key1][key2]).forEach( key3 => {
                                    //     let registro = key3;
                                    //     console.log('forEach ',resultado[key][key1][key2][key3]);
                                        //console.log(key1, (todasMensagens.data[key])[key1])
                                        (  
                                            <tr key={registro.label}>
                                            <td>{dataOK}{registro.bounce_count}</td>
                                            <td>{registro.label}</td>
                                            <td>{registro.max_actions}</td>
                                            <td>{registro.nb_actions}</td>
                                            <td>{registro.nb_uniq_visitors}</td>
                                            <td>{registro.nb_users}</td>
                                            <td>{registro.nb_visits}</td>
                                            <td>{registro.nb_visits_converted}</td>
                                            <td>{registro.sum_visit_length}</td>
                                        </tr>                                                                                   
                                        )
                                    // })
                                })
                            })
                                })
                            } */}



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
            </Modal>





            <Modal show={show1} className='modal-xl'>
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
            </Modal>




        <Modal show={loading} className='modal-sm'> 
          <Modal.Body>
            <Form>
                                                {loading && <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="xxl"
                                                    role="status"
                                                    aria-hidden="true"
                                                    /> }
                                                    <span>   -   Matomo loading...</span>
            </Form>
          </Modal.Body>
        </Modal>



        </section>
    )
}

export default Matomo;