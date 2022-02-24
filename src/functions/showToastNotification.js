import { normalizeUnits } from 'moment'
import {toast} from 'react-toastify'

toast.configure()
export const showToastNotification = (message,type,position="top-center") => {
    switch(type){
        case "success":
            toast.success(message,{position:position}) 
            break
        case "warn":
            toast.warn(message,{position:position})
            break
        case "error":
            toast.error(message,{position:position})
            break
        case "info":
            toast.info(message,{position:position})
            break
        default:
            toast(message)
    }
}

export const showToastChoice = (text) => {    
    let value = false
    const message = (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <p>{text}</p>
        <div style={{margin:"1rem"}}>
            <button className='item__btn' style={{background:"#0d7a25",width:"50px"}}
            onClick={()=>{value=true}}>Yes</button>
            <button className='item__btn' style={{background:"#E24522",width:"50px"}}
            onClick={()=>{return false}}>No</button>
        </div>
        </div>
    )

    toast.info(message
        ,{position:"top-center"})

    return value

}