import {useEffect, useState} from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {cedula as schema} from "../../validations/documentApplicationValidation"
import {formatDate} from '../../functions/formatDate'
import { useDispatch, useSelector } from "react-redux";
import { createCedula, removeServiceResponse } from "../../actions/services";
import FormInputText from './../../components/form/FormInputText';
import FormInputNumber from './../../components/form/FormInputNumber';
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputDate from '../../components/form/FormInputDate';
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import { userProfile } from '../../api/users'

const Cedula = () => {
    
    const response = useSelector((state) => state.services)
    const [isChecked, setIsChecked] = useState(false)
    const [form, setForm] = useState({ fullName: '', address: '', birthday:'',
                                    gender: '', occupation: '', birthday: '', maritalStatus: ''})
    const {success,message} = response
    const dispatch = useDispatch()
    const history = useHistory()

    const {register, handleSubmit, setValue, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        dispatch(createCedula({...data,date:date,price:"20.00",birthday:formatDate(data.birthday)}
            ,token));
    }
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        userProfile(token).then(({ data: { user } })=> {
            const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`
            setForm({ fullName, address: user.address,  occupation:user.occupation, birthday:user.birthday, gender:user.gender,
                         maritalStatus: user.maritalStatus})
                     
        })
    }, [])

    useEffect(() => {
        if(!form.fullName || !form.address || !form.birthday) return null
        setValue('fullName', form.fullName)
        setValue('address', form.address)
        setValue('occupation', form.occupation)
        setValue('birthday', form.birthday)
        setValue('gender', form.gender)
        setValue('maritalStatus', form.maritalStatus)
    }, [form])


    useEffect(() => {
        if(success){
            showToastNotification("Your request has been sent, Regularly check your account for updates","success")
            reset({fullName:"", address:"", gender:"",birthday:"",birthplace:"",height:0,weight:0,maritalStatus:"",
            tin:"",occupation:"",citizenship:""})
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
                <h1 className="form__title form__title--blue">COMMUNITY TAX CERTIFICATE (CEDULA)</h1>
                <div className="form__container">
                    <form className="form-style">
                        <div className="form-style__header">
                            <h3 className="form__name">CEDULA Form</h3>
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
                                formRegister={register}
                                data={form.address}
                            />
                        </div>
                        <div className="form-style__line">
                            <FormInputSelect 
                                format={"double"}
                                name={"gender"}
                                label={"Gender"} 
                                inputStyle={"basic"}
                                data={form.gender}
                                formRegister={register}
                                options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]}
                            />

                            <FormInputText
                                format={"double"}
                                name={"tin"}
                                label={"Tin(if any)"} 
                                formError={errors.tin?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex. 111-111-111"}
                                data={register.tin}
                                formRegister={register}
                            />
                        </div>
                        <div className="form-style__line">
                            <FormInputDate 
                                format={"double"}
                                name={"birthday"}
                                label={"Birthday"} 
                                formError={errors.birthday?.message}
                                type={"date"}
                                inputStyle={"basic"}
                                data={form.birthday}
                                formRegister={register}
                            />
                            <FormInputText
                                format={"double"}
                                name={"birthplace"}
                                label={"Place of Birth"} 
                                formError={errors.birthplace?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"Cavite"}
                                data={register.birthplace}
                                formRegister={register}
                            />
                        </div>
                        <div className="form-style__line">
                            <FormInputNumber
                                format={"double"}
                                name={"height"}
                                label={"Height (in cm)"} 
                                formError={errors.height?.message}
                                errorMessage="Provide your height"
                                type={"number"}
                                inputStyle={"basic"}
                                placeholder={"170"}
                                data={register.height}
                                formRegister={register}
                            />

                            <FormInputNumber
                                format={"double"}
                                name={"weight"}
                                label={"Weight (in kg)"} 
                                formError={errors.weight?.message}
                                errorMessage="Provide your weight"
                                type={"number"}
                                inputStyle={"basic"}
                                placeholder={"58"}
                                data={register.weight}
                                formRegister={register}
                            />
                        </div>
                        <div className="form-style__line">
                        <FormInputText
                                format={"double"}
                                name={"occupation"}
                                label={"Profession/Occupation"} 
                                formError={errors.occupation?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex.Teacher"}
                                data={form.occupation}
                                formRegister={register}
                            />
                            <FormInputText
                                format={"double"}
                                name={"citizenship"}
                                label={"Citizenship"} 
                                formError={errors.citizenship?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex.Filipino"}
                                data={register.citizenship}
                                formRegister={register}
                            />
                        </div>
                        <div className="form-style__line">
                            <FormInputSelect 
                                format={"double"}
                                name={"maritalStatus"}
                                label={"Marital Status"} 
                                inputStyle={"basic"}
                                data={form.maritalStatus}
                                formRegister={register}
                                options={[{value:"single",label:"Single"},
                                {value:"married",label:"Married"},
                                {value:"divorced",label:"Divorced"},
                                {value:"seperated",label:"Seperated"},
                                {value:"widowed",label:"Widowed"},]}
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

export default Cedula
