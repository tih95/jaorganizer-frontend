import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Button, Box, FormLabel, Flex, ButtonGroup } from '@chakra-ui/core';
import { AiOutlinePlus } from 'react-icons/ai';

import { JobList } from '../../components/job-list/JobList.component';

const Jobs = () => {
  const [ jobList, setJobList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ filter, setFilter ] = useState('all');
  
  useEffect(() => {
    const fetchJobs = async () => {
      const resp = await axios.get('https://infinite-garden-10545.herokuapp.com/api/jobs');
      setJobList(resp.data);
      setIsLoading(false);
    }

    fetchJobs();
  }, [])

  const filterJobs = filter => {
    if (filter === 'all') {
      return jobList;
    }
    return jobList.filter(job => job.status === filter)
  }

  const filteredJobs = filterJobs(filter);

  return (
    <Box padding="1em 2em">
      <Flex alignItems="center" justifyContent="space-between" marginBottom="1.5em">
        <Flex alignItems="center">
          <FormLabel>Filter by: </FormLabel>
          <ButtonGroup>
            <Button variant="ghost" onClick={() => setFilter('all')}>All</Button>
            <Button variantColor="blue" variant="ghost" onClick={() => setFilter('applied')}>Applied</Button>
            <Button variantColor="yellow" variant="ghost" onClick={() => setFilter('under-review')}>Under Review</Button>
            <Button variantColor="orange" variant="ghost" onClick={() => setFilter('interviewing')}>Interviewing</Button>
            <Button variantColor="green" variant="ghost" onClick={() => setFilter('offered')}>Offered</Button>
            <Button variantColor="red" variant="ghost" onClick={() => setFilter('rejected')}>Rejected</Button>
          </ButtonGroup>
        </Flex>
        
        
        <Link to="/add-job">
          <Button 
            leftIcon={AiOutlinePlus} 
            backgroundColor="teal.400" 
            _hover={{backgroundColor: 'teal.300'}}
          >
            Add new Job
          </Button>
        </Link>
      </Flex>

      
      {isLoading
        ? <ClipLoader />
        : <JobList jobs={filteredJobs} />
      }
      
    </Box>
  )
}

export { Jobs };