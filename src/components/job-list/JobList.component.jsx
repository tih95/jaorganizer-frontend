import React from 'react';
import { Stack, Box, Text } from '@chakra-ui/core';

import { JobListItem } from '../job-list-item/JobListItem.component';

const colors = {
  'applied': '#4299E1',
  'under-review': '#ECC94B',
  'offered': '#48BB78',
  'rejected': '#F56565',
  'interviewing': '#ED8936'
}

const JobList = ({ jobs }) => {
  return (
    <Stack spacing={4}>
      {
        jobs.length === 0
          ? <Text textAlign="center" fontSize="1.4em" fontWeight="600">You have no jobs. Try adding one!</Text>  
          : jobs.map(job => (
              <Box key={job.id}>
                <JobListItem color={colors[job.status]} job={job}/>
              </Box>
            ))
      }
    </Stack>
  )
}

export { JobList };