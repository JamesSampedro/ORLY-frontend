import {useState,useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {getUserProfile, removeUserResponse} from '../../actions/users'
import EditPersonal from './EditPersonal';
import EditVerification from './EditVerification';
import EditAccount from './EditAccount'
import * as yup from "yup"
import { showToastNotification } from './../../functions/showToastNotification';


const UserProfile = (props) => {
  const dispatch = useDispatch()
  const response = useSelector((state) => state.users)
  const {success,user,editSuccess} = response
  const [tabActive, setTabActive] = useState(["active","",""])
  const [profile, setProfile] = useState({})

  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    dispatch(getUserProfile(token))
  },[editSuccess])

  useEffect(() => {
    if(success){
      setProfile(user)
    }
  },[success])

  return(
    <>
        <h1 className="page-header">Profile</h1>
        <div className="profile-page">
            <div className="profile-page-items">
                  <ul className='profile-page-items__tab'>
                    <li className={`${tabActive[0]}`} onClick={() => {
                      setTabActive(["active","",""])
                    }}>Personal</li>
                    <hr />
                    <li className={`${tabActive[1]}`} onClick={() => {
                      setTabActive(["","active",""])
                    }}>Verification</li>
                    <hr />
                    <li className={`${tabActive[2]}`} onClick={() => {
                      setTabActive(["","","active"])
                    }}>Account</li>
                  </ul>
                  {tabActive[0] === "active" && 
                    <EditPersonal 
                    profile={profile}
                  /> }
                  {tabActive[1] === "active" && 
                    <EditVerification
                    profile={profile}
                  /> }
                  {tabActive[2] === "active" && 
                    <EditAccount 
                    profile={profile}
                  /> }
            </div>   
        </div>
    </>
  )
};

export default UserProfile;
