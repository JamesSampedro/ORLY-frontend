import {useEffect,useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {getUserApplications,removeServiceResponse} from '../../actions/services'
import { showToastNotification } from "../../functions"
import Status from './Status'
import Loading from '../../components/loader/Loading';

const ApplicationStatus = () => {
    const dispatch = useDispatch()
    const response = useSelector((state) => state.services)
    const {success} = response
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('authToken')
       dispatch(getUserApplications(token)) 
    },[])

    useEffect(() => {
        if(success){
            setApplications(response.applications)
            setIsLoading(false)
        }else if(success === false){
            showToastNotification("Something went wrong. Please try again later","error")
        }
        dispatch(removeServiceResponse())
    },[success])

    useEffect(() => {
        setStatus([...new Set(applications.map((s) => {
            return s.status
        }))])
        
    },[applications])
    
    if(isLoading === true){
        return (<Loading/>)
    }else {
    return (
        <>
        <h1 className="page-header">Application Status</h1>
        <div className="application-status-page">
            <div className="application-status-page__items">
                {status.map((s,i) => {
                    const currentApp = applications.filter((app) => app.status === s)
                    return <Status 
                            status = {s}
                            applications = {currentApp}
                            key={i}
                            />
                })}
            </div>
        </div>
        </>
    )}
}

export default ApplicationStatus
