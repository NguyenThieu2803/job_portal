import React from 'react'
import { useForm } from "react-hook-form"
import Creatable from 'react-select/creatable';
const CreateJobs = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const options = [
    { value: 'Java', label: 'Java' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'C++', label: 'C++' },
    { value: 'Python', label: 'Python' },
    { value: 'Go', label: 'Go' },
    { value: 'Nodejs', label: 'Nodejs' },
    { value: 'PHP', label: 'PHP' },
    { value: 'React', label: 'React' },

  ]

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data.Skills = selectedOption;
    console.log(data)
  }


  return (
    <div className='max-w-screen-2xl container mx-auto x1:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10px-4 lg:px-16'>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {/* row 1 */}
          <div className='create-job-flex p-3'>

            <div className='lg:w-1/2 w-full '>

              <label className='block mb-3 text-lg'>Jobs Title</label>
              <input type="text" defaultValue={"Web Developer"}
                {...register("jobTitle")} className='create-job-input' />


            </div>

            <div className='lg:w-1/2 w-full'>

              <label className='block mb-3 text-lg'>Company Name</label>
              <input type="text" placeholder='EX: Microsoft'
                {...register("companyName")} className='create-job-input' />


            </div>

          </div>

          {/* row 2 */}
          <div className='create-job-flex p-3'>

            <div className='lg:w-1/2 w-full '>

              <label className='block mb-3 text-lg '>Minimum Salary</label>
              <input type="text" placeholder='$20k'
                {...register("minPrice")} className='create-job-input' />


            </div>

            <div className='lg:w-1/2 w-full p-3'>

              <label className='block mb-3 text-lg'>Maximum Salary</label>
              <input type="text" placeholder='$100k'
                {...register("maxPrice")} className='create-job-input ' />


            </div>

          </div>

          {/* row 3 */}
          <div className='create-job-flex p-3'>

            <div className='lg:w-1/2 w-full '>

              <label className='block mb-3 text-lg'>Jobs Title</label>
              <select  {...register("salaryType")} className='create-job-input' >
                <option value="">Choose your salary</option>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>


            </div>

            <div className='lg:w-1/2 w-full'>

              <label className='block mb-3 text-lg'>Job Location</label>
              <input type="text" placeholder='EX: New York'
                {...register("jobLocation")} className='create-job-input' />


            </div>

          </div>

          {/* row 4 */}
          <div className='create-job-flex p-3'>
            <div className='lg:w-1/2 w-full'>

              <label className='block mb-3 text-lg'>Posting Date</label>
              <input type="date" placeholder='EX: 2023-11-03'
                {...register("postingDate")} className='create-job-input' />


            </div>
            <div className='lg:w-1/2 w-full '>

              <label className='block mb-3 text-lg'>Experience Level</label>
              <select  {...register("experienceLevel")} className='create-job-input' >
                <option value="Any experience">Choose your Experience Level</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>


            </div>



          </div>

          {/* row 5 */}
          <div>
            <label className='block mb-2 text-lg'>Required Skills Set:</label>
            <Creatable
              options={options}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              isMulti
              className='create-job-input'
            />
          </div>

          {/* row 6 */}
          <div className='create-job-flex p-3'>
            <div className='lg:w-1/2 w-full'>

              <label className='block mb-3 text-lg'>Company Logo</label>
              <input type="url" placeholder='EX: Url: http://example.com'
                {...register("companyLogo")} className='create-job-input' />


            </div>
            <div className='lg:w-1/2 w-full '>

              <label className='block mb-3 text-lg'>Employment Type</label>
              <select  {...register("employmentType")} className='create-job-input' >
                <option value="">Choose your Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Part-time">Part-time</option>
              </select>


            </div>



          </div>

          {/* row 7 */}
          <div className='create-job-flex p-3'>
            <div className=' w-full'>

              <label className='block mb-3 text-lg'>Jobs Description </label>
              <textarea 
              rows={6}
              placeholder='Jobs Description'
              className='w-full pl-3 py-1.5 focus:outline-none' {...register("description")}  />

            </div>
          </div>

          {/* row 8 */}
          <div className='create-job-flex p-3'>
            <div className=' w-full'>

              <label className='block mb-3 text-lg'>Jobs Posted By</label>
              <input type="email"
              placeholder='Jobs email'
              className='w-full pl-3 py-1.5 focus:outline-none' {...register("postedBy")}  />
            </div>
          </div>
          <input className=' block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' value={"Submit"} type="submit" />
        </form>

      </div>
    </div>
  )
}

export default CreateJobs