import * as yup from "yup"
import "yup-phone"

export const barangayClearance = yup.object().shape({
    fullName: yup.string().required("Please provide your full name"),
    address: yup.string().required("Please provide your address"),
    issuedFor: yup.string().required("Please provide your reason for requesting clearance"),
})

export const indigency = yup.object().shape({
    fullName: yup.string().required("Please provide your full name"),
    address: yup.string().required("Please provide your address"),
    issuedFor: yup.string().required("Please provide your reason for requesting clearance"),
})

export const residency = yup.object().shape({
    fullName: yup.string().required("Please provide your full name"),
    address: yup.string().required("Please provide your address"),
    livingSince: yup.number().positive().min(1900).max(2022).required("please fill up this field"),
})

export const cedula = yup.object().shape({
    fullName: yup.string().required("Please provide your full name"),
    address: yup.string().required("Please provide your address"),
    tin:yup.string(),
    birthday: yup.date().required("Please provide the your birthday"),
    birthplace: yup.string().required("Please provide your birthplace"),
    gender: yup.string().required("Please provide your gender"),
    maritalStatus: yup.string().required("Please provide your marital status"),
    height: yup.number().positive().min(1).max(999).required("please provide your height"),
    weight: yup.number().positive().min(1).max(999).required("please provide your weight"),
    occupation: yup.string().required("Please provide your occupation/profession"),
    citizenship: yup.string().required("Please provide your citizenship"),
    
})

export const businessClearance = yup.object().shape({
    fullName: yup.string().required("Please provide your full name"),
    address: yup.string().required("Please provide your address"),
    businessType: yup.string().required("Please provide the type of your business"),
})


export const IdApplication = yup.object().shape({
    lastName: yup.string().required("Please provide your last name"),
    firstName: yup.string().required("Please provide your first name"),
    middleName: yup.string().required("Please provide your middle name"),
    designation: yup.string().required("Please provide your designation"),
    address: yup.string().required("Please provide your address"),
    gender: yup.string().required("Please provide your gender"),
    birthday: yup.date().required("Please provide the your birthday"),
    sss:yup.string(),
    tin:yup.string(),
    contactNumber: yup.string().phone('PH',true,"Provide a valid number").required(),
    emergencyContact: yup.string().phone('PH',true,"Provide a valid number").required(),
    picture: yup.mixed().required("Please upload your 2x2 Picture"),
    signature: yup.mixed().required("Please upload your digital signature"),
})

