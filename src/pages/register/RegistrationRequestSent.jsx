import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { removeUserResponse } from '../../actions/users'
import {Link} from 'react-router-dom'

const RegistrationRequestSent = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(removeUserResponse())
    },[])
    return (
        <div className='registration-request-sent-page'>
            <p>Thank you for trying the new Barangay Teniente Tiago Website also called as ORLY. Your registration request has been sent. Please check your email in the next 2-3 business days for the verification and activation of your account. </p>
            <Link to='/'><button className='btn btn--standard'>Go Back To Homepage</button></Link>
        </div>
    )
}

export default RegistrationRequestSent
