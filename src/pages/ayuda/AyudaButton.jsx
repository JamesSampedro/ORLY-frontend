import {Link} from 'react-router-dom'

const AyudaButton = (props) => {
    return (
        <Link to={props.link} className='txt--black'>
            <div className={`ayuda-button ${props.buttonBgColor}`}>
                <img src={props.src} alt={props.alt} className={`button-img ${props.imgColor}`}/>
                <span className="button-name">{props.name}</span>
            </div>
        </Link>
        
    )
}

export default AyudaButton
