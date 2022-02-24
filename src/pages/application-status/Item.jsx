import {useState} from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
    const app = props.app
    let status ={
        forPayment: {name: "For Payment", button: "Upload Proof", color: "blue",
                    text: `Payment must be made using gcash and the receipt must be uploaded. Process payment within 5 working days to avoid automatic cancellation.`},
        pending: {name: "Pending", button: "", color: "yellow",
                text:"Your Application is being reviewed and is subject for approval."},
        forProcessing: {name: "Processing", button: "", color: "orange",
                    text: "Your Application is being reviewed and is subject for approval"},
        forRelease: {name: "For Release", button: "", color: "violet",
                    text: "Your document is already waiting for you to be claimed at the Barangay Hall. Claim you document during weekdays, business hours."},
        rejected: {name: "Rejected",button: "See Details", color:"red",
                  text: "Unfortunately your application has been rejected. Click see details to get more information."}, 
        claimed: {name: "Claimed",button: "See Details", color: "green",
                 text: "Your document has already been claimed."}
                }
    const [isDetailsHidden, setIsDetailsHidden] = useState(true)
  return(
    <div className={`item ${status[props.status]?.color}--item`}>
        <div className='item__header'>
            <div className="left">
                <h4>{app.name}</h4>
                <h5>{app.dateSubmitted}</h5>
            </div>
            <div className="right">
                <h5>Price:  {app.price === "00.00" ? " " : <span>&#8369;</span>}
                {app.price === "00.00" ? " Free" :`${ app.price}`}</h5>
                {(status[props.status]?.button === "Upload Proof" && !app.proofOfPayment) && 
                    <Link to={`/upload-payment/${app.name}/${app._id}`}><p className={`item__btn blue-bg`}>{status[props.status]?.button}</p></Link>}
                {(status[props.status]?.button === "See Details") && 
                    <p className={`item__btn ${props.status === "claimed" ? "green-bg" : "red-bg"}`}
                    onClick={() => {
                        setIsDetailsHidden(!isDetailsHidden)
                    }}>
                        {isDetailsHidden ? "Show Details" : "Hide Details"}</p>}
            </div>
        </div>
        <div className={`${isDetailsHidden ? "hidden" : ""} details`}>
            <h5>Handled by: Barangay Secretary</h5>
            <h5>Date: {app.statusChangeDate}</h5>
                {props.status === "rejected" &&
                <h5>Reason: {app.rejectReason}</h5>}
        </div>
    </div>
  )
};

export default Item;
