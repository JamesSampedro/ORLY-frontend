import {useState,useEffect} from 'react'
import FormInputSelect from '../../components/form/FormInputSelect';
import * as yup from "yup"
import { useSelector } from 'react-redux';



const EditFieldSelect = (props) => {
    const [isEditing, setIsEditing] = useState(false)

    const response = useSelector((state) => state.users)
    const {editSuccess} = response

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

  return (
    <>
    <div className={`content__card ${props.layout} editing`}>
        {isEditing ? 
          <div className='profile__input--wrapper'>
          
            <FormInputSelect 
                format={"edit"}
                name={props.name}
                label={props.label} 
                inputStyle={"edit select"}
                data={props.data}
                formRegister={props.formRegister}
                formError = {props.formError}
                options={props.options}
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
          <p>{`${props.label}: ${props.value}`}</p>
          <button className='btn--blue txt--white'
          onClick={(e) => {
            e.preventDefault()
            setIsEditing(true)
            props.setUsedFields({...props.usedFields,[props.name]:yup.string().required(`Please provide ${props.label}`)})
          }}>Edit</button>
          </>
        }


    </div>
    </>
  )
};

export default EditFieldSelect;
