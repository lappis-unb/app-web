import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Cabecalho.module.css'
import CabecalhoLink from '../CabecalhoLink';
import logo from './logo192.png';
import { Button, Input, Form, Nav, Badge, Navbar, Container, NavDropdown, Modal, Image } from 'react-bootstrap';

function Cabecalho() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    

    return (
        <header>
            <div className={styles.cabecalho}>
                <h2>
                    Diretoria de Participação Digital e Comunicação em Redes
                </h2>
            </div>
            {/* <Container>             */}
                <Navbar bg="dark" data-bs-theme="dark">

                        <Navbar.Brand href="./">
                        <img
                            alt=""
                            src={logo} 
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                            </Navbar.Brand>
                        <Nav className="me-auto" style={{ fontSize: 20 }}>
                            <NavDropdown title="PPA" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="./Numeros">Análise</NavDropdown.Item>
                                {/* <NavDropdown.Item href="./Graficos">Visitantes Mensal</NavDropdown.Item>
                                <NavDropdown.Item href="./GraficoDia">Visitantes - Dia</NavDropdown.Item> */}
                            </NavDropdown>

                            <NavDropdown title="Site" id="collasible-nav-dropdown">
                                {/* <NavDropdown.Item href="./Numeros">Análise</NavDropdown.Item> */}
                                <NavDropdown.Item href="./Graficos">Visitantes Mensal</NavDropdown.Item>
                                <NavDropdown.Item href="./GraficoDia">Visitantes - Dia</NavDropdown.Item>
                                <NavDropdown.Item href="./Matomo">Matomo</NavDropdown.Item>
                                <NavDropdown.Item href="./MatomoSoma">Matomo - Soma</NavDropdown.Item>                                
                                <NavDropdown.Item href="./MatomoDias">Matomo - Dias</NavDropdown.Item>
                            </NavDropdown>                        

                            <NavDropdown title="Itens" id="collasible-nav-dropdown">
                                <Nav.Link href="./Atualizacao">Atualização</Nav.Link>
                                <Nav.Link href="./Participantes">Participantes</Nav.Link>
                                <Nav.Link href="./Temas">Categorias</Nav.Link>
                                <Nav.Link href="./Reunioes">Reuniões</Nav.Link>
                                <Nav.Link href="./Propostas">Propostas</Nav.Link>
                                <Nav.Link href="./PropostaComentarios"> - Comentários</Nav.Link>
                                <Nav.Link href="./PropostaModeracao"> - Moderação</Nav.Link>
                                <Nav.Link href="./Busca"> - Busca</Nav.Link>     
                                <Nav.Link href="./Login"> - Login</Nav.Link>      
                            </NavDropdown>

                            <NavDropdown title="Outros" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="./Mensagens">Mensagens</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./Enviar">Selecionar Mensagens</NavDropdown.Item>
                                <NavDropdown.Item href="./Seleciona">Enviar</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>


                        <Button variant="outline-success" 
                            onClick={() => {
                                setShow(true)
                            }}                    
                        >Ajuda</Button>                         

                </Navbar>


                <Modal show={show} onHide={handleClose} className='modal-xl'>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        <p style={{ color: "#03a9f4" }} >Ajuda</p> 
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Image src='/imagens/help_app.png' rounded />
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                    </Modal.Footer>
                </Modal> 



            {/* </Container> */}
        </header>





    )
}

export default Cabecalho;