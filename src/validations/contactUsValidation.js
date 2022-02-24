import * as yup from "yup"

export const contactUsSchema = yup.object().shape({
    fullName: yup.string().required("Please provide your full name"),
    email: yup.string().email().required("Please provide a valid email"),
    message: yup.string().min(30,"Should be at least 30 characters").max(300,"Should be below 300 characters").required("Please provide a message")
})