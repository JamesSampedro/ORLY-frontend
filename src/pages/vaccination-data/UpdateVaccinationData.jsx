import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {vaccinationData as schema} from "../../validations/adminValidation"
import FormInputText from "../../components/form/FormInputText"
import FormInputNumber from "../../components/form/FormInputNumber"
import { useDispatch, useSelector } from "react-redux";
import { updateVaccinationData, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import "./style.css"

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ]

const years = [2021,2022]

const UpdateVaccinationData = () => {
    const response = useSelector((state) => state.services)
    const {success} = response
    const [vaxxDate, setVaxxDate] = useState({ month: null, year: null })
    const dispatch = useDispatch()
    const history = useHistory()
    const [isClicked, setIsClicked] = useState(false)

    const {register, handleSubmit,reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        if(vaxxDate.month === null || vaxxDate.year === null || vaxxDate.year === "Year" || vaxxDate.month === "Month") return alert("Choose date")
        const token = localStorage.getItem("authToken")
        dispatch(updateVaccinationData(data,token, vaxxDate))
        setIsClicked(true)
    }

    useEffect(() => {
        if(success){
            if(isClicked){
                showToastNotification("Vaccination Data Successfully Updated!","success")
                reset({firstDose:"", secondDose:"", residents:""})
                setTimeout(() => {
                    history.push('/services/vaccination-data')
                },1000)
            }
        }else if(success === false){
            showToastNotification("Something Went Wrong!","error")
        }

        dispatch(removeServiceResponse())
    },[success])

    return(
        <div>
            <div className="add-equipment-page page">
                <div className="form__wrapper form__wrapper--purple">
                    <h1 className="form__title form__title--purple">UPDATE VACCINATION DATA</h1>
                    <div className="form__container">
                        <form className="form-style">
                            <div className="form-style__header">
                                <h3 className="form__name">Update Vaccination Data</h3>
                                <p className="form__instruction">Please provide all information  requested below.</p>
                            </div>
                            <div className="form-style__line">
                                <FormInputNumber
                                    format={"single"}
                                    name={"firstDose"}
                                    label={"First Dose"} 
                                    formError={errors.firstDose?.message}
                                    errorMessage="Provide a valid number"
                                    type={"number"}
                                    inputStyle={"basic"}
                                    placeholder={"200"}
                                    data={register.firstDose}
                                    formRegister={register}
                                />
                            </div>
                            <div className="form-style__line">
                                <FormInputNumber
                                    format={"single"}
                                    name={"secondDose"}
                                    label={"Second Dose"} 
                                    formError={errors.secondDose?.message}
                                    errorMessage="Provide a valid number"
                                    type={"number"}
                                    inputStyle={"basic"}
                                    placeholder={"100"}
                                    data={register.secondDose}
                                    formRegister={register}
                                />
                            </div>
                            <div className="form-style__line">
                                <FormInputNumber
                                    format={"single"}
                                    name={"residents"}
                                    label={"Residents"} 
                                    formError={errors.residents?.message}
                                    errorMessage="Provide a valid number"
                                    type={"number"}
                                    inputStyle={"basic"}
                                    placeholder={"3000"}
                                    data={register.residents}
                                    formRegister={register}
                                />
                            </div>

                            <select className="dateDropdown" onChange={(e) => setVaxxDate((prevState) => ({ ...prevState, month: e.target.value }))}>
                                <option>Month</option>
                                {months.map((month) => (
                                    <option>{month}</option>
                                ))}
                            </select>

                            <select className="dateDropdown" onChange={(e) => setVaxxDate((prevState) => ({ ...prevState, year: e.target.value }))}>
                                <option>Year</option>
                                
                                {years.map((year) => (
                                    <option>{year}</option>
                                ))}
                            </select>
                            <button onClick={handleSubmit(handleApply)} className="btn--next">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateVaccinationData
