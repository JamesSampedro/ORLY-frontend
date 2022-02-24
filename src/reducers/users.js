import {REGISTER, USER_ERROR, REMOVE_USER_RESPONSE, RESET_PASSWORD, LOGIN,LOGOUT,GET_USER,USER_PROFILE,
UPDATE_USER_PROFILE,VERIFY_USER,REJECT_VERIFICATION} from '../constants/actionTypes'

export default function register (registerData={}, action){
    switch (action.type){
        case REGISTER:
            return action.payload
        case USER_ERROR:
            return action.payload
        case REMOVE_USER_RESPONSE:
            return action.payload
        case RESET_PASSWORD:
            return action.payload
        case USER_PROFILE:
            return action.payload
        case UPDATE_USER_PROFILE:
            let editSuccess = false
            if(action.payload.success){
                editSuccess = true
            }
            registerData = {...action.payload,editSuccess}
            return registerData
        case VERIFY_USER:
            return action.payload;
        case REJECT_VERIFICATION:
            return action.payload
        default:
            return registerData
    }
}
