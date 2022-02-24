import { useEffect, useState } from "react"

const dateFormat = (date) => {
    const newDate = date.split("-")
    const year = newDate[2]
    const month = newDate[0]
    const day = newDate[1]
    return `${year}-${month}-${day}`
} 

const FormInputDate = (props) => {
    const  [date, setDate] = useState(null)
    useEffect(() => {
        setDate(props.data)
    }, [props.data])

    return (
        <div className={`input input--${props.format}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <p className="input__error-message">{props.formError ? "Please provide valid date" : ""}</p>
            <input 
                type={props.type}
                className={`input--${props.inputStyle}`} 
                { ...props.formRegister(props.name) }
                { ...props.handleChange && { onChange: props.handleChange } }
                { ...date && { value: dateFormat(date) } }
            />
        </div>
    )
}

export default FormInputDate

