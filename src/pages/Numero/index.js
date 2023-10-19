import { useEffect, useState } from "react";
import axios from "axios";
import Numero from "../../componentes/Numero";

import { URL_API_LOCAL } from '../../api';

function Numerox() {

  const [numerosTotalx, setNumerosTotal] = useState(0);

  useEffect(() => {
    axios.get(`${URL_API_LOCAL}/numeros/total`)
    .then(resposta => {
      setNumerosTotal(resposta.data)
      console.log('****** numerosTotal:', numerosTotalx,' - ', resposta.data)
    })
    .catch (error => {
      console.log(error);
    })
  }, 0)

  return (
    <div>

      {/* <h1> Numeros total x{numerosTotalx}</h1> */}

      <Numero
         numerosTotal= {numerosTotalx} 
      />
    </div>
  );
}

export default Numerox;
