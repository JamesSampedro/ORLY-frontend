import { format } from 'date-fns'

export const COLUMNS = [
  
    {
        Header: 'Program Name',
        accessor: 'programName'
    },
    
    {
        Header: 'Program Criteria',
        accessor: 'criteria'
    },
    {
        Header: 'Supplies Distributed',
        accessor: 'supplies'
    },

    {
        Header: 'Sponsor',
        accessor: 'sponsor'
    },
    {
        Header: 'Implementation Date',
        accessor: 'dateCreated',
        Cell:({value}) => {return format (new Date (value), 'MM/dd/yyyy')}
    },
    
]