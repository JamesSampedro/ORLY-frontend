import {useState,useEffect} from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { useSelector, useDispatch} from 'react-redux'
import {uploadProof, removeServiceResponse} from '../../actions/services'
import {useParams} from 'react-router-dom'
import { showToastNotification } from './../../functions/showToastNotification';
import {useHistory} from 'react-router-dom'

const UploadPayment = () => {

    const [formError, setFormError] = useState("")
    const response = useSelector((state) => state.services)
    const {success} = response
    const dispatch = useDispatch()
    const {name,id} = useParams()
    const history = useHistory()
    const {register, handleSubmit, formState:{errors}} = useForm({
    })


    const handleApply = (data) => {
        if(data.proof.length !== 1){
            setFormError("Please upload 1 proof of payment")
        }else{
            const token = localStorage.getItem('authToken')
            const formData = new FormData();
            formData.append('name',name)
            formData.append('proof',data.proof?.[0])
            dispatch(uploadProof(id,formData,token))
            setFormError("")
        }

    }

    useEffect(() => {
        if(success){
            showToastNotification("Your Proof of Payment has been sent","success")
            history.push('/application-status')
        }
        dispatch(removeServiceResponse())
    },[success])

  return (
    <div className="clearance-page page">
    <div className="form__wrapper form__wrapper--blue">
        <h1 className="form__title form__title--blue">PROOF OF PAYMENT</h1>
        <div className="form__container">
            <form className="form-style">
                <div className="form-style__header">
                    <h3 className="form__name">Payment Form</h3>
                    <p className="form__instruction">Please provide proof of payment.</p>
                </div>
                <div className="input input--single">
                    <label htmlFor="proof">Please Upload Clear Proof of Payment </label>
                    <p className="input__error-message">{formError}</p>
                    <input type="file" 
                    accept={["image/png","image/jpeg","image/jpg"]} 
                    className='input--basic'
                    name="proof"
                    {...register("proof")}/>
                </div>
                <p className="form__disclaimer">
                Note: By agreeing with this application, I understand that all the information that I've entered will be used ONLY for barangay purposes. My consent effectively constitutes a waiver of any and all privacy rights pertaining to the disclosure, collection, and use of my personal information</p>
            
                <button onClick={handleSubmit(handleApply)} className="btn--next">
                    Submit
                </button>
            </form>
        </div>
    </div>
    </div>
  );
};

export default UploadPayment;
