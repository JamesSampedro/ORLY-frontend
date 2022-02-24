import {CREATE_AYUDA_PROGRAM,REMOVE_ADMIN_RESPONSE,GET_AYUDA_PROGRAMS,DELETE_AYUDA_PROGRAM, 
    GET_RECIPIENTS,GET_ALL_APPLICATIONS,UPDATE_APPLICATION,UPLOAD_PROOF,GET_UNVERIFIED} from '../constants/actionTypes'

import * as api from '../api/admin'

import { showToastNotification } from '../functions/showToastNotification'

export const createAyudaProgram = (info,token) => async (dispatch) => {
    try {
        const {data} = await api.createAyudaProgram(info,token)

        if(data.success !== false){
            dispatch({type:CREATE_AYUDA_PROGRAM,payload:data})   
        } else {
            let message = data.message
            dispatch({type: CREATE_AYUDA_PROGRAM, payload:{success: false, message:message}})
            showToastNotification(message,"error")
        }
    } catch (error) {
        dispatch({type: CREATE_AYUDA_PROGRAM, payload:{success: false, message:"Something went wrong"}})
    }
}

export const getAyudaPrograms = (token) => async(dispatch) => {
    try {
        const {data} = await api.getAyudaPrograms(token)
        dispatch({type: GET_AYUDA_PROGRAMS,payload:data})
    } catch (error) {
        dispatch({type: GET_AYUDA_PROGRAMS, payload:{success: false, message:"Something went wrong"}})
    }
}

export const deleteAyudaProgram = (id,token) => async(dispatch) => {
    try {
        const {data} = await api.deleteAyudaProgram(id,token)
        dispatch({type: DELETE_AYUDA_PROGRAM,payload:data})
    } catch (error) {
        dispatch({type: DELETE_AYUDA_PROGRAM, payload:{success: false, message:"Something went wrong"}})
    }
}

export const getRecipients = (id,token) => async(dispatch) => {
    try {
        const {data} = await api.getRecipients(id,token)
        dispatch({type: GET_RECIPIENTS,payload:data})
    } catch (error) {
        dispatch({type: GET_RECIPIENTS, payload:{success: false, message:"Something went wrong"}})
    }
}

export const getAllApplications = (token) => async(dispatch) => {
    try {
        const {data} = await api.getAllApplications(token)
        dispatch({type: GET_ALL_APPLICATIONS,payload:data})
    } catch (error) {
        dispatch({type: GET_ALL_APPLICATIONS, payload:{success: false, message:"Something went wrong"}})
    }
}

export const updateIndigency = (id,info,token) => async(dispatch) => {
    try {
        const {data} = await api.updateIndigency(id,info,token)
        dispatch({type: UPDATE_APPLICATION,payload:data})
    } catch (error) {
        dispatch({type: UPDATE_APPLICATION, payload:{success: false, message:"Something went wrong"}})
    }
}

export const updateResidency = (id,info,token) => async(dispatch) => {
    try {
        const {data} = await api.updateResidency(id,info,token)
        dispatch({type: UPDATE_APPLICATION,payload:data})
    } catch (error) {
        dispatch({type: UPDATE_APPLICATION, payload:{success: false, message:"Something went wrong"}})
    }
}

export const updateCedula = (id,info,token) => async(dispatch) => {
    try {
        const {data} = await api.updateCedula(id,info,token)
        dispatch({type: UPDATE_APPLICATION,payload:data})
    } catch (error) {
        dispatch({type: UPDATE_APPLICATION, payload:{success: false, message:"Something went wrong"}})
    }
}

export const updateBarangayClearance = (id,info,token) => async(dispatch) => {
    try {
        const {data} = await api.updateBarangayClearance(id,info,token)
        dispatch({type: UPDATE_APPLICATION,payload:data})
    } catch (error) {
        dispatch({type: UPDATE_APPLICATION, payload:{success: false, message:"Something went wrong"}})
    }
}

export const updateBusinessClearance = (id,info,token) => async(dispatch) => {
    try {
        const {data} = await api.updateBusinessClearance(id,info,token)
        dispatch({type: UPDATE_APPLICATION,payload:data})
    } catch (error) {
        dispatch({type: UPDATE_APPLICATION, payload:{success: false, message:"Something went wrong"}})
    }
}

export const updateId = (id,info,token) => async(dispatch) => {
    try {
        const {data} = await api.updateId(id,info,token)
        dispatch({type: GET_UNVERIFIED,payload:data})
    } catch (error) {
        dispatch({type: GET_UNVERIFIED, payload:{success: false, message:"Something went wrong"}})
    }
}


export const getUnverified = (token) => async(dispatch) => {
    try {
        const {data} = await api.getUnverified(token)
        dispatch({type: UPDATE_APPLICATION,payload:data})
    } catch (error) {
        dispatch({type: UPDATE_APPLICATION, payload:{success: false, message:"Something went wrong"}})
    }
}

export const removeAdminResponse = () => async(dispatch) => {
    dispatch({type:REMOVE_ADMIN_RESPONSE,payload:{}})
}