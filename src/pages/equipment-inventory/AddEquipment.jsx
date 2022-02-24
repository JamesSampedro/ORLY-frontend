import {useEffect} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {addEquipment as schema} from "../../validations/adminValidation"
import FormInputText from "../../components/form/FormInputText"
import { useDispatch, useSelector } from "react-redux";
import { addEquipment, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';


const AddEquipment = () => {
    const response = useSelector((state) => state.services)
    const {success} = response
    const dispatch = useDispatch()
    const history = useHistory()

    const {register, handleSubmit,reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        dispatch(addEquipment(data,token))
    }

    useEffect(() => {
        if(success){
            showToastNotification("Equipment Successfully Added!","success")
            reset({itemName:""})
            setTimeout(() => {
                history.push('/equipment-inventory-admin')
            },1000)
        }else if(success === false){
            showToastNotification("Something Went Wrong!","error")
        }

        dispatch(removeServiceResponse())
    },[success])

    return (
        <div>
            <div className="add-equipment-page page">
        <div className="form__wrapper form__wrapper--purple">
            <h1 className="form__title form__title--purple">ADD EQUIPMENT</h1>
            <div className="form__container">
                <form className="form-style">
                    <div className="form-style__header">
                        <h3 className="form__name">Add Equipment Form</h3>
                        <p className="form__instruction">Please provide all information  requested below.</p>
                    </div>
                    <div className="form-style__line">
                        <FormInputText
                            format={"single"}
                            name={"itemName"}
                            label={"Item Name"} 
                            formError={errors.itemName?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"ex.Chairs"}
                            data={register.itemName}
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
        </div>
    )
}

export default AddEquipment
