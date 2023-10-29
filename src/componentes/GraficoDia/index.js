import { useEffect, useState } from "react";
import Formulario from "../../componentes/Formulario";
import Time from "../../componentes/Time";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { ChartJsApi } from "../Graficos/ChartJsApi";
import { ChartJsDia } from "../GraficoDia/ChartJsDia";

import {Button, Stack, Card, Modal, Form} from "react-bootstrap";

// import { Card, Table, Button, InputGroup, Form, Modal, Dropdown } from 'react-bootstrap'

function GraficoDia() { 

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);             // Genero
  const handleShow = () => setShow(true); 
  
  useEffect(() => {
    console.log('estou aqui!');
  }, 0)

  return (
    <div>
    <Modal show={show} onHide={handleClose} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >Visitas - em 28/10/2023</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{height: '20%'}}>
            <div >
              {/* <ChartJsDia 
                numeros = {1}
                tipo_grafico = {4}
              /> */}

              <ChartJsApi 
                numeros = {3}
                tipo_grafico = {4}
              />

            </div>
            
            {/* <div>
              <ChartJsApi 
                numeros = {2}
                tipo_grafico = {4}
              />
            </div>             */}
            <div style={{backgroundColor: "#FAF0F6" }}>
              <ChartJsDia 
                numeros = {3}
                tipo_grafico = {4}
              />

              <ChartJsDia 
                numeros = {4}
                tipo_grafico = {4}
              />

            </div>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> 
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>      
    </div>
  );
}

export default GraficoDia;
