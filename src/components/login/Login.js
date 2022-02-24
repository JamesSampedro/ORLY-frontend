import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {loginSchema,resetPasswordSchema} from "../../validations/authValidation"
import FormInputText from './../../components/form/FormInputText';
import { resetPassword, removeAuthResponse, login } from './../../actions/users';
import FormsNotif from '../notifications/FormsNotif'

const Login = (props) => {

    const {loginOnClose} = props
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [schema, setSchema] = useState(loginSchema)
    const response = useSelector((state) => state.auth)
    const userResponse = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const {success,message,user} = response
    let history = useHistory()
    const {register, handleSubmit,reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if(isForgotPassword){
            setSchema(resetPasswordSchema)
            reset({username: "", password: ""})
        }else{
            setSchema(loginSchema)
            reset({email: ""})
        }
    },[schema,isForgotPassword,reset])
    
    const handleLogin = (data) => {
        dispatch(login(data, history))
        reset({username: "", password: ""})
    }

    const handleResetPassword = (data) => {
        dispatch(resetPassword(data))
        reset({email: ""})
    }

    const handleCloseLoginModal = () => {
        dispatch(removeAuthResponse())
        setIsForgotPassword(false)
        reset({username: "", password: "", email: ""})
        loginOnClose()
    }

    useEffect(() => {
        if(isForgotPassword){
            if(userResponse.success){
                loginOnClose()
                setIsForgotPassword(false)
                history.push('/password-reset-sent')
            }
        }else{
            if(!success){

            }else{
                loginOnClose()
            }
        }
    },[isForgotPassword,success,response,history,loginOnClose,user,userResponse])

    if(!props.loginIsOpen) return null
    return (
        <>
        <div className="overlay"></div>
        <div className="login">      
            <div className="login__close"><span onClick={handleCloseLoginModal}>X</span></div>
            <div className="login__branding">
                <span className="login__branding--logo">Orly</span>
                <p className="login__branding--catchphrase">A Community that Cares<span>.</span></p>
            </div>
            <form action="" className="login__form">
                <p className="login__form--title">{isForgotPassword? "Reset Password":"Login to your Account"}</p>
                {success ? ''
                : 
                message !== undefined ?
                message !== ''?
                <FormsNotif 
                messages={[message]}
                errors={[response.errors ? response.errors : [{}]]}
                type='error'
                />
                : 
                ''
                :
                ''}
                {isForgotPassword ?
                <div className="form-style__line">
                    <FormInputText
                        format={"single"}
                        name={"email"}
                        label={"Email"} 
                        formError={errors.email?.message}
                        type={"email"}
                        inputStyle={"basic"}
                        placeholder={"ex.johndoe@email.com"}
                        data={register.email}
                        formRegister={register}
                    />
                </div> 
                :
                <>
                <div className="form-style__line">
                    <FormInputText
                        format={"single"}
                        name={"username"}
                        label={"Username"} 
                        formError={errors.username?.message}
                        type={"text"}
                        inputStyle={"basic"}
                        placeholder={"ex.John123"}
                        data={register.username}
                        formRegister={register}
                    />
                </div>
                <div className="form-style__line">
                    <FormInputText
                        format={"single"}
                        name={"password"}
                        label={"Password"} 
                        formError={errors.password?.message}
                        type={"password"}
                        inputStyle={"basic"}
                        placeholder={"password"}
                        data={register.password}
                        formRegister={register}
                    />
                </div>
                </>
                }
            
                <div className="login__form--login-options">
                <p className="forgot-password"
                onClick={() => {
                    setIsForgotPassword(!isForgotPassword)
                }}>
                    {isForgotPassword? "Login" : "Forgot Password ?"}
                </p>
                </div>
                {isForgotPassword ? 
                <button className="login__form--login"
                onClick={handleSubmit(handleResetPassword)}>
                    Reset
                </button>
                :
                <button className="login__form--login"
                onClick={handleSubmit(handleLogin)}>
                    Login
                </button>}
                
                <div className="login__form--signup">
                    <p onClick={(() => {loginOnClose()})}>Need an account? <Link className="link" to='/register'>Sign Up</Link> </p>
                </div>
            </form>
        </div> 
        </>
                   
    )
}

export default Login
