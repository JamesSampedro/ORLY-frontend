import {useEffect,useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {ayudaProgram as schema} from "../../validations/adminValidation"
import FormInputText from "../../components/form/FormInputText"
import { useDispatch, useSelector } from "react-redux";
import { getAyudaData, removeServiceResponse } from "../../actions/services";
import {createAyudaProgram,removeAdminResponse} from "../../actions/admin"
import { showToastNotification } from './../../functions/showToastNotification';
import { useHistory } from 'react-router-dom';
import { getAyudaPrograms } from "../../api/admin"
import FormInputSelect from './../../components/form/FormInputSelect';
import axios from 'axios';
import { toppings } from "./criteria" 
import './style.css';

const CreateAyudaProgram = () => {
    const supplyResponse = useSelector((state) => state.services)
    const {supplies,userQuantity} = supplyResponse
    const supplySuccess = supplyResponse.success
    const response = useSelector((state) => state.admin)
    const {success} = response
    const dispatch = useDispatch()
    const history = useHistory()

    const [availableSupplies, setAvailableSupplies] = useState([])
    const [currentSupplyAmount, setCurrentSupplyAmount] = useState(0)
    const [selectedSupply, setSelectedSupply] = useState("")
    const [residentTotal, setResidentTotal] = useState(0)
    const [selectedSupplyAmount, setSelectedSupplyAmount] = useState(0)
    const [ayudaSupply, setAyudaSupply] = useState([])
    const [inputList, setInputList] = useState([{name: "", amount: "", unit: ""}]);
    const [householdList, setHouseholdList] = useState([]);
    const [criteriaList, setCriteriaList] = useState([]);
    const [isChecked, setIsChecked] = useState(false)

    const getFormattedPrice = (price) => `$${price.toFixed(2)}`;
    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
      );
    const [total, setTotal] = useState(0);
    let criteriaArray = []

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
           
            if (currentState === true) {
                criteriaArray.push({"name":`${toppings[index].name}`})
                return criteriaArray;
            }
            return criteriaArray;
            },
            0
        );

        setCriteriaList(criteriaArray)
    };

    const {register, handleSubmit,reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleSupplies = (value) => {
        let supplies = availableSupplies.filter(s => s._id === value)
        let quantity = supplies[0].quantity
        setCurrentSupplyAmount(quantity)
        setSelectedSupply(value)
    }

    const handleAddSupply = (id,name,amount,unit) => {
        let data = {
            _id: id,
            name:name,
            unit:unit,
            amount: amount*residentTotal
        }

        setAyudaSupply([...ayudaSupply, data])
        setAvailableSupplies(availableSupplies.filter((e) => e._id !== data._id))
        setSelectedSupply(availableSupplies[0].itemName)
    }

    const handleCreateAyuda = (data) => {
        let token = localStorage.getItem('authToken')
        const newObj = {
            ...data,
            supplies: ayudaSupply,
        }
        dispatch(createAyudaProgram(newObj,token))
    }

    useEffect(() => {
        //dispatch(removeAdminResponse())
        //dispatch(getAyudaData(token))
        const token = localStorage.getItem('authToken')
        const url = process.env.REACT_APP_BACKEND_URL
        
        let data = {
            "criteria": criteriaList
        }
        axios.get(`${url}/services/api/generate-household`,{headers:{"Authorization":token}})
    },[])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };
       
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
       
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, {name: "", amount: "", unit: ""}]);
      };

      const handleGetQualified = (criteria) => {
        const token = localStorage.getItem("authToken")
        const url = process.env.REACT_APP_BACKEND_URL
        
        let data = {
            "criteria": criteriaList
        }
        axios.post(`${url}/services/api/get-qualified-household`, data,{headers:{"Authorization":token}}).then(
            e => {
                setHouseholdList(e.data.households)
            }
        )
      }

      const handleAyudaSubmit = (data) => {
            const token = localStorage.getItem("authToken")
            const url = process.env.REACT_APP_BACKEND_URL
            var obj = {
                "programName":data.programName,
                "facilitator":data.facilitator,
                "sponsor":data.sponsor,
                "supplies":inputList,
                "criteria":criteriaList
            }

            axios.post(`${url}/services/api/create-ayuda`, obj,{headers:{"Authorization":token}})
                .then(function (response) {
                    if(response.status === 201){
                        showToastNotification("Program Successfully Created!","success")
                        history.push('/program-details')
                    }
                })
                .catch(function (error) {
                        if(error.response.status === 400){
                            showToastNotification(error.response.data.message,"error")
                        }else{
                            showToastNotification("Something Went Wrong!","error")
                        }
                });
      }

    return(
        <>
            <div className="add-equipment-page page">
                <div className="form__wrapper form__wrapper--purple">
                    <h1 className="form__title form__title--purple">AYUDA PROGRAM</h1>
                    <div className="form__container">
                        <form className="form-style">
                            <div className="form-style__header">
                                <h3 className="form__name">Create Ayuda Program</h3>
                                <p className="form__instruction">Please provide all information requested below.</p>
                            </div>
                            <div className="form-style__line">
                                <FormInputText
                                    format={"single"}
                                    name={"programName"}
                                    label={"Program Name"} 
                                    formError={errors.programName?.message}
                                    type={"text"}
                                    inputStyle={"basic"}
                                    placeholder={"ex.ayuda program"}
                                    data={register.programName}
                                    formRegister={register}
                                />
                            </div>
                            <div className="form-style__line">
                                <FormInputText
                                    format={"single"}
                                    name={"facilitator"}
                                    label={"Facilitator"} 
                                    formError={errors.facilitator?.message}
                                    type={"text"}
                                    inputStyle={"basic"}
                                    placeholder={"ex.Ana Santos"}
                                    data={register.facilitator}
                                    formRegister={register}
                                />
                            </div>
                            <div className="form-style__line">
                                <FormInputText
                                    format={"single"}
                                    name={"sponsor"}
                                    label={"Sponsor"} 
                                    formError={errors.sponsor?.message}
                                    type={"text"}
                                    inputStyle={"basic"}
                                    placeholder={"ex.Juan Delacruz"}
                                    data={register.sponsor}
                                    formRegister={register}
                                />
                            </div>
                            {ayudaSupply.length > 0 ? 
                                ayudaSupply.map((e,i) => {
                                    return <p key={i}>{`${e.name} : ${e.amount}`}</p>
                                })
                                :
                                ""
                            }

                            <div style={{width:410}}>
                                <h3>Select Criteria</h3>
                                <ul className="criteria-list">
                                    {toppings.map(({ name, label }, index) => {
                                        return (
                                            <li key={index}>
                                            <div className="criteria-list-item">
                                                <div className="left-section">
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={name}
                                                    value={name}
                                                    checked={checkedState[index]}
                                                    onChange={() => handleOnChange(index)}
                                                />
                                                <label className="criteriaLabel" htmlFor={`custom-checkbox-${index}`}>{label}</label>
                                                </div>
                                            </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="itemsContainer">
                            <h3 className="bottom-spacer">Items for Distribution</h3>
                            {inputList.map((x, i) => {
                                return (
                                    <div className="box">
                                    <input
                                        className="itemName"
                                        name="name"
                                        placeholder="Enter Item Name"
                                        value={x.itemName}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    <input
                                        className="ml10"
                                        name="amount"
                                        placeholder="Quantity"
                                        value={x.amount}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    <input
                                        className="ml10"
                                        name="unit"
                                        placeholder="Unit"
                                        value={x.unit}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    <div className="btn-box">
                                        {inputList.length !== 1 && <button
                                        className="mr10 btn--next"
                                        onClick={() => handleRemoveClick(i)}>Remove</button>}
                                        {inputList.length - 1 === i && 
                                        <button className="mr10 btn--next" onClick={handleAddClick}>Add</button>}
                                    </div>
                                    </div>
                                );
                                })}
                            </div>

                            <button onClick={handleSubmit(handleAyudaSubmit)} className="btn--next">
                                Submit
                            </button> 
                        </form>
                    </div>
                </div>
            </div>
    </>
    )
}

export default CreateAyudaProgram
