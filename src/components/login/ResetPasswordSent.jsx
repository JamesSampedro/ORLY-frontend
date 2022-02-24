import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { removeUserResponse } from '../../actions/users'
import {Link} from 'react-router-dom'

const ResetPasswordSent = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(removeUserResponse())
    },[])
    return (
        <div className='registration-request-sent-page'>
            <p>Password Reset has been sent. Please check your email to continue the process</p>
            <Link to='/'><button className='btn btn--standard'>Go Back To Homepage</button></Link>
        </div>
    )
}

export default ResetPasswordSent