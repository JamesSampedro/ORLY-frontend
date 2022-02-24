import {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser, rejectVerification, removeUserResponse } from '../../actions/users';
import { showToastNotification } from './../../functions/showToastNotification';
import {toast, ToastContainer} from 'react-toastify'

toast.configure()

const Item = ({user}) => {
    const dispatch = useDispatch()
    const response = useSelector((state) => state.users)
    const {success,message} = response
    const [isShowing, setIsShowing] = useState(false)
    const [isIdShowing, setIsIdShowing] = useState(false)
    const [isVerifying,setIsVerifying] = useState(false)


    const handleVerify = () => {
        dispatch(verifyUser(user.verificationCode))
        setIsVerifying(true) 
    }

    const handleReject = () => {
        dispatch(rejectVerification(user.verificationCode)) 
        setIsVerifying(true)
    }


    useEffect(() => {
        if(success && isVerifying){
            showToastNotification(message,"success")
        }
        setIsVerifying(false)
        dispatch(removeUserResponse())
    },[success,message,dispatch])


  return (
      <div className='item'>
          <div className="item__header">
            <h3>{`${user.lastName}, ${user.firstName} ${user.middleName[0].toUpperCase()}.`}</h3>
            <button className='item__btn item__btn--blue'
            onClick={() => setIsShowing(!isShowing)}
            >{isShowing ? "Hide" : "View"}</button>
          </div>
          <div className={`item__details ${isShowing ? "" : "hidden"}`}>
              <p>Address: {user.address}</p>
              <p>Birthday: {user.birthday}</p>
              <p>Gender: {user.gender}</p>
              <p>Category: {user.category}</p>
              <p>Marital Status: {user.maritalStatus}</p>
              <p>Occupation: {user.occupation}</p>
              <p>Months Resided: {user.monthsResided}</p>
              <p>Number of Households: {user.householdNumber}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <button className='item__btn item__btn--blue'
              style={{margin:"0"}}
                onClick={() => setIsIdShowing(!isIdShowing)}
                >{isIdShowing ? "Hide" : "Show ID"}</button>
            <img src={user.validId} alt="Valid Id" className={isIdShowing ? "validId" : "hidden"} />
          </div>
          <div className="btn--wrapper">
            <button className='item__btn item__btn--green'
                onClick={() => {
                    const message = (
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <p>{"Are you sure you wish to upgrade the status of the application?"}</p>
                        <div style={{margin:"1rem"}}>
                            <button className='item__btn' style={{background:"#0d7a25",width:"50px"}}
                            onClick={()=>{handleVerify()}}>Yes</button>
                            <button className='item__btn' style={{background:"#E24522",width:"50px"}}
                            >No</button>
                        </div>
                        </div>
                    )
                
                    toast.info(message
                        ,{position:"top-center"})
                }}
                >Verify
            </button>
            <button className='item__btn item__btn--red'
                onClick={() => {
                    const message = (
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <p>{"Are you sure you wish to upgrade the status of the application?"}</p>
                        <div style={{margin:"1rem"}}>
                            <button className='item__btn' style={{background:"#0d7a25",width:"50px"}}
                            onClick={()=>{handleReject()}}>Yes</button>
                            <button className='item__btn' style={{background:"#E24522",width:"50px"}}
                            >No</button>
                        </div>
                        </div>
                    )
                
                    toast.info(message
                        ,{position:"top-center"})
                }}
                >Reject
            </button>
          </div>

      </div>
  )
};

export default Item;
