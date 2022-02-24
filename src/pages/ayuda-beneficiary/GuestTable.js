import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import {useEffect,useState} from "react"
import { useHistory } from 'react-router-dom';

 const GuestTable = () => {
    const programData = [{"id":1,"programName":"Ayuda Wave 1","criteria":"PWD, senior","supplies":"100 kg of rice \n 10 kg of canned goods","sponsor":"Teniente Tiago Council","dateCreated":"01/01/2022"},
        {"id":2,"programName":"Ayuda Wave 2","criteria":"PWD, senior","supplies":"16 kg of rice \n 400 pcs of canned goods","sponsor":"Teniente Tiago Council","dateCreated":"01/10/2022"},
    ]
    // const [programData, setProgramData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken')
    //     const url = process.env.REACT_APP_BACKEND_URL
    //     const axiosPosts = async () => {
    //         const response = await axios.get(`${url}/services/api/get-ayuda-program-guest`)

    //         let program = response.data.ayuda
    //         let data
    //         let householdList = []

    //         program.forEach(element => {
    //             let households = element.households
    //             let dateCreated = moment(element.createdAt).format('YYYY-MM-DD')
    //             let supplies = element.supplies
    //             let householdCount = households.length
    //             let supplyDetails = ""
    //             let supplyLeft = ""

    //             supplies.forEach(function(i, idx, array) {
    //                 let perHousehold = i.perHousehold*householdCount
    //                 let left = i.left

    //                 if (idx === array.length - 1){ 
    //                     supplyLeft = supplyLeft + " " + i.left + "" + i.unit + " " +i.name + " "
    //                     supplyDetails = supplyDetails + " " + i.perHousehold + "" + i.unit + " " +i.name + " "
    //                 }else{
    //                     supplyLeft = supplyLeft + " " + i.left + "" + i.unit + " " +i.name + ", "
    //                     supplyDetails = supplyDetails + " " + i.perHousehold + "" + i.unit + " " +i.name + ", "
    //                 }
    //             });

    //             households.forEach(he => {
    //                 let status = ""
                    
    //                 if(he.claimedStatus === "true"){
    //                     status = "Claimed"
    //                 }else{
    //                     status = "Unclaimed"
    //                 }

    //                 data = {
    //                     _id:element._id,
    //                     "household":he.name,
    //                     "programName":element.programName,
    //                     "sponsor":element.sponsor,
    //                     "facilitator":element.facilitator,
    //                     "dateCreated":dateCreated,
    //                     "supplies":supplyDetails,
    //                     "left": supplyLeft,
    //                     "status": status,
    //                 }

    //                 householdList.push(data)
    //             });
    //         });
    //         setProgramData(householdList)
    //         setIsLoading(false)
    //     }

    //     axiosPosts()
    // },[])

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

    const handleViewClick = (data) => {
        // localStorage.setItem("programName", data.programName)
        // localStorage.setItem("householdId", data.householdId)
        // localStorage.setItem("householdName", data.household)
        history.push("/view-guest-household")
    }

    return (
        <>
        <h1 className="page-header">AYUDA PROGRAM DETAILS</h1>
          <div className="equipment-inventory-page page">
                    <div className="residents-table-wrapper">
                    {
                      programData.length > 0 ?
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
                                          <th>Household Members</th>
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
                                                    {/* <button 
                                                    className='btn--blue txt--white' link to= {`/pages/ayuda-beneficiary/view-guest-household`}>
                                                    View</button> */}
                                                    {/* <button className='btn--blue txt--white' onClick={(e) => handleViewClick(row.original)}>View</button> */}
                                                    {/* <button className='btn--blue txt--white'>View</button> */}
                                                    <Link className='btn--blue txt--white' to={`/view-guest-household`}>View</Link>
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
                            {programData.length > 10 ? 
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
    )
}
export default GuestTable