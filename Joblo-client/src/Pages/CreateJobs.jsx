import React from 'react'
import { useForm } from "react-hook-form"
const CreateJobs = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    <div className='max-w-screen-2xl container mx-auto x1:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10px-4 lg:px-16'>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>

              <label className='block mb-3 text-lg'>Jobs Title</label>
              <input type="text" defaultValue={"Web Developer"} 
              {...register("jobTitle")} className='create-job-input' />


            </div> 
            
          </div>
          <input className='mt-4' type="submit" />
        </form>

      </div>
    </div>
  )
}

export default CreateJobs