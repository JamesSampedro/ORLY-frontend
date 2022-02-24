import { REMOVE_AUTH_RESPONSE, LOGIN,LOGOUT,GET_USER,AUTH_ERROR} from '../constants/actionTypes'

export default function register (authData={}, action){
    switch (action.type){
        case LOGIN:
            return action.payload
        case LOGOUT:
            return authData
        case GET_USER:
            return action.payload
        case REMOVE_AUTH_RESPONSE:
            authData.success = action.payload.success
            authData.message = action.payload.message
            return authData
        case AUTH_ERROR:
            return action.payload
        default:
            return authData
    }
}
