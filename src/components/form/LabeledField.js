import { InputHandler } from "../../helpers/HandlerHelper"

const LabeledField = ({label,name,type,formName,placeholder,state,setState,property,formStyle,value,maxLength,useFormRegister}) => {
    
    return (
        <div className={`labeled-field ${formStyle}`}>
            <label htmlFor={`${name}--id`}>{label}</label>
            <input 
            name={name}
            id={`${name}--id`}
            type={type} 
            className={`${formName}`} 
            placeholder={placeholder} 
            value={value}
            maxLength={maxLength}
            onChange={(e) => {
                return InputHandler(state,setState,property,e.target.value)
            }}
            />
        </div>
    )
}


export default LabeledField

