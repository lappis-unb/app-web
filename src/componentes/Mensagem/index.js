import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form } from 'react-bootstrap'

import { URL_API_LOCAL } from '../../api';

const Mensagem = ({ aoCadastrar, times, cadastrarTime, mensagensTotal, tipos }) => {

  const [template, setTemplate] = useState('')
  const [assunto, setAssunto] = useState('')
  const [texto, setTexto] = useState('')
  const [tipo, setTipo] = useState('')

  const [de, setDe] = useState(0)
  const [ate, setAte] = useState(0)

  const [mensagens, setMensagens] = useState([{}])
  const [mensagemSelecionada, setMensagemSelecionada] = useState({})

  useEffect(() => {
    axios.get(`${URL_API_LOCAL}/mensagens`)
      .then(todasMensagens => {
        console.log('todas as mensagens: ', todasMensagens)
        if (todasMensagens.data[0] !== undefined) {
          let getMensagens = todasMensagens.data;
          setMensagens(getMensagens)
          console.log('getMensagens ', getMensagens)
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, 0)

  const IntervaloMensagens = (de, ate) => {
    axios.get(`${URL_API_LOCAL}/mensagens/deate/${de}/${ate}`)
      .then(mensagens => {
        if (mensagens.data[0] !== undefined) {
          console.log(' de= ', de, ' ate= ', ate, 'mensagens', mensagens)
          setMensagens(mensagens.data)
        } else {
          setMensagens({})
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const buscaDados = (template) => {
    axios.get(`${URL_API_LOCAL}/mensagens/template/${template}`)
      .then(resposta => {
        console.log(resposta.data)
        if (resposta.data[0] !== undefined) {
          console.log(resposta.data[0])

          setMensagemSelecionada(resposta.data[0]);

          setTemplate(resposta.data[0].template);
          setAssunto(resposta.data[0].assunto);
          setTexto(resposta.data[0].texto);
          setTipo(resposta.data[0].tipo);
          // setCargo(resposta.data[0].cpf);
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const enviaSMS = (mensagemSMS) => {
    const article = {
      "phone_number": "+557900900123",
      "template_id": "b14d1933-e1ba-4509-82f3-6e5ce99ee379"
    };
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlZjRlMWFmYS05NGIwLTQ1MWEtOTE3MC03OWZlMWMxY2Y0ODQiLCJleHAiOjE2OTIxNzkyNjYsImp0aSI6ImJlYTkxMjhhLTg2ZjQtNDRlMy1iZTkyLTBkMWRlNTE2ZDZkZiIsImlhdCI6MTY5MjE3OTIzNn0.VrxdBHBqnhgptypEXJNyjIljGPBpkLw6Dt5ldYaFIvk',
      'Content-type': 'application/json'
    };
    axios.post('https:../../api.notificacao.servicos.gov.br/v2/notifications/sms', article, { headers })
      .then(resposta => {
        console.log(resposta.data)
        if (resposta !== undefined) {
          console.log(resposta.data)
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const aoSubmeter = (evento) => {
    evento.preventDefault()
    console.log('form enviado', template, assunto, texto, tipo)
    aoCadastrar({
      template,
      assunto,
      texto,
      tipo
    })
  }

  return (
    <section className="formulario-container">
      <form className="formulario" onSubmit={aoSubmeter}>
        <h2>Mensagens - {mensagensTotal}</h2>

        <InputGroup className="mb-3"  >
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Template da Mensagem</b> </InputGroup.Text>
          <Form.Control
            label='Mensagem - Template'
            //type="number"
            placeholder='Informe o Template ID da mensage'
            //defaultValue={de} //this.props.inputValues.firstName}
            //defaultValue={id}
            onChange={evento => { setTemplate(evento.target.value)}}
          //required
          //onChange={this.props.handleChange}
          />
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Assunto</b> </InputGroup.Text>
          <Form.Control
            label='Assunto'
            //type="number"
            placeholder='Digite o assunto da Mensagem'
            //defaultValue={de} //this.props.inputValues.firstName}
            defaultValue={assunto}
            onChange={evento => setAssunto(evento.target.value)}
          //required
          //onChange={this.props.handleChange}
          />
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Tipo</b> </InputGroup.Text>
          <Form.Control
            label='Tipo'
            //type="number"
            placeholder='Digite o tipo (SMS, E-mail, ...)'
            //defaultValue={de} //this.props.inputValues.firstName}
            defaultValue={tipo}
            onChange={evento => setTipo(evento.target.value)}
          //required
          //onChange={this.props.handleChange}
          />
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Texto</b> </InputGroup.Text>
          <Form.Control
            label='Texto'
            //type="number"
            placeholder='Digite o texto da mensagem'
            //defaultValue={de} //this.props.inputValues.firstName}
            defaultValue={texto}
            onChange={evento => setTexto(evento.target.value)}
          //required
          //onChange={this.props.handleChange}
          />
        </InputGroup>


        <Card style={{ width: '100%', backgroundColor: '#d5d8d7' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title> [ <b> {mensagemSelecionada.template} </b> ]  {mensagemSelecionada.assunto}</Card.Title>
            <Card.Text>
              {mensagemSelecionada.texto}
              <br />
            </Card.Text>

          </Card.Body>
        </Card>

        <br />

        <InputGroup className="mb-3"  >
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Propostas - Depois de ...</b> </InputGroup.Text>
          <Form.Control
            type="number"
            //defaultValue={de} //this.props.inputValues.firstName}
            defaultValue={de}
            onChange={evento => setDe(evento.target.value)}
          //required
          //onChange={this.props.handleChange}
          />

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Quantos ...</b> </InputGroup.Text>
          <Form.Control
            type="number"
            //defaultValue={de} //this.props.inputValues.firstName}
            defaultValue={ate}
            onChange={evento => setAte(evento.target.value)}
          //required
          //onChange={this.props.handleChange}
          />

          <Button variant="primary" style={{ width: '15%' }}
            onClick={() => IntervaloMensagens(de, ate)}
          >Consultar</Button>
          {/* <Button variant="danger" style={{ width: '15%'}} 
                    >Enviar Mensagens</Button>                                      */}
        </InputGroup>

      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Criada em</th>
            <th>Template</th>
            <th>Assunto</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>

          {mensagens.map((mensagem) => (
            <tr key={mensagem.template} onClick={() => buscaDados(mensagem.template)}>
              <td>{mensagem.created}</td>
              <td>{mensagem.template}</td>
              <td>{mensagem.assunto}</td>
              <td>{mensagem.tipo}</td>
            </tr>
          ))}

        </tbody>
      </Table>

    </section>
  )
}

export default Mensagem