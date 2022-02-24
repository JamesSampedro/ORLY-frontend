import axios from 'axios'


// const url = 'https://barangaytenientetiago.xyz:8443/services/api'
const url = process.env.REACT_APP_BACKEND_URL+"/services/api"

export const createCertificateOfIndigency = (info,token) => axios.post(`${url}/create-certificate-of-indigency`, info,
{
    headers:{
        "Authorization": token
    }
})

export const createCertificateOfResidency = (info,token) => axios.post(`${url}/create-certificate-of-residency`, info,
{
    headers:{
        "Authorization": token
    }
})

export const createCedula = (info,token) => axios.post(`${url}/create-cedula`, info,
{
    headers:{
        "Authorization": token
    }
})

export const createBarangayClearance = (info,token) => axios.post(`${url}/create-barangay-clearance`, info,
{
    headers:{
        "Authorization": token
    }
})

export const createBusinessClearance = (info,token) => axios.post(`${url}/create-business-clearance`, info,
{
    headers:{
        "Authorization": token
    }
})

export const createIdApplication = (info,token) => axios.post(`${url}/create-id-application`, info,
{
    headers:{
        "Authorization": token
    }
})

export const getUserApplications = (token) => axios.get(`${url}/get-user-applications`,
{
    headers:{
        "Authorization": token
    }
})


export const addEquipment = (info,token) => axios.post(`${url}/add-equipment`, info,
{
    headers:{
        "Authorization":token
    }
})

export const getAllEquipment = () => axios.get(`${url}/get-all-equipment`) 

export const deleteEquipment = (info,token) => axios.delete(`${url}/delete-equipment/${info}`,
{
    headers:{
        "Authorization":token
    }
})

export const updateVaccinationData = (info,token,vaxxDate) => axios.put(`${url}/update-vaccination-data`,{ ...info, ...vaxxDate },
{
    headers:{
        "Authorization":token
    }
})

export const getVaccinationData = (month, year) => axios.get(`${url}/vaccination-data`)

export const deleteResident = (id, token) => axios.delete(`${url}/delete-resident/${id}`, 
{
    headers: { 
        "Authorization": token
    }
})



export const getAllUsers = (token) => axios.get(`${url}/get-all-users`,
{
    headers:{
        "Authorization":token
    }
})

export const addSupply = (info,token) => axios.post(`${url}/add-supply`,info,
{
    headers:{
        "Authorization":token
    } 
})

export const getSupplies = (token) => axios.get(`${url}/get-supplies`,
{
    headers:{
        "Authorization":token
    } 
})

export const getSupply = (id,token) => axios.get(`${url}/get-supply/${id}`,
{
    headers:{
        "Authorization":token
    } 
})

export const deleteSupply = (id,token)=> axios.delete(`${url}/delete-supply/${id}`,{
    headers:{
        "Authorization":token
    }
})

export const updateSupply = (id,info,token) => axios.put(`${url}/update-supply/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const getAyudaData = (token) => axios.get(`${url}/ayuda-data`,{
    headers:{
        "Authorization":token
    }
})

export const uploadProof = (id,info,token) => axios.put(`${url}/proof-payment/${id}`,info,{
    headers:{
        "Authorization":token
    }
})

export const getSales = (token) => axios.get(`${url}/get-all-sales`,{
    headers:{
        "Authorization":token
    }
})

export const getAllRecipients = (id,token) => axios.get(`${url}/get-recipients/${id}`,
{
    headers:{
        "Authorization":token
    }
})

export const setRecipientStatus = (id,token,info) => axios.put(`${url}/set-recipient-status/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const getAllResidents = (token) => axios.get(`${url}/get-all-residents`,
{
    headers:{
        "Authorization":token
    }
})
export const updateResident= (id,info,token) => axios.put(`${url}/update-resident/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const getResident = (id,token) => axios.get(`${url}/get-resident/${id}`,
{
    headers:{
        "Authorization":token
    } 
})

