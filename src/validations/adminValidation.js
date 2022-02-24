import * as yup from "yup"
import "yup-phone"

export const addEquipment = yup.object().shape({
    itemName: yup.string().required("Please provide the item's name")
})

export const vaccinationData = yup.object().shape({
    firstDose: yup.number().positive().min(1).required("please provide residents that got first dose"),
    secondDose: yup.number().positive().min(1).required("please provide residents that got second dose"),
    residents: yup.number().positive().min(1).required("please provide the total number of residents"),
})

export const addSupply = yup.object().shape({
    itemName: yup.string().required("Please provide the item's name"),
    unit: yup.string().required("Please provide the unit of measurement"),
    quantity: yup.number().positive().min(1).required("please provide the number of items"),
})

export const ayudaProgram = yup.object().shape({
    programName: yup.string().required("Please provide the program's name"),
    facilitator: yup.string().required("Please provide the facilitator's name"),
    sponsor: yup.string().required("Please provide the sponsor's name"),
})

export const Residents = yup.object().shape({
    firstName: yup.string().required("Please provide resident's first name"),
    lastName: yup.string().required("Please provide resident's last name"),
    middleName: yup.string().required("Please provide resident's middle name"),
    address: yup.string().required("Please provide resident's address"),
    age: yup.number().positive().min(1).required("please provide resident's age"),
    monthsResided: yup.number().positive().min(1).required("please provide resident's months resided"),
    householdNumber: yup.number().positive().min(1).required("please provide resident's household"),
    mobile: yup.string().phone('PH',true,"Provide a valid number").required(),
})