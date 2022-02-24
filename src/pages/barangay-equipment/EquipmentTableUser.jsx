import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import {Link} from 'react-router-dom'
import { COLUMNS } from './Columns';
import React, { useMemo, useEffect,useState } from 'react';
import { GlobalFilter } from './GlobalFilter';
import './table.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllEquipment, deleteEquipment, removeServiceResponse } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import Loading from '../../components/loader/Loading';


const EquipmentTableUser = () => {
    const response = useSelector((state) => state.services)
    const {success,equipments} = response
    const dispatch = useDispatch()
    
    const [mockData, setMockData] = useState([])

        const columns = useMemo(() => COLUMNS, [])
        const data = useMemo(() => mockData, [mockData])
        const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(getAllEquipment())
    },[])

    useEffect(() => {
        if(success){
            setMockData(equipments)
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

 
    if(isLoading == true){
        return (<Loading/>)
    }else {

    return (
        <>
            <h1 className="page-header">List of Equipment </h1>
            <div className="equipment-inventory-page page">
                <div className="table-wrapper">
                <p style={{textAlign:"center",fontWeight:600,fontSize:"1.2rem"}}>Here are the available equipments to be borrowed</p>
                {mockData.length > 0 ?
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
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell)=>{
                                            return(
                                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            ) 
                                        })}
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
                    {mockData.length > 10 ? 
                    <div className='table-btn--wrapper'>
                        <button onClick={previousPage} disabled={!canPreviousPage} className='btn--prev'>Previous</button>
                        <button onClick={nextPage} disabled={!canNextPage} className='btn--next'>Next</button>
                    </div> :
                    ""}
                    
                </> : 
                <h1 style={{textAlign:"center"}}>No Available Equipment</h1>}
                
                </div>
            </div>
        </>
    )}
}

export default EquipmentTableUser
