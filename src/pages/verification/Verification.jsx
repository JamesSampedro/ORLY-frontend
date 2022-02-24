import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUnverified, removeAdminResponse } from "../../actions/admin";
import Loading from '../../components/loader/Loading';
import { showToastNotification } from '../../functions/showToastNotification';
import Item from './Item'

const Verification = () => {
    const response = useSelector((state) => state.admin)
    const userResponse = useSelector((state) => state.users)
    const {success,users} = response
    const userSuccess = userResponse.success
    const dispatch = useDispatch() 
    const [unverifiedUsers, setUnverifiedUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        dispatch(getUnverified(token))
    },[userSuccess])

    useEffect(() => {
        if(success){
            setUnverifiedUsers(users)
            setIsLoading(false)
        }
        dispatch(removeAdminResponse)
    },[success,users,dispatch])


    if(isLoading === true){
        return (<Loading/>)
    }else{
        return(
            <>
            <h1 className="page-header">Account Verification Requests</h1>
            <div className="user-verification-page page">
                {unverifiedUsers?.length > 0 ?
                    <div className="user-verification-page__items">
                        {unverifiedUsers.map((user,i) => {
                            return <Item 
                                key={i}
                                user={user}
                            />
                        })}
                    </div>
                    :
                    <h3>No requests for verification</h3>
                }
            </div>
            </>
          )
    }
};

export default Verification;
