import Card from './Card'
import {Link} from 'react-router-dom'
const CertificatesApplication = () => {
    return (
        <>
        <div className="page-header">CERTIFICATES APPLICATION</div>
        <div className="certificates-application-page">
            <Card link="/services/application-and-reservation/certificates-application/indigency" title="Certificate of Indigency" price="Free of Charge" />
            <Card link="/services/application-and-reservation/certificates-application/residency" title="Certificate of Residency" price="Free of Charge"/>
            <Card link="/services/application-and-reservation/certificates-application/cedula" title="Community Tax Certificate" price="PHP 20.00"/>
            <Card link="/services/application-and-reservation/certificates-application/barangay-clearance" title="Barangay Clearance" price="PHP 30.00"/>
            <Card link='/services/application-and-reservation/certificates-application/business-clearance' price="PHP 300.00" title="Business Clearance"/>
            <Card link="/services/application-and-reservation/id-application" price="PHP 100.00" title="ID Application" />
            <Card link="/application-status" price="Your current document applications are all in here" title="Application Status" />
        </div>
        </>
    )
}

export default CertificatesApplication
