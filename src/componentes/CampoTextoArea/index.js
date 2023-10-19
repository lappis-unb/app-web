import './campo-texto-area.css'

const CampoTextoArea = ({ label, placeholder, valor, aoAlterado, obrigatorio = false, linhas = 2 }) => {
    return (<div className='campo-texto-area'>
        <label>{label}</label> 
        <textarea value={valor} rows={linhas}
         onChange={evento => {
            aoAlterado(evento.target.value) 
            //buscaDados({valor})
         }} 
         //onBlur={buscaDados({valor})}
         required={obrigatorio} placeholder={placeholder}/> 
    </div>)
}

export default CampoTextoArea