import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { RECIPIENTS } from './HouseholdColumn';
import React, { useMemo } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import {useEffect,useState} from "react"
import { useHistory } from 'react-router-dom';

 const Household = () => {
    const programData = [{"id":1,"household":"Doe's Household","address":"Blk 6, Lot 31"},
    {"id":2,"household":"Doe's Household","address":"Blk 6, Lot 31"},
    ]

 

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



    return (
        <>
        <h1 className="page-header">PROGRAM NAME</h1>
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
export default Household