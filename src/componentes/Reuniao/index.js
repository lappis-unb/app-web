import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form } from 'react-bootstrap'

import { URL_API_LOCAL } from '../../api';

const Reuniao = ({aoCadastrar, times, cadastrarTime, participantes, tipos}) => {

    const [total, setTotal] = useState(0)    

    const [id, setId] = useState('')
    const [nome, setNome] = useState('')

    const [de, setDe] = useState(0)
    const [ate, setAte] = useState(0)    

    const [reunioes, setReunioes] = useState([{}])
    const [reuniaoSelecionada, setReuniaoSelecionada] = useState({})
    
    useEffect(() => {

        axios.get(`${URL_API_LOCAL}/reunioes/total`)
        .then(resposta => {
          console.log(resposta.data, ' ')
          setTotal(resposta.data)
          console.log(total);
        })
        .catch(error => {
          console.log(error);
        })

      axios.get(`${URL_API_LOCAL}/reunioes`)
      .then(todasReunioes => {
        if (todasReunioes.data[0] !== undefined) {
          setReunioes(todasReunioes.data)
        } else {
          //setTemplate('');
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }, 0)

    const IntervaloTemas = (de, ate) => {    
      axios.get(`${URL_API_LOCAL}/reunioes/deate/${de}/${ate}`)
      .then(reunioes => {
        if (reunioes.data[0] !== undefined) {
          console.log(' de= ',de,' ate= ',ate, 'reunioes',reunioes)
          setReunioes(reunioes.data)
        } else {
          setReunioes([])
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }    

    const buscaDados = async (id) => {
        await axios.get(`${URL_API_LOCAL}/reunioes/id/${id}`)
        .then(resposta => {
          console.log('id:', id, ' ',resposta.data)
          if (resposta.data[0] !== undefined) {
            console.log(resposta.data[0])

            setReuniaoSelecionada(resposta.data[0]);

            setId(resposta.data[0].id);
            setNome(resposta.data[0].title);
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
                <h2>{total} - Reuniões</h2>
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
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>ID - Reunião</b> </InputGroup.Text>
                <Form.Control
                    label='Reunião - ID'
                    type="number"
                    placeholder='Informe o ID da Reunião'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    // defaultValue={de}
                    onChange={evento => { setId(evento.target.value)}}
                                //required
                                //onChange={this.props.handleChange}
                />      
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Nome</b> </InputGroup.Text>
                <Form.Control
                    label='Título'
                    //type="number"
                    placeholder='Digite o Título'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    defaultValue={nome}
                    onChange={evento => setNome(evento.target.value)}
                                //required
                                //onChange={this.props.handleChange}
                />          
              </InputGroup>

                <br/>

                <InputGroup className="mb-3"  >
                    <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Reuniões - Depois de ...</b> </InputGroup.Text>
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


            <Card style={{ width: '100%', backgroundColor: '#E0FFFF' }}>
                <Card.Body>
                    <Card.Title> [ {reuniaoSelecionada.id} ]  {reuniaoSelecionada.title}   
                      -  ( {reuniaoSelecionada.start_time} a {reuniaoSelecionada.end_time} ) </Card.Title>
                    <Card.Text>
                   
                    {reuniaoSelecionada.description}
                    <br />
                    {reuniaoSelecionada.category_name} - 
                    <a href="">{reuniaoSelecionada.url}</a>
                    </Card.Text>    

                    <Button variant="outline-success" style={{ width: '10%' }} 
                    // onClick={() => buscaComentarios(propostaSelecionada.id)}
                    > </Button>
                    
                    <Button variant="outline-success">
                    {/* {comentarios.length} */}
                    </Button>

                </Card.Body>
            </Card>


            </form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categoria</th>
                  <td>Escopo</td>
                  <td>Título</td>                  
                  {/* <td>Descrição</td>                      */}
                  <td>Início</td>                     
                  <td>Término</td>                     
                </tr>
              </thead>
              <tbody>
               {reunioes.map(( reuniao ) => (
                <tr key={reuniao.id} onClick={() => buscaDados(reuniao.id)}>
                  <td>{reuniao.id }</td>
                  <td>{reuniao.category_name}</td>
                  <td>{reuniao.scope_name}</td>
                  <td>{reuniao.title}</td>                  
                  {/* <td>{reuniao.description}</td>                   */}
                  <td>{reuniao.start_time}</td>                  
                  <td>{reuniao.end_time}</td>                  
                </tr>
               ))}
              </tbody>
            </Table>

        </section>
    )
}

export default Reuniao