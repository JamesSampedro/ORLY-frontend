import NotFoundImg from '../../img/404.png'
import {Link} from 'react-router-dom'
const NotFound = () => {
    return (
        <div className="not-found-page page">
            <div className="not-found-page__wrapper">
                <img src={NotFoundImg} alt="" className="404-page__image"/>
                <h1>Page Not Found</h1>
                <p>We're sorry, but we can't find the page you were looking for.</p>
                <Link to = '/'><button className="btn btn--standard btn--y-4">Go To Homepage</button></Link>
            </div>
        </div>
    )
}

export default NotFound
