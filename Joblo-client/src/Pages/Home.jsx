import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Card from '../Components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("jobs.json")
      .then(res => res.json()).then(data => {
        setJobs(data)
      })
  }, [])

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
    selectedCategory(event.target.value);
  }

  // main function
  const filterData = (query, selected, jobs) => {
    let filteredJobs = jobs;

//filter inputs
    if (query) {
      filteredJobs = filteredItem;
    }

    //filter by radio button
    if(selected) {
      filteredJobs= filteredJobs.filter(({jobLocation,maxPrice,experienceLevel,salaryType,employmentType})=>(
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) === parseInt(selected) ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase() 
      ));
      console.log(filteredJobs);
    }
    return filteredJobs.map((data,i)=><Card key={i} data ={data}/>)
  }
  const result = filterData(query,selectedCategory,jobs)
  return (
    <div >
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick}/>
        </div>
      <div className='col-span-2 bg-white p-4 rounded-sm'><Jobs resuilt={result}/></div>
      <div className='bg-white p-4 rounded'>Right</div>
      </div>
      
    </div>
  )
}


export default Home