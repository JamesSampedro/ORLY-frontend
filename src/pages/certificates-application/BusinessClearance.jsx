import {useEffect, useState} from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {businessClearance as schema} from "../../validations/documentApplicationValidation"
import {formatDate} from '../../functions/formatDate'
import FormInputText from './../../components/form/FormInputText';
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputDate from '../../components/form/FormInputDate';
import { useDispatch, useSelector } from "react-redux";
import { createBusinessClearance, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import { userProfile } from '../../api/users'


const BusinessClearance = () => {
    const response = useSelector((state) => state.services)
    const {success,message} = response
    const dispatch = useDispatch()
    const history = useHistory()
    const [isChecked, setIsChecked] = useState(false)
    const [form, setForm] = useState({ fullName: '', address: '' })
    
    const {register, handleSubmit, setValue, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        dispatch(createBusinessClearance({...data,date:date,price:"300.00"}
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
        // if(!form.fullName || !form.address) return null
        setValue('fullName', form.fullName)
        setValue('address', form.address)
    }, [form])

    useEffect(() => {
        if(success){
            showToastNotification("Your request has been sent, Regularly check your account for updates","success")
            reset({fullName:"", address:"", businessType:""})
            setTimeout(() => {
                history.push('/application-status')
            },1000)
        }else if(success === false){
            showToastNotification(message,"error")
        }
        dispatch(removeServiceResponse())
    },[success])

    return (
        <div className="business-clearance-page page">
            <div className="form__wrapper form__wrapper--blue">
                <h1 className="form__title form__title--blue">BARANGAY BUSINESS CLEARANCE</h1>
                <div className="form__container">
                    <form className="form-style">
                        <div className="form-style__header">
                            <h3 className="form__name">Business Clearance Form</h3>
                            <p className="form__instruction">Please provide all information for the certicate requested below.</p>
                        </div>
                        <div className="form-style__line">
                            <FormInputText
                                format={"single"}
                                name={"fullName"}
                                label={"Full Name"} 
                                formError={errors.fullName?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex.Juan P. Dela Cruz"}
                                data={register.fullName}
                                formRegister={register}
                            />
                        </div>
                        <div className="form-style__line">
                            <FormInputText
                                format={"single"}
                                name={"address"}
                                label={"House Number & Street/Village"} 
                                formError={errors.address?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"Blk13 Lot8 White Street"}
                                data={register.address}
                                formRegister={register}
                            />
                        </div>
                        <div className="form-style__line">
                            <FormInputText
                                format={"single"}
                                name={"businessType"}
                                label={"Type of Business"} 
                                formError={errors.businessType?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex. Sari-Sari Store, Apartment, Eatery, etc."}
                                data={register.businessType}
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

export default BusinessClearance
