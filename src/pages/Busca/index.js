import { useEffect, useState } from "react";
import axios from "axios";
import Enviar from "../../componentes/Enviar";

import { URL_API_LOCAL } from '../../api';

function Pesquisa() {

//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     axios.get(`${URL_API_LOCAL}/mensagens/total`)
//     .then(resposta => {
//       console.log(resposta.data, ' ')
//       setTotal(resposta.data)
//       console.log(total);
//     })
//     .catch (error => {
//       console.log(error);
//     })
//   }, 0)


  return (
    <div>
      <Busca
      />
    </div>
  );
}

export default Pesquisa;