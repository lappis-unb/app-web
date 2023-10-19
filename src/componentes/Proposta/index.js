import { useEffect } from 'react'
import { useState } from 'react'
//import ComentarioShow from '../PropostaComentario/ComentariosShow'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form, Modal } from 'react-bootstrap'

import { URL_API_LOCAL } from '../../api';

const Proposta = ({ aoCadastrar, times, cadastrarTime, participantes, tipos }) => {

  const [id, setId] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [de, setDe] = useState(0)
  const [ate, setAte] = useState(0)
  const [total, setTotal] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [categorias, setCategorias] = useState([])

  const [propostas, setPropostas] = useState([{}])
  const [propostaSelecionada, setPropostaSelecionada] = useState({})
  const [comentarios, setComentarios] = useState([{}])
  const [comentariosSoma, setComentariosSoma] = useState(0)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }, 0)

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
    axios.get(`${URL_API_LOCAL}/propostas/categoria/${categoria}`)
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
















  const aoSubmeter = (evento) => {
    evento.preventDefault()
    console.log('form enviado', id, title, body, category)
    aoCadastrar({
      id,
      title,
      body,
      category
    })
  }

  return (
    <>
    <section className="formulario-container">
      <form className="formulario" onSubmit={aoSubmeter}>
        <h2>{total} - Propostas</h2>

        <InputGroup className="mb-3"  >

          <Form.Select aria-label="Default select example" onChange={evento => setCategoria(evento.target.value)}>
            <option>Escolha a categoria</option>

            {categorias.map(item => <option value={item.id}>{item.nome}</option>)}

          </Form.Select>

          <Button variant="primary" style={{ width: '15%' }}
            onClick={() => {
              if (categoria.length > 0) { CategoriaPropostas(categoria) } else { IntervaloPropostas(de, ate) }
            }}
          >Consultar</Button>
          <Button variant="outline-success" style={{ width: '15%' }}
          >{propostas.length} Propostas</Button>
        </InputGroup>


        <InputGroup className="mb-3"  >
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>ID - Proposta</b> </InputGroup.Text>
          <Form.Control
            label='Proposta - ID'
            type="number"
            placeholder='Informe o ID da Proposta'
            onChange={evento => { setId(evento.target.value)}}
          />
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Nome</b> </InputGroup.Text>
          <Form.Control
            label='Nome'
            placeholder='Digite o assunto da Proposta'
            defaultValue={title}
            onChange={evento => setTitle(evento.target.value)}
          />
        </InputGroup>

        <Card style={{ width: '100%', backgroundColor: '#E0FFFF' }}>  
          <Card.Body>
            <Card.Title>   {propostaSelecionada.title} ( {propostaSelecionada.published_at} ) ___ {propostaSelecionada.supports} votos</Card.Title>
            <Card.Text>
              {propostaSelecionada.body}
              <br />
              [ {propostaSelecionada.id} ] : 
              <b>{propostaSelecionada.category_name}</b> - 
                    <a href="">{propostaSelecionada.url}</a>              
            </Card.Text>

            <Button variant="outline-success" style={{ width: '10%' }} 
              onClick={() => buscaComentarios(propostaSelecionada.id)}
             > Comments</Button>
            
            <Button variant="outline-success" onClick={handleShow}>
              {comentariosSoma}
            </Button>

          </Card.Body>
        </Card>

        <br />

      </form>

    </section>      

    {/* <div class="container"> */}

      {/* <div class="row">

        <div class="col"> */}

            <Table striped bordered hover variant="info">
                <thead style={{backgroundcolor: "#f44336"}}>
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
                  <tr key={proposta.id} onClick={() => buscaDados(proposta.id)}>
                    <td>{proposta.published_at}</td>
                    <td>{proposta.id}</td>
                    <td>{proposta.title}</td>
                    <td>{proposta.category_name}</td>
                    <td>{proposta.supports}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* </div> */}

          {/* <div class="col"> */}

          {/* </div> */}



      {/* </div>

    </div> */}



    </>
  )
}

export default Proposta