import { useEffect } from 'react'
import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import CampoTextoArea from '../CampoTextoArea'

import axios from 'axios'
import { Modal, Table, Button, InputGroup, Form } from 'react-bootstrap'

import wordsFill from '../Busca/words';

import Moderacao from '../Moderacao';

import { URL_API_LOCAL } from '../../api';

const PropostaModeracao = ({aoCadastrar}) => {

    // const [template, setTemplate] = useState('')
    // const [assunto, setAssunto] = useState('')
    // const [texto, setTexto] = useState('')
    // const [tipo, setTipo] = useState('')   

    var qtdePropostas = 0;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);       

    const [total, setTotal] = useState(0)    

    const [id, setId] = useState('')
    // const [nome, setNome] = useState('')

    const [body, setBody] = useState('')
    const [evento, setEvento] = useState('')
    const [estado, setEstado] = useState('')    



    const [de, setDe] = useState(0)
    const [ate, setAte] = useState(0)    

    const [moderadores, setModeradores] = useState([{}])
    const [moderacaoSelecionada, setModeracaoSelecionada] = useState({})
    const [propostas, setPropostas] = useState([{}])    
    
    useEffect(() => {

        axios.get(`${URL_API_LOCAL}/moderacoes/total`)
        .then(resposta => {
          console.log(resposta.data, ' ')
          setTotal(resposta.data)
          console.log(total);
        })
        .catch(error => {
          console.log(error);
        })

      TodasModeracoes();
      // axios.get(`${URL_API_LOCAL}/moderacoes`)
      // .then(todosModeracao => {
      //   if (todosModeracao.data[0] !== undefined) {
      //     setModeradores(todosModeracao.data)
      //   } else {
      //     //setTemplate('');
      //   }       
      // })
      // .catch (error => {
      //   console.log(error);
      // })
    }, 0)

    const TodasModeracoes = () => {    
      console.log('TodasModeracoes')
      axios.get(`${URL_API_LOCAL}/moderacoes`)
      .then(todosModeracao => {
        if (todosModeracao.data[0] !== undefined) {
          setModeradores(todosModeracao.data)
        } else {
          //setTemplate('');
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }

    const IntervaloTemas = (de, ate) => {    
      axios.get(`${URL_API_LOCAL}/moderacoes/deate/${de}/${ate}`)
      .then(moderacao => {
        if (moderacao.data[0] !== undefined) {
          console.log(' de= ',de,' ate= ',ate, 'moderadores',moderacao)
          setModeradores(moderacao.data)
        } else {
          setModeradores([])
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }    

    const buscaDados = async (id) => {
        await axios.get(`${URL_API_LOCAL}/moderacoes/id/${id}`)
        .then(resposta => {
          console.log('id:', id, ' ',resposta.data)
          if (resposta.data[0] !== undefined) {
            console.log(resposta.data[0])
            setId(resposta.data[0].id);
            setBody(resposta.data[0].body);

            setModeracaoSelecionada(resposta.data[0]);
            setShow(true); 

            let words = resposta.data[0].body;
            buscaPropostas(words,1);

          } else {
            //setTemplate('');
            setModeracaoSelecionada({})
          }       
        })
        .catch (error => {
          console.log(error);
        })    
    }    

    const atualizaDados = async (quantidade) => {
        if (moderacaoSelecionada) {
          moderacaoSelecionada.propostas_total = quantidade;
          await axios.post(`${URL_API_LOCAL}/moderacoes/atualiza`, moderacaoSelecionada)
            .then(response => {console.log(' moderacao atualizada! ', response)} 
            ) 
            .catch(error => { 
              console.log(error); 
            }) 

          TodasModeracoes();

        }
    } 

    const buscaTermo = async (ide) => {
      console.log('buscaTermo', ide)
      await axios.get(`${URL_API_LOCAL}/moderacoes/id/${ide}`)
      .then(resposta => {
        console.log('id:', ide, ' ',resposta.data)
        if (resposta.data[0] !== undefined) {
          console.log(resposta.data[0])

          setModeracaoSelecionada(resposta.data[0]);

    //      setShow1(true); 

          setId(resposta.data[0].id);
          
          setBody(resposta.data[0].body);
          console.log('body->',body)

        } else {
          // setModeracaoSelecionada({})
        }       
      })
      .catch (error => {
        console.log(error);
      })    
  }    

    const buscaPropostas = async (words, evento) => {
      let resultado = wordsFill(words);
      let words_R = resultado.toString();
      words_R = words_R.replaceAll(',', ' ')
      words_R = words_R.replaceAll('/','-');        
      if (words_R.length < 1) {words_R = 'x'}
      await axios.get(`${URL_API_LOCAL}/propostas/busca/${words_R}/${evento}`)
      .then(resposta => {
        if (resposta.data[0] !== undefined) {
          setPropostas(resposta.data);
        } else {
          setPropostas([]);
        }       
      })
      .catch (error => {
        console.log(error);
      })    
  }   

    const GravarModeracao = async (id, body, evento, estado) => {
      const data = {
        id: id,
        body: body,
        evento: evento,
        estado: estado,
      };
      await axios.post(`${URL_API_LOCAL}/moderacoes/create`, data)
        .then(response => console.log(' moderacao ', response)
        )
        .catch(error => {
          console.log(error);
        })

      TodasModeracoes();

    }

    return (
        <section className="formulario-container">
            <form className="formulario">
                <h2>{total} - Termos Moderadores</h2>

                {/* <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>ID da Moderação</b> </InputGroup.Text>
          <Form.Control
            label='ID'
            //type="number"
            placeholder='Informe o ID do termo'
            defaultValue={id}
            onChange={evento => setId(evento.target.value)}
          /> */}
          {/* <Button variant="primary" 
            onClick={() => buscaTermo(id)}
          >Consultar</Button> */}


                  <td>
                    <Button variant="outline-primary" 
                      onClick={() => setShow1(true)}
//                      onClick={() => buscaTermo(0)}
                    >Novo</Button> 
                  </td>          

          {/* <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Palavras</b> </InputGroup.Text>
          <Form.Control
            label='Termo(s)'
            type="text"
            placeholder='Digite a(s) palavra(s) s serem moderadas'
            defaultValue={body}
            onChange={evento => setBody(evento.target.value)}
          />

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Evento</b> </InputGroup.Text>
          <Form.Select aria-label="Default select example" onChange={evento => setEvento(evento.target.value)}>
            <option>Escolha o evento em que o termo será moderado</option>
            <option value="ppaparticip">PPA Participativo</option>
            <option value="confjuv4">4a Conferência Nacional da Juventude</option>
          </Form.Select>

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Estado</b> </InputGroup.Text>
          <Form.Select aria-label="Default select example" onChange={evento => setEstado(evento.target.value)}>
            <option>Escolha o estado do termo</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </Form.Select> */}

          {/* <Button variant="outline-success" 
            onClick={() => GravarModeracao(id, body, evento, estado)}
          >Gravar</Button>

          <Button variant="success" 
            onClick={() => buscaDados(id)}
          >Consulta Propostas</Button>

          <Button variant="outline-danger" 
            onClick={() => atualizaDados(moderadores)}
          >Atualiza</Button>                        */}

          {/* <Button variant="danger" style={{ width: '15%'}} 
                    >Enviar Mensagens</Button>                                      */}
        {/* </InputGroup> */}



            </form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Moderadores</th>
                  <th>Evento</th>
                  <th>Estado</th>
                  <th>Propostas</th>
                  <th>Verificadas</th>                  
                  <th>Pendentes</th>                     
                  <th>Criada em</th>                     
                </tr>
              </thead>
              <tbody>
               {moderadores.map(( moderador ) => (
                <tr key={moderador.id}>
                   {/* onClick={() => buscaTermo(moderador.id)}> */}

{/* onClick={() => buscaDados(moderador.id)}> */}

                  <td>{moderador.id }</td>
                  <td>{moderador.body}</td>
                  <td>{moderador.evento}</td>
                  <td>{moderador.estado}</td>
                  <td>{moderador.propostas_total}</td> 
                  <td>{moderador.propostas_verificadas}</td> 
                  <td>{moderador.propostas_pendentes}</td> 
                  <td>{moderador.created_at}</td> 

                  {/* <td>
                  <Button variant="outline-primary" 
                    onClick={() => buscaTermo(id)}
                  >Novo</Button> 
                  </td>
                  <td>
                  <Button variant="outline-success" 
                    onClick={() => GravarModeracao(id, body, evento, estado)}
                  >Gravar</Button>
                  </td> */}
                  <td>
                  <Button variant="success" 
                    onClick={() => buscaDados(moderador.id)}
                  >Consulta</Button>
                  </td>
                  {/* <td>
                  <Button variant="outline-danger" 
                    onClick={() => atualizaDados(moderador)}
                  >Atualiza</Button>     
                  </td> */}


                </tr>
               ))}
              </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} className='modal-xl'>
                <Modal.Header closeButton>
                <Modal.Title>{ moderacaoSelecionada.body } </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <hr />
                        <p><b> {propostas.length} - Propostas </b></p>
                        <ul class="list-group">
                        {propostas.map((proposta) => (
                            <li class="list-group-item">
                            <strong>{proposta.id} : {proposta.title} [ {proposta.category_id} { proposta.category_name} ]</strong> ( {proposta.published_at} ) 
                            <strong> Votos {proposta.supports} </strong>
                            <div class="text-muted">{proposta.body}  
                                <a href="">-.-{proposta.url} .. </a>
                                <Button variant="outline-success" data-toggle="tooltip" data-placement="top" title="Comentários"
                                // onClick={() => {buscaComentarios(proposta.id)
                                //     if (comentarios.length > 0) { 
                                //         setShow(true) 
                                //         setPropostaSelecionada(proposta)
                                //     }
                                // }}
                                >  </Button> 
                                <Button variant="outline-danger" data-toggle="tooltip" data-placement="top" title="Moderação"
                                  // onClick={() => {atualizaDados(propostas.length)
                                  //     }}
                                  >
                                </Button> 
                            </div>                        
                            </li>
                        ))}
                    </ul>
                    </div>                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-success"  onClick={() => {atualizaDados(propostas.length); setShow(false);}}>
                    Atualiza
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>





            <Modal show={show1} onHide={handleClose1} className='modal-xl'>
                <Modal.Header closeButton>
                <Modal.Title>{ moderacaoSelecionada.body } </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>ID da Moderação</b> </InputGroup.Text>
                  <Form.Control
                    label='ID'
                    //type="number"
                    placeholder='Informe o ID do termo'
                    defaultValue={id}
                    onChange={evento => setId(evento.target.value)}
                  />
                  {/* <Button variant="primary" 
                    onClick={() => buscaTermo(id)}
                  >Consultar</Button> */}

                  <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Palavras</b> </InputGroup.Text>
                  <Form.Control
                    label='Termo(s)'
                    type="text"
                    placeholder='Digite a(s) palavra(s) s serem moderadas'
                    defaultValue={body}
                    onChange={evento => setBody(evento.target.value)}
                  />

                  <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Evento</b> </InputGroup.Text>
                  <Form.Select aria-label="Default select example" onChange={evento => setEvento(evento.target.value)}>
                    <option>Escolha o evento em que o termo será moderado</option>
                    <option value="ppaparticip">PPA Participativo</option>
                    <option value="confjuv4">4a Conferência Nacional da Juventude</option>
                  </Form.Select>

                  <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Estado</b> </InputGroup.Text>
                  <Form.Select aria-label="Default select example" onChange={evento => setEstado(evento.target.value)}>
                    <option>Escolha o estado do termo</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </Form.Select>

                </Modal.Body>
                <Modal.Footer>
                {/* <Button variant="secondary"  onClick={() => {atualizaDados(propostas.length); TodasModeracoes()}}>
                    Atualiza
                </Button> */}

                <Button variant="outline-success" 
                    onClick={() => { GravarModeracao(id, body, evento, estado);  
                      setShow1(false); }}
                  >Gravar</Button>

                <Button variant="primary" onClick={handleClose1}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>








        </section>
    )
}

export default PropostaModeracao