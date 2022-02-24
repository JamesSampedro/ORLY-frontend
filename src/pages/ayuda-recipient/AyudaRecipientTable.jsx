import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo, useState,useEffect } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteEquipment, removeServiceResponse, getAllRecipients, 
    setRecipientStatus } from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import Loading from '../../components/loader/Loading';
import { useHistory } from 'react-router-dom';
    
const AyudaRecipientTable = () => {
    const response = useSelector((state) => state.services)
    const {success,recipientSuccess} = response
    const dispatch = useDispatch()
    const ayudaId = localStorage.getItem('ayudaId')
    const [mockData,setMockData] = useState([
    ])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    let recipientData = []


    useEffect(() => {
        const token = localStorage.getItem("authToken")
        //dispatch(getAllUsers(token))
        dispatch(getAllRecipients(ayudaId,token))
    },[])


    const handleClaim = (id,status) => {
        let token = localStorage.getItem('authToken')
        dispatch(setRecipientStatus(ayudaId,token,{
            id: id,
            status: status
        }))

        dispatch(getAllRecipients(ayudaId,token))
    }

    useEffect(() => {
        if(success){
            recipientData = JSON.parse(localStorage.getItem("recipients"))
            setMockData(recipientData)
            setIsLoading(false)
        }else if(success === false){
            showToastNotification("Something Went Wrong","error")
        }
        dispatch(removeServiceResponse())
    },[success])


    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => mockData, [mockData])
    
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

    if(isLoading === true){
        return (<Loading/>)
    }else {
    return (
        <>
        <h1 className="page-header">Recipient List</h1>
        {mockData?.length > 0 ?
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
                                 <th>Modify Status</th>  
                            </tr>
                        ))}
                    </thead>
                
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell)=>{
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}
                                        </td>
                                        
                                    })}
                                    
                                    <td className='data--centered'>
                                        {row.original?.status === "unclaimed" ? 
                                        <button 
                                        className='btn--blue txt--white'
                                        value={row.original?._id}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleClaim(e.target.value,"claimed")
                                        }}
                                        >CLAIM</button> :
                                        <button 
                                        className='btn--blue txt--white'
                                        value={row.original?._id}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleClaim(e.target.value,"unclaimed")
                                        }}
                                        >UNCLAIM</button>
                                        }
                                            
                                    </td>
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
                    {mockData?.length > 10 ? 
                            <div className='table-btn--wrapper'>
                                <button onClick={previousPage} disabled={!canPreviousPage} className='btn--prev'>Previous</button>
                                <button onClick={nextPage} disabled={!canNextPage} className='btn--next'>Next</button>
                            </div> :
                            ""}
                </div>
            </div>   
        :
            <h1 style={{textAlign:"center"}}>There is no current available user</h1>
    }   
    </>
    )}
};


export default AyudaRecipientTable;
   