import {useEffect} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {Residents as schema} from "../../validations/adminValidation"
import FormInputText from "../../components/form/FormInputText"
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputNumber from '../../components/form/FormInputNumber'
import { useDispatch, useSelector } from "react-redux";
import { addSupply, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from "react-router-dom";


const Residents = () => {
    const response = useSelector((state) => state.services)
    const dispatch = useDispatch()
    const history = useHistory();
    
    const {register, handleSubmit,reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        const url = process.env.REACT_APP_BACKEND_URL
        console.log(data)

        //dispatch(Residents(data,token))
        axios.post(`${url}/services/api/create-resident`,
            data,
            {headers:{"Authorization":token}}
          )
          .then(function (response) {
            if(response.status === 201){
                showToastNotification("Resident Successfully Added!","success")
                history.push('/residents')
            }
          })
          .catch(function (error) {
                if(error.response.status === 400){
                    showToastNotification("Resident already exists. Please try another.","error")
                }else{
                    showToastNotification("Something Went Wrong!","error")
                }
          });
    }



   
    return(
        <>
            <div className="add-equipment-page page">
                <div className="form__wrapper form__wrapper--purple">
                    <h1 className="form__title form__title--purple">RESIDENTS</h1>
                    <div className="form__container">
                        <form className="form-style">
                            <div className="form-style__header">
                                <h3 className="form__name">Add Residents Form</h3>
                                <p className="form__instruction">Please provide all information requested below.</p>
                            </div>
                            <div className="form-style__line">
                                <FormInputText
                                    format={"double"}
                                    name={"firstName"}
                                    label={"First Name"} 
                                    formError={errors.firstName?.message}
                                    type={"text"}
                                    inputStyle={"basic"}
                                    placeholder={"Juan"}
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
                                    placeholder={"Dela Cruz"}
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
                                    placeholder={"Pacheco"}
                                    data={register.middleName}
                                    formRegister={register}
                                />
                                <FormInputNumber
                                    format={"double"}
                                    name={"age"}
                                    label={"Age"} 
                                    formError={errors.age?.message}
                                    errorMessage="Please provide resident's age"
                                    type={"number"}
                                    inputStyle={"basic"}
                                    placeholder={"22"}
                                    data={register.age}
                                    formRegister={register}
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
                                    placeholder={"Blk 6, Lot 34A, White St."}
                                    data={register.address}
                                    formRegister={register}
                                />
                            </div>

                            <div className="form-style__line">
                                <FormInputSelect 
                                    format={"double"}
                                    name={"category"}
                                    label={"Category"} 
                                    inputStyle={"basic"}
                                    data={register.category}
                                    formRegister={register}
                                    options={[
                                        {value:"resident",label:"Resident"},
                                        {value:"infant", label:"Infant"},
                                        {value:"pregnant",label:"Pregnant"},
                                        {value:"pwd",label:"PWD"},
                                        {value:"senior",label:"Senior Citizen"},
                                        {value:"unemployed",label:"Unemployed"},
                                        {value:"student",label:"Student"},
                                        {value:"council",label:"Barangay Council Member"}]}    
                                        
                                />
                            <FormInputNumber
                                    format={"double"}
                                    name={"monthsResided"}
                                    label={"Number of Months Resided"} 
                                    formError={errors.monthsResided?.message}
                                    errorMessage="Please provide a valid number"
                                    type={"number"}
                                    inputStyle={"basic"}
                                    placeholder={"4"}
                                    data={register.monthsResided}
                                    formRegister={register}
                                />
                            </div>
                            <div className="form-style__line">
                                <FormInputSelect 
                                    format={"double"}
                                    name={"incomeRange"}
                                    label={"Monthly Income Range"} 
                                    inputStyle={"basic"}
                                    data={register.incomeRange}
                                    formRegister={register}
                                    options={[
                                        {value:"none", label:"None"},
                                        {value:"Php 8,000.00 to Php 10,000.00", label:"Php 8,000.00 to Php 10,000.00"},
                                        {value:"Php 11,000.00 to Php 15,000.00",label:"Php 11,000.00 to Php 15,000.00"},
                                        {value:"Php 16,000.00 to Php 20,000.00",label:"Php 16,000.00 to Php 20,000.00"},
                                        {value:"Php 21,000.00 and above",label:"Php 21,000.00 and above"}]}    
                                        
                                />
                            <FormInputNumber
                                    format={"double"}
                                    name={"mobile"}
                                    label={"Contact Number"} 
                                    formError={errors.mobile?.message}
                                    errorMessage="Please provide a contact number"
                                    type={"number"}
                                    inputStyle={"basic"}
                                    placeholder={"09061234567"}
                                    data={register.mobile}
                                    formRegister={register}
                                />
                            </div>
                            <div className="form-style__line">
                            <FormInputNumber
                                    format={"single"}
                                    name={"householdNumber"}
                                    label={"Household Number"} 
                                    formError={errors.household?.message}
                                    errorMessage="Please provide a valid household number"
                                    type={"householdNumber"}
                                    inputStyle={"basic"}
                                    placeholder={"09061234567"}
                                    data={register.household}
                                    formRegister={register}
                                />                              
                            </div>

                            <button onClick={handleSubmit(handleApply)} className="btn--next">
                                Submit
                            </button> 
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Residents