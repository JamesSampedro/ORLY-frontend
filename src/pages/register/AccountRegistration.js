import FormProgress from '../../components/form/FormProgress'
import StepOne from './RegistrationStepOne'
import StepTwo from './RegistrationStepTwo'
import StepThree from './RegistrationStepThree'
import FormsNotif from '../../components/notifications/FormsNotif'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {removeUserResponse} from '../../actions/users'
import {useState, useEffect} from 'react'

const AccountRegistration = () => {
    const response = useSelector((state) => state.users)
    const {success, message, errors} = response
    const dispatch = useDispatch() 
    const[progress, setProgress] = useState(1)
    const [steps, setSteps] = useState(['active','',''])
    const [profile, setProfile] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        birthday: "",
        age: 0,
        phoneNumber:"",
        gender:"",
        maritalStatus:"",
        occupation: "",
        category: "",
        householdNumber: "",
        monthsResided: "",
        validId: null,
        username:"",
        password:"",
        email:""
    })

    useEffect(() => {
        dispatch(removeUserResponse())
    },[])

    useEffect(() => {
        switch (progress){
            case 1:
                stepOne()
                break;
            case 2:
                stepTwo()
                break;
            case 3:
                stepThree()
                break;
            default:
                stepOne()
        }
    }, [progress])

    function validateEmptyInput(inputArr){
        let valid = true
        inputArr.map((input) => {
            if(input === ""){
                valid = false    
            }
            return input
        })

        return valid
    }

    function stepTwo(){
        setSteps(['','active',''])
    }

    function stepOne(){
        setSteps(['active','',''])
    }

    function stepThree(){
        setSteps(['','','active'])
    }

    return (
        <div className="registration">

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
            <FormProgress
            steps={steps}
            title={'Sign Up'}
            step1Name={'Personal'}
            step2Name={'Verification'}
            step3Name={"Account"}/>
            {steps[0] === "active" ? 
            <StepOne progress={progress} 
                setProgress={setProgress}
                profile={profile}
                setProfile={setProfile}
                validation = {validateEmptyInput}/> 
            :steps[1] === "active" ?
            <StepTwo  progress={progress} 
            setProgress={setProgress}
            profile={profile}
            setProfile={setProfile}
            validation={validateEmptyInput}/>
            :
            <StepThree  progress={progress} 
            setProgress={setProgress}
            profile={profile}
            setProfile={setProfile}
            validation={validateEmptyInput}/>
            }
        </div>
    )
}


export default AccountRegistration
