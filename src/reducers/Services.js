import {CREATE_CERTIFICATE_OF_INDIGENCY,REMOVE_SERVICE_RESPONSE,GET_USER_APPLICATIONS,
    CREATE_CERTIFICATE_OF_RESIDENCY,CREATE_CEDULA,CREATE_BUSINESS_CLEARANCE,
    CREATE_BARANGAY_CLEARANCE,CREATE_ID_APPLICATION,ADD_EQUIPMENT,GET_ALL_EQUIPMENT,
    DELETE_EQUIPMENT,UPDATE_VACCINATION_DATA,VACCINATION_DATA,GET_ALL_USERS,
    ADD_SUPPLY,UPDATE_SUPPLY,DELETE_SUPPLY,GET_SUPPLIES, GET_AYUDA_DATA,UPLOAD_PROOF, 
    GET_SUPPLY, GET_SALES,GET_RECIPIENTS, SET_RECIPIENT_STATUS, DELETE_RESIDENT, UPDATE_RESIDENT,GET_RESIDENTS} from '../constants/actionTypes'

export default function services(serviceData = {}, action){
    switch(action.type){
        case CREATE_CERTIFICATE_OF_INDIGENCY:
            return action.payload
        case CREATE_CERTIFICATE_OF_RESIDENCY:
            return action.payload
        case CREATE_CEDULA:
            return action.payload
        case CREATE_BUSINESS_CLEARANCE:
            return action.payload
        case CREATE_BARANGAY_CLEARANCE:
            return action.payload
        case CREATE_ID_APPLICATION:
            return action.payload
        case ADD_EQUIPMENT:
            return action.payload
        case GET_ALL_EQUIPMENT:
            return action.payload
        case DELETE_EQUIPMENT:
            return action.payload
        case UPDATE_VACCINATION_DATA:
            return action.payload
        case VACCINATION_DATA:
            return action.payload
        case ADD_SUPPLY:
            return action.payload
        case REMOVE_SERVICE_RESPONSE:
            return action.payload
        case GET_USER_APPLICATIONS:
            return action.payload
        case GET_ALL_USERS:
            return action.payload
        case GET_SUPPLIES:
            return action.payload
        case UPDATE_SUPPLY:
            return action.payload
        case DELETE_SUPPLY:
            return action.payload
        case GET_AYUDA_DATA:
            return action.payload
        case UPLOAD_PROOF:
            return action.payload
        case GET_SALES:
            return action.payload
        case GET_RECIPIENTS:
            return action.payload
        case SET_RECIPIENT_STATUS:
            serviceData.recipientSuccess = action.payload.success
            serviceData.recipientMessage = action.payload.message
            return serviceData
        case DELETE_RESIDENT:
            return action.payload
        case UPDATE_RESIDENT:
            return action.payload
        case UPDATE_RESIDENT:
            return action.payload
        default:
            return serviceData 
    }
}