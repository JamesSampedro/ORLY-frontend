import {SEND_EMAIL, REMOVE_CONTACT_RESPONSE, CONTACT_ERROR} from '../constants/actionTypes'

export default function contactUs (contactResponse = {}, action){
    switch (action.type){
        case SEND_EMAIL:
            return action.payload
        case REMOVE_CONTACT_RESPONSE:
            contactResponse.success = action.payload.success
            contactResponse.message = action.payload.message
            return contactResponse
        case CONTACT_ERROR:
            return action.payload
        default:
            return contactResponse
    }
}