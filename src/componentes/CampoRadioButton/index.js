import './campo-radio-button.css'

const RadioButtonGroup = ({ opcaoSms = true, opcaoEmail }) => {
  return (
    <div className="campo-radio-button">
      <label>
        <input type="radio" value={opcaoSms} checked={opcaoSms === 'opcaoSms'} onChange={opcaoSms.handleChange} />
        SMS
      </label>
      <br />
      <label>
        <input type="radio" value={opcaoEmail} checked={opcaoEmail === 'opcaoEmail'} onChange={opcaoEmail.handleChange} />
        E-mail
      </label> 
      
    {/*   <input type="radio" id="sms" name="fav_language" value="SMS">
      <label for="sms">SMS</label> 
      <input type="radio" id="email" name="fav_language" value="CSS">
      <label for="email">    E-mail</label> */}

    </div>
  );
}

export default RadioButtonGroup;