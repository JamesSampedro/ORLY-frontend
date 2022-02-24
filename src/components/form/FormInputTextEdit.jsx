const FormInputTextEdit = (props) => {
    return (
        <div className={`input input--${props.format}`}>
            <label htmlFor={props.name} className={props.labelStyle}>{props.label}</label>
            <p className="input__error-message">{props.formError}</p>
            <input 
            type={props.type} 
            className={`input--${props.inputStyle}`} 
            name={props.name} 
            placeholder={props.placeholder} 
            value={props.data} 
            spellCheck="false"
            {...props.formRegister(props.name)}
            disabled
            />
        </div>
    )
}

export default FormInputTextEdit
