import React, { useEffect, useState } from 'react'
import PageHeader from '../Components/PageHeader'

const SalaryPage = () => {
    const [search, setSearch] = useState("");
    const [salary, setSalary] = useState([])

    useEffect(() => {
        fetch('salary.json')
            .then(res => res.json())
            .then(data => {
                setSalary(data)
            })
    }, [])

    console.log(search)

    const HandleSearch = () => {
        const filter = salary.filter(
            (job) => job.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
        console.log(filter)
        setSalary(filter)
    }




    return (
        <div className='max-w-screen-2xl container mx-auto x1:px-24 px-4'>
            <PageHeader />
            <div className='mt-5'>
                <div className='Search-box p-2 text-center mb-2'>
                    <input type='text' name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' onChange={(e) => setSearch(e.target.value)}></input>
                    <button type='submit' className='btn btn-primary bg-blue text-white rounded-sm px-8 py-2 mb-4 ' onClick={HandleSearch}>Search</button>
                </div>
            </div>
            {/* // salary display card */}
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid:cols-1 gap-12 my-12 items-center'>
                {
                    salary.map((job) => (
                        <div key={job.id} className='shadow px-4 py-8'>
                            <h4 className='font-semibold  text-xl'>{job.title}</h4>
                            <p className='my-2 font-medium text-blue text-lg'>{job.salary}</p>
                            <div className='flex flex-wrap gap-4'>
                                <a href="/" className='underline'>job.status</a>
                                <a href="/" className='underline'>job.Skills</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SalaryPage