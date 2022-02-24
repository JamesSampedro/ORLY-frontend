import {useState,useEffect} from 'react'
import Ayuda from './../../img/ayuda.png'
import Services from './../../img/services.png'
import Vaccination from './../../img/vaccination-data.svg'
import Blotter from './../../img/blotter.png'
import Certificates from '../../img/certificates.png'
import Card from './Card'
import Equipment from '../../img/equipment.png'
import {useSelector} from 'react-redux'

const Assistance = () => {
    const response = useSelector((state)=>state.auth)
    const {user} = response

    const basicRoutes = {
        ayuda: "/ayuda-program",
        applicationAndReservation: "/services/application-and-reservation",
        vaccination: "services/vaccination-data",
        blotter : "/services/blotter",
    }
    const userRoutes = {
        ayuda: "/services/ayuda-user",
        applicationAndReservation: "/services/application-and-reservation",
        vaccination: "/services/vaccination-data",
        blotter : "/services/blotter",
    }
    const adminRoutes = {
        ayuda: "/services/ayuda-admin",
        applicationAndReservation: "/services/application-and-reservation",
        vaccination: "/services/vaccination-data",
        blotter : "/services/blotter",
    }
    const [routes,setRoutes] = useState(basicRoutes)

    useEffect(() => {
        if(user?.role === 'user'){
            setRoutes(userRoutes)
        }else if(user?.role === 'admin'){
            setRoutes(adminRoutes)
        }else{
            setRoutes(basicRoutes)
        }
    },[user])

    return (
        <>
        <h1 className="page-header">Services</h1>
        <div className="assistance-page">
            <div className="assistance-page-items">
                <Card color="blue" img={Ayuda} name="Ayuda"
                class={"assistance-page-items--"} link={`${routes.ayuda}`} 
                text="Presents user dashboard, and list of relief programs with recipients."
                />
                <Card color="yellow" img={Certificates} name="Certificates Application"
                class={"services-page-items--"} link={`/services/application-and-reservation/certificates-application`} 
                text="Presents barangay documents that are available for application."
                protection={true}
                />
                <Card color="green" img={Vaccination} name="Vaccination Data" 
                class={"assistance-page-items--"} link={`${routes.vaccination}`} 
                handleClick={() => { localStorage.removeItem("getAction") }}
                text="Presents  number of fully vaccinated residents and the percentage from the overall population of the barangay." />
                <Card color="blue" img={Equipment} name="List of Equipment"
                class={"services-page-items--"} link={`/services/application-and-reservation/barangay-equipment`} 
                text="Presents list of available barangay equipment allowed to be borrowed."
                />
                <Card color="red" img={Blotter} name="Blotter" 
                class={"assistance-page-items--"} link={`${routes.blotter}`} 
                text="Presents guidelines for residents who wants to file a blotter report, and also for the subject person of complaint. This section serves as instructions on what to do and prepare when it comes to blotter incidents."/>
            </div>   
        </div>
        </>
    )
}
export default Assistance