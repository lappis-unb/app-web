import { useEffect, useState } from "react";
import axios from "axios";
import Seleciona from "../../componentes/Seleciona";

function Seleciona() {

  const [total, setTotal] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:4000/mensagens/total')
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
      <Seleciona
      />
    </div>
  );
}

export default Seleciona;