import {useEffect,useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {getAllApplications,removeAdminResponse} from '../../actions/admin'
import { showToastNotification } from "../../functions"
import Status from './Status'
import Loading from '../../components/loader/Loading';

const ApplicationRequests = () => {
    const dispatch = useDispatch()
    const response = useSelector((state) => state.admin)
    const {success} = response
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        dispatch(getAllApplications(token)) 
    },[])

    useEffect(() => {
        if(success){
            if(response.applications === undefined){
                const applicationsData = JSON.parse(localStorage.getItem("applications"))
                setApplications(applicationsData)
            }else{
                setApplications(response.applications)
            }
            setIsLoading(false)
        }
        dispatch(removeAdminResponse())
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
        <h1 className="page-header">Application Requests</h1>
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
};

export default ApplicationRequests;
