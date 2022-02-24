import {useEffect,useState} from 'react'
import Id from '../../img/idApplicationSvg.png'
import FormInputText from './../../components/form/FormInputText';
import FormInputNumber from './../../components/form/FormInputNumber';
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputDate from '../../components/form/FormInputDate';
import { formatDate } from '../../functions/formatDate';
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {IdApplication as schema} from "../../validations/documentApplicationValidation"
import { useDispatch, useSelector } from "react-redux";
import { createIdApplication, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import { userProfile } from '../../api/users';
import { date } from 'yup/lib/locale';

const dateFormat = (date) => {
    const newDate = date.split("-")
    const year = newDate[2]
    const month = newDate[0]
    const day = newDate[1]
    return `${year}-${month}-${day}`
} 


const IdApplication = () => {
    const response = useSelector((state) => state.services)
    const {success,message} = response
    const [isChecked, setIsChecked] = useState(false)
    const [form, setForm] = useState({ firstName: '', lastName:'', middleName: '', address: '', birthday:'',
                                    gender: '', category: '', phoneNumber: '' })
    const dispatch = useDispatch()
    const history = useHistory()
    
    const {register, handleSubmit, setValue, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const [pictureUploadError, setPictureUploadError] = useState("");
    const [signatureUploadError, setSignatureUploadError] = useState("");

    const handleApply = (data) => {
        if(data?.picture.length === 0){
            setPictureUploadError("Please upload your 2x2 picture")
        }else{
            setPictureUploadError("")
        }
        if(data?.signature.length === 0){
            setSignatureUploadError("Please upload your digital signature")
        }else{
            setSignatureUploadError("")
        }

        if(data?.picture.length !== 0 && data?.signature.length !== 0){
            const token = localStorage.getItem("authToken")
            var today = new Date();
            var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
            const formData = new FormData()
            formData.append('lastName',data.lastName)
            formData.append('firstName',data.firstName)
            formData.append('middleName',data.middleName)
            formData.append('designation',data.designation)
            formData.append('address',data.address)
            formData.append('gender',data.gender)
            formData.append('birthday',formatDate(data.birthday))
            formData.append('sss',data.sss)
            formData.append('tin',data.tin)
            formData.append('contactNumber',data.contactNumber)
            formData.append("emergencyContact",data.emergencyContact)
            formData.append('date',date)
            formData.append('price',"100.00")
            formData.append('picture',data.picture?.[0])
            formData.append('signature',data.signature?.[0])
            dispatch(createIdApplication(formData,token));
        }
        
    }
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        userProfile(token).then(({ data: { user } })=> {
            setForm({ firstName:user.firstName, lastName:user.lastName, middleName:user.middleName, address: user.address, 
                      category:user.category, birthday:user.birthday, gender:user.gender})
        })
    }, [])

    useEffect(() => {
        if(!form.fullName || !form.address) return null
        setValue('firstName', form.firstName)
        setValue('lastName', form.lastName)
        setValue('middleName', form.middleName)
        setValue('address', form.address)
        setValue('birthday', form.birthday)
        setValue('category', form.category)
        setValue('gender', form.gender)
    }, [form])
    useEffect(() => {
        if(success){
            showToastNotification("Your request has been sent, Regularly check your account for updates","success")
            reset({lastName:"",firstName: "",middleName:"",designation:"", address:"", gender:"", birthday:"", sss:"", tin:"",
            contactNumber:"",emergencyContact:"",picture:"",signature:""})
            setTimeout(() => {
                history.push('/application-status')
            },1000)
        }else if(success === false){
            showToastNotification(message,"error")
        }
        dispatch(removeServiceResponse())
    },[success])
    
    return (
        <>
            <div className="page-header">ID Application</div>
            <div className="id-application-page page">
                <div className="id-application-page__instructions">
                    <img src={Id} alt="" className="id-application-page__instructions--svg"/>
                    <div className="id-application-page__instructions--content">
                        <h3>Instructions</h3>
                        <p> <span className="step">Step 1: </span>Fill out all the fields provided correctly.</p>
                        <p> <span className="step">Step 2: </span>Upload a 2x2 sized picture for the photo of your ID.</p>
                        <p> <span className="step">Step 3: </span>Attach a clear photo of your signature.</p>
                        <p> <span className="step">Step 4: </span>Upload the proof of payment.</p>
                        <p> <span className="step">Step 5: </span>Verify all the data inputted.</p>
                        <p> <span className="step">Step 6: </span>Click submit to apply your ID.</p>
                        <p> <span className="step">Step 7: </span>Wait for the notice of the Admin. The status of your application can be viewed in Services under the category of Status of Applications.</p>
                    </div>
                </div>

                <div className="form__wrapper form__wrapper--blue">
                <h1 className="form__title form__title--blue">ID Application</h1>
                <div className="form__container">
                    <form className="form-style">
                    <div className="form-style__header">
                            <h3 className="form__name">ID Form</h3>
                            <p className="form__instruction">Please provide all information for the certicate requested below.</p>
                        </div>

                        <div className="form-style__line">
                            <FormInputText
                                format={"double"}
                                name={"lastName"}
                                label={"Last Name"} 
                                formError={errors.lastName?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex.Dela Cruz"}
                                data={form.lastName}
                                formRegister={register}
                            />

                            <FormInputText
                                format={"double"}
                                name={"firstName"}
                                label={"First Name"} 
                                formError={errors.firstName?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex.Juan"}
                                data={form.firstName}
                                formRegister={register}
                            />
                        </div>

                        <div className="form-style__line">
                            <FormInputText
                                format={"double"}
                                name={"middleName"}
                                label={"Middle Name"} 
                                formError={errors.middleName?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex.Pacheco"}
                                data={form.middleName}
                                formRegister={register}
                            />

                            <FormInputSelect 
                                format={"double"}
                                name={"designation"}
                                label={"Designation"} 
                                inputStyle={"basic"}
                                data={form.category}
                                formRegister={register}
                                options={[{value:"Resident",label:"Resident"},
                                {value:"Barangay Personnel",label:"Barangay Personnel"},
                                {value:"Barangay Chairman",label:"Barangay Chairman"},
                                {value:"Barangay Councilor",label:"Barangay Councilor"},
                                {value:"SK Chairman",label:"SK Chairman"},
                                {value:"SK Councilor",label:"SK Councilor"}
                            ]}
                            />
                        </div>

                        <div className="form-style__line">
                            <FormInputText
                                format={"single"}
                                name={"address"}
                                label={"Address"} 
                                formError={errors.address?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex.Blk13 Lot8 White Street"}
                                data={form.address}
                                formRegister={register}
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

                            <FormInputDate 
                                format={"double"}
                                name={"birthday"}
                                label={"Birthday"} 
                                formError={errors.birthday?.message}
                                data={form.birthday}
                                type={"date"}
                                inputStyle={"basic"}
                                formRegister={register}
                            />
                        </div>

                        <div className="form-style__line">
                            <FormInputText
                                format={"double"}
                                name={"sss"}
                                label={"SSS/GSIS(if any)"} 
                                formError={errors.sss?.message}
                                type={"text"}
                                inputStyle={"basic"}
                                placeholder={"ex. 1111-1111-1111"}
                                data={register.sss}
                                formRegister={register}
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
                            <FormInputNumber
                                format={"double"}
                                name={"contactNumber"}
                                label={"Contact Number"} 
                                formError={errors.contactNumber?.message}
                                errorMessage="Provide a valid number"
                                type={"number"}
                                inputStyle={"basic"}
                                placeholder={"ex.09123456789"}
                                data={register.contactNumber}
                                formRegister={register}
                            />

                            <FormInputNumber
                                format={"double"}
                                name={"emergencyContact"}
                                label={"Emergency Contact Number"} 
                                formError={errors.emergencyContact?.message}
                                errorMessage="Provide a valid number"
                                type={"number"}
                                inputStyle={"basic"}
                                placeholder={"ex.09123456789"}
                                data={register.emergencyContact}
                                formRegister={register}
                            />
                        </div>

                        <div className="form-style__line">
                            <div className="input input--single">
                                <label htmlFor="picture">Please Upload Clear Recent 2x2 Picture</label>
                                <p className="input__error-message">{pictureUploadError}</p>
                                <input type="file" 
                                accept={["image/png","image/jpeg","image/jpg"]} 
                                className='input--basic'
                                {...register("picture")}
                                />
                            </div>

                            <div className="input input--single">
                                <label htmlFor="signature">Please Upload Clear Digital Signature</label>
                                <p className="input__error-message">{signatureUploadError}</p>
                                <input type="file" 
                                accept={["image/png","image/jpeg","image/jpg"]} 
                                className='input--basic'
                                {...register("signature")}
                                />
                            </div>
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
        </>
    )
}

export default IdApplication
