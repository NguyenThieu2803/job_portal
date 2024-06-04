import React from 'react'
import InputField from '../Components/InputField'

const TypeOfRequirement = ({handleChange}) => {
  return (
    <div>
      <h4 className='text-lg font-medium'>Type Of Requirement</h4>

      {/* radio filters  */}
      <div>
        <label className='sidebar-label-container '>
          <input type='radio' name='test3' value=''  onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>
        <InputField handleChange={handleChange} value='Full-time' title="Full-time" name="test5" />
        <InputField handleChange={handleChange} value='Temporary' title="Temporary" name="test5" />
        <InputField handleChange={handleChange} value='Part-time' title="Part-time" name="test5" />
      </div>
    </div>
  )
}

export default TypeOfRequirement