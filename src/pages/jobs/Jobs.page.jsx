import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, FormLabel, Flex, RadioButtonGroup, Skeleton,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption} from '@chakra-ui/core';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import ReactHelmet from 'react-helmet';

import { JobList } from '../../components/job-list/JobList.component';

import { fetchAllJobs } from '../../services/jobs';
import CustomRadio from '../../components/custom-radio/CustomRadio.component';

const statuses = {
  all: 'All',
  applied: 'Applied',
  interviewing: 'Interviewing',
  'under-review': "Under Review",
  offered: 'Job Offered',
  rejected: 'Rejected'
}

const colors = {
  'applied': 'blue',
  'under-review': 'yellow',
  'offered': 'green',
  'rejected': 'red',
  'interviewing': 'orange'
}

const Jobs = ({ user }) => {
  const shrinkFilter = useMediaQuery({ query: '(max-width: 800px)'});
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
      const data = await fetchAllJobs(config);
      setJobList(data);
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
    <Box padding="1em 2em" maxWidth="900px" margin="0 auto">
      <ReactHelmet>
        <title>My Jobs</title>
      </ReactHelmet>
      <Flex alignItems="center" justifyContent="space-between" marginBottom="1.5em">
        {
          !shrinkFilter
            ? <Flex alignItems="center">
                <FormLabel>Filter by: </FormLabel>
                <RadioButtonGroup onChange={val => setFilter(val)} isInline defaultValue="all">
                  <CustomRadio value="all">All</CustomRadio>
                  <CustomRadio variantColor="blue" value="applied">Applied</CustomRadio>
                  <CustomRadio variantColor="yellow" value="under-review">Under Review</CustomRadio>
                  <CustomRadio variantColor="orange" value="interviewing">Interviewing</CustomRadio>
                  <CustomRadio variantColor="green" value="offered">Offered</CustomRadio>
                  <CustomRadio variantColor="red" value="rejected">Rejected</CustomRadio>
                </RadioButtonGroup>
              </Flex>
            : <Menu flex="1">
                <MenuButton variantColor={colors[filter]} size="sm" as={Button} rightIcon="chevron-down">
                  {statuses[filter]}
                </MenuButton>
                <MenuList minWidth="240px">
                  <MenuOptionGroup title="Filter By" value={filter} onChange={(value) => setFilter(value)} defaultValue="all" type="radio">
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
            flex="1"
            size="sm"
            leftIcon={AiOutlinePlus} 
            variantColor="teal"
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

export default Jobs;