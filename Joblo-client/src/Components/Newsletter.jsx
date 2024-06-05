import React from 'react'
import { FaEnvelope, FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'
const Newsletter = () => {
  return (
    <div>
    <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
        <FaEnvelopeOpenText/>
        Email me for hobs</h3>
        <p className='text-primary/75 text-base mb-4'>Send your email to ours</p>
        <div>
            <input type='email' name='email' id='email' placeholder='Enter your email' className='w-full border-2 border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600' />
            <button type='submit' className='bg-blue py-2 px-24 text-white md:rounded-s-none rounded mt-5'>Send</button>
        </div>
    </div>

        {/* rocketChat */}
<div className='mt-10'>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
        <FaRocket/>
        Upload your resume</h3>
        <p className='text-primary/75 text-base mb-4'> Get your Notice</p>
        <div>
            <button type='submit' value={"Upload your resume"} className='bg-blue py-2 px-8 text-white md:rounded-s-none rounded mt-5'>Upload your resume</button>
        </div>
    </div>
    </div>
  )
}

export default Newsletter