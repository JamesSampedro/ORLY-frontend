import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './GuestTableColumns';
import React, { useMemo } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter.js';
import { Link } from 'react-router-dom';
import {useEffect,useState} from "react"
import axios from 'axios';
import moment from "moment";
import { useHistory } from 'react-router-dom';
import Loading from '../../components/loader/Loading';


 const GuestTable = () => {
    const [programData, setProgramData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const url = process.env.REACT_APP_BACKEND_URL
        const axiosPosts = async () => {
            const response = await axios.get(`${url}/services/api/get-ayuda-program-guest`,{headers:{"Authorization":token}})

            let program = response.data.ayuda
            let data
            let ayudaData = []

            program.forEach(element => {
                let dateCreated = moment(element.createdAt).format('YYYY-MM-DD')
                let criteriaData = ''
                let supplies = element.supplies
                let supplyDetails = ""
                let criteria = element.criteria

                if(criteria.length > 0){
                    criteria.forEach(function(i, idx, array) {
                        if (idx === array.length - 1){ 
                            criteriaData = criteriaData + i.name + " "
                        }else {
                            criteriaData = criteriaData + i.name + ", "
                        }
                    });
                }else{
                    criteriaData = "All Residents"
                }

                supplies.forEach(function(i, idx, array) {
                    if (idx === array.length - 1){ 
                        supplyDetails = supplyDetails + " " + i.total + "" + i.unit + " " +i.name + " "
                    }else{
                        supplyDetails = supplyDetails + " " + i.total + "" + i.unit + " " +i.name + ", "
                    }
                });

                data = {
                    _id:element._id,
                    "programName":element.programName,
                    "criteria":element.criteria,
                    "sponsor":element.sponsor,
                    "criteria":criteriaData,
                    "supplies":supplyDetails,
                    "dateCreated":dateCreated,
                }
                
                ayudaData.push(data)
            });

            setProgramData(ayudaData)
            setIsLoading(false)
        }

        axiosPosts()
    },[])

    const handleViewClick = (data) => {
        localStorage.setItem("programName", data.programName)
        history.push("/view-guest-household")
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


    if(isLoading == true){
        return (<Loading/>)
    }else {

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
                                                   
                                                   <button className='btn--blue txt--white' onClick={(e) => handleViewClick(row.original)}>View</button>
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
    )}
}
export default GuestTable