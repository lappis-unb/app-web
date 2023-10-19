import { useEffect } from 'react'
import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import CampoTextoArea from '../CampoTextoArea'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form, Modal } from 'react-bootstrap'

import { URL_API_LOCAL } from '../../api';

const ComentariosShow = ({proposta_id}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [total, setTotal] = useState(0)    
    const [comentarios, setComentarios] = useState([{}])
    
    useEffect(() => {

        console.log('Estou aqui! - ComentariosShow')

        setShow(true);

        axios.get(`${URL_API_LOCAL}/propostacomentarios/total`)
        .then(resposta => {
          console.log(resposta.data, ' ')
          setTotal(resposta.data)
          console.log(total);
        })
        .catch(error => {
          console.log(error);
        })


        axios.get(`${URL_API_LOCAL}/propostacomentarios/proposta/${proposta_id}`)
        .then(resposta => {
            console.log(resposta.data)
            if (resposta.data[0] !== undefined) {
            console.log(resposta.data[0])

            setComentarios(resposta.data);

            console.log('Comentários: ', comentarios)

            // setId(resposta.data[0].id);
            // setTitle(resposta.data[0].title);
            // setBody(resposta.data[0].body);
            // setCategory(resposta.data[0].category_name);
            // setCargo(resposta.data[0].cpf);
            } else {
            setComentarios([{}]);
            }
        })
        .catch(error => {
            console.log(error);
        })



        // axios.get(`http://localhost:4000/propostacomentarios/id/${proposta_id}`)
        // .then(resposta => {
        //     console.log('id:', proposta_id, ' ',resposta.data)
        //     if (resposta.data[0] !== undefined) {
        //     console.log(resposta.data[0])
        //     setId(resposta.data[0].id);
        //     setNome(resposta.data[0].nome);
        //     } else {
        //     //setTemplate('');
        //     }
        // })
        // .catch (error => {
        //     console.log(error);
        // })    

    //   axios.get('http://localhost:4000/propostacomentarios')
    //   .then(todosComentarios => {
    //     if (todosComentarios.data[0] !== undefined) {
    //       setComentarios(todosComentarios.data)
    //     } else {
    //       //setTemplate('');
    //     }       
    //   })
    //   .catch (error => {
    //     console.log(error);
    //   })
    }, 0)

    // const buscaDados = async (id) => {
    //     await axios.get(`http://localhost:4000/propostacomentarios/id/${id}`)
    //     .then(resposta => {
    //       console.log('id:', id, ' ',resposta.data)
    //       if (resposta.data[0] !== undefined) {
    //         console.log(resposta.data[0])
    //         setId(resposta.data[0].id);
    //         setNome(resposta.data[0].nome);
    //       } else {
    //         //setTemplate('');
    //       }       
    //     })
    //     .catch (error => {
    //       console.log(error);
    //     })    
    // }    

    return (
        <section className="formulario-container">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Comentários</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form  className='modal-xl'>
                    <Form.Table>
                        <thead>
                        <tr>
                        <th>Postagem</th>
                        <th>ID</th>
                        <th>Comentário</th>
                        <th>Autor</th>
                        <th>ID</th>
                        {/* <th onClick={() => OrdenarPropostas(0)}>Votos X</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {comentarios.map((comentario) => (
                        <tr key={comentario.id}>
                            <td>{comentario.created_at}</td>
                            <td>{comentario.id}</td>
                            <td>{comentario.body}</td>
                            <td>{comentario.author_name}</td>
                            <td>{comentario.author_id}</td>
                        </tr>
                        ))}
                    </tbody>              
                    </Form.Table>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>

        </section>
    )
}

export default ComentariosShow