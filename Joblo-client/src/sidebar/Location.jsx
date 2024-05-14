import React from 'react'
import InputField from '../Components/InputField'

const Location = ({handleChange}) => {
  return (
    <div>
      <h4 className='text-lg font-medium'>Location</h4>

      {/* radio filters  */}
      <div>
        <label className='sidebar-label-container '>
          <input type='radio' name='test' value=''  onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>
        <InputField handleChange={handleChange} value='london' title="london" name="test" />
      </div>
    </div>
  )
}

export default Location