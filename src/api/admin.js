import axios from 'axios'


// const url = 'https://barangaytenientetiago.xyz:8443/services/api'
const url = process.env.REACT_APP_BACKEND_URL+"/services/api"

export const createAyudaProgram = (info,token) => axios.post(`${url}/create-ayuda`,info,
{
    headers:{
        "Authorization":token
    }
}).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      //console.log(error.response)
      return error.response
    } else if (error.request) {
      // The request was made but no response was received
      //console.log(error.request);
      return {status: 400, data: {success:false, message:"Something Went Wrong! Please try again later"}}
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });

export const getAyudaPrograms = (token) => axios.get(`${url}/get-ayuda-program`,
{
    headers:{
        "Authorization":token
    }
})

export const deleteAyudaProgram = (id,token) => axios.delete(`${url}/delete-ayuda-program/${id}`,
{
    headers:{
        "Authorization":token
    }
})

export const getRecipients = (id,token) => axios.get(`${url}/get-recipients/${id}`,
{
    headers:{
        "Authorization":token
    }
})

export const getAllApplications = (token) => axios.get(`${url}/get-all-applications`,
{
    headers:{
        "Authorization":token
    }
})


export const updateIndigency = (id,info,token) => axios.put(`${url}/update-indigency/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const updateResidency= (id,info,token) => axios.put(`${url}/update-residency/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const updateCedula = (id,info,token) => axios.put(`${url}/update-cedula/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const updateBarangayClearance= (id,info,token) => axios.put(`${url}/update-barangay-clearance/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const updateBusinessClearance = (id,info,token) => axios.put(`${url}/update-business-clearance/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const updateId = (id,info,token) => axios.put(`${url}/update-id/${id}`,info,
{
    headers:{
        "Authorization":token
    }
})

export const getUnverified = (token) => axios.get(`${url}/get-unverified`,
{
    headers:{
        "Authorization":token
    }
})
