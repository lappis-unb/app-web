import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form, Modal} from 'react-bootstrap'
import wordsFill from './words';

import { URL_API_LOCAL } from '../../api';

const Busca = ({aoCadastrar}) => {

    const [id, setId] = useState('')
    const [evento, setEvento] = useState('1')

    const [de, setDe] = useState(0)
    const [ate, setAte] = useState(0)    

    const [temas, setTemas] = useState([{}])
    const [categorias, setCategorias] = useState([])    
    const [categoria, setCategoria] = useState('')    
    const [propostas, setPropostas] = useState([{}])
    var propostasOrdenadas = [{}]
    const [propostaSelecionada, setPropostaSelecionada] = useState({})

    const [comentarios, setComentarios] = useState([{}])
    const [comentariosSoma, setComentariosSoma] = useState(0)

//--------------------------------------------Modal Comentários  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    
    useEffect(() => {
    //   axios.get(`${URL_API_LOCAL}/temas`)
    //   .then(todosTemas => {
    //     if (todosTemas.data[0] !== undefined) {
    //       setTemas(todosTemas.data)
    //     } else {
    //       //setTemplate('');
    //     }       
    //   })
    //   .catch (error => {
    //     console.log(error);
    //   })

        axios.get(`${URL_API_LOCAL}/temas`)    
        .then(todosTemas => {
        console.log('todos os temas: ', todosTemas)
        if (todosTemas.data[0] !== undefined) {
            let getCategorias = todosTemas.data;
            setCategorias(getCategorias)
            console.log('getCategorias ', getCategorias)
        } else {
            //setTemplate('');
        }
        })
        .catch(error => {
        console.log(error);
        })

    }, 0)

    const buscaDados = async (words, evento) => {

        //Substitui a barra, usada em datas, por hífen 
        //let words_R = words.split(' ');
        //words_R = words_R.replaceAll('/','-');        

        let resultado = wordsFill(words);
        console.log('resultado=', resultado);
        let words_R = resultado.toString();
        words_R = words_R.replaceAll(',', ' ')

        words_R = words_R.replaceAll('/','-');        

        //resultado.map(item => { words_R = item + " " + words_R})
        //resultado = resultado.ToString;
        console.log('resultado=', resultado, '.',words_R,'.');        

        await axios.get(`${URL_API_LOCAL}/propostas/busca/${words_R}/${evento}`)
        //await axios.get(`${URL_API_LOCAL}/propostas/busca/${resultado}/${evento}`)
        .then(resposta => {
          console.log('id:', id, ' ',resposta.data)
          if (resposta.data[0] !== undefined) {
            console.log(resposta.data)
            propostasOrdenadas = resposta.data; 
            OrdenarPropostas(0)
            setPropostas(propostasOrdenadas);
          } else {
            setPropostas([]);
            propostasOrdenadas= []; 
          }       
        })
        .catch (error => {
          console.log(error);
        })    
    }    

    const OrdenarPropostas = (campo) => {
        console.log('ordenar: ', campo)
        propostasOrdenadas.sort(function (a, b) {
          if (a.supports > b.supports) { return -1 } else { return true }
        })
      }

    // const OrdenarPropostas = (campo) => {
    //     console.log('ordenar: ', campo)
    //     propostas.sort(function (a, b) {
    //       if (a.supports > b.supports) { return -1 } else { return true }
    //     })
    //   }

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




    return (
        <section className="formulario-container">
            <form className="formulario">
                <h2>Busca Propostas</h2>
                <InputGroup className="mb-3"  >
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Palavras</b> </InputGroup.Text>
                <Form.Control
                    label='Palavras'
                    type="text"
                    placeholder='Digite palavras para busca no conteúdo das propostas'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    // defaultValue={de}
                    onChange={evento => { setId(evento.target.value); }}
                                //required
                                //={this.props.handleChange}
                />      
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Categoria</b> </InputGroup.Text>
                    <Form.Select aria-label="Default select example" onChange={evento => setCategoria(evento.target.value)}>
                        <option>Escolha a categoria</option>
                        {categorias.map(item => <option value={item.id}>{item.nome}</option>)}
                    </Form.Select>
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Evento</b> </InputGroup.Text>
                    <Form.Select aria-label="Default select example" onChange={evento => setEvento(evento.target.value)}>
                        <option>Escolha o Evento</option>
                        <option value="2">PPA Participativo</option>
                        <option value="3">4a Conferência da Juventude</option>
                    </Form.Select>
                <Button variant="primary" style={{ width: '15%'}} 
                    onClick={() => buscaDados(id,evento)}
                >Consultar</Button>      

                </InputGroup>

                <br/>
            </form>

            <div>
                <div>
                    <hr />
                    <p><b>{propostas.length} - Propostas</b></p>
                    <ul class="list-group">
                    {propostas.map((proposta) => (
                        <li class="list-group-item" onClick={() => OrdenarPropostas(0)}>
                        <strong>{proposta.id} : {proposta.title} [ {proposta.category_id} { proposta.category_name} ]</strong> ( {proposta.published_at} ) 
                        <strong> Votos {proposta.supports} </strong>
                        <div class="text-muted">{proposta.body}  
                            <a href="">-.-{proposta.url} .. </a>
                            <Button variant="outline-success" data-toggle="tooltip" data-placement="top" title="Comentários"
                            onClick={() => {buscaComentarios(proposta.id)
                                if (comentarios.length > 0) { 
                                    setShow(true) 
                                    setPropostaSelecionada(proposta)
                                }
                            }}

                            >  </Button> 
                            <Button variant="outline-danger" data-toggle="tooltip" data-placement="top" title="Moderação"></Button> 
                        </div>                        
                        </li>
                    ))}
                    </ul>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} className='modal-xl'>
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
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>




        </section>
    )
}

export default Busca