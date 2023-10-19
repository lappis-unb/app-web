import { useEffect, useState } from "react";
import Time from "../../componentes/Time";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import {Button, Stack} from "react-bootstrap";
import Tema from "../../componentes/Tema";

import { URL_API_LOCAL } from '../../api';

function App() {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`${URL_API_LOCAL}/temas/total`)
    .then(resposta => {
      console.log(resposta.data, ' ')
      setTotal(resposta.data)
      console.log(total);
    })
    .catch (error => {
      console.log(error);
    })
  }, 0)

  const [colaboradores, setColaboradores] = useState([])

  function deletarColaborador(id) {
    setColaboradores(colaboradores.filter(colaborador => colaborador.id !== id));
  }

  // function mudarCorDoTime(cor, id) {
  //   console.log(cor, id);
  //   setTimes(times.map(time => {
  //     if(time.id === id) {
  //       time.cor = cor;
  //     }
  //     return time;
  //   }))
  // }

  // function cadastrarTime(novoTime) {
  //   setTimes([ ...times, { ...novoTime, id: uuidv4() }])
  // }

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

      <Tema
         participantes={total}
        //  cadastrarTime={cadastrarTime}
        //  times={times.map(time => time.nome)} 
        //  tipos={tipos.map(tipo => tipo.nome)}
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

export default Tema;
