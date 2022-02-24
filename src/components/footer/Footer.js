import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import facebookIcon from '../../img/facebook-icon.png'
import gmailIcon from '../../img/gmail-icon.png'
import { useSelector } from 'react-redux'



const Footer = () => {
  
    const response = useSelector((state) => state.auth)
    const {success} = response
    const [userRole, setUserRole] = useState("")

    useEffect(() => {
        setUserRole(localStorage.getItem('role'))
    },[success])

    return (
        <div className={`footer ${userRole === "admin" ? "bg--purple" : "bg--primary"}`}>
            <h1 className="footer__title">ORLY</h1>
            <nav className="footer__nav">
                <ul className="footer__nav--nav-links">
                    <Link className="nav--items" to='/about'>
                        <li>About</li>
                    </Link>
                    <Link className="nav--items" to='/contact-us'>
                        <li>Need Help?</li>
                    </Link>
                    <Link className="nav--items" to='/ayuda-program'>
                        <li>Ayuda Program</li>
                    </Link>
                    <Link className="nav--items"
                     to={userRole === "admin" ? 
                    "/services-admin" : "/services"}
                    >
                        <li>Services</li>
                    </Link>
                    
                </ul>
            </nav>
            <div className="footer__social-media">
                <a className="footer__social-media--icon" href="https://www.facebook.com/profile.php?id=100069216909850"><img src={facebookIcon} alt="" /></a>
                <Link className="footer__social-media--icon" to="/contact-us"><img src={gmailIcon} alt="" /></Link>
            </div>
            <span className="footer__copyright">&#169; 2022 Orly</span>
        </div>
    )
}

export default Footer
