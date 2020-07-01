import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Button, Text, Editable, Box } from '@chakra-ui/core';

const Job = ({ match, history }) => {
  const jobId = match.params.id;
  const [ job, setJob ] = useState({});
  const [ isEditing, setIsEditing ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  const deleteJob = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/jobs/${jobId}`);
      toast.success(`Sucessfully deleted ${job.title}`);
      history.goBack();
    }
    catch(e) {
      toast.error('Failed to delete job');
    }
  }

  useEffect(() => {
    const fetchJob = async () => {
      console.log('fetching job info');
      try {
        const resp = await axios.get(`http://localhost:3001/api/jobs/${jobId}`);
      
        setJob(resp.data);
        setIsLoading(false);
      }
      catch(e) {
        setJob(null);
        setIsLoading(false);
      }
    }

    fetchJob();
  }, [jobId])

  if (isLoading) {
    return <ClipLoader />
  }

  if ( job === null) {
    return <Text textAlign="center">Sorry, that job doesn't exist</Text>
  }

  return (
    <Box padding="1em 2em">
      <Button 
        onClick={() => history.push('/jobs')} 
        marginBottom="0.8em" 
        variant="link" 
        fontSize="1.2em" 
        leftIcon={AiOutlineArrowLeft}
      >
        Go back to jobs
      </Button>

      <h1>{job.title}</h1>
      <Button 
        backgroundColor="#F86868" 
        _hover={{backgroundColor: 'red.300'}}
        onClick={deleteJob}
      >
        Remove job
      </Button>
    </Box>
  )
}

export { Job };