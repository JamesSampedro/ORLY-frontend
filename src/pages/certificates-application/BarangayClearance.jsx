import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {barangayClearance as schema} from "../../validations/documentApplicationValidation"
import {formatDate} from '../../functions/formatDate'
import FormInputText from './../../components/form/FormInputText';
import FormInputNumber from './../../components/form/FormInputNumber';
import { useDispatch, useSelector } from "react-redux";
import { createBarangayClearance, removeServiceResponse } from "../../actions/services";
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputDate from '../../components/form/FormInputDate';
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import { userProfile } from '../../api/users';



function BarangayClearance() {
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
        dispatch(createBarangayClearance({...data,date:date,price:"30.00"}
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
        <div className="clearance-page page">
        <div className="form__wrapper form__wrapper--blue">
            <h1 className="form__title form__title--blue">BARANGAY CLEARANCE</h1>
            <div className="form__container">
                <form className="form-style">
                    <div className="form-style__header">
                        <h3 className="form__name">Barangay Clearance Form</h3>
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
                        <FormInputSelect 
                            format={"single"}
                            name={"issuedFor"}
                            label={"Clearance is being issued for:"} 
                            inputStyle={"basic"}
                            data={register.issuedFor}
                            formRegister={register}
                            options={[{value:"Local Employment",label:"Local Employment"},
                            {value:"Securing Police Clearance",label:"Securing Police Clearance"},
                            {value:"Employment for Abroad",label:"Employment for Abroad"},
                            {value:"Securing NBI Clearance",label:"Securing NBI Clearance"},
                            {value:"Loan Purposes",label:"Loan Purposes"},
                            {value:"Application for Postal I",label:"Application for Postal ID"},
                            {value:"Application for Driver's License",label:"Application for Driver's License"},
                            {value:"Franchise of Vehicle / Sticker",label:"Franchise of Vehicle / Sticker"},]}
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

export default BarangayClearance
