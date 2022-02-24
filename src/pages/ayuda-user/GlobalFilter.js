import React from 'react'
    
export const GlobalFilter = ({filter, setFilter,className}) => {
    return (
        <span className = {`search-box ${className}`}>
            Search {' '}
            <input value={filter || ''} onChange={e => setFilter(e.target.value)}></input>
        </span>
    )
}
