import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {register1Schema as schema} from "../../validations/authValidation"
import {formatDate} from '../../functions/formatDate'
import FormInputText from './../../components/form/FormInputText';
import FormInputNumber from './../../components/form/FormInputNumber';
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputDate from '../../components/form/FormInputDate';
import { useEffect } from "react";

const RegistrationStepOne = (props) => {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const {profile, setProfile, setProgress} = props;

    useEffect(() => {
        if(!profile.birthday) return null
        const ageInMilliseconds = new Date() - new Date(formatDate(profile.birthday))
        const currentAge = Math.floor(ageInMilliseconds/1000/60/60/24/365)
        setProfile((prevState) => ({ ...prevState, age: currentAge }))
        setValue("age", currentAge)
    }, [profile.birthday])

    const handleNext = (data) => {
        setProfile((prevState) => ({
            ...prevState,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            maritalStatus: data.maritalStatus,
        }))

        setProgress(2)
    }

    return (
        <form className="form-style" >
            <p className="registration__form--title form--title">Basic Information</p>
            
            <div className="form-style__line">
                <FormInputText
                    format={"double"}
                    name={"firstName"}
                    label={"First Name"} 
                    formError={errors.firstName?.message}
                    type={"text"}
                    inputStyle={"no-margin"}
                    placeholder={"ex.John"}
                    data={register.firstName}
                    formRegister={register}
                />

                <FormInputText
                    format={"double"}
                    name={"lastName"}
                    label={"Last Name"} 
                    formError={errors.lastName?.message}
                    type={"text"}
                    inputStyle={"basic"}
                    placeholder={"ex.Doe"}
                    data={register.lastName}
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
                    placeholder={"ex.Dela Cruz"}
                    data={register.middleName}
                    formRegister={register}
                />

                <FormInputSelect 
                    format={"double"}
                    name={"gender"}
                    label={"Gender"} 
                    inputStyle={"basic"}
                    data={register.gender}
                    formRegister={register}
                    options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]}
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
                    placeholder={"ex.Blk 1 Lt 1, White Street"}
                    data={register.address}
                    formRegister={register}
                />
            </div>

            <div className="form-style__line">
                <FormInputDate 
                    handleChange={(e) => {
                        setProfile((prevState) => ({ ...prevState, birthday: formatDate(e.target.value) }))
                    }}
                    format={"double"}
                    name={"birthday"}
                    label={"Date of Birth"} 
                    formError={errors.birthday?.message}
                    type={"date"}
                    inputStyle={"basic"}
                    formRegister={register}
                />

                <FormInputNumber
                    format={"double"}
                    name={"age"}
                    label={"Age"} 
                   formError={errors.age?.message}
                    errorMessage="Provide your real age"
                    type={"number"}
                    inputStyle={"basic"}
                    placeholder={"ex.24"}
                    data={profile.age === 0 ? "Age" : profile.age}
                    formRegister={register}
                    disabled
                />
            </div>

            <div className="form-style__line">
                <FormInputSelect 
                    format={"double"}
                    name={"maritalStatus"}
                    label={"Marital Status"} 
                    inputStyle={"basic"}
                    data={register.maritalStatus}
                    formRegister={register}
                    options={[{value:"single",label:"Single"},
                    {value:"married",label:"Married"},
                    {value:"divorced",label:"Divorced"},
                    {value:"seperated",label:"Seperated"},
                    {value:"widowed",label:"Widowed"},]}
                />


                <FormInputNumber
                    format={"double"}
                    name={"phoneNumber"}
                    label={"Phone Number"} 
                    formError={errors.phoneNumber?.message}
                    errorMessage="Provide a valid number"
                    type={"number"}
                    inputStyle={"basic"}
                    placeholder={"ex.09123456789"}
                    data={register.number}
                    formRegister={register}
                />
            </div>

            <button onClick={handleSubmit(handleNext)} className="btn--next">
                Next <span>{'>'}</span>
            </button>
            
        </form>
    )
}

export default RegistrationStepOne
