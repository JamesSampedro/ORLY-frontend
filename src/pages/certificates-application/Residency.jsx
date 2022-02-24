import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {residency as schema} from "../../validations/documentApplicationValidation"
import {formatDate} from '../../functions/formatDate'
import FormInputText from './../../components/form/FormInputText';
import FormInputNumber from './../../components/form/FormInputNumber';
import { useDispatch, useSelector } from "react-redux";
import { createCertificateOfResidency, removeServiceResponse } from "../../actions/services";
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputDate from '../../components/form/FormInputDate';
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import { userProfile } from '../../api/users';



function Residency() {
    const response = useSelector((state) => state.services)
    const {success,message} = response
    const dispatch = useDispatch()
    const history = useHistory()
    const [isChecked, setIsChecked] = useState(false)
    const [form, setForm] = useState({ fullName: '', address: '' })

    const {register, handleSubmit, setValue, reset,formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        dispatch(createCertificateOfResidency({...data,date:date,price:"00.00"}
            ,token));
    }
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        userProfile(token).then(({ data: { user } })=> {
            const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`
            setForm({ fullName, address: user.address })
        })
    }, [])

    useEffect(() => {
        if(!form.fullName || !form.address) return null
        setValue('fullName', form.fullName)
        setValue('address', form.address)
    }, [form])

    useEffect(() => {
        if(success){
            showToastNotification("Your request has been sent, Regularly check your account for updates","success")
            reset({fullName:"", address:"", livingSince:""})
            setTimeout(() => {
                history.push('/application-status')
            },1000)
        }else if(success === false){
            showToastNotification(message,"error")
        }
        dispatch(removeServiceResponse())
    },[success])


    return (
         <div className="indigency-page page">
        <div className="form__wrapper form__wrapper--blue">
            <h1 className="form__title form__title--blue">CERTIFICATE OF RESIDENCY</h1>
            <div className="form__container">
            <form className="form-style">
                    <div className="form-style__header">
                        <h3 className="form__name">Certificate of Residency Form</h3>
                        <p className="form__instruction">Please provide all information for the certicate requested below.</p>
                    </div>
                    <div className="form-style__line">
                        <FormInputText
                            handleChange={(e) => {
                                setForm((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))
                            }}
                            format={"single"}
                            name={"fullName"}
                            label={"Full Name"} 
                            // formError={errors.fullName?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"ex.Juan P. Dela Cruz"}
                            data={form.fullName}
                            formRegister={register}
                        />
                    </div>
                    <div className="form-style__line">
                        <FormInputText
                            handleChange={(e) => {
                                setForm((prevState) => ({ ...prevState, [e.target.getAttribute("address")]: e.target.value }))
                            }}
                            format={"single"}
                            name={"address"}
                            label={"House Number & Street/Village"} 
                            // formError={errors.address?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"Blk13 Lot8 White Street"}
                            data={form.address}
                            formRegister={register}
                        />
                    </div>
                    <div className="form-style__line">
                        <FormInputNumber
                            format={"single"}
                            name={"livingSince"}
                            label={"Living in this barangay since"} 
                            formError={errors.livingSince?.message}
                            errorMessage="Provide a valid year"
                            type={"number"}
                            inputStyle={"basic"}
                            placeholder={"ex.1990"}
                            data={register.livingSince}
                            formRegister={register}
                        />
                    </div>
                    <p className="form__disclaimer" ><input type="checkbox" onChange={() => { setIsChecked((prevState) => !prevState) }}/>
                    &nbsp; Note: By agreeing with this application, I understand that all the information that I've entered will be used ONLY for barangay purposes. My consent effectively constitutes a waiver of any and all privacy rights pertaining to the disclosure, collection, and use of my personal information</p>
                
                    <button onClick={handleSubmit(handleApply)} { ...!isChecked && { disabled: true } } className="btn--next">
                        Submit
                    </button>
                </form>
            </div>         
        </div>
    </div>
    )
}

export default Residency
