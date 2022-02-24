import {useEffect} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {addSupply as schema} from "../../validations/adminValidation"
import FormInputText from "../../components/form/FormInputText"
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputNumber from '../../components/form/FormInputNumber'
import { useDispatch, useSelector } from "react-redux";
import { addSupply, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';


const AddSupply = () => {
    const response = useSelector((state) => state.services)
    const {success} = response
    const dispatch = useDispatch()
    const history = useHistory()

    const {register, handleSubmit,reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        dispatch(addSupply(data,token))
    }

    useEffect(() => {
        if(success){
            showToastNotification("Supply Successfully Added!","success")
            reset({itemName:"", unit:"", quantity:""})
            setTimeout(() => {
                history.push('/supply-inventory-admin')
            },1000)
        }else if(success === false){
            showToastNotification("Something Went Wrong!","error")
        }

        dispatch(removeServiceResponse())
    },[success])

    return(
        <>
            <div className="add-equipment-page page">
                <div className="form__wrapper form__wrapper--purple">
                    <h1 className="form__title form__title--purple">ADD SUPPLY</h1>
                    <div className="form__container">
                        <form className="form-style">
                            <div className="form-style__header">
                                <h3 className="form__name">Add Supply Form</h3>
                                <p className="form__instruction">Please provide all information requested below.</p>
                            </div>
                            <div className="form-style__line">
                                <FormInputText
                                    format={"single"}
                                    name={"itemName"}
                                    label={"Item Name"} 
                                    formError={errors.itemName?.message}
                                    type={"text"}
                                    inputStyle={"basic"}
                                    placeholder={"ex.3-in-1 Nescafe"}
                                    data={register.itemName}
                                    formRegister={register}
                                />
                            </div>
                            <div className="form-style__line">
                                <FormInputSelect 
                                    format={"double"}
                                    name={"unit"}
                                    label={"Unit"} 
                                    inputStyle={"basic"}
                                    data={register.unit}
                                    formRegister={register}
                                    options={[
                                        {value:"piece",label:"Piece"},
                                        {value:"sachet",label:"Sachet"},
                                        {value:"kilogram",label:"Kilogram"},
                                        {value:"pack",label:"Pack"}]}
                                />
                                <FormInputNumber
                                    format={"double"}
                                    name={"quantity"}
                                    label={"Quantity"} 
                                    formError={errors.quantity?.message}
                                    errorMessage="Provide quantity"
                                    type={"number"}
                                    inputStyle={"basic"}
                                    placeholder={"200"}
                                    data={register.quantity}
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

export default AddSupply