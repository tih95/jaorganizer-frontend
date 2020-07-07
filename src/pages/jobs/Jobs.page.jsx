import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Box, FormLabel, Flex, ButtonGroup, Skeleton,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption, } from '@chakra-ui/core';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';

import { JobList } from '../../components/job-list/JobList.component';

const statuses = {
  all: 'All',
  applied: 'Applied',
  interviewing: 'Interviewing',
  'under-review': "Under Review",
  offered: 'Job Offered',
  rejected: 'Rejected'
}

const Jobs = ({ user }) => {
  const shrinkFilter = useMediaQuery({ query: '(max-width: 940px)'});
  const [ jobList, setJobList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ filter, setFilter ] = useState('all');
  
  useEffect(() => {
    const fetchJobs = async () => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      const resp = await axios.get('http://localhost:3001/api/jobs', config);
      setJobList(resp.data);
      setIsLoading(false);
    }

    fetchJobs();
  }, [user])

  const filterJobs = filter => {
    if (filter === 'all') {
      return jobList;
    }
    return jobList.filter(job => job.status === filter)
  }

  const filteredJobs = filterJobs(filter);

  return (
    <Box padding="1em 2em" maxWidth="1000px" margin="0 auto">
      <Flex alignItems="center" justifyContent="space-between" marginBottom="1.5em">
        {
          !shrinkFilter
            ? <Flex alignItems="center">
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
            : <Menu>
                <MenuButton rightIcon="chevron-down">
                  Filter by: {statuses[filter]}
                </MenuButton>
                <MenuList minWidth="240px">
                  <MenuOptionGroup value={filter} onChange={(value) => setFilter(value)} defaultValue="all" title="Filter" type="radio">
                    <MenuItemOption value="all">All</MenuItemOption>
                    <MenuItemOption value="applied">Applied</MenuItemOption>
                    <MenuItemOption value="under-review">Under Review</MenuItemOption>
                    <MenuItemOption value="interviewing">Interviewing</MenuItemOption>
                    <MenuItemOption value="offered">Offered</MenuItemOption>
                    <MenuItemOption value="rejected">Rejected</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
        }
        
        
        
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
        ? <Skeleton height="50px" />
        : <JobList jobs={filteredJobs} />
      }
      
    </Box>
  )
}

export { Jobs };