import React from 'react';
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {addSupply as schema} from "../../validations/adminValidation"
import FormInputText from "../../components/form/FormInputText"
import FormInputTextEdit from "../../components/form/FormInputTextEdit"
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputNumber from '../../components/form/FormInputNumber'
import { useDispatch, useSelector } from "react-redux";
import { updateResident, removeServiceResponse, getResident } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import {Link} from 'react-router-dom'

const UpdateResidents = ({id,setIsUpdating,setCurrentId}) => {
    const response = useSelector((state) => state.services)
    const {success} = response
    const dispatch = useDispatch()
    let data,resident

    const {register, handleSubmit,reset,setValue, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const [item, setItem] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        data = dispatch(getResident(id,token))
        let async_function = async function() {
            let result =  await data
            resident = result.resident

            const fields = ['firstName', 'middleName', 'lastName', 'age','address', 'category','monthsResided', 'incomeRange','mobile','householdNumber'];
            fields.forEach(field => setValue(field, resident[field]));
            setItem(resident);
        }
        async_function()
    },[])

    const handleApply = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("authToken")
        setIsUpdating(false)
        setCurrentId("")
        dispatch(updateResident(id,item,token,showToastNotification))
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setIsUpdating(false)
        setCurrentId("")
    }

    return(
        <div className="add-equipment-page page">
        <div className="form__wrapper form__wrapper--purple">
            <h1 className="form__title form__title--purple">RESIDENTS</h1>
            <div className="form__container">
                <form className="form-style">
                    <div className="form-style__header">
                        <h3 className="form__name">Update Residents Form</h3>
                        <p className="form__instruction">Please provide all information requested below.</p>
                    </div>
                    <div className="form-style__line">
                        <FormInputText
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"firstName"}
                            label={"First Name"} 
                            formError={errors.firstName?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"Juan"}
                            data={item.firstName}
                            formRegister={register}
                            disabled
                        />
                        <FormInputText
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"lastName"}
                            label={"Last Name"} 
                            formError={errors.lastName?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"Dela Cruz"}
                            data={item.lastName}
                            formRegister={register}
                            disabled
                        />
                    </div>
                    <div className="form-style__line">
                        <FormInputText
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"single"}
                            name={"address"}
                            label={"Address"} 
                            formError={errors.address?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"Blk 6, Lot 34A, White St."}
                            data={item.address}
                            formRegister={register}
                        />
                    </div>
                    <div className="form-style__line">
                        {/* <FormInputText
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"middleName"}
                            label={"Middle Name"} 
                            formError={errors.middleName?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"Pacheco"}
                            data={item.middleName}
                            formRegister={register}
                        /> */}
                        <FormInputSelect 
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"category"}
                            label={"Category"} 
                            inputStyle={"basic"}
                            data={item.category}
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
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"age"}
                            label={"Age"} 
                            formError={errors.age?.message}
                            errorMessage="Please provide resident's age"
                            type={"number"}
                            inputStyle={"basic"}
                            placeholder={"22"}
                            data={item.age}
                            formRegister={register}
                        />
                    </div>
                   

                    <div className="form-style__line">
                        
                    <FormInputNumber
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"monthsResided"}
                            label={"Number of Months Resided"} 
                            formError={errors.monthsResided?.message}
                            errorMessage="Please provide a valid number"
                            type={"number"}
                            inputStyle={"basic"}
                            placeholder={"4"}
                            data={item.monthsResided}
                            formRegister={register}
                        />
                        <FormInputNumber
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"mobile"}
                            label={"Contact Number"} 
                            formError={errors.mobile?.message}
                            errorMessage="Please provide a contact number"
                            type={"number"}
                            inputStyle={"basic"}
                            placeholder={"09061234567"}
                            data={item.mobile}
                            formRegister={register}
                        />
                    </div>
                    <div className="form-style__line">
                        <FormInputSelect 
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"incomeRange"}
                            label={"Monthly Income Range"} 
                            inputStyle={"basic"}
                            data={item.incomeRange}
                            formRegister={register}
                            options={[
                                {value:"none", label:"None"},
                                {value:"Php 8,000.00 to Php 10,000.00", label:"Php 8,000.00 to Php 10,000.00"},
                                {value:"Php 11,000.00 to Php 15,000.00",label:"Php 11,000.00 to Php 15,000.00"},
                                {value:"Php 16,000.00 to Php 20,000.00",label:"Php 16,000.00 to Php 20,000.00"},
                                {value:"Php 21,000.00 and above",label:"Php 21,000.00 and above"}]}                 
                        />
                          <FormInputText
                            handleChange={(e) => setItem((prevState) => ({ ...prevState, [e.target.getAttribute("name")]: e.target.value }))}
                            format={"double"}
                            name={"householdNumber"}
                            label={"Household Number"} 
                            formError={errors.householdNumber?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"6"}
                            data={item.householdNumber}
                            formRegister={register}
                        />
                    
                    </div>
                    <div className="form-style__line">
                      
                    </div>

                    <button onClick={handleCancel} className="btn--prev">
                        Cancel
                    </button>
                    <button onClick={handleApply} className="btn--next">
                        Submit 
                    </button>  
                </form>
            </div>
        </div>
    </div>
    )
}


export default UpdateResidents;
