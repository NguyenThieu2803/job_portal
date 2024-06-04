import React from 'react'
import InputField from '../Components/InputField'

const WorkEX = ({handleChange}) => {
  return (
    <div>
      <h4 className='text-lg font-medium'>Work Experience</h4>

      {/* radio filters  */}
      <div>
        <label className='sidebar-label-container '>
          <input type='radio' name='test' value='Any experience'  onChange={handleChange} />
          <span className='checkmark'></span>Any Experience
        </label>
        <InputField handleChange={handleChange} value='Internship' title="Internship" name="test4" />
        <InputField handleChange={handleChange} value='Work remotely' title="Work remotely" name="test4" />
      </div>
    </div>
  )
}

export default WorkEX