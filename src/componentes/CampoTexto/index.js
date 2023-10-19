import axios from 'axios';
import './campo-texto.css'

const CampoTexto = ({ label, placeholder, valor, aoAlterado, obrigatorio = false }) => {
    return (<div className='campo-texto'>
        <label>{label}</label> 
        <input value={valor} type='text' rows={2}
         onChange={evento => {
            aoAlterado(evento.target.value) 
         }} 
         required={obrigatorio} placeholder={placeholder}/> 
    </div>)
}

export default CampoTexto