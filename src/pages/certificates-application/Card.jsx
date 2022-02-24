import {Link} from 'react-router-dom'
const Card = (props) => {
    return (
        <div className="certificates-application-page__card card--shadow">
            <div className="content">
                <h3 className="title">{props.title}</h3>
                <p className="price">{props.price}</p>
            </div>
            <Link to={props.link} className="btn">Proceed</Link>
        </div>
    )
}

export default Card
