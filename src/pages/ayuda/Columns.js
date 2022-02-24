import { format } from 'date-fns'

export const COLUMNS = [
    {
        Header: 'Household Name',
        accessor: 'household'
    },

    {
        Header: 'Program Name',
        accessor: 'programName'
    },
    
    {
        Header: 'Sponsor',
        accessor: 'sponsor'
    },
    {
        Header: 'Facilitator',
        accessor: 'facilitator'
    },
    {
        Header: 'Distributed Supplies',
        accessor: 'supplies'
    },
    {
        Header: 'Remaining Supplies',
        accessor: 'left'
    },
    

    {
        Header: 'Implementation Date',
        accessor: 'dateCreated'
    },
    
    {
        Header: 'Status',
        accessor: 'status',
    },
    
]