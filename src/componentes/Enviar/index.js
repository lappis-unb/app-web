import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form, Modal } from 'react-bootstrap'
import Seleciona from '../Seleciona'

import { URL_API_LOCAL } from '../../api';

const jose = require('jose')

const Enviar = ({ aoCadastrar, times, cadastrarTime, participantess, tipos }) => {

  // const gravarArquivo = () => {
  //   console.log('GravarArquivo - estou aqui !')
  //   const fs = require('fs');
  //   {participantes.map((participante) => (
  //     fs.appendFile("ArquivoRW.txt", 
  //     participante.cpf + ';' + participante.nome + ';' + participante.email + "\n", function(erro) {
  //         if(erro) {
  //             throw erro;
  //         }})))
  //   }
  // }






  // https:../../api.notificacao.servicos.gov.br
  // seu nome de chave de API é    = apikeyppa 
  // seu iss (seu id de serviço) é = ef4e1afa-94b0-451a-9170-79fe1c1cf484 
  //           sua chave secreta é = b6d54f3a-9cdc-4fdd-b132-550411c45b26 

//--------------------------------------------Seleciona  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//--------------------------------------------Seleciona

  const [template, setTemplate] = useState('')
  const [assunto, setAssunto] = useState('')
  const [texto, setTexto] = useState('')
  const [tipo, setTipo] = useState('')

  const [de, setDe] = useState(0)
  const [ate, setAte] = useState(0)

  const [mensagens, setMensagens] = useState([{}])
  const [mensagemSelecionada, setMensagemSelecionada] = useState({})

  const [email, setEmail] = useState('')
  const [emailBusca, setEmailBusca] = useState('')
  const [participantes, setParticipantes] = useState([])

  //var botaoOK = false;

  useEffect(() => {
    axios.get(`${URL_API_LOCAL}/mensagens`)
      .then(todasMensagens => {
        console.log('todas as mensagens: ', todasMensagens)
        if (todasMensagens.data[0] !== undefined) {
          let getMensagens = todasMensagens.data;
          setMensagens(getMensagens)
          console.log(mensagemSelecionada, 'getMensagens ', getMensagens)
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, 0)

  const MinhaLista = () => {
      console.log('estou aqui !')
      return (
      //   <div>
          <Seleciona />
      //   </div>
      );
    }

  const IntervaloParticipantes = (de, ate) => {

    axios.get(`${URL_API_LOCAL}/users/deate/${de}/${ate}`)
      .then(todosUsers => {
        if (todosUsers.data[0] !== undefined) {
          console.log(' de= ', de, ' ate= ', ate, 'participantes', todosUsers)
          setParticipantes(todosUsers.data)
        } else {
          setParticipantes({})
        }
      })
      .catch(error => {
        console.log(error);
      })
  }


  

  const gravarArquivo = (participantes) => {

    var customConfig = {
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      }
    };
  // // const result = await axios.post('https://testapi.org/post', usersName, customConfig);    

    // const jsonList = JSON.stringify(participantes)    
    // console.log('>>>>> ********************* >>>>>', participantes);
    // console.log('>>>>>', jsonList)
        // var itens = [{}]
        // participantes.forEach((participante) => {
                  
        //       console.log('participante', participante);
        //       //let item = participante.cpf + ', ' + '"' + 'nome: ' + '",' + participante.nome + ',' + '"' +'email:' + '",' + participante.email +'}, ';
        //       //console.log('item', item)
        //       itens.push(participante)
        //   });    
    const jsonList = JSON.stringify(participantes)      
    console.log('>>>>>', jsonList)    

//var jsonList = [{},{"_id":"64d216bd71620c7bce690bb9","email":"email","nome":"name","password":"$2b$10$TUn0QbnPGiXgLCohoYGqDenyENGry4k0Xv.xEyNX6rYZ2DAw9VPPu","cpf":"uid","created":"2023-08-08T10:19:41.447Z","__v":0},{"_id":"64d216bd71620c7bce690bbb","email":"vagnertrombini@terra.com.br","nome":"Vagner","password":"$2b$10$tWlO8Dl00y2zcXoVJjQCTedvcbllNBYjQSBw71Wgn1jpHPjNL8y8u","cpf":"00000012017","created":"2023-08-08T10:19:41.453Z","__v":0},{"_id":"64d216bd71620c7bce690bbc","email":"fabioluz.13@hotmail.com","nome":"FABIO","password":"$2b$10$hUZBfdDBX2I0ZTyV/Dqds.vxqSJHa7uPiulCnOBoAyEtCHWSaNlFK","cpf":"00000039136","created":"2023-08-08T10:19:41.453Z","__v":0},{"_id":"64d216bd71620c7bce690bba","email":"glorinhasantossilva@gmail.com","nome":"Glória","password":"$2b$10$kf0lBkp2WT6MomSiPrQGnOY6vy8rGjmZ9NZEddxIgMzYRnT10X962","cpf":"00000011550","created":"2023-08-08T10:19:41.451Z","__v":0},{"_id":"64d216bd71620c7bce690bbd","email":"saulo.chaves.saunders@gmail.com","nome":"Saulo","password":"$2b$10$xZJzsC5e2LaBDpGHCymCmuD.VcgzXhR2a/GUu1a.n4EtyH2i5cT3u","cpf":"00000056308","created":"2023-08-08T10:19:41.454Z","__v":0},{"_id":"64d216bd71620c7bce690bbe","email":"hebertdemingo@gmail.com","nome":"HEBERT","password":"$2b$10$3GzzVFkehSyiRHIbYyGhPO/dDiDB46VjLzc6vEf1DDIHGWMNtciNC","cpf":"00000087610","created":"2023-08-08T10:19:41.456Z","__v":0},{"_id":"64d216bd71620c7bce690bc0","email":"clpdinamico2010@gmail.com","nome":"IGOR","password":"$2b$10$6.kx1YzzlYOnN3.0543UNuZ5PdX6YwkJFF6vM8EfOAyXf5Pbe8Av.","cpf":"00000102512","created":"2023-08-08T10:19:41.495Z","__v":0},{"_id":"64d216bd71620c7bce690bbf","email":"milenaccardoso@gmail.com","nome":"MILENA","password":"$2b$10$6IjUN3FGWdIjfVy/sDvYU.9xEZQF7dpZDoR8K5kX6/2BOsfHLOon.","cpf":"00000097179","created":"2023-08-08T10:19:41.494Z","__v":0},{"_id":"64d216bd71620c7bce690bc1","email":"valsivi@gmail.com","nome":"Vanessa","password":"$2b$10$34vKsAiOO7SkHnxrjiDhkeFYHs1QAxdBpjY17P.SLQeW.A06aW6uu","cpf":"00000112070","created":"2023-08-08T10:19:41.495Z","__v":0},{"_id":"64d216bd71620c7bce690bc2","email":"elton.arriero@gmail.com","nome":"Elton","password":"$2b$10$1zQ7HKoTG2Yi/MrEXMe64.26xD.CzzLbutPnOOdjHS2h/lUwbkvRq","cpf":"00000113123","created":"2023-08-08T10:19:41.497Z","__v":0}]

    axios.post(`${URL_API_LOCAL}//mensagens/arquivow`, jsonList, customConfig)
      .then(participantes => {
        console.log('OK ', participantes.length())
      })
      .catch(error => {
        console.log(error);
      })
  }
  const gravarParticipante = (participantes) => {

    var customConfig = {
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      }
    };

    participantes.map((linhaArquivo) => {

      const jsonList = JSON.stringify(linhaArquivo)      
      //console.log('json>>>>>', jsonList)    


  
      axios.post(`${URL_API_LOCAL}/mensagens/arquivow`, jsonList, customConfig)
        .then(participante => {
          console.log('OK ', participante)
        })
        .catch(error => {
          console.log(error);
        })

    })

    alert('Arquivo Gravado!');
  }







  const enviaSMS = (mensagemSMS) => {
    (async () => {
      const secret = new TextEncoder().encode(
        "34c9b194-67b0-4178-8d11-f722d154c2c1"
      );

      var token = await new jose.SignJWT({})
        .setProtectedHeader({ typ: 'JWT', alg: "HS256" })
        .setIssuer('ef4e1afa-94b0-451a-9170-79fe1c1cf484')
        .setExpirationTime('30s')
        .sign(secret);

      console.log('enviaSMS ', token);

      const article = {
        "phone_number": "+557900900123",
        "template_id": "b14d1933-e1ba-4509-82f3-6e5ce99ee379"
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-control-allow-methods': "GET,PUT,POST,DELETE,OPTIONS",
        'Access-Control-Allow-Headers': "Content-Type, Authorization, X-Requested-With"
      };

      console.log(headers)
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
          console.log('error:', error);
        })

    })();

  }

  const buscaDados = (template) => {
    axios.get(`${URL_API_LOCAL}/mensagens/template/${template}`)
      .then(resposta => {
        if (resposta.data[0] !== undefined) {

          setMensagemSelecionada(resposta.data[0]);

          setTemplate(resposta.data[0].template);
          setAssunto(resposta.data[0].assunto);
          setTexto(resposta.data[0].texto);
          setTipo(resposta.data[0].tipo);
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const buscaParticipante = (email_b) => {
    axios.get(`${URL_API_LOCAL}/users/email/${email_b}`)
    .then(resposta => {
      //console.log(resposta.data)
      if (resposta.data[0] !== undefined) {

        let participanteSelecionado = resposta.data[0];
        console.log(participanteSelecionado, '********')        
        setParticipantes([...participantes, participanteSelecionado])

      } else {
        //setTemplate('');
      }       
    })
    .catch (error => {
      console.log(error);
    })   
    console.log('Participantes=', participantes) 
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

        <h2>Enviar Mensagens [e-mail, SMS]</h2>

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

        <Card style={{ width: '100%', backgroundColor: '#d5d8d7' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>{mensagemSelecionada.assunto}</Card.Title>
            <Card.Text>
              {mensagemSelecionada.texto}
              <br />
              [ <b> {mensagemSelecionada.tipo} </b> ]
            </Card.Text>

          </Card.Body>
        </Card>

        <br />

        <InputGroup className="mb-3"  >
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Participantes do PPA - Depois de ...</b> </InputGroup.Text>
          {/* <Form.Control aria-label="Primeiro registro" /> */}

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

          {/* <Form.Control aria-label="Último registro"  /> */}
          <Button variant="outline-primary" style={{ width: '10%' }}
            onClick={() => IntervaloParticipantes(de, ate)}
          // onClick={() => enviaSMS(mensagemSelecionada)}
          >Consultar</Button>

          {/* <Form.Control aria-label="Último registro"  /> */}
          {/* <Button variant="success" style={{ width: '10%' }}
            onClick={() => MinhaLista()}
          // onClick={() => enviaSMS(mensagemSelecionada)}
          >Minha Lista</Button>           */}
          
          <Button variant="outline-success" style={{ width: '10%' }} onClick={handleShow}> 
            Minha Lista
          </Button>          
          </InputGroup>



      </form>

          <div style={{ width: '100%'}}>
      <Button variant="outline-primary" style={{ width: '20%' }}
            // onClick={() => IntervaloParticipantes(de, ate)}
            // onClick={() => enviaSMS(mensagemSelecionada)}
            //onClick={() => gravarArquivo(participantes)}
            onClick={() => gravarParticipante(participantes)}
          >Gravar Seleção</Button>      
          </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Nome</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((participante) => (
            <tr key={participante.id}>
              <td>{participante.email}</td>
              <td>{participante.nome}</td>
              <td>{participante.cpf}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selecionando Participantes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              {/* <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              /> */}
              <Form.Control
                type='email'
                //defaultValue={email}
                placeholder='nome@exemplo.com'
                onChange={evento => { setEmailBusca(evento.target.value); }}
                autoFocus
              /> 
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => buscaParticipante(emailBusca)}>
            Busca
          </Button> 

          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>



    </section>
  )
}

export default Enviar