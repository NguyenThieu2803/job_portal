import React from 'react'
import Location from './Location'
import Salary from './Salary'
import JobsPosting from './JobsPosting'
import WorkEX from './WorkEX'
import TypeOfRequirement from './TypeOfRequirement'

const Sidebar = ({handleChange,handleClick}) => {
  return (
    <div className='space-y-4'>
        <h3 className='text-lg mb-21 font-bold'>Filters</h3>
        <Location handleChange={handleChange}/>
        <Salary handleChange={handleChange} handleClick={handleClick}/>
        <JobsPosting handleChange={handleChange}/>
        <WorkEX handleChange={handleChange}/>
        <TypeOfRequirement handleChange={handleChange}/>
    </div>
  )
}

export default Sidebar