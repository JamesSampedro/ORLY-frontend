import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { RECIPIENTS } from './HouseholdColumn';
import React, { useMemo, useState,useEffect } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter.js';
import axios from 'axios';


 const HouseholdMembers = () => {
    
    const [programName,setProgramName] = useState("")
    const [householdName,setHouseholdName] = useState("")
    const [recipientsData, setRecipientsData] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        let household = localStorage.getItem('householdName')
        setProgramName(localStorage.getItem('programName'))
        setHouseholdName(household)
        const url = process.env.REACT_APP_BACKEND_URL

        const axiosPosts = async () => {
            const response = await axios.get(`${url}/services/api/get-household/${household}`)
            let residents = response.data.household.residents

            setRecipientsData(residents)
        }

        axiosPosts()
        console.log(programName)
    },[])

    const columns = useMemo(() => RECIPIENTS, [])
    const data = useMemo(() => recipientsData, [recipientsData])
    
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

    return (
        <>
        <h1 className="page-header-guest">{programName} - {householdName}</h1>
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
                                                   {/* <td className='data--centered'>
                                                    <button 
                                                    className='btn--blue txt--white'>
                                                    View</button>
                                                </td> */}
                                                    
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
                        <h1 style={{textAlign: "center"}}>No Residents Available</h1>
                   
                    }
                    </div>
                   
                </div>
</>
    )
}
export default HouseholdMembers