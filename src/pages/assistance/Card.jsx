import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';

const Card = (props) => {
    const [role,setRole] = useState("")
    
    useEffect(() => {
        const userRole = localStorage.getItem('role')
        if(userRole){
            setRole(userRole)
        }
    },[])
    return (
        <div className={`${props.class}card`} { ...props.handleClick && { onClick: props.handleClick } }>
            <div className={`top-color ${props.color}`}></div>
            <div className={`image-wrapper bubble-gradient--${props.color}`}>
                <img src={props.img} alt="ayuda"/>
            </div>
            <h4>{props.name}</h4>
            <p>{props.text}</p>
            {props.protection ? 
             role === "user" ? 
             <Link className={`button ${props.color}`} to={`${props.link}`}>Visit Page</Link> : ""
             :
             <Link className={`button ${props.color}`} to={`${props.link}`}>Visit Page</Link> 
            }
            
        </div>
    )
}

export default Card
