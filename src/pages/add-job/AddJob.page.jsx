import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Box, Heading, Flex, Button } from '@chakra-ui/core';

import { AddJobForm } from '../../components/add-job-form/AddJobForm.component';

const AddJob = ({ history }) => {

  return (
    <Box padding="1em 2em">
      <Button 
        onClick={() => history.goBack()} 
        marginBottom="0.8em" 
        variant="link" 
        fontSize="1.2em" 
        leftIcon={AiOutlineArrowLeft}
      >
         Go back to jobs
      </Button>
      <Heading>Add A Job</Heading>
      <AddJobForm history={history} />
    </Box>
  )
}

export { AddJob };