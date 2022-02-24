import {useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {clear,showToastNotification} from '../../functions'
import {register as registerAction, removeUserResponse} from '../../actions/users'
import {useHistory} from 'react-router-dom'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {register3Schema as schema} from "../../validations/authValidation"
import FormInputText from './../../components/form/FormInputText';

const RegistrationStepThree = (props) => {

    const response = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false)
    const {success} = response

    let history = useHistory()

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if(success){
            clear(props.setProfile,{})
            history.push('/registration-request-sent')
        }

        dispatch(removeUserResponse())
    },[success,props.setProfile])

    const handleSignup = async (data) => {
        const { firstName, 
                middleName, 
                lastName, 
                address, 
                birthday, 
                age,
                phoneNumber,
                maritalStatus,
                gender,
                occupation,
                category,
                householdNumber,
                monthsResided,
                validId,
            } = props.profile

            const{username, email, password} = data

        const formData = new FormData();
        formData.append('firstName',firstName)
        formData.append('middleName', middleName)
        formData.append('lastName', lastName)
        formData.append('address', address)
        formData.append('birthday',birthday)
        formData.append('age',age)
        formData.append('phoneNumber',phoneNumber)
        formData.append('gender',gender)
        formData.append('occupation',occupation)
        formData.append('maritalStatus',maritalStatus)
        formData.append('category',category)
        formData.append('householdNumber', householdNumber)
        formData.append('monthsResided',monthsResided)
        formData.append('validId',validId)
        formData.append('username',username)
        formData.append('password',password)
        formData.append('email',email) 
            
        dispatch(registerAction(formData))
    }

    const handlePrev = event => {
        event.preventDefault()

        props.setProgress(2)
        
    }

    return (
        <form className="form-style">
            <p className="registration__form--title">Basic Information</p>
            
            <div className="form-style__line">
                <FormInputText
                    format={"single"}
                    name={"username"}
                    label={"Username"} 
                    formError={errors.username?.message}
                    type={"text"}
                    inputStyle={"basic"}
                    placeholder={"ex.John123"}
                    data={register.username}
                    formRegister={register}
                />
            </div>

            <div className="form-style__line">
                <FormInputText
                    format={"single"}
                    name={"email"}
                    label={"Email"} 
                    formError={errors.email?.message}
                    type={"email"}
                    inputStyle={"basic"}
                    placeholder={"ex.johndoe@email.com"}
                    data={register.email}
                    formRegister={register}
                />
            </div>

            <div className="form-style__line">
                <FormInputText
                    format={"single"}
                    name={"password"}
                    label={"Password"} 
                    formError={errors.password?.message}
                    type={"password"}
                    inputStyle={"basic"}
                    placeholder={"password"}
                    data={register.password}
                    formRegister={register}
                />
            </div>

            <div className="form-style__line">
                <FormInputText
                    format={"single"}
                    name={"confirmPassword"}
                    label={"Confirm Password"} 
                    formError={errors.confirmPassword?.message}
                    type={"password"}
                    inputStyle={"basic"}
                    placeholder={"Confirm Password"}
                    data={register.confirmPassword}
                    formRegister={register}
                />
            </div>
            <p className="form__disclaimer" ><input type="checkbox" onChange={() => { setIsChecked((prevState) => !prevState) }}/>
                    &nbsp; Note: By agreeing with this application, I understand that all the information that I've entered will be used ONLY for barangay purposes. My consent effectively constitutes a waiver of any and all privacy rights pertaining to the disclosure, collection, and use of my personal information</p>
            <button onClick={handlePrev} className="btn--prev">
                Prev <span>{'<'}</span>
            </button>
             <button onClick={handleSubmit(handleSignup)}{ ...!isChecked && { disabled: true } } className="btn--next">
                    Submit
            </button>

           
                
                    
            
        </form>
    )
}

export default RegistrationStepThree
