import {useState,useEffect}from 'react';
import EditFieldText from './EditFieldText';
import EditFieldSelect from './EditFieldSelect';
import EditFieldDate from './EditFieldDate';
import EditFieldNumber from './EditFieldNumber';
import EditFieldPassword from './EditFieldPassword'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { showToastNotification } from './../../functions/showToastNotification';
import { useSelector, useDispatch} from 'react-redux'
import {updateUserProfile, removeUserResponse,logout} from '../../actions/users'
import * as yup from "yup"
import "yup-phone"
import { formatDate } from './../../functions/formatDate';
import { useHistory } from 'react-router-dom';


const EditVerification = ({profile}) => {
    const response = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const {editSuccess} = response
    const history = useHistory()

    const [usedFields, setUsedFields] = useState({})

    let schema = yup.object().shape({
        password: yup.string().min(6).required(`Please provide your current password`),
        newPassword: yup.string().min(6).max(15).required(`Please provide your new password`),
        confirmPassword: yup.string().oneOf([yup.ref("newPassword"),null],"Passwords must match")
    })

    const {register, handleSubmit,reset,formState:{errors}} = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true
        })

    const handleEdit = (data) => {
        let token = localStorage.getItem('authToken')
        let editData = {password:data.password,newPassword:data.newPassword}
        if(Object.keys(data)?.length !== 0){
            dispatch(updateUserProfile(editData,token))
        }else{
            showToastNotification("There is no edited information","error")
        }
    }

    useEffect(() => {
        if(editSuccess){
            showToastNotification("Your Account has been updated! Please login again","success")
            setTimeout(() => {
                history.push('/')
                dispatch(logout())
                localStorage.clear()
                window.location.reload()
            },500)
            
        }else if(editSuccess === false){
            showToastNotification("Your Password is incorrect, Please try again","error")
        }
        dispatch(removeUserResponse())

        
    },[editSuccess])


    return (
        <form className='profile-page-items__content'>
        <div className="content__line--wrapper">
            <p style={{fontWeight:"600",margin:"1rem"}}>Provide your Current Password and then your New password to change your password </p>
            <EditFieldPassword
                layout={"card--single"}
                value={profile?.password}
                label={"Password"}
                name={"password"}
                formError={errors.password?.message}
                data={register.password}
                formRegister={register}
                formReset={reset}
                usedFields={usedFields}
                setUsedFields={setUsedFields}
            />
        </div>
        <div className="content__line--wrapper">
            <EditFieldPassword
                layout={"card--single"}
                value={profile?.newPassword}
                label={"New Password"}
                name={"newPassword"}
                formError={errors.newPassword?.message}
                data={register.newPassword}
                formRegister={register}
                formReset={reset}
                usedFields={usedFields}
                setUsedFields={setUsedFields}
            />
        </div>
        <div className="content__line--wrapper">
            <EditFieldPassword
                layout={"card--single"}
                value={profile?.confirmPassword}
                label={"Confirm Password"}
                name={"confirmPassword"}
                formError={errors.confirmPassword?.message}
                data={register.confirmPassword}
                formRegister={register}
                formReset={reset}
                usedFields={usedFields}
                setUsedFields={setUsedFields}
            />
        </div>
        
        <button onClick={handleSubmit(handleEdit)} className="btn__submit--center">
          Change Password
        </button>
    
    </form>
      )
};

export default EditVerification;
