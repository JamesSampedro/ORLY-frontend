import {useState,useEffect} from 'react';
import * as yup from "yup"
import { useSelector } from 'react-redux';

import FormInputNumber from './../../components/form/FormInputNumber';

const EditFieldNumber = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState("")

    const response = useSelector((state) => state.users)
    const {success,editSuccess} = response

    const resetRegisterForm = () => {
      let newObj = {}
        newObj[props.name] = ""
        props.formReset(newObj)
        let schema = props.usedFields
        delete schema[props.name]
        props.setUsedFields(schema)
    }

    useEffect(() => {
      setIsEditing(false)
      resetRegisterForm()
    },[editSuccess])

    useEffect(() => {
        if(props.type === "phone"){
            setValue(`0${props.value}`)
        }else{
            setValue(props.value)
        }
    },[props.value])
    
    return (
      <>
      <div className={`content__card ${props.layout} editing`}>
          {isEditing ? 
            <div className='profile__input--wrapper'>

            <FormInputNumber
                format={"double"}
                name={props.name}
                label={props.label} 
                formError={props.formError}
                errorMessage={`Provide your ${props.label}`}
                type={"number"}
                inputStyle={"basic"}
                placeholder={value}
                data={props.data}
                formRegister={props.formRegister}
            />

            <button className='btn--red txt--white'
            style={{borderRadius:"10px"}}
            onClick={(e) => {
              e.preventDefault()
              
              resetRegisterForm()
              setIsEditing(false)
            }}>X</button>
            </div> 
          :
            <>
            <p>{`${props.label}: ${value}`}</p>
            <button className='btn--blue txt--white'
            onClick={(e) => {
              e.preventDefault()
              setIsEditing(true)
              
              if(props?.type === "phone"){
                  props.setUsedFields({...props.usedFields,[props.name]:yup.string().phone('PH',true,"Provide a valid number").required()})
                }
              else if(props?.type === "age"){
                props.setUsedFields({...props.usedFields,[props.name]:yup.number().positive().min(1).max(130).integer().required("Please provide your age")})
              }else{
                props.setUsedFields({...props.usedFields,[props.name]:yup.number().positive().integer().required("Please provide a valid number")})
              }
            }}>Edit</button>
            </>
          }
      </div>
      </>
    )
};

export default EditFieldNumber;
