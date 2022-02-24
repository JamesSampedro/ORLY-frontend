import {useState,useEffect}from 'react';
import EditFieldText from './EditFieldText';
import EditFieldSelect from './EditFieldSelect';
import EditFieldDate from './EditFieldDate';
import EditFieldNumber from './EditFieldNumber';
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { showToastNotification } from './../../functions/showToastNotification';
import { useSelector, useDispatch} from 'react-redux'
import {updateUserProfile, removeUserResponse} from '../../actions/users'
import * as yup from "yup"
import "yup-phone"
import { formatDate } from './../../functions/formatDate';


const EditVerification = ({profile}) => {
    const response = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const {editSuccess} = response

    const [usedFields, setUsedFields] = useState({})

    let schema = yup.object().shape(usedFields)

    const {register, handleSubmit,reset,formState:{errors}} = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true
        })

    const handleEdit = (data) => {
        let token = localStorage.getItem('authToken')
        let editData = {...data}
        if(Object.keys(data)?.length !== 0){
            dispatch(updateUserProfile(editData,token))
        }else{
            showToastNotification("There is no edited information","error")
        }
    }

    useEffect(() => {
        if(editSuccess){
            showToastNotification("Your Account has been updated!","success")
        }   
        dispatch(removeUserResponse())
    },[editSuccess])


    return (
        <form className='profile-page-items__content'>
        <div className="content__line--wrapper">
            <EditFieldText 
                layout={"card--double"}
                value={profile?.occupation}
                label={"Occupation"}
                name={"occupation"}
                formError={errors.occupation?.message}
                data={register.occupation}
                formRegister={register}
                formReset={reset}
                usedFields={usedFields}
                setUsedFields={setUsedFields}
            />
            <EditFieldSelect
                layout={"card--double"}
                value={profile?.category}
                label={"Resident's Category"}
                name={"category"}
                data={register.category}
                formRegister={register}
                formReset={reset}
                formError={errors.category?.message}
                usedFields={usedFields}
                setUsedFields={setUsedFields}
                options={[{value:"resident",label:"Resident"},
                            {value:"senior",label:"Senior Citizen"},
                            {value:"pwd",label:"PWD"}]}
            />
        </div>
        <div className="content__line--wrapper">
            <EditFieldNumber
                layout={"card--double"}
                value={profile?.monthsResided}
                label={"No. of Months Resided"}
                name={"monthsResided"}
                data={register.monthsResided}
                formRegister={register}
                formReset={reset}
                usedFields={usedFields}
                setUsedFields={setUsedFields}
                formError={errors.monthsResided?.message}
            />
        </div>
        
        <button onClick={handleSubmit(handleEdit)} className="btn__submit--center">
          Submit 
        </button>
    
    </form>
      )
};

export default EditVerification;
