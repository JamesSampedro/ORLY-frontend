import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo, useState, useEffect } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getSupplies,deleteSupply, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import UpdateSupply from './UpdateSupply';
import Loading from '../../components/loader/Loading';

const SupplyInventoryAdmin = () => {
    const response = useSelector((state) => state.services)
    const {success,supplies} = response
    const dispatch = useDispatch()
    const [currentId,setCurrentId] = useState('')
    const [isUpdating,setIsUpdating] = useState(false)

    const [mockData,setMockData] = useState([])

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => mockData, [mockData])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        dispatch(getSupplies(token))
    },[])

    useEffect(() => {
        if(success){
            setMockData(supplies)
            setIsLoading(false)
        }else if(success === false){
            showToastNotification("Something Went Wrong","error")
        }
        dispatch(removeServiceResponse())
    },[success])

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
        prepareRow,
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,

    } = tableInstance

    const { globalFilter } = state
    const { pageIndex} = state

    const handleUpdate = (e) => {
        setCurrentId(e.target.value)
        setIsUpdating(true)
    }

    const handleDelete = (e) => {
        const token = localStorage.getItem('authToken')
        dispatch(deleteSupply(e.target.value,token))
    }

    const handleCancel = () => {
        setIsUpdating(false)
        setCurrentId("")
    }

    if(isLoading === true){
        return (<Loading/>)
    }else {
    return(
        <>
            <h1 className="page-header">Supply Inventory</h1>
            <div className="equipment-inventory-page page">
                <div className="table-wrapper">
                {!isUpdating ?
                    mockData.length > 1 ?
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
                                            <th>Modify Supply</th>  
                                        </tr>
                                    ))}
                                </thead>
                        
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row) => {
                                        prepareRow(row)
                                        if(row['id'] !== '0'){
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell)=>{
                                                        return(
                                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                        ) 
                                                    })}
                                                    <td className='data--centered'>
                                                        <button 
                                                        className='btn--blue txt--white'
                                                        onClick={handleUpdate}
                                                        value={row.original._id}
                                                        >Update</button>
                                                        <button 
                                                        className='btn--red txt--white'
                                                        onClick={handleDelete}
                                                        value={row.original._id}
                                                        >Delete</button>
                                                    </td>
                                                            
                
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                            <span className='page-number'>
                                    Page {''}
                                    <strong>
                                        {pageIndex + 1} of {pageOptions.length}
                                    </strong>
                            </span>
                            {mockData.length > 10 ? 
                            <div className='table-btn--wrapper'>
                                <button onClick={previousPage} disabled={!canPreviousPage} className='btn--prev'>Previous</button>
                                <button onClick={nextPage} disabled={!canNextPage} className='btn--next'>Next</button>
                            </div> :
                            ""}
                            
                        </> : 
                        <h1 style={{textAlign: "center"}}>No Supply Available</h1>
                    :
                    <UpdateSupply id={currentId}
                    setIsUpdating={setIsUpdating}
                    setCurrentId={setCurrentId}/>
                }
                
                
                </div>
                {!isUpdating ? 
                <Link to={'/add-supply'}><button className='btn--next'>Add Supply</button></Link>
                :
                <button className='btn--prev' onClick={handleCancel}>Cancel</button>}
            </div>
        </>
    )}
}

export default SupplyInventoryAdmin