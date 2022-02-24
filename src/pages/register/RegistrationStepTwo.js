import {useState} from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {register2Schema as schema} from "../../validations/authValidation"
import FormInputText from './../../components/form/FormInputText';
import FormInputNumber from './../../components/form/FormInputNumber';
import FormInputSelect from './../../components/form/FormInputSelect';

const RegistrationStepTwo = (props) => {
    
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const {profile, setProfile, setProgress} = props

    const [fileUploadError, setFileUploadError] = useState("");
    
    const handleNext = (data) => {
        if(data.validId?.length === 0){
            setFileUploadError("Please upload your valid ID")
        }else{
            setFileUploadError("")
            setProfile({
                ...profile,
                occupation: data.occupation,
                category: data.category,
                householdNumber: data.householdNumber,
                monthsResided: data.monthsResided,
                validId: data.validId?.[0],
            })
            
        }

        setProgress(3)
    }

    const handlePrev = event => {
        event.preventDefault()
        setProfile({
            ...profile,
            firstName: "",
            middleName: "",
            lastName: "",
            address: "",
            birthday: "",
            age: 0,
            phoneNumber:"",
            gender:"",
            maritalStatus:"",
        })
        setProgress(1)
        
    }

    return (
            <form className="form-style">
                <p className="registration__form--title">For Verification</p>
                
                <div className="form-style__line">
                    <FormInputText
                        format={"double"}
                        name={"occupation"}
                        label={"Occupation"} 
                        formError={errors.occupation?.message}
                        type={"text"}
                        inputStyle={"basic"}
                        placeholder={"ex.Teacher"}
                        data={register.occupation}
                        formRegister={register}
                    />

                    <FormInputSelect 
                        format={"double"}
                        name={"category"}
                        label={"Resident's Category"} 
                        inputStyle={"basic"}
                        data={register.category}
                        formRegister={register}
                        options={[{value:"pwd",label:"PWD"},
                        {value:"resident",label:"Resident"},
                        {value:"senior",label:"Senior Citizen"},]}
                    />
                </div>

                <div className="form-style__line">
                    <FormInputNumber
                        format={"double"}
                        name={"householdNumber"}
                        label={"No. of Households"} 
                        formError={errors.householdNumber?.message}
                        errorMessage="Provide valid number"
                        type={"number"}
                        inputStyle={"basic"}
                        placeholder={"ex.6"}
                        data={register.householdNumber}
                        formRegister={register}
                    />

                    <FormInputNumber
                        format={"double"}
                        name={"monthsResided"}
                        label={"No. of Months Resided"} 
                        formError={errors.monthsResided?.message}
                        errorMessage="Provide valid number"
                        type={"number"}
                        inputStyle={"basic"}
                        placeholder={"ex.14"}
                        data={register.monthsResided}
                        formRegister={register}
                    />
                </div>
                <div className="form-style__line">
                    <div className="input input--single">
                        <label htmlFor="validId">Valid ID</label>
                        <p className="input__error-message">{fileUploadError}</p>
                        <input type="file" 
                        accept={["image/png","image/jpeg","image/jpg"]} 
                        className='input--basic'
                        {...register("validId")}
                        />
                    </div>
                </div>


                <div className='registration__form--requirements'>
                    <h3 className='title'>ID Requirements</h3>
                    <ul className='requirements'>
                        <li>Your ID must include your picture, signature (if applicable), name, date of birth, and address.</li>
                        <li>Your ID must be a valid ID or preferably a barangay ID.</li>
                        <li>Do not edit the image in any way.</li>
                        <li>When you take the photo of your ID, make sure the photo is clear and close enough to read without cropping or editing.</li>
                    </ul>
                </div>
                <div className='registration__form--change-step'>
                    <button onClick={handlePrev} className="btn--prev">
                        Prev <span>{'<'}</span>
                    </button>
                    <button onClick={handleSubmit(handleNext)} className="btn--next">
                        Next <span>{'>'}</span>
                    </button>
                </div>
                
             </form>
    )
}

export default RegistrationStepTwo
