import React, { lazy, Suspense} from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Box, Heading, Button } from '@chakra-ui/core';
import ReactHelmet from 'react-helmet';

const AddJobForm = lazy(() => import('../../components/add-job-form/AddJobForm.component'));

const AddJob = ({ history, user }) => {
  console.log(history);
  return (
    <Box padding="1em 2em" maxWidth="1000px" margin="0 auto">
      <ReactHelmet>
        <title>Add New Job</title>
      </ReactHelmet>
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
      <Suspense fallback={<div>Loading...</div>}>
        <AddJobForm user={user} history={history} />
      </Suspense>
      
    </Box>
  )
}

export default AddJob;