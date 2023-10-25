import { useEffect, useState } from "react";
import Graficos from "../../componentes/Graficos";
import Time from "../../componentes/Time";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { ChartJsApi } from "../Graficos/ChartJsApi";
import Busca from '../../componentes/Busca';

import {Button, Stack, Card, Modal, Form, Container, Row, Col} from "react-bootstrap";
import Bodyimg from "../Banner/bodyimg";

import { URL_API_LOCAL } from '../../api';

// import { Card, Table, Button, InputGroup, Form, Modal, Dropdown } from 'react-bootstrap'

function Home() { 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);             // Genero
  const handleShow = () => setShow(true); 
  
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);           // Faixas Normais
  const handleShow1 = () => setShow1(true);   
  
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);           // Faixas de Renda 
  const handleShow2 = () => setShow2(true);  


  const [total, setTotal] = useState(0);
  const [totalTemas, setTotalTemas] = useState(0);  
  const [totalPropostas, setTotalPropostas] = useState(0);
  const [totalMensagens, setTotalMensagens] = useState(0);
  const [totalNumeros, setTotalNumeros] = useState(0);

  useEffect(() => {
    // axios.get('http://localhost:4000/mensagens/total')
    // .then(resposta => {
    //   console.log(resposta.data, ' ')
    //   setTotalMensagens(resposta.data)
    //   console.log(totalMensagens);
    // })
    // .catch (error => {
    //   console.log(error);
    // })

    axios.get(`${URL_API_LOCAL}/users/total`)
    .then(resposta => {
      console.log(resposta.data, ' ')
      setTotal(resposta.data)
      console.log(total);
    })
    .catch (error => {
      console.log(error);
    })

    // axios.get('http://localhost:4000/temas/total')
    // .then(resposta => {
    //   console.log(resposta.data, ' ')
    //   setTotalTemas(resposta.data)
    //   console.log(totalTemas);
    // })
    // .catch (error => {
    //   console.log(error);
    // })    

    axios.get(`${URL_API_LOCAL}/propostas/total`)
    .then(resposta => {
      console.log(resposta.data, ' ')
      setTotalPropostas(resposta.data)
      console.log(totalPropostas);
    })
    .catch (error => {
      console.log(error);
    })

    axios.get(`${URL_API_LOCAL}/numeros/total`)
    .then(resposta => {
      console.log(resposta.data, ' ')
      setTotalNumeros(resposta.data)
      console.log(totalNumeros);
    })
    .catch (error => {
      console.log(error);
    })    

  }, 0)

  const aoSubmeter = () => {
    console.log('Ao Submeter');
    <Busca />
  }


  return (
    <div>
        {/* <Card style={{ align: 'center', width: '50%', backgroundColor: '#d5d8d7' }}>
          <Card.Body>
            <Card.Title>  <b> Origem dos dados </b> </Card.Title>
            <Card.Text>
              <h3>Mensagens: {totalMensagens}</h3> <br/>
              <h3>Participantes   -  {total.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) }
                  (Dataprev - .csv)
                  </h3> <br/>
              <h3>Temas: {totalTemas}</h3> <br/>
              <h3>Propostas: {totalPropostas}</h3> <br/> <br/>
              <h3>Registros de Análses: {totalNumeros.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) }</h3> <br/>
            </Card.Text>
          </Card.Body>
        </Card> */}

      <section className="times">

        {/* <Bodyimg /> */}

        <br/>
        <br/>
        <br/>
        <br/>
        {/* <h3>Participantes :  {total.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) } </h3> 
            (Dataprev .csv) */}
        <br/>
        <br/>
        {/* <h3>Propostas : {totalPropostas} </h3> (site - download .csv)  */}

        <Container>

          <Row>
          {/* <Col> */}
                <Card style={{ width: '36rem' }}>
                <a href="./Propostas">
                  <Card.Img variant="top" src='/imagens/propostas1.PNG' /> 
                  </a>
                  <Card.Body >
                    <Card.Title style={{color: "blue"}}>Propostas</Card.Title>                    
                    {/* <Card.Title style={{color: "blue"}}>{total.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) }</Card.Title>
                    <Card.Text>
                      Participantes efetivos no evento PPA - Brasil Participativo maio a julho 2023.
                    </Card.Text> */}
                  </Card.Body>
                </Card>
          {/* </Col> */}
          </Row>

            <Row style={{paddingTop: "20px"}}>
            {/* <Col> */}
              {/* <a href="./Propostas"> */}
                <Card style={{ width: '36rem' }}>
                <a href="./Busca">
                  <Card.Img variant="top" src='/imagens/propostasSearch1.PNG' />
                  </a>
                  <Card.Body >
                    <Card.Title >Motor de Busca</Card.Title>

                    {/* <a href="./Propostas">
                  <Card.Img variant="top" src='/imagens/propostas.PNG' />
                  </a>               */}

                  <br/>

                    {/* <a href="./Busca">
                  <Card.Img variant="top" src='/imagens/propostasSearch.PNG' />
                  </a>                        */}
                    {/* <Card.Text >
                      Explore os registros de todas as propostas dos eventos participativos.
                    </Card.Text>
                    <Button variant="primary">Pesquisa</Button>
                    <Button variant="success">Cadastro</Button> */}
                  </Card.Body>
                </Card>
              {/* </a> */}
            {/* </Col> */}
            </Row>
            <br/>




          <Row>
            {/* <Col>
              <a href="./Participantes">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src='/imagens/notifica_o1.PNG' /> 
                  <Card.Body >
                    <Card.Title style={{color: "blue"}}>{total.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) }</Card.Title>
                    <Card.Text>
                      Participantes efetivos no evento PPA - Brasil Participativo maio a julho 2023.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
          </Col> */}
          </Row>

          {/* <Col> */}
          <Row>
              <Card style={{ width: '36rem' }}>
              <a href="./Numeros">                
                <Card.Img variant="top" src='/imagens/graficos2.PNG' />
                </a>
                <Card.Body>
                  <Card.Title >PPA Participativo</Card.Title>
                  {/* <Card.Text>
                    Consulte os || {totalNumeros.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) } registros de análises das 20 propostas mais votadas por ministério.
                  </Card.Text> */}

                  {/* <a href="./Busca">
                    <Button variant="primary" >Relatórios</Button>    
                  </a>  */}
                  {/* <Button variant="success">Mensagens</Button> */}

                </Card.Body>
              </Card>
            </Row>              

          {/* </Col> */}

        </Container>  



        {/* <h3>Registros de Análises : {totalNumeros.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) } </h3> (.html, .xlsx) <br/> */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      </section>



    <Modal show={show} onHide={handleClose} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >Visitas diárias - em: 04/10/2023</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <div style={{height: '20%'}}>
              <ChartJsApi 
                numeros = {1}
                tipo_grafico = {4}
              />
            </div>
            <div>
              <ChartJsApi 
                numeros = {2}
                tipo_grafico = {4}
              />
            </div>             */}
            <div style={{backgroundColor: "#F8F8FF" }}>
              <ChartJsApi 
                numeros = {3}
                tipo_grafico = {4}
              />
            </div>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => <Graficos />}> */}
            {/* Mais
          </Button>  */}
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>      


    </div>
  );
}

export default Home;
