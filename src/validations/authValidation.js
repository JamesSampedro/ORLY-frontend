import * as yup from "yup"
import "yup-phone"

export const register1Schema = yup.object().shape({
    firstName: yup.string().required("Please provide your name"),
    middleName: yup.string().required("Please provide your middle name"),
    lastName: yup.string().required("Please provide your last name"),
    address: yup.string().required("Please provide your address"),
    birthday: yup.date().required("Please provide your birthday"),
    age: yup.number().positive().min(1).max(130).integer().required("Please provide your age"),
    maritalStatus: yup.string().required("Please provide your marital status"),
    phoneNumber: yup.string().phone('PH',true,"Provide a valid number").required(),
    gender: yup.string().required("Please provide your gender"),
})

export const register2Schema = yup.object().shape({
    occupation: yup.string().required("Please provide your occupation"),
    category: yup.string().required("Please provide your category"),
    householdNumber: yup.number().positive().min(1).max(99).integer().required("Please provide a valid number"),
    monthsResided: yup.number().positive().min(1).max(99).integer().required("Please provide a valid number"),
    validId: yup.mixed().required("Please upload your valid ID"),
})

export const register3Schema = yup.object().shape({
    username: yup.string().required("Please provide your username").matches(/^[aA-zZ1-9\s]+$/,"Cannot contain special characters"),
    email: yup.string().email().required("Please provide a valid email"),
    password: yup.string().min(4).max(15).required("Password should be 4-15 characters"),
    confirmPassword: yup.string().oneOf([yup.ref("password"),null],"Passwords must match")
})

export const loginSchema = yup.object().shape({
    username: yup.string().required("Please provide your username"),
    password: yup.string().required("Please provide your password"),
})

export const resetPasswordSchema = yup.object().shape({
    email: yup.string().email().required("Please provide a valid email"),
})