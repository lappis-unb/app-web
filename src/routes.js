import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import App from "./App";
import Enviar from "../src/pages/Enviar";
import Mensagem from "../src/pages/Mensagem";
import Numero from "../src/pages/Numero";
import Proposta from "../src/pages/Proposta";
import PropostaComentario from "./componentes/PropostaComentario";
import PropostaModeracao from "./componentes/PropostaModeracao";
import Moderacao from "./componentes/Moderacao";
import ComentariosShow from "./componentes/PropostaComentario/ComentariosShow";
import Participante from "../src/pages/Participante";
import Tema from "../src/pages/Tema";
import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import Seleciona from "./componentes/Seleciona";
import Graficos from "./componentes/Graficos";
import GraficoDia from "./componentes/GraficoDia";
import Reuniao from './componentes/Reuniao';
import Busca from './componentes/Busca';

function AppRoutes() {
    return(
           <BrowserRouter> 
           <Cabecalho />
           <Routes>
                <Route path="/" element={<Inicio />}></Route> 
                <Route path="/App" element={<App />}></Route>
                <Route path="/Mensagens" element={<Mensagem />}></Route>
                <Route path="/Participantes" element={<Participante />}></Route>                
                <Route path="/Propostas" element={<Proposta />}></Route>
                <Route path="/PropostaComentarios" element={<PropostaComentario />}></Route>
                <Route path="/ComentariosShow" element={<ComentariosShow />}></Route>
                <Route path="/PropostaModeracao" element={<PropostaModeracao />}></Route>
                <Route path="/Moderacao" element={<Moderacao />}></Route>
                <Route path="/Temas" element={<Tema />}></Route>                
                <Route path="/Enviar" element={<Enviar />}></Route>                

                <Route path="/Seleciona" element={<Seleciona />}></Route>

                <Route path="/Numeros" element={<Numero />}></Route>
                <Route path="/Graficos" element={<Graficos />}></Route>
                <Route path="/GraficoDia" element={<GraficoDia />}></Route>

                <Route path="/Reunioes" element={<Reuniao />}></Route>
                <Route path="/Busca" element={<Busca />}></Route>

           </Routes>
           <Rodape />
           </BrowserRouter>
    )
}

export  default AppRoutes;