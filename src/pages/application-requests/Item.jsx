import {useState,useEffect} from 'react';
import Details from './Details';
import {useDispatch, useSelector} from 'react-redux'
import {updateIndigency,updateResidency,updateCedula,updateBarangayClearance,updateBusinessClearance,updateId,removeAdminResponse} from '../../actions/admin'
import { showToastNotification, showToastChoice } from '../../functions/showToastNotification';
import {toast, ToastContainer} from 'react-toastify'

toast.configure()

const Item = ({application}) => {
    let status = {
            pending: {color: "yellow", next: application.price === "00.00" ? "forProcessing" : "forPayment"},
            forPayment: {color: "blue", next:"forProcessing"},
            forProcessing: {color: "orange", next:"forRelease"},
            forRelease: {color: "violet",next:"claimed"},
            rejected: {color:"red"},
            claimed: {color: "green"},
        }

    const dispatch = useDispatch()
    const response = useSelector((state) => state.admin)
    const {success} = response
    const [isHidden, setIsHidden] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isRejecting, setIsRejecting] =useState(false)
    const [rejectReason, setRejectReason] = useState("Incorrect or Insufficient Details")
    

    const handleNext = () => {
        const token = localStorage.getItem('authToken')
        let nextStatus = status[application.status].next
        setIsUpdating(true)
        if(application.name === "Certificate Of Indigency"){
            dispatch(updateIndigency(application._id,{
                name:application.name,
                status:nextStatus,
            },token))
        }else if(application.name === "Certificate Of Residency"){
            dispatch(updateResidency(application._id,{
                name:application.name,
                status:nextStatus
            },token))
        }else if(application.name === "Cedula"){
            dispatch(updateCedula(application._id,{
                name:application.name,
                status:nextStatus
            },token))
        }else if(application.name === "Barangay Clearance"){
            dispatch(updateBarangayClearance(application._id,{
                name:application.name,
                status:nextStatus
            },token))
        }else if(application.name === "Business Clearance"){
            dispatch(updateBusinessClearance(application._id,{
                name:application.name,
                status:nextStatus
            },token))
        }else if(application.name === "ID Application"){
            dispatch(updateId(application._id,{
                name:application.name,
                status:nextStatus
            },token))
        }
    }

    const handleReject = (reason) => {
        const token = localStorage.getItem('authToken')

            if(application.name === "Certificate Of Indigency"){
                dispatch(updateIndigency(application._id,{
                        name:application.name,
                        status:"rejected",
                        reason: reason,
                    },token))
            }else if(application.name === "Certificate Of Residency"){
                dispatch(updateResidency(application._id,{
                    name:application.name,
                    status:"rejected",
                    reason: reason,
                },token))
            }else if(application.name === "Cedula"){
                dispatch(updateCedula(application._id,{
                    name:application.name,
                    status:"rejected",
                    reason: reason,
                },token))
            }else if(application.name === "Barangay Clearance"){
                dispatch(updateBarangayClearance(application._id,{
                    name:application.name,
                    status:"rejected",
                    reason: reason,
                },token))
            }else if(application.name === "Business Clearance"){
                dispatch(updateBusinessClearance(application._id,{
                    name:application.name,
                    status:"rejected",
                    reason: reason,
                },token))
            }else if(application.name === "ID Application"){
                dispatch(updateId(application._id,{
                    name:application.name,
                    status:"rejected",
                    reason: reason,
                },token))
            }

            setIsRejecting(false)
            setRejectReason("Incorrect or Insufficient Details")
    }

    useEffect(() => {
        if(success && isUpdating){
            showToastNotification("Application has been updated","success")
            setIsUpdating(false)
            setIsRejecting(false)
        }
        dispatch(removeAdminResponse())
    },[success])
    
  return(
    <div className={`item ${status[application.status]?.color}--item`}>
        <div className='item__header'>
            <div className="left">
                <h4>{application.name}</h4>
                <h5>{application.fullName !== undefined ? `Full Name: ${application.fullName}` : ""}</h5>
                <h5>{application.firstName !== undefined ? `Full Name: ${application.firstName}`  : ""} 
                {application.middleName !== undefined ? ` ${application.middleName[0]}. `  : ""}
                {application.lastName !== undefined ? `${application.lastName}` : ""}</h5>
            </div>
            <div className="right">
                <div className='content__btn-wrapper'>
                    <button className='item__btn blue-bg'
                    onClick={() => {
                        setIsHidden(!isHidden)
                    }}
                    >
                        {isHidden ? "View" : "Hide"}
                    </button>
                    {application.status !== "claimed" && application.status !== "rejected" ? 
                        <>
                            <button className='item__btn red-bg'
                            onClick={() => {
                                setIsRejecting(!isRejecting)
                            }}>
                                {isRejecting ? "Cancel" : "Reject"}
                            </button>
                            <button className='item__btn dark-green-bg'
                            onClick={() => {
                                const message = (
                                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                    <p>{"Are you sure you wish to upgrade the status of the application?"}</p>
                                    <div style={{margin:"1rem"}}>
                                        <button className='item__btn' style={{background:"#0d7a25",width:"50px"}}
                                        onClick={()=>{handleNext()}}>Yes</button>
                                        <button className='item__btn' style={{background:"#E24522",width:"50px"}}
                                        >No</button>
                                    </div>
                                    </div>
                                )
                            
                                toast.info(message
                                    ,{position:"top-center"})
                            }}>
                                Next
                            </button>
                        </>
                        : ""
                    }    
                </div>
            </div>
        </div>
        {isRejecting &&
        <form className='form__reject'>
            <div className="form-style__line">
                <div className={`input input--single`}>
                    <label htmlFor="rejectReason">Reason</label>
                    <select 
                    className={`input--basic`}
                    name={"rejectReason"}
                    value={rejectReason}
                    onChange={(e) => {setRejectReason(e.target.value)}}
                    >
                        <option value="Incorrect or Insufficient Details">Incorrect or Insufficient Details</option>
                        <option value="Duplicate Request">Duplicate Request</option>
                        <option value="No Payment Made Within 3 Business Days">No Payment Made Within 3 Business Days</option>
                    </select>
                </div>
            </div>
            <button className='btn--reject'
            onClick={(e) => {
            e.preventDefault()
            const message = (
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <p>{"Are you sure you wish to upgrade the status of the application?"}</p>
                <div style={{margin:"1rem"}}>
                    <button className='item__btn' style={{background:"#0d7a25",width:"50px"}}
                    onClick={()=>{handleReject(rejectReason)}}>Yes</button>
                    <button className='item__btn' style={{background:"#E24522",width:"50px"}}
                    >No</button>
                </div>
                </div>
            )
        
            toast.info(message
                ,{position:"top-center"})
                
            }}
            >Reject</button>
        </form>}
        <div className={`${isHidden ? "hidden" : ""} details`}>
            <Details 
            details={application}
            />
        </div>     
    </div>
  )
};

export default Item;
