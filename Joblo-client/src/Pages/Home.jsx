import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Card from '../Components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../Components/Newsletter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const itemPerPage = 6;



  useEffect(() => {
    setisLoading(true);
    fetch("http://localhost:3000/api/v1/jobs-get")
      .then((res) => res.json()).then((data) => {
        setJobs(data.result)
        setisLoading(false);
      })
  }, [])
console.log("Day LA job:",jobs)
  const [query, setQuery] = useState("");

  // search for
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }


  //filter jobs by title
  const filteredItem = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  //filter by radio button
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  //----button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  }

  // caculate the index range
  const caculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  }


  // function for the next page


  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItem.length / itemPerPage)) {
      setcurrentPage(currentPage + 1)
    }
  }

  // fiction for previous page

  const prevPage = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1)
    }
  }

  // main function
  const filterData = (query, selected, jobs) => {
    let filteredJobs = jobs;

    //filter inputs
    if (query) {
      filteredJobs = filteredItem;
    }

    //filter by radio button
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => (
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) === parseInt(selected) ||
        postingDate >= selected ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      ));
      console.log(filteredJobs);
    }
    //slice the data base on current 
    const { startIndex, endIndex } = caculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />)
  }





  const result = filterData(query, selectedCategory, jobs)
  return (
    <div >
      <Banner query={query} handleInputChange={handleInputChange} />
      {/* main conntent */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>

        {/* left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job card */}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {
            isLoading ? (<p className='font-medium'>Loading ....</p>) : result.length > 0 ? (<Jobs result={result} />) : <>
              <h3 className='text-lg font-bold mb-2'>{result.length} jobs</h3>
              <p>No data found!</p>
            </>
          }
          {/* pagition here */}

          {
            result.length > 0 ? (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage} disabled={currentPage === 1} className='px-4 py-2 bg-blue text-white rounded'>Prev</button>
                <span>Page {currentPage} of {Math.ceil(filteredItem.length / itemPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItem.length / itemPerPage > itemPerPage)} className='px-4 py-2 bg-blue text-white rounded'>Next</button>
              </div>
            ) : null
          }
        </div>

        {/* right side */}
        <div className='bg-white p-4 rounded'>
          <Newsletter/>
        </div>
      </div>

    </div>
  )
}


export default Home