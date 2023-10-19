import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import * as fs from 'fs';
import axios from 'axios';

import { URL_API_LOCAL } from '../../api';

const Seleciona = () => {
    
  const [show, setShow] = useState(false);
  const [texto, setTexto] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
      setShow(true);
      axios.get(`${URL_API_LOCAL}/mensagens/arquivor`)
        .then(texto => {
          setTexto(texto.data)
          console.log('OK ', texto.data)
        })
        .catch(error => {
          console.log(error);
        })
  }, 0)  

  // const LerParticipante = (participantes) => {
 
  //     axios.get(`http://localhost:4000/mensagens/arquivor`)
  //       .then(texto => {
  //         setTexto(texto)
  //         console.log('OK ', texto)
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  // }

  // const MostraArquivo = () => {
  //   //const fs = require('fs');
  //   var arquivoDestino = "C:\\Projetos\\ArquivoRW.txt";        
  //   fs.readFileSync(arquivoDestino, (err, data) => {             //Assíncrono
  //     if (err) throw err;
  //     console.log(data);
  //   });  
  //   // const data = fs.readFileSync(arquivoDestino);
  //   // console.log(data);
  //   // const enconding = 'utf-8'; 
  //   // const texto = fs .readFile(arquivoDestino,enconding); 
  //   // console.log(texto)     
  //   const result = fs.readFileSync(arquivoDestino, {
  //     encoding: 'utf-8',
  //   });
  //   console.log(result);    

  // }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Mostra Registros Selecionados para o Envio de SMS / E-mail
      </Button> */}

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Registros Selecionados para o Envio de SMS / E-mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='modal-xl'>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              /> 
            </Form.Group> */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Registros Selecionados</Form.Label>
              <Form.Control defaultValue={texto} as="textarea" rows={30} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Seleciona;