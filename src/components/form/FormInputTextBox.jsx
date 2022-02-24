const FormInputTextBox = (props) => {
    return (
            <div className={`input input--${props.format}`}>
                <label htmlFor={props.name} className={props.labelStyle}>{props.label}</label>
                <p className="input__error-message">{props.formError}</p>
                <textarea 
                name={props.name}
                className={props.inputClass} 
                id={props.id}
                placeholder={props.placeholder}
                spellCheck="false"
                value={props.data}
                {...props.formRegister(props.name)}
                ></textarea>
            </div>
    )
}

export default FormInputTextBox
