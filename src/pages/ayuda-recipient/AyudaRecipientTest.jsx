import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo, useState,useEffect } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteEquipment, removeServiceResponse, getAllRecipients } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';

    
const AyudaRecipientTable = () => {
    const response = useSelector((state) => state.services)
    const {success,recipients} = response
    // const {success,users} = response
    const dispatch = useDispatch()
    const [mockData,setMockData] = useState([
    ])


    useEffect(() => {
        const token = localStorage.getItem("authToken")
        dispatch(getAllRecipients('61ed75d4f5fd8679f9d6c07c',token))
        //dispatch(getAllUsers(token))
    },[])

    useEffect(() => {
        if(success){
            setMockData(recipients)
        }else if(success === false){
            showToastNotification("Something Went Wrong","error")
        }
    },[success])

    console.log(mockData)
    return (
        <>
        <h1 className="page-header">Recipient List</h1>
    </>
    )
};


export default AyudaRecipientTable;
   