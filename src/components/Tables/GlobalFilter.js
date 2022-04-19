import React from 'react'

export const GlobalFilter = ({filter,setFilter}) => {
  return (
    <span>
        Seach: {' '}
        <input value = {filter || ''} onChange = {(e) => setFilter(e.target.value)}>

        
        </input>
    </span>
  )
}
