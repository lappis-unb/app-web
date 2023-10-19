import { useEffect, useState } from "react";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import {Button, Stack} from "react-bootstrap";

import { URL_API_LOCAL } from './api';

function App() {

  const [total, setTotal] = useState(0);

  useEffect(() => {
        // axios.get('http://localhost:4000/users/total')
    axios.get(`${URL_API_LOCAL}/users/total`)
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

  function cadastrarTime(novoTime) {
    
  }

  return (
    <div>
      <Formulario 
         participantes={total}
         cadastrarTime={cadastrarTime}
         times={'time'} 
         tipos={'nome'}
         aoCadastrar={colaborador => setColaboradores([...colaboradores, colaborador])} 
      />
    </div>
  );
}

export default App;
