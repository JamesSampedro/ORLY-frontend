import Card from './Card'
import Equipment from '../../img/equipment.png'
import Clearance from '../../img/clearance.png'
import Id from '../../img/id-application.png'
import Certificates from '../../img/certificates.png'
import ApplicationStatus from '../../img/application-status.png'
const Services = () => {
    return (
        <>
        <h1 className="page-header">Application and Reservation</h1>
        <div className="services-page">
            <div className="services-page-items">
            <Card color="blue" img={Equipment} name="Equipment Reservation"
            class={"services-page-items--"} link={`/services/application-and-reservation/barangay-equipment`} 
            text="All available barangay equipment that are allowed to borrow."
            />
            <Card color="green" img={Id} name="ID Application"
            class={"services-page-items--"} link={`/services/application-and-reservation/id-application`} 
            text="Apply for barangay identification card valid for one year. An amount of PHP 100.00 will be needed to process the application. Click on the button to fill up ID form."
            />
            <Card color="yellow" img={Certificates} name="Certificates Application"
            class={"services-page-items--"} link={`/services/application-and-reservation/certificates-application`} 
            text="Documents such as indigency, residency, cedula, and barangay clearance are available. Click on the button to select document."
            />
            <Card color="orange" img={ApplicationStatus} name="Application Status"
            class={"services-page-items--"} link={`/application-status`} 
            text="Tracks the current state of your applied document. Click on the button to view application status."
            />
            </div>
        </div>
        </>
    )
}

export default Services
