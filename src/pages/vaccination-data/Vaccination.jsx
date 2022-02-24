import {useState, useEffect} from 'react'
import FullyVaccinated from '../../img/fully-vaccinated.png'
import PartlyVaccinated from '../../img/partly-vaccinated.png'
import PercentResidents from '../../img/percent-residents.png'
import TotalDistributed from '../../img/total-distributed.png'
import Infographics from '../../img/vaccineInfographics.png'
import { useDispatch, useSelector } from "react-redux";
import { getVaccinationData, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const Vaccination = () => {
    const response = useSelector((state) => state.services)
    const {success,vaccinationData} = response
    const dispatch = useDispatch()
    const history = useHistory()

    const [stats, setStats] = useState({
        firstDose: 0,
        secondDose: 0,
        residents: 0,
        month: null,
        year: null
    })

    useEffect(() => {
        dispatch(getVaccinationData())
    },[])

    useEffect(() => {
        if(success){
            setStats(vaccinationData)
        }else if(success===false){
            showToastNotification("Something Went Wrong. Please try again later!","error")
        }

        dispatch(removeServiceResponse())
    },[success])

    
    const percentOfVaccinated = (numerator,denominator) =>{
        return `${Math.round(((numerator / denominator) + Number.EPSILON) * 100)} %`
    }

    return (
        <>
        <h1 className="page-header">Vaccination Data</h1>
        <div className="vaccination-data-page page">
            <div className="vaccination-data-page__stats">
                <div className="card card--green"> 
                    <img src={FullyVaccinated} alt="Fully Vaccinated Icon" className="icon"/>
                    <h2 className="numbers">{stats.secondDose}</h2>
                    <h3 className="content">Fully Vaccinated</h3>
                </div>
                <div className="card card--yellow"> 
                    <img src={TotalDistributed} alt="Total Distributed Icon" className="icon"/>
                    <h2 className="numbers">{stats.secondDose + stats.firstDose}</h2>
                    <h3 className="content fit">Total Doses Distributed</h3>
                </div>
                <div className="card card--violet"> 
                    <img src={PartlyVaccinated} alt="Partly Vaccinated Icon" className="icon"/>
                    <h2 className="numbers">{stats.firstDose - stats.secondDose}</h2>
                    <h3 className="content">Partly Vaccinated</h3>
                </div>
                <div className="card card--orange"> 
                    <img src={PercentResidents} alt="Percent Residents Icon" className="icon"/>
                    <h2 className="numbers">{percentOfVaccinated(stats.firstDose, stats.residents)}</h2>
                    <h3 className="content">Percent Vaccinated</h3>
                </div>
            </div>
            <div className="vaccination-data-page__content">
                <p>As of {stats.month} {stats.year}, <b>{percentOfVaccinated(stats.firstDose, stats.residents)}</b> percent of the overall population of Teniente Tiago are vaccinated. A total of <b>{stats.secondDose + stats.firstDose}</b> doses of vaccine are distributed. <b>{stats.secondDose}</b> residents are fully vaccinated, receiving their first and second dosage of vaccines. <b>{stats.firstDose - stats.secondDose}</b> are partly vaccinated, receiving their first dosage of vaccine.</p>
                <div className="vaccination-data-page__content--information">
                    <img src={Infographics} alt="" className="vaccine-infographics"/>
                    <div className="vaccine-info">
                        <h3>Benefits of Covid 19 Vaccine</h3>
                        <ul>
                            <li>The vaccine reduces your risk of infection.</li>
                            <li>The vaccine can help your unborn baby or newborn.</li>
                            <li>The vaccine protects against severe illness.</li>
                            <li>The vaccine will help you reconnect with friends and family.</li>
                        </ul>
                    </div>
                    <div className="vaccine-info">
                        <h3>Immunity after COVID-19 vaccination</h3>
                        <ul>
                            <li>Unknown guarantee on how long the protection lasts for those who are vaccinated.</li>
                            <li>If you get COVID-19, you also risk giving it to loved ones who may get very sick. Getting a COVID-19 vaccine is a safer choice.</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Vaccination
