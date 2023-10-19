import { useEffect, useState } from "react";
import Time from "../../componentes/Time";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import {Button, Stack} from "react-bootstrap";
import Proposta from "../../componentes/Proposta";

import { URL_API_LOCAL } from '../../api';

function App() {

  const [times, setTimes] = useState([ 
    {
      id: uuidv4(),
      nome: 'Todos participantes',
      cor: '#57C278'
    },
    {
      id: uuidv4(),
      nome: 'Autores de propostas',
      cor: '#82CFFA'
    },
    {
      id: uuidv4(),
      nome: 'Seguidores de propostas',
      cor: '#A6D157'
    },
    {
      id: uuidv4(),
      nome: 'Votantes',
      cor: '#E06B69'
    },
    {
      id: uuidv4(),
      nome: 'Região',
      cor: '#DB6EBF'
    },
    {
      id: uuidv4(),
      nome: 'Estado',
      cor: '#FFBA05'
    },
    {
      id: uuidv4(),
      nome: 'Município',
      cor: '#FF8A29'
    },
    {
      id: uuidv4(),
      nome: 'Somente uma mensagem',
      cor: '#FF8A29'
    },    
  ])

  const [tipos, setTipos] = useState([ 
    {
      id: uuidv4(),
      nome: 'SMS',              
      cor: '#57C278'
    },
    {
      id: uuidv4(),
      nome: 'email',
      cor: '#82CFFA'
    }
  ])

  const inicial = []

  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:4000/propostas/total')
    .then(resposta => {
      console.log(resposta.data, ' ')
      setTotal(resposta.data)
      console.log(total);
    })
    .catch (error => {
      console.log(error);
    })
  }, 0)

  const [colaboradores, setColaboradores] = useState(inicial)

  function deletarColaborador(id) {
    setColaboradores(colaboradores.filter(colaborador => colaborador.id !== id));
  }

  function mudarCorDoTime(cor, id) {
    console.log(cor, id);
    setTimes(times.map(time => {
      if(time.id === id) {
        time.cor = cor;
      }
      return time;
    }))
  }

  function cadastrarTime(novoTime) {
    setTimes([ ...times, { ...novoTime, id: uuidv4() }])
  }

  return (
    <div>
      {/* <Banner 
         participantes={total}
      /> */}

<Stack direction="horizontal" gap={2}>
  <Button as="a" variant="primary">
    Button as link
  </Button>
  <Button as="a" variant="success">
    Button as link
  </Button>
</Stack>;      

      <Proposta
         participantes={total}
         cadastrarTime={cadastrarTime}
         times={times.map(time => time.nome)} 
         tipos={tipos.map(tipo => tipo.nome)}
         aoCadastrar={colaborador => setColaboradores([...colaboradores, colaborador])} 
      />
      {/* <section className="times">
        <h1>Brasil Participativo - colaboradores: {total}</h1>
        {times.map((time, indice) => 
        <Time 
          mudarCor={mudarCorDoTime}
          key={indice} 
          time={time} 
          colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)} 
          aoDeletar={deletarColaborador}
        />)}
      </section> */}
      {/* <Rodape />    */}
    </div>
  );
}

export default Proposta;
