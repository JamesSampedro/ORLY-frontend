import {CREATE_CERTIFICATE_OF_INDIGENCY,REMOVE_SERVICE_RESPONSE,GET_USER_APPLICATIONS,
    CREATE_CERTIFICATE_OF_RESIDENCY,CREATE_CEDULA,CREATE_BUSINESS_CLEARANCE,
    CREATE_BARANGAY_CLEARANCE, CREATE_ID_APPLICATION,ADD_EQUIPMENT,GET_ALL_EQUIPMENT,
    DELETE_EQUIPMENT,UPDATE_VACCINATION_DATA,VACCINATION_DATA,GET_ALL_USERS,
    ADD_SUPPLY, UPDATE_SUPPLY, DELETE_SUPPLY, GET_SUPPLIES,GET_AYUDA_DATA,UPLOAD_PROOF, 
    GET_SUPPLY, GET_SALES, GET_RECIPIENTS, SET_RECIPIENT_STATUS, GET_RESIDENTS,GET_RESIDENT,UPDATE_RESIDENT} from '../constants/actionTypes'

import * as api from "../api/services"

export const createCertificateOfIndigency = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.createCertificateOfIndigency(info,token)
        dispatch({type: CREATE_CERTIFICATE_OF_INDIGENCY, payload: data})
    } catch (error) {
        dispatch({type: CREATE_CERTIFICATE_OF_INDIGENCY, payload:{
            success: false,
            message:"Something went wrong"
        }})
    }
}

export const createCertificateOfResidency = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.createCertificateOfResidency(info,token)
        dispatch({type: CREATE_CERTIFICATE_OF_RESIDENCY, payload:data})
    } catch (error) {
        dispatch({type: CREATE_CERTIFICATE_OF_RESIDENCY, payload:{
            success:false,
            message:"Something went wrong"
        }})
    }
}

export const createCedula = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.createCedula(info,token)
        dispatch({type: CREATE_CEDULA, payload: data})
    } catch (error) {
        dispatch({type: CREATE_CEDULA, payload:{
            success: false,
            message:"Something went wrong"
        }})
    }
}

export const createBarangayClearance = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.createBarangayClearance(info,token)
        dispatch({type: CREATE_BARANGAY_CLEARANCE, payload: data})
    } catch (error) {
        dispatch({type: CREATE_BARANGAY_CLEARANCE, payload:{
            success: false,
            message:"Something went wrong"
        }})
    }
}

export const createBusinessClearance = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.createBusinessClearance(info,token)
        dispatch({type: CREATE_BUSINESS_CLEARANCE, payload: data})
    } catch (error) {
        dispatch({type: CREATE_BUSINESS_CLEARANCE, payload:{
            success: false,
            message:"Something went wrong"
        }})
    }
}

export const createIdApplication = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.createIdApplication(info,token)
        dispatch({type: CREATE_ID_APPLICATION, payload:data})
    } catch (error) {
        dispatch({type: CREATE_ID_APPLICATION, payload:{
            success: false,
            message:"Something went wrong"
        }})
    }
}

export const getUserApplications = (token) => async(dispatch) => {
    try {
        const {data} = await api.getUserApplications(token)
        dispatch({type: GET_USER_APPLICATIONS, payload:data})
    } catch (error) {
        dispatch({type: GET_USER_APPLICATIONS, payload:{
            success:false,
            message:"Something went wrong"
        }})
    }
}


export const addEquipment = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.addEquipment(info,token)
        dispatch({type: ADD_EQUIPMENT, payload:data})
    } catch (error) {
        dispatch({type:ADD_EQUIPMENT, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const deleteEquipment = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.deleteEquipment(info,token)
        dispatch({type: DELETE_EQUIPMENT, payload:data})
    } catch (error) {
        dispatch({type:DELETE_EQUIPMENT, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const getAllEquipment = () => async(dispatch) => {
    try {
        const {data} = await api.getAllEquipment()
        dispatch({type: GET_ALL_EQUIPMENT, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_EQUIPMENT, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const updateVaccinationData = (info,token, vaxxDate) => async(dispatch) => {
    try {
        const {data} = await api.updateVaccinationData(info,token,vaxxDate)
        localStorage.setItem("getAction","update")
        localStorage.setItem("year", data.year)
        localStorage.setItem("month", data.month)
        dispatch({type: UPDATE_VACCINATION_DATA, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_VACCINATION_DATA, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

export const getVaccinationData = () => async(dispatch) => {

    let chosenMonth = months[new Date().getMonth()]
    let chosenYear = new Date().getFullYear()
    if(localStorage.getItem("getAction")){
        chosenMonth = localStorage.getItem("month")
        chosenYear = localStorage.getItem("year")
    }
    try {
        const {data} = await api.getVaccinationData(chosenMonth, chosenYear)
        dispatch({type:VACCINATION_DATA, payload:data})
    } catch (error) {
        dispatch({type:VACCINATION_DATA, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const getAllUsers = (token) => async(dispatch) => {
    try {
        const {data} = await api.getAllUsers(token)
        dispatch({type:GET_ALL_USERS,payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_USERS, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}


export const addSupply = (info,token) => async(dispatch) => {
    try {
        const {data} = await api.addSupply(info,token)
        dispatch({type:ADD_SUPPLY, payload:data})
    } catch (error) {
        dispatch({type:ADD_SUPPLY, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const getSupplies = (token) => async(dispatch) => {
    try {
        const {data} = await api.getSupplies(token)
        dispatch({type:GET_SUPPLIES, payload:data})
    } catch (error) {
        dispatch({type:GET_SUPPLIES, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const getSupply = (id,token) => async(dispatch) => {
    try {
        const {data} = await api.getSupply(id,token)
        dispatch({type: GET_SUPPLY,payload:data})
        return data
    } catch (error) {
        dispatch({type:GET_SUPPLY, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const deleteSupply = (id,token) => async (dispatch) => {
    try {
        const {data} = await api.deleteSupply(id,token)
        dispatch({type: DELETE_SUPPLY,payload:data})
    } catch (error) {
        dispatch({type:DELETE_SUPPLY, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const updateSupply = (id,info,token) => async (dispatch) => {
    try {
        const {data} = await api.updateSupply(id,info,token)
        dispatch({type:UPDATE_SUPPLY, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_SUPPLY, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const getAyudaData = (token) => async (dispatch) => {
    try {
        const {data} = await api.getAyudaData(token)
        dispatch({type: GET_AYUDA_DATA, payload:data})
    } catch (error) {
        dispatch({type: GET_AYUDA_DATA, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const uploadProof = (id,info,token) => async(dispatch) => {
    try {
        const {data} = await api.uploadProof(id,info,token)
        dispatch({type:UPLOAD_PROOF,payload:data})
    } catch (error) {
        dispatch({type: UPLOAD_PROOF, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const removeServiceResponse = () => async(dispatch) => {
    dispatch({type:REMOVE_SERVICE_RESPONSE,payload:{}})
}

export const getSales = (token) => async (dispatch) => {
    try {
        const {data} = await api.getSales(token)
        dispatch({type: GET_SALES, payload:data})
    } catch (error) {
        dispatch({type: GET_SALES, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const getAllRecipients = (id,token) => async(dispatch) => {
    try {
        const {data} = await api.getAllRecipients(id,token)
        dispatch({type: GET_RECIPIENTS,payload:data})
        localStorage.setItem("recipients", JSON.stringify(data.recipients));
        
    } catch (error) {
        dispatch({type: GET_RECIPIENTS, payload:{success: false, message:"Something went wrong"}})
    }
}

export const setRecipientStatus = (id,token,info) => async(dispatch) => {
    try {
        const {data} = await api.setRecipientStatus(id,token,info)
        dispatch({type:SET_RECIPIENT_STATUS, payload:data})
    } catch (error) {
        dispatch({type: SET_RECIPIENT_STATUS, payload:{success: false, message:"Something went wrong"}})
    }
}

export const getAllResidents = (token) => async(dispatch) => {
    try {
        const {data} = await api.getAllResidents(token)
        dispatch({type:GET_RESIDENTS,payload:data})
    } catch (error) {
        dispatch({type:GET_RESIDENTS, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const deleteResident = (id,token,history) => async(dispatch) => {try {
    const {data} = await api.deleteResident(id,token)
    dispatch({type: DELETE_SUPPLY,payload:data})

} catch (error) {
    dispatch({type:DELETE_SUPPLY, payload:{
        success: false,
        message: "Something went wrong"
    }})
}

}

export const getResident = (id,token) => async(dispatch) => {
    try {
        const {data} = await api.getResident(id,token)
        dispatch({type: GET_RESIDENT,payload:data})
        return data
    } catch (error) {
        dispatch({type:GET_RESIDENT, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

export const updateResident = (id,info,token,showToastNotification) => async (dispatch) => {
    try {
        const {data} = await api.updateResident(id,info,token)
        dispatch({type:UPDATE_RESIDENT, payload:data})
        showToastNotification("Resident Successfully Updated!","success")
    } catch (error) {
        dispatch({type:UPDATE_RESIDENT, payload:{
            success: false,
            message: "Something went wrong"
        }})
    }
}

