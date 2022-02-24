import {useEffect, useState} from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {indigency as schema} from "../../validations/documentApplicationValidation"
import FormInputText from './../../components/form/FormInputText';
import { showToastNotification } from '../../functions'
import {useDispatch, useSelector} from 'react-redux'
import { createCertificateOfIndigency,removeServiceResponse } from "../../actions/services";
import { useHistory } from 'react-router-dom';
import { userProfile } from '../../api/users';
import { formatRFC3339 } from 'date-fns/esm';

const Indigency = () => {
    const response = useSelector((state) => state.services)
    const [isChecked, setIsChecked] = useState(false)
    const [form, setForm] = useState({ fullName: '', address: '' })
    const {success,message} = response
    const dispatch = useDispatch()
    const history = useHistory()

    const {register, handleSubmit,setValue, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        dispatch(createCertificateOfIndigency({...data,date:date,price:"00.00"}
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
            reset({fullName:"", address:"", issuedFor:""})
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
            <h1 className="form__title form__title--blue">CERTIFICATE OF INDIGENCY</h1>
            <div className="form__container">
                <form className="form-style">
                    <div className="form-style__header">
                        <h3 className="form__name">Certificate of Indigency Form</h3>
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
                            data={form.fullName}
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
                            data={form.address}
                            formRegister={register}
                        />
                    </div>
                    <div className="form-style__line">
                        <FormInputText
                            format={"single"}
                            name={"issuedFor"}
                            label={"Certificate being issued for:"} 
                            formError={errors.issuedFor?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"ex. Scholarship, Loan"}
                            data={register.issuedFor}// ayan si user na bahala mag populate 
                            formRegister={register}
                        />
                    </div>
                    <p className="form__disclaimer"><input type="checkbox" onChange={() => { setIsChecked((prevState) => !prevState) }}/>
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

export default Indigency
