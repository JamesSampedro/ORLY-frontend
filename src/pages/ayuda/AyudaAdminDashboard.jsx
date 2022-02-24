import AyudaButton from "./AyudaButton"
import NewProgramImg from "../../img/ayuda-admin/NewProgram.png"
import ViewProgramImg from "../../img/ayuda-admin/ProgramDetails.png"
import SuppliesInventoryImg from '../../img/ayuda-admin/GenerateRecipient.png'
import ViewRegiteredProfilesImg from '../../img/ayuda-admin/RegisteredProfiles.png'
import ApplicationRequestsImg from '../../img/ayuda-admin/documentApplication.png'
import EquipmentInventoryImg from '../../img/ayuda-admin/equipmentInventory.png'
import VaccinationImg from '../../img/ayuda-admin/vaccinationData.png'
import SalesImg from '../../img/ayuda-admin/totalSales.png'
import ResidentImg from '../../img/ayuda-admin/resident.png'
import VerificationImg from '../../img/ayuda-admin/verification.png'
import React, { useMemo, useState, useEffect } from 'react';
import axios from "axios"

const AyudaAdminDashboard = () => {
    const url = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        async function asyncFunc() {
            const loaded = localStorage.getItem("loaded")

            if(loaded !== "true"){
                const equipmentResponse = await 
                    axios.get(`${url}/services/api/get-all-equipment`);
                localStorage.setItem("equipments", JSON.stringify(equipmentResponse.data.equipments));

                const salesResponse = await
                    axios.get(`${url}/services/api/get-all-sales`,{headers:{"Authorization":token}})
                localStorage.setItem("sales", JSON.stringify(salesResponse.data.sales));

                const ayudaProgramResponse = await
                    axios.get(`${url}/services/api/get-ayuda-program`,{headers:{"Authorization":token}})
                localStorage.setItem("ayuda", JSON.stringify(ayudaProgramResponse.data.ayuda));

                if(ayudaProgramResponse.data.ayuda.length > 0){
                    const programId = ayudaProgramResponse.data.ayuda[0]._id
                    const ayudaRecipientsResponse = await
                        axios.get(`${url}/services/api/get-recipients/${programId}`,{headers:{"Authorization":token}})
                        localStorage.setItem("recipients", JSON.stringify(ayudaRecipientsResponse.data.recipients));
                }

                const usersResponse = await
                    axios.get(`${url}/services/api/get-all-users`,{headers:{"Authorization":token}})
                localStorage.setItem("users", JSON.stringify(usersResponse.data.users));

                const suppliesResponse = await
                    axios.get(`${url}/services/api/get-supplies`,{headers:{"Authorization":token}})
                localStorage.setItem("supplies", JSON.stringify(suppliesResponse.data.supplies));

                const applicationsResponse = await
                    axios.get(`${url}/services/api/get-all-applications`,{headers:{"Authorization":token}})
                localStorage.setItem("applications", JSON.stringify(applicationsResponse.data.applications));

                localStorage.setItem("loaded", JSON.stringify(true));
            }else{
                console.log("Loaded")
            }
          }
        
        asyncFunc()
    },[])

    return (
        <div>
            <div className="ayuda-button--wrapper">
                <div className="ayuda-button--pair">
                    <AyudaButton 
                    src={NewProgramImg} 
                    alt={"Ayuda Program Form"} 
                    name={"Ayuda Program Form"}
                    imgColor={"bg--dark-blue"}
                    buttonBgColor={"ayuda-button-bg--blue"}
                    link={"/create-ayuda-program"}
                    />
                    <AyudaButton 
                    src={ViewProgramImg} 
                    alt={"Program Details"} 
                    name={"Program Details"}
                    imgColor={"bg--gold-yellow"}  
                    buttonBgColor={"ayuda-button-bg--yellow"}
                    link={"/program-details"}
                    />
                     <AyudaButton 
                    src={ResidentImg} 
                    alt={"Residents"} 
                    name={"Residents"}
                    imgColor={"bg--brown"}
                    buttonBgColor={"ayuda-button-bg--brown"}
                    link={"/residents"}
                    /> 
                </div>
                <div className="ayuda-button--pair">     
                    <AyudaButton 
                    src={ViewRegiteredProfilesImg} 
                    alt={"Registered Accounts"} 
                    name={"Registered Accounts"}
                    imgColor={"bg--blue-green"}
                    buttonBgColor={"ayuda-button-bg--green"}
                    link={"/registered-profile-admin"}
                    />
                    <AyudaButton 
                    src={EquipmentInventoryImg} 
                    alt={"Barangay Equipment"} 
                    name={"Barangay Equipment"}
                    imgColor={"bg--red-solid"}
                    buttonBgColor={"bg--red-gradient"}
                    link={"/equipment-inventory-admin"}
                    />
                     <AyudaButton 
                    src={VaccinationImg} 
                    alt={"Vaccination Data"} 
                    name={"Vaccination Data"}
                    imgColor={"bg--green-solid"}
                    buttonBgColor={"bg--green-gradient"}
                    link={"/update-vaccination-data"}
                    />
                </div>    
                <div className="ayuda-button--pair">
                    <AyudaButton 
                    src={ApplicationRequestsImg} 
                    alt={"Application Requests"} 
                    name={"Application Requests"}
                    imgColor={"bg--violet"}
                    buttonBgColor={"bg--violet-gradient"}
                    link={"/application-requests"}
                    />
                    <AyudaButton 
                    src={SalesImg} 
                    alt={"Total Sales"} 
                    name={"Online Document Sales"}
                    imgColor={"bg--lightblue-solid"}
                    buttonBgColor={"bg--lightblue-gradient"}
                    link={"/application-sales"}
                    />  
                    <AyudaButton 
                    src={VerificationImg} 
                    alt={"Pending Verifications"} 
                    name={"Pending Verifications"}
                    imgColor={"bg--lightpurple-solid"}
                    buttonBgColor={"bg--lightpurple-gradient"}
                    link={"/user-verification"}
                    />              
                </div>
                {/* <div className="ayuda-button--pair">
                    <AyudaButton 
                    src={ApplicationRequestsImg} 
                    alt={"User Verification"} 
                    name={"User Verification"}
                    imgColor={"bg--violet"}
                    buttonBgColor={"bg--violet-gradient"}
                    link={"/user-verification"}
                    />                         
                </div> */}
            </div>
            
        </div>
    )
}

export default AyudaAdminDashboard
