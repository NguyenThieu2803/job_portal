import React from 'react'
import InputField from '../Components/InputField'

const JobsPosting = ({handleChange}) => {
    const date = new Date();
    const TwentyFourHoursAgo = new Date(date - 24 * 60 * 60 * 1000);
    const SevenDayAgo = new Date(date - 7 * 24 * 60 * 60 * 1000);
    const MonthAgo = new Date(date - 30 * 24 * 60 * 60 * 1000);
 
 
    const TwentyFourHoursAgoStr = TwentyFourHoursAgo.toISOString().slice(0,10)
    const SevenDayAgoStr = SevenDayAgo.toISOString().slice(0,10)
    const MonthAgoStr = MonthAgo.toISOString().slice(0,10)
  return (
    <div>
      <h4 className='text-lg font-medium'>Date of Posting</h4>

      {/* radio filters  */}
      <div>
        <label className='sidebar-label-container '>
          <input type='radio' name='test3' value=''  onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>
        <InputField handleChange={handleChange} value={TwentyFourHoursAgoStr} title="Last 24 hours" name="test3" />
        <InputField handleChange={handleChange} value={SevenDayAgoStr} title="Last 7 days" name="test3" />
        <InputField handleChange={handleChange} value={MonthAgoStr} title="Last Month" name="test3" />
      </div>
    </div>
  )
}

export default JobsPosting