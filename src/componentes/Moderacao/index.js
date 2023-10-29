import { useEffect } from 'react'
import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import CampoTextoArea from '../CampoTextoArea'
import axios from 'axios'
import { Modal, Table, Button, InputGroup, Form } from 'react-bootstrap'

import wordsFill from '../Busca/words';
import { URL_API_LOCAL } from '../../api';

const Moderacao = ({show, moderacao}) => {

    const [id, setId] = useState('')
    const [body, setBody] = useState('')
    const [evento, setEvento] = useState('')
    const [estado, setEstado] = useState('')    

    return (
        <Form>

        <h2>Termos de Moderação</h2>

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>ID da Moderação</b> </InputGroup.Text>
          <Form.Control
            label='ID'
            type="number"
            placeholder='Informe o ID do termo'
          //  defaultValue={moderacao.id}
            onChange={evento => { setId(evento.target.value)}}
          />
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Assunto</b> </InputGroup.Text>
          <Form.Control
            label='Termo(s)'
            type="text"
            placeholder='Digite a(s) palavra(s) s serem moderadas'
          //  defaultValue={moderacao.body}
            onChange={evento => setBody(evento.target.value)}
          />

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Evento</b> </InputGroup.Text>
          <Form.Select aria-label="Default select example" onChange={evento => setEvento(evento.target.value)}>
            <option>Escolha o evento em que o termo será moderado</option>
            <option value="ppaparticip">PPA Participativo</option>
            <option value="confjuv4">4a Conferência Nacional da Juventude</option>
          </Form.Select>

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Estado</b> </InputGroup.Text>
          <Form.Select aria-label="Default select example" onChange={evento => setEstado(evento.target.value)}>
            <option>Escolha o estado do termo</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </Form.Select>

          <Button variant="primary" 
            //onClick={() => IntervaloMensagens(de, ate)}
          >Consultar</Button>
          {/* <Button variant="danger" style={{ width: '15%'}} 
                    >Enviar Mensagens</Button>                                      */}
        {/* </InputGroup> */}

        </Form>    
    )

}

export default Moderacao