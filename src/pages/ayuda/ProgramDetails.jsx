import ProgramCards from "./ProgramCards"
import {useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAyudaPrograms, removeAdminResponse } from "../../actions/admin";
import { showToastNotification } from './../../functions/showToastNotification';
import Loading from '../../components/loader/Loading';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter.js';
import axios from 'axios';
import moment from "moment";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';


const ProgramDetails = () => {
    const response = useSelector((state) => state.admin)
    const {success,ayuda} = response
    const dispatch = useDispatch()

    
    const [programData, setProgramData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();

    let ayudaDetails = []

    const recipientsData = [{"id":1,"programName":"Ayuda Wave 1","household":"Test's Household","supplies":"100 kg of rice \n 10 kg of canned goods","sponsor":"Teniente Tiago Council","claimedStatus":"Unclaim","dateCreated":"01/01/2022","left":"400","status":"Unclaimed"},
    {"id":2,"programName":"Ayuda Wave 2","household":"New's Household","supplies":"16 kg of rice \n 400 pcs of canned goods","sponsor":"Teniente Tiago Council","claimedStatus":"Unclaim","dateCreated":"01/10/2022","left":"400","status":"Unclaimed"},]

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const url = process.env.REACT_APP_BACKEND_URL
        const axiosPosts = async () => {
            const response = await axios.get(`${url}/services/api/get-ayuda-program`,{headers:{"Authorization":token}})

            let program = response.data.ayuda
            let data
            let householdList = []

            program.forEach(element => {
                let households = element.households
                let dateCreated = moment(element.createdAt).format('YYYY-MM-DD')
                let supplies = element.supplies
                let householdCount = households.length
                let supplyDetails = ""
                let supplyLeft = ""

                supplies.forEach(function(i, idx, array) {
                    let perHousehold = i.perHousehold*householdCount
                    let left = i.left

                    if (idx === array.length - 1){ 
                        supplyLeft = supplyLeft + " " + i.left + "" + i.unit + " " +i.name + " "
                        supplyDetails = supplyDetails + " " + i.perHousehold + "" + i.unit + " " +i.name + " "
                    }else{
                        supplyLeft = supplyLeft + " " + i.left + "" + i.unit + " " +i.name + ", "
                        supplyDetails = supplyDetails + " " + i.perHousehold + "" + i.unit + " " +i.name + ", "
                    }
                });

                households.forEach(he => {
                    let status = ""
                    
                    if(he.claimedStatus === "true"){
                        status = "Claimed"
                    }else{
                        status = "Unclaimed"
                    }

                    data = {
                        _id:element._id,
                        "household":he.name,
                        "programName":element.programName,
                        "sponsor":element.sponsor,
                        "facilitator":element.facilitator,
                        "dateCreated":dateCreated,
                        "supplies":supplyDetails,
                        "left": supplyLeft,
                        "status": status,
                    }

                    householdList.push(data)
                });
            });
            setProgramData(householdList)
            setIsLoading(false)
        }

        axiosPosts()
    },[])

    const handleViewClick = (data) => {
        localStorage.setItem("programName", data.programName)
        localStorage.setItem("householdId", data.householdId)
        localStorage.setItem("householdName", data.household)
        history.push("/view-admin-household")
    }

    const handleUpdateClick = (data) => {
        const token = localStorage.getItem('authToken')
        const url = process.env.REACT_APP_BACKEND_URL

        let body = {
            "_id": data._id,
            "name":data.household,
            "status":data.status,
        }
        
        const axiosPosts = async () => {
            const response = await axios.post(`${url}/services/api/update-ayuda-program`,body,{headers:{"Authorization":token}})
            let program = response.data.ayuda
            let data
            let householdList = []

            program.forEach(element => {
                let households = element.households
                let dateCreated = moment(element.createdAt).format('YYYY-MM-DD')
                let supplies = element.supplies
                let householdCount = households.length
                let supplyDetails = ""
                let supplyLeft = ""

                supplies.forEach(function(i, idx, array) {
                    let perHousehold = i.perHousehold*householdCount
                    let left = i.left

                    if (idx === array.length - 1){ 
                        supplyLeft = supplyLeft + " " + i.left + "" + i.unit + " " +i.name + " "
                        supplyDetails = supplyDetails + " " + i.perHousehold + "" + i.unit + " " +i.name + " "
                    }else{
                        supplyLeft = supplyLeft + " " + i.left + "" + i.unit + " " +i.name + ", "
                        supplyDetails = supplyDetails + " " + i.perHousehold + "" + i.unit + " " +i.name + ", "
                    }
                });

                households.forEach(he => {
                    let status = ""
                    
                    if(he.claimedStatus === "true"){
                        status = "Claimed"
                    }else{
                        status = "Unclaimed"
                    }

                    data = {
                        _id:element._id,
                        "household":he.name,
                        "programName":element.programName,
                        "sponsor":element.sponsor,
                        "facilitator":element.facilitator,
                        "dateCreated":dateCreated,
                        "supplies":supplyDetails,
                        "left": supplyLeft,
                        "status": status,
                    }

                    householdList.push(data)
                });
            });
            setProgramData(householdList)
        }
        axiosPosts()
    }

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => programData, [programData])

    const tableInstance = useTable ({
        columns,
        data
    },
    useGlobalFilter, useSortBy, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        state,
        setGlobalFilter,
    } = tableInstance

    const { globalFilter } = state
    const { pageIndex} = state

    // useEffect(() => {
    //     if(success){
    //         if(ayuda !== undefined){
    //             localStorage.setItem("ayuda", JSON.stringify(ayuda));
    //             setProgramData(ayuda)
    //             setIsLoading(false)
    //         }else {
    //             var storedAyuda = JSON.parse(localStorage.getItem("ayuda"));
    //             ayudaDetails = storedAyuda
    //             setProgramData(ayudaDetails)
    //             setIsLoading(false)
    //         }
    //     }else if(success === false){
    //         showToastNotification("Something went wrong! Please try again later","error")
    //     }
    //     dispatch(removeAdminResponse)
    // },[success])

    if(isLoading == true){
        return (<Loading/>)
    }else {
    return(
        <>
            <h1 className="page-header">AYUDA PROGRAM DETAILS</h1>
          <div className="equipment-inventory-page page">
                    <div className="residents-table-wrapper">
                    {
                       recipientsData.length > 0 ?
                        <>
                            <GlobalFilter filter = {globalFilter} setFilter={setGlobalFilter} />
                            <table {...getTableProps()}>
                                <thead>
                                    {headerGroups.map((headerGroup)=>(
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column)=>(
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? ' ▼ ' : ' ▲ ') : ''}
                                                </span>
                                                </th>
                                            ))}
                                          <th>Actions</th>
                                        </tr>
                                    ))}
                                </thead>
                        
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row) => {
                                        if(row.values.mobile === undefined){
                                            row.values.mobile = "-"
                                        }
                                        prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell)=>{
                                                        return(
                                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                        ) 
                                                    })}
                                                   <td className='data--centered'>
                                                   <button className='btn--blue txt--white' onClick={(e) => handleViewClick(row.original)}>View</button>
                                                   {/* <Link className='btn--blue txt--white' to={`/view-admin-household`}>View</Link> */}
                                                   
                                                    <button 
                                                    className='btn--blue txt--white' onClick={(e) => handleUpdateClick(row.original)}>
                                                    Update</button>
                                                    
                                                </td>
                                                    
                                                </tr>
                                            )
                                        
                                    })}
                                </tbody>
                            </table>
                            <span className='page-number'>
                                    Page {''}
                                    <strong>
                                        {pageIndex + 1} of {pageOptions.length}
                                    </strong>
                            </span>
                            {recipientsData.length > 10 ? 
                            <div className='table-btn--wrapper'>
                                <button onClick={previousPage} disabled={!canPreviousPage} className='btn--prev'>Previous</button>
                                <button onClick={nextPage} disabled={!canNextPage} className='btn--next'>Next</button>
                            </div> :
                            ""}
                            
                        </> : 
                        <h1 style={{textAlign: "center"}}>No Programs Available</h1>
                   
                    }
                    </div>
                   
                </div>
        </>
    )}
}

export default ProgramDetails