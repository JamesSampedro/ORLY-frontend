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

const EditPersonal = ({profile}) => {
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
        let editData={...data}

        if(data.birthday){
            editData = {...data,birthday:formatDate(data?.birthday)}
        }
        
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
        value={profile?.firstName}
        label={"First Name"}
        name={"firstName"}
        formError={errors.firstName?.message}
        data={register.firstName}
        formRegister={register}
        formReset={reset}
        usedFields={usedFields}
        setUsedFields={setUsedFields}
      />
      <EditFieldText 
        layout={"card--double"}
        value={profile?.middleName}
        label={"Middle Name"}
        name={"middleName"}
        formError={errors.middleName?.message}
        data={register.middleName}
        formRegister={register}
        formReset={reset}
        usedFields={usedFields}
        setUsedFields={setUsedFields}

      />
    </div>

    <div className="content__line--wrapper">
      <EditFieldText 
        layout={"card--double"}
        value={profile?.lastName}
        label={"Last Name"}
        name={"lastName"}
        formError={errors.lastName?.message}
        data={register.lastName}
        formRegister={register}
        formReset={reset}
        usedFields={usedFields}
        setUsedFields={setUsedFields}
      />
      <EditFieldSelect
        layout={"card--double"}
        value={profile?.gender}
        label={"Gender"}
        name={"gender"}
        data={register.gender}
        formError={errors.gender?.message}
        formRegister={register}
        formReset={reset}
        usedFields={usedFields}
        setUsedFields={setUsedFields}
        options={[{value:"male", label:"Male"},{value:"female",label:"Female"}]}
      />
    </div>

    <div className="content__line--wrapper">
      <EditFieldText 
        layout={"card--single"}
        value={profile?.address}
        label={"Address"}
        name={"address"}
        formError={errors.address?.message}
        data={register.address}
        formRegister={register}
        formReset={reset}
        usedFields={usedFields}
        setUsedFields={setUsedFields}
      />
    </div>

    <div className="content__line--wrapper">
      <EditFieldSelect
        layout={"card--double"}
        value={profile?.maritalStatus}
        label={"Marital Status"}
        name={"maritalStatus"}
        data={register.maritalStatus}
        formError={errors.maritalStatus?.message}
        formRegister={register}
        formReset={reset}
        usedFields={usedFields}
        setUsedFields={setUsedFields}
        options={[{value:"single",label:"Single"},
                {value:"married",label:"Married"},
                {value:"divorced",label:"Divorced"},
                {value:"seperated",label:"Seperated"},
                {value:"widowed",label:"Widowed"},]}
      />
      <EditFieldNumber
        layout={"card--double"}
        value={profile?.phoneNumber}
        label={"Contact Number"}
        name={"phoneNumber"}
        data={register.phoneNumber}
        formRegister={register}
        formReset={reset}
        usedFields={usedFields}
        setUsedFields={setUsedFields}
        formError={errors.phoneNumber?.message}
        type={"phone"}
      />
    </div>
    
    <button onClick={handleSubmit(handleEdit)} className="btn__submit--center">
      Submit 
    </button>

</form>
  )
};

export default EditPersonal;
