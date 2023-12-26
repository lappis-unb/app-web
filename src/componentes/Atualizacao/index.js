import { useEffect } from 'react'
import { useState } from 'react'
//import ComentarioShow from '../PropostaComentario/ComentariosShow'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form, Modal, Dropdown, Row, Col, Accordion, Image, Container } from 'react-bootstrap'

import { ChartVotos } from "../Proposta/ChartVotos";
import { ChartDatas } from "../Proposta/ChartDatas";

import { URL_API_LOCAL } from '../../api';

const Atualizacao = () => {

  const [id, setId] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [de, setDe] = useState(0)
  const [ate, setAte] = useState(0)
  const [total, setTotal] = useState(0)

  const [processo, setProcesso] = useState('confjuv4')
  const [totalCategorias, setTotalCategorias] = useState([{}])
  const [totalDatas, setTotalDatas] = useState([{}])  
  const [categoriaSelecionada,setCategoriaSelecionada] = useState('') 
  const [totalPpa, setTotalPpa] = useState([{}])
  const [totalJuve, setTotalJuve] = useState([{}])

  const [categoria, setCategoria] = useState('')
  const [categorias, setCategorias] = useState([])

  const [propostas, setPropostas] = useState([{}])
  const [propostaSelecionada, setPropostaSelecionada] = useState({})
  const [comentarios, setComentarios] = useState([{}])
  const [comentariosSoma, setComentariosSoma] = useState(0)

  const [numeros, setNumeros] = useState([{}])

  const [tipoGrafico, SetTipoGrafico] = useState(0);
  const nomeGrafico = ["Doughnut", "Pie", "Bar", "Horizontal Bar", "Line"]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);  

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);    

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);     

  const [acordeao, setAcordeao] = useState("1");
  const [acordeao1, setAcordeao1] = useState("1");

  useEffect(() => {

    axios.get(`${URL_API_LOCAL}/propostas/total`)
      .then(resposta => {
        console.log(resposta.data, ' ')
        setTotal(resposta.data)
        console.log(total);
      })
      .catch(error => {
        console.log(error);
      })

    MontaCategorias('ppaparticip');

    axios.get(`${URL_API_LOCAL}/propostas`)
      .then(todasPropostas => {
        //console.log('todas as propostas: ',todasPropostas)            
        if (todasPropostas.data[0] !== undefined) {
          let getPropostas = todasPropostas.data;
          setPropostas(getPropostas)
          //console.log('getPropostas ',getPropostas)
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })

    estatisticaEvento(2);

    estatisticaEvento(3);

    estatisticaPropostasDatas('confjuv4');

  }, 0)

  const MontaCategorias = (evento) => {
    axios.get(`${URL_API_LOCAL}/temas/evento/${evento}`)
      .then(todosTemas => {
        //console.log('categorias por eventos: ', todosTemas)
        if (todosTemas.data[0] !== undefined) {
          let getCategorias = todosTemas.data;
          setCategorias(getCategorias)
          //console.log('getCategorias ', getCategorias)
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })    
  }

  const IntervaloPropostas = (de, ate) => {
    axios.get(`${URL_API_LOCAL}/propostas/deate/${de}/${ate}`)
      .then(propostas => {
        if (propostas.data[0] !== undefined) {
          console.log(' de= ', de, ' ate= ', ate, 'propostas', propostas)
          setPropostas(propostas.data)
        } else {
          setPropostas([])
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const CategoriaPropostas = (categoria) => {
    console.log('catewgoria = ', categoria)

    axios.get(`${URL_API_LOCAL}/propostas/categoriaName/${categoria}`)
      .then(propostas => {
        if (propostas.data[0] !== undefined) {
          console.log(' categoria= ', categoria, ' propostas', propostas)
          setPropostas(propostas.data)

          setComentarios([])
        } else {
          setPropostas([])
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const OrdenarPropostas = (campo) => {
    console.log('ordenar = ', campo)
    propostas.sort(function (a, b) {
      if (a.supports > b.supports) { return -1 } else { return true }
    })
  }

  const OrdenarComentarios = (campo) => {
    console.log('ordenar comentários = ', campo)
    comentarios.sort(function (a, b) {
      if (a.created_at > b.created_at) { return -1 } else { return true }
    })
  }

  const OrdenarTotalCategorias = (campo) => {
    console.log('ordenar categorias totalizadas = ', totalCategorias);
    totalCategorias.sort(function (a, b) {
      if (a.votos > b.votos) { return -1 } else { return true }
    })
    console.log(totalCategorias)
  }  

  const OrdenarTotalDatas = (campo) => {
    //console.log('ordenar datas totalizadas = ', totalDatas);
    totalDatas.sort(function (a, b) {
      if (a._id < b._id) { return -1 } else { return true }
    })
    console.log('depois do sort:',totalDatas)
  } 

  const buscaDados = async (id) => {
    await axios.get(`${URL_API_LOCAL}/propostas/id/${id}`)
      .then(resposta => {
        console.log(resposta.data)
        if (resposta.data[0] !== undefined) {
          console.log(resposta.data[0])

          setPropostaSelecionada(resposta.data[0]);

          setId(resposta.data[0].id);
          setTitle(resposta.data[0].title);
          setBody(resposta.data[0].body);
          setCategory(resposta.data[0].category_name);

          //buscaComentarios(propostaSelecionada.id);
          setComentariosSoma(0);

          // setCargo(resposta.data[0].cpf);
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const buscaComentarios = async (id) => {
    await axios.get(`${URL_API_LOCAL}/propostacomentarios/proposta/${id}`)
      .then(resposta => {
        console.log(resposta.data)
        if (resposta.data[0] !== undefined) {
          console.log(resposta.data[0])
          setComentarios(resposta.data);

          setComentariosSoma(resposta.data.length);
          //  OrdenarComentarios(0);          
          console.log('Comentários: ', comentariosSoma, ':::', comentarios)
        } else {
          setComentarios([{}]);
          setComentariosSoma(0);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const estatisticaEvento = async (evento) => {
    await axios.get(`${URL_API_LOCAL}/propostas/totalEvento/${evento}`)
      .then(resposta => {
        // console.log('Atualizada TotalEvento: ',resposta.data)
        if (evento === 2) { setTotalPpa(resposta.data) }
        if (evento === 3) { setTotalJuve(resposta.data); } // console.log('totalJuve=',totalJuve);    }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const estatisticaPropostas = async () => {
    await axios.get(`${URL_API_LOCAL}/propostas/totalCategoria`)
      .then(resposta => {
        //console.log('Atualizada: ',resposta.data)            
        setTotalCategorias(resposta.data);
        console.log('Atualizada TotalCategorias: ', totalCategorias)
        OrdenarTotalCategorias(0);
        setProcesso('Todas Categorias')
      })
      .catch(error => {
        console.log(error);
      })
    // })

    console.log('Estatisticas OK')
  }

  const estatisticaPropostasCategorias = async (processo) => {
    await axios.get(`${URL_API_LOCAL}/propostas/totalCategoriaEvento/${processo}`)
      .then(resposta => {
        //console.log('Atualizada: ',resposta.data)            
        setTotalCategorias(resposta.data);
        console.log('Atualizada TotalCategorias: ', totalCategorias)
      })
      .catch(error => {
        console.log(error);
      })
    // })

    console.log('Estatisticas Categorias OK')
  }  

  const estatisticaPropostasDatas = async (processo) => {
    await axios.get(`${URL_API_LOCAL}/propostas/totalDataEvento/${processo}`)
      .then(resposta => {
        console.log('Atualizada: ',processo,' ',resposta.data)            
        setTotalDatas(resposta.data);
        OrdenarTotalDatas(0);
        console.log('Atualizada TotalDatas: ', totalDatas)
      })
      .catch(error => {
        console.log(error);
      })
    // })

    console.log('Estatisticas Datas OK')
  }   

  return (
    <>
      <section className="formulario-container">
        <form className="formulario">
    <Container>
    <Row>
        <Col>
            <h4> Atualizado em 30/10/2023</h4>
        {/* </Col>
        <Col> */}
            <h4> {totalJuve.propostas + totalPpa.propostas} propostas  </h4>
        {/* </Col>
        <Col> */}
            <h4> {(totalPpa.votos + totalJuve.votos)?.toLocaleString('pt-BR', { style: 'decimal', currency: 'BRL', currencyDisplay: 'name' })} votos  </h4>
        </Col>
        <Col>
        <Button variant="outline-secondary" 
                    onClick={() => {
                        setShow3(true)
                    }}                    
                >Detalhes</Button>
        </Col>
    </Row>
    </Container>

          {/* <h2>
          {totalJuve.propostas + totalPpa.propostas} - Propostas _____ 
            {(totalPpa.votos + totalJuve.votos)?.toLocaleString('pt-BR', { style: 'decimal', currency: 'BRL', currencyDisplay: 'name' })} - Votos    _ 
                <Button variant="outline-success" 
                    onClick={() => {
                        setShow3(true)
                    }}                    
                >?</Button></h2> */}

                  <br/>
                  <br/>

                  <Row>
                      <Col>
                          <Card style={{ backgroundColor: '#E0FFFF' }}>
                              <Card.Body>
                                  <Card.Title>
                                  </Card.Title>
                                  <Card.Text>
                                      <Table striped bordered hover variant="info">
                                          <thead >
                                              <tr>
                                                  <th>Processo de Participação</th>
                                                  <th>Download (.csv)</th>
                                                  <th>API GraphQL *Credenciais App</th>
                                                  <th>BD PostgreSQL *Credenciais App</th>
                                                  <th>Atualização</th>
                                                  <th>Propostas</th>
                                                  <th>Votos</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr onClick={() => {
                                                  setProcesso('ppaparticip');
                                                  MontaCategorias('ppaparticip');
                                                  estatisticaPropostasDatas('ppaparticip')
                                              }}>
                                                  <td><b>PPA Participativo</b>: - 10 Mai a 16 Jul de 2023</td>
                                                  <td><Button variant="success">Ativa</Button></td>                                                  
                                                  <td><Button variant="outline-danger">Inativa</Button></td>
                                                  <td><Button variant="outline-danger">Inativa</Button></td>
                                                  <td><Button variant="success">Agendada-Manual</Button></td>

                                                  <td><b>{totalPpa.propostas}</b></td>
                                                  <td><b>{totalPpa.votos?.toLocaleString('pt-BR', { style: 'decimal', currency: 'BRL', currencyDisplay: 'name' })}</b></td>
                                                  {/* <h3>Participantes :  {totalPpa.votos.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) } </h3>  */}
                                              </tr>
                                              <tr onClick={() => {
                                                  setProcesso('confjuv4');
                                                  MontaCategorias('confjuv4');
                                                  estatisticaPropostasDatas('confjuv4')
                                              }}>
                                                  <td><b>4a Conferência da Juventude</b>: - 30 Ago a 30 Out de 2023</td>
                                                  <td><Button variant="success">Ativa</Button></td>                                                  
                                                  <td><Button variant="outline-danger">Inativa</Button></td>
                                                  <td><Button variant="outline-danger">Inativa</Button></td>
                                                  <td><Button variant="success">Agendada-Manual</Button></td>                                                  

                                                  <td><b>{totalJuve.propostas}</b></td>
                                                  <td><b>{totalJuve.votos?.toLocaleString('pt-BR', { style: 'decimal', currency: 'BRL', currencyDisplay: 'name' })}</b></td>
                                              </tr>
                                              <tr onClick={() => {
                                                //   setProcesso('próximo');
                                                //   MontaCategorias('próximo');
                                                //   estatisticaPropostasDatas('próximo')
                                              }}>
                                                  <td><b>Próximo Processo Participativo</b>: - ... </td>
                                                  <td><Button variant="secondary" disabled>Inativo</Button></td>                                                  
                                                  <td><Button variant="secondary" disabled>Inativa</Button></td>
                                                  <td><Button variant="secondary" disabled>Inativa</Button></td>
                                                  <td><Button variant="secondary" disabled>Agendada-Manual</Button></td>                                                  

                                                  <td><b>0</b></td>
                                                  <td><b>0</b></td>
                                              </tr>                                              
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
                      </Row>

        <Row>

            <div class="container">
                <Row>

            {/* <Col>
             <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic"  style={{ width: '100%' }}>
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
              </Col> */}

              <Col>

              <Button variant="outline-success" style={{ width: '100%' }} onClick={() => {
                setNumeros([totalPpa, totalJuve]);
                setShow(true)
              }}>
                Gráfico 
              </Button>
              </Col>

              <Col>

              <Button variant="outline-success"  style={{ width: '100%' }}
                    onClick={() => { estatisticaPropostasDatas(processo);
                      setNumeros(totalDatas);
                      setShow2(true) }}
                >Propostas por Data - {processo}</Button>{' '}
                </Col>

              <Col>

              <Button variant="outline-success" style={{ width: '100%' }}
                onClick={() => { estatisticaPropostasCategorias(processo) }}
              >Categorias - {processo}</Button>
                </Col>

            </Row>

            </div>
          </Row>      

          {/* <InputGroup className="mb-3"  > */}

          {/* <Form.Select aria-label="Default select example" onChange={evento => setCategoria(evento.target.value)}>
            <option>Escolha a categoria</option>

            {categorias.map(item => <option value={item.id}>{item.nome}</option>)}

          </Form.Select>
          <br /> */}

              <div>

                <br/>
            {/* <Row>
              <Col>
                <Button variant="outline-info"  style={{ width: '100%' }}
                  onClick={() => { estatisticaPropostas() }}
                >Todas Categorias</Button>{' '}
              </Col>
              <Col>
                <Button variant="outline-info"  style={{ width: '100%' }}
                  onClick={() => {
                    if (categoria.length > 0) { CategoriaPropostas(categoria) } else { IntervaloPropostas(de, ate) }
                  }}
                >Todas Propostas</Button>{' '}


              </Col>             
            </Row> */}

          {/* <Button variant="outline-success"
          >{propostas.length} Propostas</Button> */}
          {/* </InputGroup> */}
              </div>


        </form>                 


        <Modal show={show} onHide={handleClose} className='modal-lg'>
          <Modal.Header closeButton>
            <Modal.Title>
              <p style={{ color: "#03a9f4" }} >Processos Participativos</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div>
                <ChartVotos
                  numeros={numeros}
                  tipo_grafico={0}
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

        <Modal show={show2} onHide={handleClose2} className='modal-xl'>
          <Modal.Header closeButton>
            <Modal.Title>
              <p style={{ color: "#03a9f4" }} >Publicação das Propostas - {processo}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div>
                <ChartDatas
                  numeros={numeros}
                  tipo_grafico={4}
                />
              </div>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose2}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

      </section>

      {/* <div class="container"> */}

      {/* <div class="row">

        <div class="col"> */}

<section className="formulario-container">

<form className="formulario">
      <Row>
        <Col>

        <Accordion defaultActiveKey={['1']} alwaysOpen>
          <Accordion.Item eventKey={acordeao}>
            <Accordion.Header>Lista Categorias - {processo}</Accordion.Header>
            <Accordion.Body>

              <Table striped bordered hover variant="info">
                <thead style={{ backgroundcolor: "#f44336" }}>
                  <tr>
                    <th>Categoria</th>
                    <th>Propostas</th>
                    <th>Votos</th>
                  </tr>
                </thead>
                <tbody>
                  {totalCategorias.map((categoria) => (
                    <tr key={categoria._id}
                      onClick={(() => {
                                      //console.log('///',categoriaSelecionada)
                                      CategoriaPropostas(categoria._id); 
                                      OrdenarTotalCategorias(0); 
                                      setCategoriaSelecionada(categoria._id);                                   
                                      //console.log('///',categoriaSelecionada, '- ', categoria._id)                                   
                                      })} 
                    >
                      <td>{categoria._id}</td>
                      <td>{categoria.propostas}</td>
                      <td>{categoria.votos}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>        

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>







        </Col>  

        {/* <Col>

        <Accordion defaultActiveKey={['1']} alwaysOpen>
          <Accordion.Item eventKey={acordeao1}>
            <Accordion.Header>Lista Propostas - {categoriaSelecionada}</Accordion.Header>
            <Accordion.Body>

          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Postagem</th>
                <th>ID</th>
                <th>Título</th>
                <th>Categoria</th>
                <th onClick={() => OrdenarPropostas(0)}>Votos X</th>
              </tr>
            </thead>
            <tbody>
              {propostas.map((proposta) => (
                <tr key={proposta.id} onClick={() => {buscaDados(proposta.id); OrdenarPropostas(0); }}>
                  <td>{proposta.published_at}</td>
                  <td>{proposta.id}</td>
                  <td>{proposta.title}</td>
                  <td>{proposta.category_name}</td>
                  <td>{proposta.supports}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          </Accordion.Body>
          </Accordion.Item>
        </Accordion>



        </Col>   */}

        {/* <Col>
          <Table striped bordered hover variant="info">
            <thead style={{ backgroundcolor: "#f44336" }}>
              <tr>
                <th onClick={() => OrdenarComentarios(0)} >Postagem</th>
                <th>ID</th>
                <th>Comentário</th>
                <th>Autor</th>
                <th>Proposta</th>
              </tr>
            </thead>
            <tbody>
              {comentarios.map((comentario) => (
                <tr key={comentario.id} >
                  <td>{comentario.created_at}</td>
                  <td>{comentario.id}</td>
                  <td>{comentario.body}</td>
                  <td>{comentario.author_name}</td>
                  <td>{comentario.commentable_id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>   */}

      </Row>  

      </form>

      <Modal show={show1} onHide={handleClose1} className='modal-xl'>
                <Modal.Header closeButton>
                <Modal.Title>{ propostaSelecionada.title } </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <hr />
                        <p><b> {comentarios.length} - Comentários </b></p>
                        <ul class="list-group">
                        {comentarios.map((comentario) => (
                            <li class="list-group-item">  
                            <strong>{comentario.id} : {comentario.author_name} </strong> ( {comentario.created_at} ) 
                            <div class="text-muted">{comentario.body}  
                                <a href="">-.-{comentario.root_commentable_url} .. </a>
                            </div>                        
                            </li>
                        ))}
                        </ul>
                    </div>                
                </Modal.Body>
                <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button> */}
                <Button variant="primary" onClick={handleClose1}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>


      <Modal show={show3} onHide={handleClose3} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >Ajuda</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             <Image src='/imagens/overview.png' rounded />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose3}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> 

</section>




      {/* </div> */}

      {/* <div class="col"> */}

      {/* </div> */}



      {/* </div>

    </div> */}








    </>
  )
}

export default Atualizacao