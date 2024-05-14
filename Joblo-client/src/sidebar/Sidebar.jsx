import React from 'react'
import Location from './Location'

const Sidebar = ({handleChange,handleClick}) => {
  return (
    <div className='space-y-4'>
        <h3 className='text-lg mb-21 font-bold'>Filters</h3>
        <Location handleChange={handleChange}/>
    </div>
  )
}

export default Sidebar