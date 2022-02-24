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

const ProgramCards = (props) => {

    const dispatch = useDispatch()
    const [isShowingTable, setIsShowingTable] = useState(false)
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.data, [props.data])
    
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

  return(
        // <div className="program-details-card" key={props.iKey}>
        //     <h1 className="program-details-card__title">{props.programName}</h1>
        //     <h3 className='program-details-card__title'>Date: {props.date}</h3>
        //     <button className='btn--standard btn' 
        //             onClick={() => {setIsShowingTable(!isShowingTable)}} style={{margin:" 0 0 1rem",maxWidth:"200px"}}>Show Recipients</button>
        //     <div className="program-details-card__content">
        //         <div className={`column ${isShowingTable && "hidden"}`}>
        //             <h3>Supplies</h3>
        //             {props.supplies.map((e,i) => {
        //                 return <p key={i}>{`${e.amount} ${e.unit}s of ${e.name}`}</p>
        //             })}
        //         </div>
        //         <div className={`column ${isShowingTable && "hidden"}`}>
        //             <h3>Sponsor</h3>
        //             <p>{props.sponsor}</p>
        //             <h3>Facilitator</h3>
        //             <p>{props.facilitator}</p>
        //         </div>


                <div className="table-wrapper">
                    <GlobalFilter filter = {globalFilter} setFilter={setGlobalFilter} 
                    />
                    <table>
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
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}
                                            </td>
                                            
                                        })}
                                        
                                        
                                    </tr>
                                )
                            })}
                                
                        </tbody>
                    </table>
                    <div>
                    <span className={`page-number ${isShowingTable? "" : "hidden"}`}>
                            <span className={`${isShowingTable? "" : "hidden"}`}>Page</span> {''}
                            <strong className={`${isShowingTable? "" : "hidden"}`}>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong> {''}
                        </span>
                        {data?.length > 10 ? 
                                <div className='table-btn--wrapper'>
                                    <button onClick={previousPage} disabled={!canPreviousPage} 
                                    className={`btn--prev ${isShowingTable? "" : "hidden"}`}>Previous</button>
                                    <button onClick={nextPage} disabled={!canNextPage} 
                                    className={`btn--next ${isShowingTable? "" : "hidden"}`}>Next</button>
                                </div> :
                                ""}
                    </div>
                </div>   
        //     </div>
        // {/* </div> */}
  ) 
};

export default ProgramCards;
