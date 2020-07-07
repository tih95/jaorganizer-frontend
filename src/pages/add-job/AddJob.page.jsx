import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Box, Heading, Button } from '@chakra-ui/core';

import { AddJobForm } from '../../components/add-job-form/AddJobForm.component';

const AddJob = ({ history, user }) => {
  console.log(history);
  return (
    <Box padding="1em 2em" maxWidth="1000px" margin="0 auto">
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
      <AddJobForm user={user} history={history} />
    </Box>
  )
}

export { AddJob };