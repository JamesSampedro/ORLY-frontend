import {useState,useEffect} from 'react'
import FormInputText from '../../components/form/FormInputText';
import * as yup from "yup"
import { useSelector } from 'react-redux';


const EditFieldText = (props) => {
  const response = useSelector((state) => state.users)
    const {editSuccess} = response

    const resetRegisterForm = () => {
      let newObj = {}
        newObj[props.name] = ""
        props.formReset(newObj)
        let schema = props.usedFields
        delete schema[props.name]
    }

    useEffect(() => {
      resetRegisterForm()
    },[editSuccess])

  return (
    <>
    <div className={`content__card ${props.layout} editing`}>
          <div className='profile__input--wrapper'>
          <FormInputText
            format={"edit"}
            name={props.name}
            label={props.label} 
            formError={props.formError}
            type={"password"}
            inputStyle={"edit"}
            placeholder={"password"}
            data={props.data}
            formRegister={props.formRegister}
          />
          </div> 
    </div>
    </>
  )
};


{/* <EditFieldText 
  layout={"card--double"}
  value={}
  label={}
  name={}
  formError={}
  data={}
  formRegister={}
  formUnregister={}
  formReset={}
  usedFields={}
  setUsedFields={}
/> */}

export default EditFieldText;
