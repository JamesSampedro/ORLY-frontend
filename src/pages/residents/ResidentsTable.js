import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo, useState, useEffect, useRef} from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {deleteResident} from "../../actions/services";
import { showToastNotification } from './../../functions/showToastNotification';
import Loading from '../../components/loader/Loading';
import axios from 'axios';
import Residents from './Residents';
import { useHistory } from 'react-router-dom';
import UpdateResidents from './UpdateResidents';




const ResidentsTable = () => {
    const dispatch = useDispatch()
    const [currentId,setCurrentId] = useState('')
    const [isUpdating,setIsUpdating] = useState(false)
    const [residentsData, setResidentsData] = useState([])
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => residentsData, [residentsData])
    const [isLoading, setIsLoading] = useState(true)
    let residentDetails = []
    const token = localStorage.getItem("authToken")
    const url = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        async function asyncFunc() {
            const residentsResponse = await 
                    axios.get(`${url}/services/api/get-all-residents`,{headers:{"Authorization":token}});
                localStorage.setItem("residents", JSON.stringify(residentsResponse.data.residents));
          }
        asyncFunc().then(function(){
            var storedResidents = JSON.parse(localStorage.getItem("residents"));
            residentDetails = storedResidents
            setResidentsData(residentDetails)
            setIsLoading(false)
        })
    },[isUpdating])

    const tableInstance = useTable ({
        columns,
        data
    },
    useGlobalFilter, useSortBy, usePagination)

    const handleUpdate = (e) => {
        setCurrentId(e.target.value)
        setIsUpdating(true)
    }

    const handleDelete = (e) => {
        dispatch(deleteResident(e.target.value,token))
        setTimeout(() => {
            axios.get(`${url}/services/api/get-all-residents`,{headers:{"Authorization":token}}).then(e => {
                setResidentsData(e.data.residents)
            })
        }, 1000)
    }

    const handleCancel = () => {
        setIsUpdating(false)
        setCurrentId("")
    }


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

    if(isLoading === true){
        return (<Loading/>)
    }else {
        return (
            <>
               {!isUpdating && <h1 className="page-header">RESIDENTS</h1>}
                <div className="equipment-inventory-page page">
                    <div className="residents-table-wrapper">
                    {!isUpdating ?
                        residentsData.length > 0 ?
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
                                            <th>Modify Status</th>
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
                                                    onClick={handleUpdate}
                                                    value={row.original._id}
                                                    className='btn--blue txt--white'>
                                                    Update</button>
                                                    <button
                                                    onClick={handleDelete} 
                                                    value={row.original._id}
                                                    className='btn--red txt--white'>
                                                   Delete</button>
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
                            {residentsData.length > 10 ? 
                            <div className='table-btn--wrapper'>
                                <button onClick={previousPage} disabled={!canPreviousPage} className='btn--prev'>Previous</button>
                                <button onClick={nextPage} disabled={!canNextPage} className='btn--next'>Next</button>
                            </div> :
                            ""}
                            
                        </> : 
                        <h1 style={{textAlign: "center"}}>No Residents Available</h1>
                    :
                        <UpdateResidents id={currentId}
                        setIsUpdating={setIsUpdating}
                        setCurrentId={setCurrentId}/>
                    }
                    </div>
                    {!isUpdating &&
                        <Link to={'/residents-form'}><button className='btn--next'>Add Resident</button></Link>}
                </div>
            </>
        )}
    }

export default ResidentsTable