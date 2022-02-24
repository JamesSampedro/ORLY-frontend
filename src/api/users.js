import axios from 'axios'

//const url = 'https://barangaytenientetiago.xyz:8443/users/api'
const url = process.env.REACT_APP_BACKEND_URL+"/users/api"

export const register = (account) => axios.post(`${url}/register`,account)

export const resetPassword = (email) => axios.put(`${url}/reset-password`,email)

export const login = (credentials) => axios.post(`${url}/authenticate`,credentials)

export const userProfile = (token) => axios.get(`${url}/authenticate`,
{
    headers:{
        "Authorization":token
    }
})

export const updateUserProfile = (info,token) => axios.put(`${url}/authenticate`, info,
{
    headers:{
        "Authorization":token
    }
})

export const verifyUser = (verificationCode) => axios.get(`${url}/verify-now/${verificationCode}`)

export const rejectVerification = (verificationCode) => axios.get(`${url}/verify-reject/${verificationCode}`)
