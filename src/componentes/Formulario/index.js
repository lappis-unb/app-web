import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import CampoTextoArea from '../CampoTextoArea'
import CampoRadioButton from '../CampoRadioButton'
import ListaSuspensa from '../ListaSuspensa'
import './formulario.css'
import axios from 'axios'

import { URL_API_LOCAL } from '../../api';

const Formulario = ({aoCadastrar, times, cadastrarTime, participantes, tipos}) => {

    const buscaDados = (email) => {
        axios.get(`${URL_API_LOCAL}/users/email/${email}`)
        .then(resposta => {
          console.log(resposta.data[0])
          if (resposta.data[0] !== undefined) {
            let nomeCpf = resposta.data[0].nome+' <=> '+resposta.data[0].cpf;
            setCorTime(nomeCpf);
            // setCargo(resposta.data[0].cpf);
          } else {
            setCorTime('');
            // setCargo('');            
          }       
        })
        .catch (error => {
          console.log(error);
        })    
    }    

    const [nome, setNome] = useState('')
    const [cargo, setCargo] = useState('')
    const [imagem, setImagem] = useState('')
    const [time, setTime] = useState('')
    const [tipo, setTipo] = useState('')    
    const [nomeTime, setNomeTime] = useState('')
    const [corTime, setCorTime] = useState('')    

    const aoSubmeter = (evento) => {
        evento.preventDefault()
        console.log('form enviado', nome, cargo, imagem, time )
        aoCadastrar({
            nome,
            cargo,
            imagem,
            time,
            tipo
        })
    }

    return (
        <section className="formulario-container">
            <form className="formulario" onSubmit={aoSubmeter}>
                <h2>Mensagens</h2>
                <CampoTexto 
                    label='Mensagem - Template ID' 
                    placeholder='Informe o Template ID da mensagem'
                    valor={imagem}
                    aoAlterado={valor =>setImagem(valor) } /> 
                {/* <CampoTexto
                    obrigatorio={true}
                    label='Nome'
                    placeholder='Digite o assunto '
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}/> */}
                <CampoTextoArea
                    obrigatorio={true}
                    label='Assunto'
                    placeholder='Digite o assunto '
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}/>            
                <CampoTextoArea
                    // obrigatorio={true}
                    linhas = "7"
                    label='Texto'
                    placeholder='Digite o texto da mensagem '
                    valor={cargo}
                    aoAlterado={valor => setCargo(valor)}/>                                 
                {/* <CampoTexto
                    obrigatorio={true}
                    label='CPF' 
                    placeholder='Digite o número do seu CPF '
                    valor={cargo}
                    aoAlterado={valor => setCargo(valor)}/> */}
                <ListaSuspensa 
                    obrigatorio={true}
                    label='Enviar para'
                    items={tipos} 
                    valor={tipo}
                    aoAlterado={valor => setTipo(valor)}/> 
                {/* <CampoRadioButton opcaoSms opcaoEmail />   */}
                <Botao texto='Gravar Mensagem' />
            </form>
            <form className="formulario" onSubmit={(evento) => {
                evento.preventDefault()
                cadastrarTime({nome: nomeTime, cor: corTime})
            }}>
                <h2>Participantes:  {participantes.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) }</h2>
                <CampoTexto 
                    obrigatorio
                    label='E-mail' 
                    placeholder='Informe o endereço de e-mail'
                    // valor={nomeTime}
                    aoAlterado={valor => { setNomeTime(valor); buscaDados(valor) } } />         
                <CampoTexto
                    obrigatorio
                    label='Identificação'
                    placeholder='Digite a cor do time '
                    valor={corTime}
                    aoAlterado={valor => setCorTime(valor)}/>
                <ListaSuspensa 
                    obrigatorio={true}
                    label='Enviar para'
                    items={times} 
                    valor={time}
                    aoAlterado={valor => setTime(valor)}/>                      
                <Botao texto='Enviar Mensagem(ns)' />
            </form>
        </section>
    )
}

export default Formulario