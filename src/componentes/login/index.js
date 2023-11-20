import { useState } from 'react'
import { Modal, Row, Col } from 'react-bootstrap';

function Login() {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   

    return (


        <Modal show={show} className='modal-md'>
                <Modal.Header closeButton onClick={handleClose}>
                <h3 className="Auth-form-title">Login</h3>
                </Modal.Header>
                <Modal.Body>
    

        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">

            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Digite o endereço de E-mail"
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Digite a Senha"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleClose}>
                Entrar
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
           
              Primeira vez ? <a href="./Home"> crie uma senha </a>
              <br/>
              Esqueceu <a href="./Home">a senha ?</a>  

            </p>            
          </div>
        </form>
      </div>


      </Modal.Body>
        </Modal>


    )
}

export default Login;