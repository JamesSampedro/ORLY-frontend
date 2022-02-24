import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {addSupply as schema} from "../../validations/adminValidation"
import FormInputText from "../../components/form/FormInputText"
import FormInputTextEdit from "../../components/form/FormInputTextEdit"
import FormInputSelect from './../../components/form/FormInputSelect';
import FormInputNumber from '../../components/form/FormInputNumber'
import { useDispatch, useSelector } from "react-redux";
import { updateSupply, removeServiceResponse, getSupply } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';


const UpdateSupply = ({id,setIsUpdating,setCurrentId}) => {
    const response = useSelector((state) => state.services)
    const {success} = response
    const dispatch = useDispatch()
    let data,supply

    const {register, handleSubmit,reset,setValue, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const [item, setItem] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        data = dispatch(getSupply(id,token))
        let async_function = async function() {
            let result =  await data
            supply = result.supply

            const fields = ['itemName', 'unit', 'quantity'];
            fields.forEach(field => setValue(field, supply[field]));
            setItem(supply);
        }
        async_function()
    },[])

    const handleApply = (data) => {
        const token = localStorage.getItem("authToken")
        setIsUpdating(false)
        setCurrentId("")
        dispatch(updateSupply(id,data,token))
    }

    return(
        <form className="form-style">
            <div className="form-style__header">
                <h3 className="form__name">Update Supply Form</h3>
                <p className="form__instruction">Please provide all information requested below.</p>
            </div>
            <div className="form-style__line">
                <FormInputTextEdit
                    format={"single"}
                    name={"itemName"}
                    label={"Item Name"} 
                    formError={errors.itemName?.message}
                    type={"text"}
                    inputStyle={"basic"}
                    placeholder={"ex.3-in-1 Nescafe"}
                    data={register.itemName}
                    formRegister={register}
                    disabled={"disabled"}
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
    )
}


export default UpdateSupply
