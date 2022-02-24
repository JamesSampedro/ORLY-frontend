import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { RECIPIENTS } from './AyudaAdminHousehold';
import React, { useMemo } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter.js';
import { Link } from 'react-router-dom';
import {useEffect,useState} from "react"
import axios from 'axios';
import moment from "moment";
import { useHistory } from 'react-router-dom';
import Loading from '../../components/loader/Loading';


 const HouseholdTable = () => {
    const [programData, setProgramData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();
    const [programName,setProgramName] = useState("")
    const [recipientsData, setRecipientsData] = useState([])

    useEffect(() => {
        setProgramName(localStorage.getItem('programName'))
        const url = process.env.REACT_APP_BACKEND_URL

        const axiosPosts = async () => {
            const response = await axios.get(`${url}/services/api/get-program/${localStorage.getItem('programName')}`)

            let program = response.data.program
            let data
            let ayudaData = []
            let households = program.households
            let householdList = []
            let dateCreated = moment(program.createdAt).format('YYYY-MM-DD')
            localStorage.setItem("programId", program._id)

            households.forEach(element => {
                let status = ""

                if(element.claimedStatus === "true"){
                    status = "Claimed"
                }else{
                    status = "Unclaimed"
                }

                data = {
                    _id:element._id,
                    "household":element.name,
                    "address":element.householdAddress,
                    "status": status,
                }

                householdList.push(data)
            });
            setProgramData(householdList)
            setIsLoading(false)

        }

        axiosPosts()
    },[])

    const handleUpdateClick = (data) => {
        const token = localStorage.getItem('authToken')
        const url = process.env.REACT_APP_BACKEND_URL

        let body = {
            "_id": localStorage.getItem('programId'),
            "name":data.household,
            "status":data.status,
        }
        
        const axiosPosts = async () => {
            await axios.post(`${url}/services/api/update-ayuda-program`,body,{headers:{"Authorization":token}})
            
            const response = await axios.get(`${url}/services/api/get-program/${localStorage.getItem('programName')}`)

            let program = response.data.program
            let data
            let ayudaData = []
            let households = program.households
            let householdList = []
            let dateCreated = moment(program.createdAt).format('YYYY-MM-DD')
            localStorage.setItem("programId", program._id)

            households.forEach(element => {
                let status = ""

                if(element.claimedStatus === "true"){
                    status = "Claimed"
                }else{
                    status = "Unclaimed"
                }

                data = {
                    _id:element._id,
                    "household":element.name,
                    "address":element.householdAddress,
                    "status": status,
                }

                householdList.push(data)
            });
            setProgramData(householdList)
        }
        axiosPosts()
    }

    const handleViewClick = (data) => {
        localStorage.setItem("householdName", data.household)
        history.push("/view-admin-householdmembers")
    }

    const columns = useMemo(() => RECIPIENTS, [])
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


    if(isLoading == true){
        return (<Loading/>)
    }else {

    return (
        <>
        <h1 className="page-header">{programName}</h1>
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
                                                    <button 
                                                    className='btn--blue txt--white' onClick={(e) => handleUpdateClick(row.original)}>
                                                    Update</button>
                                                    <button className='btn--blue txt--white' onClick={(e) => handleViewClick(row.original)}>View</button>
                                                    {/* <Link className='btn--blue txt--white' to={`/view-admin-householdmembers`}>View</Link> */}

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
                        <h1 style={{textAlign: "center"}}>No Households Available</h1>
                   
                    }
                    </div>
                   
                </div>
</>
    )}
}
export default HouseholdTable