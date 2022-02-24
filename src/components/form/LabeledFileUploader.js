import { InputHandler } from "../../helpers/HandlerHelper"
const LabeledFileUploader = ({label,name,type,formName,placeholder,state,setState,property,formStyle,value,multiple,accept=[]}) => {
    let filetypes = ""
    if(accept.length !== 0){
        filetypes = accept.join(", ")
    }
    return (
        <div className={`labeled-field ${formStyle}`} id={name}>
            <label htmlFor={`${name}--id`}>{label}</label>
            <input 
            id={`${name}--id`} 
            type={type} 
            className={`${formName}`}
            placeholder={placeholder} 
            files={value}
            multiple={multiple}
            accept={filetypes}
            onChange={(e) => {
                return InputHandler(state,setState,property,e.target.files[0])
            }}/>
        </div>

        
    )
}

export default LabeledFileUploader
