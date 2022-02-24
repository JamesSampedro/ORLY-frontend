import axios from 'axios'

// const url = 'https://barangaytenientetiago.xyz:8443/guests/api' 
const url = process.env.REACT_APP_BACKEND_URL+"/guests/api"

export const sendContactUs = (message) => axios.post(`${url}/contact-us`,message)
