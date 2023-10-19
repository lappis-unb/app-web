import { useEffect } from 'react'
import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import CampoTextoArea from '../CampoTextoArea'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form } from 'react-bootstrap'

import { URL_API_LOCAL } from '../../api';

const PropostaComentario = ({aoCadastrar, times, cadastrarTime, participantes, tipos}) => {

    // const [template, setTemplate] = useState('')
    // const [assunto, setAssunto] = useState('')
    // const [texto, setTexto] = useState('')
    // const [tipo, setTipo] = useState('')    

    const [total, setTotal] = useState(0)    

    const [id, setId] = useState('')
    const [nome, setNome] = useState('')

    const [de, setDe] = useState(0)
    const [ate, setAte] = useState(0)    

    const [comentarios, setComentarios] = useState([{}])
    
    useEffect(() => {

        axios.get(`${URL_API_LOCAL}/propostacomentarios/total`)
        .then(resposta => {
          console.log(resposta.data, ' ')
          setTotal(resposta.data)
          console.log(total);
        })
        .catch(error => {
          console.log(error);
        })

      axios.get(`${URL_API_LOCAL}/propostacomentarios`)
      .then(todosComentarios => {
        if (todosComentarios.data[0] !== undefined) {
          setComentarios(todosComentarios.data)
        } else {
          //setTemplate('');
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }, 0)

    const IntervaloTemas = (de, ate) => {    
      axios.get(`${URL_API_LOCAL}/propostacomentarios/deate/${de}/${ate}`)
      .then(comentarios => {
        if (comentarios.data[0] !== undefined) {
          console.log(' de= ',de,' ate= ',ate, 'comentarios',comentarios)
          setComentarios(comentarios.data)
        } else {
          setComentarios([])
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }    

    const buscaDados = async (id) => {
        await axios.get(`${URL_API_LOCAL}/propostacomentarios/id/${id}`)
        .then(resposta => {
          console.log('id:', id, ' ',resposta.data)
          if (resposta.data[0] !== undefined) {
            console.log(resposta.data[0])
            setId(resposta.data[0].id);
            setNome(resposta.data[0].nome);
          } else {
            //setTemplate('');
          }       
        })
        .catch (error => {
          console.log(error);
        })    

    }    

    const aoSubmeter = (evento) => {
        evento.preventDefault()
        console.log('form enviado', id, nome )
        aoCadastrar({
            id,
            nome
        })
    }

    return (
        <section className="formulario-container">
            <form className="formulario" onSubmit={aoSubmeter}>
                <h2>{total} - Propostas - Comentários</h2>
                {/* <CampoTexto 
                    label='Tema - ID' 
                    placeholder='Informe o ID do tema'
                    //valor={template}
                    aoAlterado={valor => { setId(valor); buscaDados(valor) } } />                    
                <CampoTextoArea
                    // obrigatorio={true}
                    label='Nome'
                    placeholder='Digite o nome '
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}/> 
                <Botao texto='Tema' /> */}

                <InputGroup className="mb-3"  >
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>ID - Tema</b> </InputGroup.Text>
                <Form.Control
                    label='Tema - ID'
                    type="number"
                    placeholder='Informe o ID do Tema'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    // defaultValue={de}
                    onChange={evento => { setId(evento.target.value) }}
                                //required
                                //onChange={this.props.handleChange}
                />      
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Nome</b> </InputGroup.Text>
                <Form.Control
                    label='Tema'
                    //type="number"
                    placeholder='Digite o Nome'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    defaultValue={nome}
                    onChange={evento => setNome(evento.target.value)}
                                //required
                                //onChange={this.props.handleChange}
                />          
              </InputGroup>

                <br/>

                <InputGroup className="mb-3"  >
                    <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Temas - Depois de ...</b> </InputGroup.Text>
                    <Form.Control
                                type="number"
                                //defaultValue={de} //this.props.inputValues.firstName}
                                defaultValue={de}
                                onChange={evento => setDe(evento.target.value)}
                                //required
                                //onChange={this.props.handleChange}
                                />

                    <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Quantos ...</b> </InputGroup.Text>            
                    <Form.Control
                                type="number"
                                //defaultValue={de} //this.props.inputValues.firstName}
                                defaultValue={ate}
                                onChange={evento => setAte(evento.target.value)}
                                //required
                                //onChange={this.props.handleChange}
                                />

                    <Button variant="primary" style={{ width: '15%'}} 
                       onClick={() => IntervaloTemas(de, ate)}
                    >Consultar</Button>      
                    {/* <Button variant="danger" style={{ width: '15%'}} 
                    >Enviar Mensagens</Button>                                      */}
                </InputGroup>  

            </form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Comentário</th>
                  <td>Autor ID</td>
                  <td>Autor Nome</td>                  
                  <td>Data</td>                     
                  <td>Proposta URL</td>                     
                </tr>
              </thead>
              <tbody>
               {comentarios.map(( comentario ) => (
                <tr key={comentario.id} onClick={() => buscaDados(comentario.id)}>
                  <td>{comentario.id }</td>
                  <td>{comentario.body}</td>
                  <td>{comentario.author_id}</td>
                  <td>{comentario.author_name}</td>                  
                  <td>{comentario.created_at}</td>                  
                  <td>{comentario.root_commentable_url}</td>                  
                </tr>
               ))}
              </tbody>
            </Table>

        </section>
    )
}

export default PropostaComentario