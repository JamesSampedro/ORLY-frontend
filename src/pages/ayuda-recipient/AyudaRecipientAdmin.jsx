import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import React, { useMemo, useState, useEffect } from 'react';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { getRecipients, removeAdminResponse} from "../../actions/admin";
import { showToastNotification } from './../../functions/showToastNotification';

const AyudaRecipientAdmin = () => {
    const response = useSelector((state) => state.admin)
    const {success,recipients} = response
    const dispatch = useDispatch()
    const {id} = useParams()


    const [mockData,setMockData] = useState([])

    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => mockData, [mockData])

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        dispatch(getRecipients(id,token))
    },[])

    useEffect(() => {
        if(success){
            console.log(recipients)
            setMockData(recipients)
        }else if(success === false){
            showToastNotification("Something Went Wrong!","error")
        }
        dispatch(removeAdminResponse())
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
      
      <h1 className="page-header">Registered Profiles</h1>
      { mockData.length > 0 ?
      <div>
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
                    {mockData.length > 10 ? 
                            <div className='table-btn--wrapper'>
                                <button onClick={previousPage} disabled={!canPreviousPage} className='btn--prev'>Previous</button>
                                <button onClick={nextPage} disabled={!canNextPage} className='btn--next'>Next</button>
                            </div> :
                            ""}
                </div>
              </div>
              :
            <h1 style={{textAlign:"center"}}>There is no recipient list available</h1>
          }  
    </> 
  )
  
}

export default AyudaRecipientAdmin;
