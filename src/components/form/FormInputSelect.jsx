const FormInputSelect = (props) => {
    return (
        <div className={`input input--${props.format}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <p className="input__error-message">{props.formError}</p>
            <select 
            className={`input--${props.inputStyle}`}
            name={props.name}
            value={props.data}
            {...props.formRegister(props.name)}
            { ...props.handleChange && { onChange: props.handleChange } }
            >
                {props.options.map((o,i) => {
                    return <option key={i} value={o.value}>{o.label}</option>
                })}
            </select>
        </div>
    )
}

export default FormInputSelect
