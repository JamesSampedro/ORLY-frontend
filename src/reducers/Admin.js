import {CREATE_AYUDA_PROGRAM,REMOVE_ADMIN_RESPONSE,GET_AYUDA_PROGRAMS, DELETE_AYUDA_PROGRAM, 
    GET_RECIPIENTS, GET_ALL_APPLICATIONS, UPDATE_APPLICATION,GET_UNVERIFIED} from '../constants/actionTypes'


export default function admin (adminResponse = {}, action){
    switch (action.type){
        case CREATE_AYUDA_PROGRAM:
            return action.payload
        case REMOVE_ADMIN_RESPONSE:
            return action.payload
        case GET_AYUDA_PROGRAMS:
            return action.payload
        case DELETE_AYUDA_PROGRAM:
            return action.payload
        case GET_RECIPIENTS:
            return action.payload
        case GET_ALL_APPLICATIONS:
            return action.payload
        case UPDATE_APPLICATION:
            return action.payload
        case GET_UNVERIFIED:
            return action.payload
        default:
            return adminResponse
    }
}