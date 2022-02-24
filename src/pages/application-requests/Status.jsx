import {useState} from 'react'
import Item from './Item'

const Status = (props) => {
    let status ={
        forPayment: {name: "For Payment", button: "Upload Proof", color: "blue",
                    text: `Payment must be made using gcash and the receipt must be uploaded. Process payment within 5 working days to avoid automatic cancellation.`},
        pending: {name: "Pending",color: "yellow",
                text:"Your Application is being reviewed and is subject for approval."},
        forProcessing: {name: "Processing",color: "orange",
                    text: "Your Application is being reviewed and is subject for approval"},
        forRelease: {name: "For Release",color: "violet",
                    text: "Your document is already waiting for you to be claimed at the Barangay Hall. Claim you document during weekdays, business hours."},
        rejected: {name: "Rejected",color:"red",
                  text: "Unfortunately your application has been rejected. Click see details to get more information."}, 
        claimed: {name: "Claimed",color: "green",
                 text: "Your document has already been claimed."}
    }
    const [isHidden, setIsHidden] = useState(true)

    return (
    <div className={`application-status-page__items--card card--shadow ${props.status}`}>
        <div className='card--header'>
            <div className="status">
                <p className={`label ${status[props.status]?.color}`}>{status[props.status]?.name}</p>
            </div>
            <div className="content">
                <p className="text">{status[props.status]?.text}</p>
                <p className={`button ${status[props.status]?.color}-bg`}
                onClick={(e) => {
                    e.preventDefault()
                    setIsHidden(!isHidden)
                }}>
                    {`${isHidden? "Show" : "Hide"} Applications`}</p>
            </div>
        </div>
        {!isHidden &&
            <div className={`card__application--wrapper`}>
                {props.applications.map((app,i) => {
                    return(
                        <Item 
                        key={i}
                        application={app}
                        />
                    )
                })}
            </div>
        }
    </div>
    )
}

export default Status
