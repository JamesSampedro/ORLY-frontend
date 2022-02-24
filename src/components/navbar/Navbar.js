import {useState,useEffect} from 'react' 
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { logout } from './../../actions/users';
import Logo from '../../img/orly-logo.png'

const Navbar = (props) => {
    const response = useSelector((state) => state.auth)
    const statusResponse = useSelector((state) => state.services)
    const statusSuccess = statusResponse.success
    const status = statusResponse.applications 
    const dispatch = useDispatch()
    const {user} = response
    const [isHidden, setIsHidden] = useState(true)
    const [applications, setApplications] = useState(0)

    const handleLogout = () => {
        dispatch(logout())
        localStorage.clear()
        document.location.href="/"
    }

    const hideDropdown = () => {
        setIsHidden(true)
    }

    return (
        <header className={`navbar navbar--user ${user?.role === "admin" ? "bg--purple": user?.role === "user" ? "bg--dark-blue" : "bg--dark-gray"}`}>
            <Link to='/'className='logo-wrapper'><img src={Logo} className='logo-img' alt=""></img><span className="logo" >ORLY</span></Link>
            <nav>
                <ul>
                    <li><Link className="link-item" to={user?.role === "admin" ?"/services-admin" : "/services"}>SERVICES</Link></li>
                    <li><Link className="link-item" to='/reports'>REPORTS</Link></li>
                    <li><Link className="link-item" to='/about'>ABOUT</Link></li>
                    {user?.role === "admin" ? "" : 
                        <li><Link className="link-item" to='/contact-us'>CONTACT US</Link></li>
                    }
                </ul>
            </nav>
            <div className="account">      
            {!user ? 
                <>
                <div to="/login" className="link-item navbar__login mob--hidden"
                onClick={() => props.setLoginIsOpen(true)}>
                    LOG IN
                </div>
                <Link to='/register'className="link-item navbar__signup mob--hidden">
                    SIGN UP
                </Link>
                
                <div className={`account__dropdown ${isHidden ? "": "bg--white"} pc--hidden`}>
                    <span className={`username listitem ${isHidden ? 'txt--white':'txt--black'}`} 
                    onClick={() => {return setIsHidden(!isHidden)}}>Menu</span>
                    <ul className={isHidden ? "hidden" : "bg--white"}>
                        <li onClick={hideDropdown}
                        ><Link className="listitem menu__listitem pc--hidden txt--black" 
                        to={user?.role === "admin" ?"/services-admin" : "/services"}>SERVICES</Link></li>
                        <li onClick={hideDropdown}
                        ><Link className="listitem menu__listitem pc--hidden txt--black" to="/reports">REPORTS</Link></li>
                        <li onClick={hideDropdown}
                        ><Link className="listitem menu__listitem pc--hidden txt--black" to='/about'>ABOUT</Link></li>
                        
                        {user?.role === "admin"? "" : 
                            <li onClick={() => {hideDropdown()}}
                            ><Link className="listitem menu__listitem pc--hidden txt--black" to='/contact-us'>CONTACT US</Link></li>
                        }                        
                        <li className='listitem menu__listitem'>
                        <div to="/login" className="listitem menu__listitem txt--black"
                        onClick={() => {
                            props.setLoginIsOpen(true)
                            hideDropdown()}}>
                            LOG IN
                        </div>
                        </li>
                        <li className='listitem menu__listitem'>
                        <Link to='/register'className="listitem menu__listitem txt--black" style={{color:"black",border:"none"}}
                        onClick={hideDropdown}>
                        SIGN UP
                        </Link>
                        </li>
                    </ul>
                    
                </div>

                </>
                :
                <div className={`account__dropdown ${isHidden ? "": "bg--white"}`}>
                        <div className={`username listitem ${isHidden ? 'txt--white':'txt--black'}`} 
                        onClick={() => {return setIsHidden(!isHidden)}}>{user?.username}
                        </div>
                    <ul className={isHidden ? "hidden" : "bg--white"}>
                        <li onClick={hideDropdown}
                        ><Link className="listitem menu__listitem pc--hidden txt--black" 
                        to={user?.role === "admin" ?"/services-admin" : "/services"}>SERVICES</Link></li>
                        <li onClick={hideDropdown}
                        ><Link className="listitem menu__listitem pc--hidden txt--black" to="/reports">REPORTS</Link></li>
                        <li onClick={hideDropdown}
                        ><Link className="listitem menu__listitem pc--hidden txt--black" to='/about'>ABOUT</Link></li>
                        
                        {user?.role === "admin"? "" : 
                            <li onClick={hideDropdown}
                            ><Link className="listitem menu__listitem pc--hidden txt--black" to='/contact-us'>CONTACT US</Link></li>
                        }

                        {user?.role === "user" &&
                        <>
                            <li onClick={() => {hideDropdown()}} className="status"
                            ><Link className="listitem menu__listitem txt--black" to='/application-status'>STATUS</Link></li>
                            
                            <li onClick={hideDropdown} ><Link className="listitem menu__listitem txt--black" to='/user-profile'>PROFILE</Link></li>
                        </>}
                        
                        <li className='listitem menu__listitem'>
                            <button 
                            className={`logout-btn txt--white ${user?.role === "admin" ? "bg--purple" : "bg--dark-blue"}`}
                            onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                    
                </div>
            }
            </div>
        </header>
    )
}

export default Navbar
