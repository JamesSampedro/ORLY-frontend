import {REGISTER, REMOVE_USER_RESPONSE, USER_ERROR,RESET_PASSWORD,LOGIN,
GET_USER, LOGOUT, AUTH_ERROR, REMOVE_AUTH_RESPONSE,USER_PROFILE,UPDATE_USER_PROFILE,
VERIFY_USER,REJECT_VERIFICATION} from '../constants/actionTypes'


import * as api from '../api/users'


export const register = (account) => async (dispatch) => {
    try {
        const {data} = await api.register(account)
        dispatch({type:REGISTER, payload:data})
    } catch (error) {
        dispatch({type:USER_ERROR,payload:{success: false,
        message: "Your username or email might already been taken. Please try using another one"}})
    }
}

export const login = (credentials, history) => async (dispatch) => {
    try{
        const {data} = await api.login(credentials);
        localStorage.setItem('_id',data.user._id)
        localStorage.setItem('authToken',data.token)
        localStorage.setItem('username',data.user.username)
        localStorage.setItem('email',data.user.email)
        localStorage.setItem('firstName', `${data.user.firstName} ${data.user.lastName}`)
        localStorage.setItem('role',data.user.role)
        dispatch({type:LOGIN, payload:data})

        //REDIRECT IF THE USER IS ADMIN
        const token = localStorage.getItem("authToken")
        const username = localStorage.getItem("username")
        if(token && username === "orlytenientetiago") history.replace("/services-admin")
    } catch(error){
        dispatch({type:AUTH_ERROR,payload:{success:false,
        message: "Login Failed"}})
    }
}

export const logout = () => async (dispatch) => {
    const data = {}
    localStorage.removeItem("getAction")
    dispatch({type:LOGOUT,payload:data})
}

export const resetPassword = (email) => async (dispatch) => {
    try{
        const {data} = await api.resetPassword(email)
        dispatch({type:RESET_PASSWORD, payload:data})
    }catch(error){
        dispatch({type:USER_ERROR,payload:{success: false,
        message: "Email Not Found"}})
    }
}

export const getUser = (user) => async (dispatch) => {
    const data = user
    dispatch({type:GET_USER,payload:data})
}

export const removeUserResponse = () => async (dispatch) => {
    dispatch({type:REMOVE_USER_RESPONSE,payload: {success: false, message: ""}})
}

export const getUserProfile = (token) => async (dispatch) => {
    try {
        const {data} = await api.userProfile(token)
        dispatch({type:USER_PROFILE,payload:data})
    } catch (error) {
        dispatch({type:USER_PROFILE,payload:{success: false,
            message: "Profile Not Found"}})
    }
}

export const updateUserProfile = (info,token) => async (dispatch) => {
    try {
        const {data} = await api.updateUserProfile(info,token)
        dispatch({type:UPDATE_USER_PROFILE,payload:data})
    } catch (error) {
        dispatch({type:UPDATE_USER_PROFILE,payload:{success: false,
            message: "Profile Not Found"}})
    }
}

export const verifyUser = (verificationCode) => async (dispatch) => {
    try {
        const {data} = await api.verifyUser(verificationCode)
        dispatch({type:VERIFY_USER,payload:data})
    } catch (error) {
        dispatch({type:VERIFY_USER,payload:{success: false,
            message: "Verification Code Invalid"}})
    }
}

export const rejectVerification = (verificationCode) => async (dispatch) => {
    try {
        const {data} = await api.rejectVerification(verificationCode)
        dispatch({type:REJECT_VERIFICATION,payload:data})
    } catch (error) {
        dispatch({type:REJECT_VERIFICATION,payload:{success: false,
            message: "Verification Code Invalid"}})
    }
}

export const removeAuthResponse = () => async (dispatch) => {
    dispatch({type:REMOVE_AUTH_RESPONSE,payload:{sucess:false, message: ""}})
}