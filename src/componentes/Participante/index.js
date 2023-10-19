import { useEffect, useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import CampoTextoArea from '../CampoTextoArea'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form } from 'react-bootstrap'

import { URL_API_LOCAL } from '../../api';

const Participante = ({aoCadastrar, times, cadastrarTime, tipos}) => {

    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    // const [tipo, setTipo] = useState('')    

    const [de, setDe] = useState(0)
    const [ate, setAte] = useState(0)
    const [total, setTotal] = useState(0)

    // var getMensagens = [{}];

    const [participantes, setParticipantes] = useState([{}])
    const [participanteSelecionado, setParticipanteSelecionado] = useState({})      

    useEffect(() => {

      axios.get(`${URL_API_LOCAL}/users/total`)
      .then(resposta => {
        console.log(resposta.data, ' ')
        setTotal(resposta.data)
        console.log(total);
      })
      .catch (error => {
        console.log(error);
      })

      axios.get(`${URL_API_LOCAL}/users`)
      .then(todosUsers => {
          //console.log('todas os Participantes: ',todosUsers)            
        if (todosUsers.data[0] !== undefined) {
          //let getParticipantes = todosUsers.data;
          setParticipantes(todosUsers.data)
          //console.log('getPropostas ',getPropostas)
        } else {
          //setTemplate('');
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }, 0)    

    const IntervaloParticipantes = (de, ate) => {    
      axios.get(`${URL_API_LOCAL}/users/deate/${de}/${ate}`)
      .then(todosUsers => {
        if (todosUsers.data[0] !== undefined) {
          console.log(' de= ',de,' ate= ',ate, 'participantes',todosUsers)
          setParticipantes(todosUsers.data)
        } else {
          setParticipantes({})
        }       
      })
      .catch (error => {
        console.log(error);
      })
    }

    const buscaDados = (email) => {
        axios.get(`${URL_API_LOCAL}/users/email/${email}`)
        .then(resposta => {
          console.log(resposta.data)
          if (resposta.data[0] !== undefined) {
            console.log(resposta.data[0])

            setParticipanteSelecionado(resposta.data[0]);

            console.log('Verificando... ',email,' ',nome,' ',cpf)

            setEmail(resposta.data[0].email);
            setNome(resposta.data[0].nome);
            setCpf(resposta.data[0].cpf);
            // setTipo(resposta.data[0].tipo);
            // setCargo(resposta.data[0].cpf);
          } else {
            //setTemplate('');
          }       
        })
        .catch (error => {
          console.log(error);
        })    

        // axios.get('http://localhost:4000/mensagens')
        // .then(todasMensagens => {
        //     console.log(todasMensagens)            
        //   if (todasMensagens.data[0] !== undefined) {
        //     getMensagens = todasMensagens.data;
        //     console.log('getMensagens ',getMensagens)
        //   } else {
        //     //setTemplate('');
        //   }       
        // })
        // .catch (error => {
        //   console.log(error);
        // })    

    }    

    const aoSubmeter = (evento) => {
        evento.preventDefault()
        console.log('form enviado', email, nome, cpf )
        aoCadastrar({
            email,
            nome,
            cpf
        })
    }

    return (
        <section className="formulario-container">
            <form className="formulario" onSubmit={aoSubmeter}>
                <h2>{total.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'})} - Participantes</h2>
                {/* <CampoTexto 
                    label='E-mail' 
                    placeholder='Informe o e-mail do participante'
                    //valor={email}
                    aoAlterado={valor => { setEmail(valor); buscaDados(valor) } } />         */}
              <InputGroup className="mb-3"  >
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>E-mail</b> </InputGroup.Text>
                <Form.Control
                    label='E-mail'
                    //type="number"
                    placeholder='Informe o e-mail do participante'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    defaultValue={email}
                    onChange={evento => { setEmail(evento.target.value)}}
                                //required
                                //onChange={this.props.handleChange}
                />      
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Nome</b> </InputGroup.Text>
                <Form.Control
                    label='Nome'
                    //type="number"
                    placeholder='Digite o nome'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    defaultValue={nome}
                    onChange={evento => setNome(evento.target.value)}
                                //required
                                //onChange={this.props.handleChange}
                />          
                <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>CPF</b> </InputGroup.Text>
                <Form.Control
                    label='CPF'
                    //type="number"
                    placeholder='Digite o número do CPF'
                                //defaultValue={de} //this.props.inputValues.firstName}
                    defaultValue={cpf}
                    onChange={evento => setCpf(evento.target.value)}
                                //required
                                //onChange={this.props.handleChange}
                />                                   
                    <Button variant="outline-success" style={{ width: '15%'}} 
                      onClick={() => buscaDados(email)}
                    >Consultar</Button>                   
              </InputGroup>

                {/* <CampoTextoArea
                    // obrigatorio={true}
                    label='Nome'
                    placeholder='Digite o nome '
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}/> 
                <CampoTextoArea
                    // obrigatorio={true}
                    linhas = "1"
                    label='CPF'
                    placeholder='Digite o CPF do participante '
                    valor={cpf}
                    aoAlterado={valor => setCpf(valor)}/>                                  */}
                {/* <CampoTexto
                    // obrigatorio={true}
                    label='Tipo de Mensagem' 
                    placeholder='Digite o tipo de mensagem '
                    valor={tipo}
                    aoAlterado={valor => setTipo(valor)}/> */}
                {/* <ListaSuspensa 
                    obrigatorio={true}
                    label='Enviar para'
                    items={tipos} 
                    valor={tipo}
                    aoAlterado={valor => setTipo(valor)}/>  */}
                {/* <CampoRadioButton opcaoSms opcaoEmail />   */}
                {/* <Botao texto='Participante' /> */}
                    <br/>

                <InputGroup className="mb-3"  >
                    <InputGroup.Text style={{ backgroundColor: '#d5d8d7'}} ><b>Participantes do PPA - Depois de ...</b> </InputGroup.Text>
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

                    <Button variant="outline-primary" style={{ width: '15%'}} 
                       onClick={() => IntervaloParticipantes(de, ate)}
                    >Consultar</Button>      
                    {/* <Button variant="danger" style={{ width: '15%'}} 
                    >Enviar Mensagens</Button>                                      */}
                </InputGroup>   


                <Card style={{ width: '100%', backgroundColor: '#d5d8d7' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title> {participanteSelecionado.email} : {participanteSelecionado.nome} : {participanteSelecionado.cpf }
                        </Card.Title>
                        <Card.Text>

                        </Card.Text>

                    </Card.Body>
                </Card>                

                <br/>


            </form>


            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>E-mail</th>
                  <th>Nome</th>
                  <th>CPF</th>
                </tr>
              </thead>
              <tbody>
               {participantes.map(( participante ) => (
                <tr key={participante.id} onClick={() => buscaDados(participante.email)}>
                  <td>{participante.email }</td>
                  <td>{participante.nome}</td>
                  <td>{participante.cpf}</td>
                </tr>
               ))}
              </tbody>
            </Table>



        </section>
    )
}

export default Participante