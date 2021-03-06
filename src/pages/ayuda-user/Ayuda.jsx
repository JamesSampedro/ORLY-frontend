import AyudaUser from '../../img/ayuda-user.png'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo, useState,useEffect } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import ProgramCards from "./ProgramCards"
import { useDispatch, useSelector } from "react-redux";
import { getAyudaPrograms, removeAdminResponse } from "../../actions/admin";
import { showToastNotification } from '../../functions/showToastNotification';

import {formatDate} from '../../functions/formatDate'
import { userProfile } from '../../api/users';
import { months } from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import { useHistory } from 'react-router-dom';
import Loading from '../../components/loader/Loading';



const Ayuda = () => {
    const [programData, setProgramData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();
    const [monthsResided, setMonthsResided] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const fullname = localStorage.getItem('firstName')
        const url = process.env.REACT_APP_BACKEND_URL
        const axiosPosts = async () => {
            const response = await axios.get(`${url}/services/api/get-ayuda-program`,{headers:{"Authorization":token}})

            let program = response.data.ayuda
            let data
            let ayudaData = []

            program.forEach(element => {
                let dateCreated = moment(element.createdAt).format('YYYY-MM-DD')
                let criteriaData = ''
                let supplies = element.supplies
                let supplyDetails = ""
                let criteria = element.criteria
                let households = element.households
                let id = element._id
                let programName = element.programName
                let sponsor = element.sponsor

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

                households.forEach(he => {
                    let residents = he.residents
                    residents.forEach(re => {
                        let name = re.firstName + " " + re.lastName
                        if(name === fullname){
                            data = {
                                _id:id,
                                "programName":programName,
                                "sponsor":sponsor,
                                "criteria":criteriaData,
                                "supplies":supplyDetails,
                                "dateCreated":dateCreated,
                            }

                            ayudaData.push(data)
                        }
                    });
                });
            });

            setProgramData(ayudaData)
            setIsLoading(false)
        }

        axiosPosts()
        userProfile(token).then(({ data: { user } }) => setMonthsResided(user.monthsResided))
    },[])

    const handleViewClick = (data) => {
        localStorage.setItem("programName", data.programName)
        history.push("/view-user-household")
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
        <h1 className="page-header">AYUDA</h1>
        <div className="ayuda-user-page page">
            <div className="ayuda-user-page__user-details">
                <div className="content">
                    <h3 className="title">User Details</h3>
                    <div className="info">
                        <p>{`Name: ${localStorage.getItem('firstName')}`}</p>
                        <p>{`Username: ${localStorage.getItem('username')}`}</p>
                        <p>{`Email: ${localStorage.getItem('email')}`}</p>

                    </div>
                </div>
                <img src={AyudaUser} alt="ayuda-user" className="image"/>
            </div>
            <h1 className="page-header">AYUDA PROGRAM DETAILS</h1>
        <div className="equipment-inventory-page page">
                <div className="table-user-wrapper">
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
                                                {column.isSorted ? (column.isSortedDesc ? ' ??? ' : ' ??? ') : ''}
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
        </div>
        </>
    )}
}

export default Ayuda
