import {Link} from 'react-router-dom'
const Ayuda = () => {
    return (
        <div className="ayuda">
            <div className="ayuda__content">
                <h1>AYUDA PROGRAM</h1>
                <p>Life necessities such as cash, food, water, and medical supplies play a critical roles in reconstructing communities in all recovering stages. With that, barangay Teniente Tiago created a program named Ayuda Management Program for fair and automated selection of relief supplies beneficiaries.  Given that there will be a qualifications to the selected receivers, the barangay targets to accommodate all of its constituents.</p>
                <Link className="cta" to='/ayuda-program'>
                    Learn More
                </Link>
            </div>
        </div>
    )
}

export default Ayuda
