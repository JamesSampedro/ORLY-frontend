import {useEffect} from 'react'
import ContactIcon from '../../img/contact.png'
import LocationIcon from '../../img/location.png'
import MailIcon from '../../img/mail.png'
import { useDispatch,useSelector } from 'react-redux'
import { sendEmail, removeContactResponse } from '../../actions/contactUs'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {contactUsSchema as schema} from "../../validations/contactUsValidation"
import FormInputText from './../../components/form/FormInputText';
import FormInputTextBox from '../../components/form/FormInputTextBox'
import { showToastNotification } from '../../functions'

const ContactUs = () => {
    const response = useSelector((state) => state.contactUs)
    const dispatch = useDispatch()
    const {success,message} = response
    
    
    
    const {register, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })




    const handleContactUs  = async (data) => {
        dispatch(sendEmail(data))
    }

    
    useEffect(() => {
        if(success){
            showToastNotification("Your message has been sent, Regularly check your email for our reply","success")
            reset({fullName: "",email:"",message:""})
        }else if(success === false){
            showToastNotification("Something went wrong, Please try again later","error")
        }
        dispatch(removeContactResponse())
    },[success,message])
    return (
        <>
            <h1 className="page-header">Contact Us</h1>
            <div className="contact-page page">
                <form onSubmit={handleSubmit} className="contact-page__form form-style">
                    <div className="form-style__line">
                        <FormInputText
                            format={"single"}
                            name={"fullName"}
                            labelStyle={"contact-page__form--label"}
                            label={"Full Name"} 
                            formError={errors.fullName?.message}
                            type={"text"}
                            inputStyle={"basic"}
                            placeholder={"ex.John Doe"}
                            data={register.fullName}
                            formRegister={register}
                        />
                    </div>
                    <div className="form-style__line">
                        <FormInputText
                            format={"single"}
                            name={"email"}
                            labelStyle={"contact-page__form--label"}
                            label={"Email"} 
                            formError={errors.email?.message}
                            type={"email"}
                            inputStyle={"basic"}
                            placeholder={"ex.johndoe@email.com"}
                            data={register.email}
                            formRegister={register}
                        />
                    </div>
                    <div className="form-style__line">
                        <FormInputTextBox
                            format={"single"}
                            name={"message"}
                            id={"message"}
                            labelStyle={"contact-page__form--label"}
                            label={"Message:"} 
                            formError={errors.message?.message}
                            inputClass={"contact-page__form--input"}
                            placeholder={"Type in your message here"}
                            data={register.message}
                            formRegister={register}
                        />
                    </div>
                    <button className="contact-page__form--submit"
                    onClick={handleSubmit(handleContactUs)}>
                        Submit
                    </button>   
                </form>
                <div className="contact-page__info">
                    <div className="circle"></div>
                    <p>If you have any suggestions or questions about the website/barangay, feel free to contact us.</p>
                    <div className="contact-page__info--options">
                        <div className="pair">
                            <img src={LocationIcon} alt="location icon" className="icon"/>
                            <p>Block 3A Red st., Barangay Teniente Tiago, Gen. Mariano Alvarez, Cavite 4417</p>
                        </div>
                        <div className="pair">
                            <img src={ContactIcon} alt="contact icon" className="icon"/>
                            <p>0961-828-5142/0948-213-8769/02-8123-4567</p>
                        </div>
                        <div className="pair">
                            <img src={MailIcon} alt="mail icon" className="icon"/>
                            <p>brgy27.ttiago_gmacavite @ yahoo.com 
                               orlyofficialemail @ gmail.com 
                               
                            </p>
                            <p><br/><br/> <center>For more information, visit the official website of GMA Cavite</center></p>
                            <a style={{color:'#5bbef0', textDecoration:'underline'}} href={'#'} onClick={() => { window.open("https://gmacavite.ph/", "_blank").focus() }}>  Click here to redirect to GMA Cavite page </a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs
