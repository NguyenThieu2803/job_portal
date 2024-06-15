import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const MyJobs = () => {
    const email = "test@example.com"
    const [jobs, setJob] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:3000/api/v1/jobs-get`)
            .then(res => res.json())
            .then(data => {
                setFilteredJobs(data.result)
                setJob(data.result);
            })
    }, [])
    console.log(search)
    const HandleSearch = () => {
        const result = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        setFilteredJobs(result)
        setIsLoading(false)
    }

    // handle delete
const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/v1/jobs-delete/${id}`,{
        method: "DELETE"
    })
       .then(res => res.json())
       .then(data => {
        console.log(data)
        if(data.deletedCount >= 0) {
            alert("Delete success!")
            setJob(jobs.filter(job => job._id !== id));
        }
       })

}

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='my-jobs-conatiner'>
                <h1 className='text-center text-2xl font-bold text-primary mb-3 mt-5'>My Jobs</h1>
                <div className='search-box p-2 text-center'>
                    <input type="text" placeholder="Search" className="border-2 border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none w-2/3  focus:ring-2 focus:ring-indigo-600  focus:border-indigo-500" onChange={(e) => setSearch(e.target.value)} />
                    <button className="bg-blue text-white py-2 px-4 rounded-md" onClick={HandleSearch}>Search</button>
                </div>
            </div>


            {/* table */}

            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-job"><button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post New Jobs</button></Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            NO.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            TITLE
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            COMPANY NAME
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            SALARY
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            EDIT
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            DELETE
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {

                                        filteredJobs.map((job, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index+1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {job.jobTitle}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.companyName}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                    ${job.minPrice} - ${job.maxPrice}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                    <button><Link to ={`/edit-job/${job?._id}`}>Edit</Link></button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                    <button onClick={()=> handleDelete(job._id)} className='bg-red-600 py-1 px-2 text-white rounded-sm'>delete</button>
                                                </td>
                                            </tr>
                                        )

                                        )
                                    }


                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyJobs