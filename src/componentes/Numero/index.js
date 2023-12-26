import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Table, Button, InputGroup, Form, Modal, Dropdown, Image } from 'react-bootstrap'
//import Chart from 'chart.js/auto'

import ListaSuspensa from '../ListaSuspensa'

import { ChartJs } from '../Graficos/ChartJs'
import { ChartJsIdade } from '../Graficos/CharJsIdade'
import { ChartJsRenda } from '../Graficos/CharJsRenda'

import { URL_API_LOCAL } from '../../api';

const Numero = ({ numerosTotal }) => {

  console.log('numerosTotal:', numerosTotal)

  // let ctx = document.getElementById("myChartjs");

  // new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // });


//--------------------------------------------Modal  
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);             // Genero
const handleShow = () => setShow(true); 

const [show1, setShow1] = useState(false);
const handleClose1 = () => setShow1(false);           // Faixas Normais
const handleShow1 = () => setShow1(true);   

const [show2, setShow2] = useState(false);
const handleClose2 = () => setShow2(false);           // Faixas de Renda 
const handleShow2 = () => setShow2(true);   

const [show3, setShow3] = useState(false);
const handleClose3 = () => setShow3(false);           // Faixas de Renda 
const handleShow3 = () => setShow3(true);   

const [tipoGrafico, SetTipoGrafico] = useState(0);
const nomeGrafico= ["Doughnut", "Pie", "Bar", "Horizontal Bar", "Line"]

  const [regiao, setRegiao] = useState('')
  const [ranking, setRanking] = useState('')
  const [proposta, setProposta] = useState('')
  const [tipo, setTipo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [categorias, setCategorias] = useState([])

  const [categoriaNome, setCategoriaNome] = useState('')

  const [de, setDe] = useState(0)
  const [ate, setAte] = useState(0)

  const [numeros, setNumeros] = useState([{}])
  const [numeroSelecionado, setNumeroSelecionado] = useState({})

  useEffect(() => {
    axios.get(`${URL_API_LOCAL}/numeros`)    
      .then(todosNumeros => {
        console.log('todos os numeros: ', todosNumeros)
        if (todosNumeros.data[0] !== undefined) {
          let getNumeros = todosNumeros.data;
          setNumeros(getNumeros)
          console.log('getNumeros ', getNumeros)
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })

      axios.get(`${URL_API_LOCAL}/temas`)    
      .then(todosTemas => {
        console.log('todos os temas: ', todosTemas)
        if (todosTemas.data[0] !== undefined) {
          let getCategorias = todosTemas.data;
          setCategorias(getCategorias)
          console.log('getCategorias ', getCategorias)
        } else {
          //setTemplate('');
        }
      })
      .catch(error => {
        console.log(error);
      })

  }, 0)

  const buscaDados = (tipo, regiao, ranking, proposta, categoria) => {

console.log('tipo, regiao, ranking, proposta, categoria', tipo, regiao, ranking, proposta, categoria);
    buscaTema(categoria)

    axios.post(`${URL_API_LOCAL}/numeros/regiao`, {
        regiao: regiao,
        tipo: tipo, 
        ranking: ranking, 
        proposta: proposta,
        categoria: categoria  
      })     
      .then(todosNumeros => {
        if (todosNumeros.data[0] !== undefined) {
          let getNumeros = todosNumeros.data;
          setNumeros(getNumeros)
          console.log('numeros===',numeros);

          //buscaTema(numeros[0].categoria)

        } else {
          setNumeros([]);

          let n = {regiao: 'nihil',
          'ranking' : 0,
          'proposta' : 0,
          'pop_perc' : 0,
          'pop_qtde' : 0,
          'vot_perc' : 0,
          'vot_qtde' : 0}

          setNumeros([n]);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }  

  const buscaTema = async (id) => {
    await axios.get(`${URL_API_LOCAL}/temas/id/${id}`)
    .then(resposta => {
      // console.log('id:', id, ' ',resposta.data)
      if (resposta.data[0] !== undefined) {
        console.log(resposta.data[0])
        setCategoriaNome(resposta.data[0].nome);
        // setId(resposta.data[0].id);
        // setNome(resposta.data[0].nome);
      } else {
        //setTemplate('');
        setCategoriaNome(['']);
      }       
    })
    .catch (error => {
      console.log(error);
    })    

}   

  return (
    <section className="formulario-container">
      <form className="formulario" > 
        <h2>{numerosTotal.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL', currencyDisplay: 'name'}) } - Registros de Análises 
        _ 
                <Button variant="outline-success" 
                    onClick={() => {
                        setShow3(true)
                    }}                    
                >?</Button>        
        </h2>

        {/* <InputGroup className="mb-3"  > */}
        <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Categoria</b> </InputGroup.Text>
          {/* <Form.Control
            label='Categoria'
            placeholder='Informe a categoria / Tema / Ministério'
            onChange={evento => setCategoria(evento.target.value) }
          /> */}
          <Form.Select aria-label="Default select example" onChange={evento => setCategoria(evento.target.value)}>
            <option>Escolha a categoria</option>

            {categorias.map(item => <option value={item.id}>{item.nome}</option>)}

            {/* <option value="1">Saúde</option>
            <option value="2">Educação</option>
            <option value="3">Esporte</option> */}

          </Form.Select>



          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Região</b> </InputGroup.Text>
          {/* <Form.Control
            label='Região ou UF'
            placeholder='Informe o nome da região ou da UF'
            onChange={evento => setRegiao(evento.target.value) }
          /> */}
          <Form.Select aria-label="Default select example" onChange={evento => setRegiao(evento.target.value)}>
            <option>Escolha a região</option>
            <option value="BRASIL">BRASIL</option>
            <option value="NORTE">NORTE</option>
            <option value="Rondônia">Rondônia</option>
            <option value="Acre">Acre</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Roraima">Roraima</option>
            <option value="Pará">Pará</option>
            <option value="Amapá">Amapá</option>
            <option value="Tocantins">Tocantins</option>
            <option value="NORDESTE">NORDESTE</option>
            <option value="Maranhão">Maranhão</option>
            <option value="Piauí">Piauí</option>
            <option value="Ceará">Ceará</option>
            <option value="Rio Grande do Norte">Rio Grande do Norte</option>
            <option value="Paraíba">Paraíba</option>
            <option value="Pernambuco">Pernambuco</option>
            <option value="Alagoas">Alagoas</option>
            <option value="Sergipe">Sergipe</option>
            <option value="Bahia">Bahia</option>
            <option value="SUDESTE">SUDESTE</option>
            <option value="Minas Gerais">Minas Gerais</option>
            <option value="Espírito Santo">Espírito Santo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="São Paulo">São Paulo</option>
            <option value="SUL">SUL</option>
            <option value="Paraná">Paraná</option>
            <option value="Santa Catarina">Santa Catarina</option>
            <option value="Rio Grande do Sul">Rio Grande do Sul</option>
            <option value="CENTRO-OESTE">CENTRO-OESTE</option>
            <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
            <option value="Mato Grosso">Mato Grosso</option>
            <option value="Goiás">Goiás</option>
            <option value="Distrito Federal">Distrito Federal</option>
            <option value="Ignorada">Ignorada</option>
          </Form.Select>

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Raking</b> </InputGroup.Text>
          <Form.Control
            label='Ranking'
            placeholder='Digite o ranking da proposta'
            defaultValue={ranking}
            onChange={evento => setRanking(evento.target.value)}
          />
          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Tipo</b> </InputGroup.Text>
          {/* <Form.Control
            label='Tipo'
            placeholder='Digite o tipo'
            defaultValue={tipo}
            onChange={evento => setTipo(evento.target.value)}
          /> */}
          <Form.Select aria-label="Default select example" onChange={evento => setTipo(evento.target.value)}>
            <option>Escolha os dados pesquisados</option>
            <option value="UF_RENDA">Faixa de Renda</option>
            <option value="UF_SEXO">Sexo</option>
            <option value="UF_ESCOLARIDADE">Escolaridade</option>
            <option value="UF_IDADE">Faixa Etária</option>
            <option value="UF_RACA">Raça / Cor</option>
            <option value="UF_RANKING">Votantes em propostas</option>
            <option value="UF_DEFIC">Pessoas com deficiência</option>
          </Form.Select>

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Proposta</b> </InputGroup.Text>
          <Form.Control
            label='Proposta'
            placeholder='Digite o número da proposta'
            defaultValue={proposta}
            onChange={evento => setProposta(evento.target.value)}
          />
        {/* </InputGroup> */}

        {/* <Card style={{ width: '100%', backgroundColor: '#d5d8d7' }}>
          <Card.Body>
            <Card.Title> [ <b> {numeroSelecionado.template} </b> ]  {numeroSelecionado.assunto}</Card.Title>
            <Card.Text>
              {numeroSelecionado.texto}
              <br />
            </Card.Text>
          </Card.Body>
        </Card> */}

        <br />

        <InputGroup className="mb-3"  >
          {/* <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Propostas - Depois de ...</b> </InputGroup.Text>
          <Form.Control
            type="number"
            defaultValue={de}
            onChange={evento => setDe(evento.target.value)}
          />

          <InputGroup.Text style={{ backgroundColor: '#d5d8d7' }} ><b>Quantos ...</b> </InputGroup.Text>
          <Form.Control
            type="number"
            defaultValue={ate}
            onChange={evento => setAte(evento.target.value)}
          /> */}

          <Button variant="primary" 
            onClick={() => buscaDados(tipo, regiao, ranking, proposta, categoria)}
          >Consultar</Button>

          {/* <Button variant="outline-success" style={{ width: '40%' }}

          >   </Button> */}

          <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {nomeGrafico[tipoGrafico]}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={evento => SetTipoGrafico(0)}>Doughnut</Dropdown.Item>
                  <Dropdown.Item onClick={evento => SetTipoGrafico(1)}>Pie</Dropdown.Item>
                  <Dropdown.Item onClick={evento => SetTipoGrafico(2)}>Bar</Dropdown.Item>
                  <Dropdown.Item onClick={evento => SetTipoGrafico(3)}>Horizontal Bar</Dropdown.Item>
                  <Dropdown.Item onClick={evento => SetTipoGrafico(4)}>Line</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


          <Button variant="outline-success"  onClick={handleShow}> 
            Genero
          </Button>    

          <Button variant="outline-success"  
            onClick={handleShow1}> 
            Detalhe
          </Button>                              

          <Button variant="outline-success"  
            onClick={handleShow2}> 
            Ranking
          </Button>     

        </InputGroup>


        <Modal show={show} onHide={handleClose} className='modal-md'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >{categoriaNome}</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
            Região: {numeros[0].regiao } <br/>
             {numeros[0].tipo } 
             ________Ranking {numeros[0].ranking } 
             ________Proposta {numeros[0].proposta } <br/>                
             {numeros[0]?.tipo_detalhe}_______População {numeros[0]?.pop_perc} % _____Votantes {numeros[0]?.vot_perc} % <br/>
             {numeros[1]?.tipo_detalhe}________População {numeros[1]?.pop_perc} % _____Votantes {numeros[1]?.vot_perc} % <br/>
              {/* <h4>{numeros[0].tipo_detalhe} {numeros[0].pop_perc+ "%"} Votantes {numeros[0].vot_perc+ "%"} </h4>
              <h4>{numeros[1].tipo_detalhe} {numeros[1].pop_perc+ "%"} Votantes {numeros[1].vot_perc+ "%"} </h4> */}
              {/* {console.log('-----------numeros===',numeros)} */}
              <ChartJs 
                numeros = {numeros}
                tipo_grafico = {tipoGrafico}  
              />
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> 
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >{categoriaNome}</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              Região: {numeros[0].regiao } ( {numeros[0].tipo } )
              
              <ChartJsIdade 
                numeros = {numeros}
                tipo_grafico = {tipoGrafico}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button> 
          <Button variant="primary" onClick={handleClose1}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >{categoriaNome}</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              Região: {numeros[0].tipo } ( {numeros[0].regiao } )
              
              <ChartJsRenda 
                numeros = {numeros}
                tipo_grafico = {tipoGrafico}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button> 
          <Button variant="primary" onClick={handleClose2}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show3} onHide={handleClose3} className='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>
             <p style={{ color: "#03a9f4" }} >Ajuda</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             <Image src='/imagens/help_ppa.png' rounded />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose3}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> 



      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
              <td>id</td>
              <td>categoria</td>
              <td>proposta</td>
              <td>tipo</td>
              <td>ranking</td>
              <td>regiao</td>
              <td>tipo_detalhe</td>
              <td>pop_qtde</td>
              <td>pop_perc</td>
              <td>vot_qtde</td>
              <td>vot_perc</td>
              <td>medida</td>
              <td>created</td>            
          </tr>
        </thead>
        <tbody>

          {numeros.map((numero) => (
            <tr key={numero.id} >  
            {/* onClick={() => buscaDados(numero.template)}> */}
              <td>{numero.id}</td>
              <td>{numero.categoria}</td>
              <td>{numero.proposta}</td>
              <td>{numero.tipo}</td>
              <td>{numero.ranking}</td>
              <td>{numero.regiao}</td>
              <td>{numero.tipo_detalhe}</td>
              <td>{numero.pop_qtde}</td>
              <td>{numero.pop_perc}</td>
              <td>{numero.vot_qtde}</td>
              <td>{numero.vot_perc}</td>
              <td>{numero.medida}</td>
              <td>{numero.created}</td>
            </tr>
          ))}

        </tbody>
      </Table>

    </section>
  )
}

export default Numero