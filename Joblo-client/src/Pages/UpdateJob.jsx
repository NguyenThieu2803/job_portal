import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Creatable from 'react-select/creatable';


const UpdateJob = () => {
  const { id } = useParams();
  console.log(id);
  const jobdata = useLoaderData();
  console.log(jobdata);
  // Truy cập vào mảng result từ jobdata
  const result = jobdata.result;
  const job=result[0];
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'Java', label: 'Java' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'C++', label: 'C++' },
    { value: 'Python', label: 'Python' },
    { value: 'Go', label: 'Go' },
    { value: 'Nodejs', label: 'Nodejs' },
    { value: 'PHP', label: 'PHP' },
    { value: 'React', label: 'React' },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.Skills = selectedOption;
    fetch(`http://localhost:3000/api/v1/update-jobs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.result.acknowledged === true) {
          showModal();
        }
      });
  };

  const showModal = () => {
    const modal = document.getElementById("successModal");
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
    }, 3000);
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

          {/* row 1 */}
          <div className='create-job-flex p-3'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Jobs Title</label>
              <input type="text" defaultValue={job.jobTitle}
                {...register("jobTitle")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Company Name</label>
              <input type="text" placeholder='EX: Microsoft' defaultValue={job.companyName}
                {...register("companyName")} className='create-job-input' />
            </div>
          </div>

          {/* row 2 */}
          <div className='create-job-flex p-3'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg '>Minimum Salary</label>
              <input type="text" placeholder='$20k' defaultValue={job.minPrice}
                {...register("minPrice")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Maximum Salary</label>
              <input type="text" placeholder='$100k' defaultValue={job.maxPrice}
                {...register("maxPrice")} className='create-job-input ' />
            </div>
          </div>

          {/* row 3 */}
          <div className='create-job-flex p-3'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Salary Type</label>
              <select  {...register("salaryType")}  className='create-job-input'>
                <option value={job.salaryType}>{job.salaryType}</option>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Job Location</label>
              <input type="text" placeholder='EX: New York' defaultValue={job.jobLocation}
                {...register("jobLocation")} className='create-job-input' />
            </div>
          </div>

          {/* row 4 */}
          <div className='create-job-flex p-3'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Posting Date</label>
              <input type="date" placeholder='EX: 2023-11-03' defaultValue={job.postingDate}
                {...register("postingDate")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Experience Level</label>
              <select  {...register("experienceLevel")}  className='create-job-input'> 
              <option value={job.experienceLevel}>{job.experienceLevel}</option>
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
              defaultValue={job.Skills}
              onChange={setSelectedOption}
              isMulti
              className='create-job-input'
            />
          </div>
          {/* row 6 */}
          <div className='create-job-flex p-3'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Company Logo</label>
              <input type="url" placeholder='EX: Url: http://example.com' defaultValue={job.companyLogo}
                {...register("companyLogo")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-3 text-lg'>Employment Type</label>
              <select  {...register("employmentType")}  className='create-job-input'>
                <option value={job.employmentType}>{job.employmentType}</option>
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
                defaultValue={job.description}
                className='w-full pl-3 py-1.5 focus:outline-none' {...register("description")} />
            </div>
          </div>
          {/* row 8 */}
          <div className='create-job-flex p-3'>
            <div className=' w-full'>
              <label className='block mb-3 text-lg'>Jobs Posted By</label>
              <input type="email"
                placeholder='Jobs email'
                defaultValue={job.postedBy}
                className='w-full pl-3 py-1.5 focus:outline-none' {...register("postedBy")} />
            </div>
          </div>
          <input className='block mt-12 bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer bg-blue' value={"Submit"} type="submit" />
        </form>
      </div>

      {/* Success Modal */}
      <div id="successModal" className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center hidden">
        <div className="bg-white p-6 rounded-md shadow-md">
          <span className="block mb-3 text-lg font-semibold">Success</span>
          <p className="mb-5">Job has been Updated successfully!</p>
          <button onClick={() => document.getElementById('successModal').style.display = 'none'} className="bg-blue-500 text-white px-4 py-2 rounded-md">Close</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateJob