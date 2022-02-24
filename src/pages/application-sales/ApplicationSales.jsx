import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo, useState,useEffect } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { useDispatch, useSelector } from "react-redux";
import { getSales, removeServiceResponse } from '../../actions/services';
import { showToastNotification } from './../../functions/showToastNotification';
import Loading from '../../components/loader/Loading';

const ApplicationSales = () => {
    const response = useSelector((state) => state.services)
    const {success,sales} = response
    const dispatch = useDispatch()

    const [salesData,setSalesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        dispatch(getSales(token))
    },[])

    useEffect(() => {
        if(success){
            if(sales === undefined){
                const salesData = JSON.parse(localStorage.getItem("sales"))
                setSalesData(salesData)
            }else{
                setSalesData(sales)
            }
            setIsLoading(false)
        }else if(success === false){
            showToastNotification("Something Went Wrong","error")
        }
        dispatch(removeServiceResponse())
    },[success])
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => salesData, [salesData])
    
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
            <h1 className="page-header">Document Sales</h1>
            {salesData.length > 0 ?
                <div className="table-wrapper">
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
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell)=>{
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div>
                    <span className='page-number'>
                            Page {''}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong> {''}
                        </span>
                        {salesData.length > 10 ? 
                                <div className='table-btn--wrapper'>
                                    <button onClick={previousPage} disabled={!canPreviousPage} className='btn--prev'>Previous</button>
                                    <button onClick={nextPage} disabled={!canNextPage} className='btn--next'>Next</button>
                                </div> :
                                ""}
                    </div>
                </div>   
            :
                <h1 style={{textAlign:"center"}}>No sales record available</h1>
        }   
        </>
        )
    }
};

export default ApplicationSales;
