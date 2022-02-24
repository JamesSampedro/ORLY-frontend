import {SEND_EMAIL, REMOVE_CONTACT_RESPONSE,CONTACT_ERROR} from '../constants/actionTypes'

import * as api from '../api/guests'

export const sendEmail = (message) => async (dispatch) => {
    try {
        const {data} = await api.sendContactUs(message);

        dispatch({type: SEND_EMAIL, payload: data})
    } catch (error) {
        dispatch({type: CONTACT_ERROR, payload:{success: false, message:"Something went wrong"}})
        
    }
}

export const removeContactResponse = () => async (dispatch) => {
    const data = {success:null, message:''}
    dispatch({type:REMOVE_CONTACT_RESPONSE, payload:data})
}