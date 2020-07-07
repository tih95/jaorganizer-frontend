import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineEdit } from 'react-icons/all';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Button, Text, Box, Heading, Flex, Link, 
  useDisclosure, 
  ButtonGroup, Icon, Skeleton} from '@chakra-ui/core';
import { EditJobModal } from '../../components/edit-job-modal/EditJobModal.component';

dayjs.extend(utc);

const colors = {
  'applied': '#4299E1',
  'under-review': '#ECC94B',
  'offered': '#48BB78',
  'rejected': '#F56565',
  'interviewing': '#ED8936'
}

const statuses = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  'under-review': "Under Review",
  offered: 'Job Offered',
  rejected: 'Rejected'
}

const Job = ({ match, history, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const jobId = match.params.id;
  const [ job, setJob ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ deleting, setDeleting ] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      try {
        const resp = await axios.get(`http://localhost:3001/api/jobs/${jobId}`, config);
      
        setJob(resp.data);
        setIsLoading(false);
      }
      catch(e) {
        setJob(null);
        setIsLoading(false);
      }
    }

    fetchJob();
  }, [jobId, user])

  const deleteJob = async () => {
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:3001/api/jobs/${jobId}`, config);
      toast.success(`Sucessfully deleted ${job.title}`);
      history.goBack();
    }
    catch(e) {
      setDeleting(false);
      toast.error('Failed to delete job');
    }
  }

  if ( job === null) {
    return <Text textAlign="center">Sorry, that job doesn't exist</Text>
  }

  return (
    <Box padding="1em 2em" maxWidth="1000px" margin="0 auto">
      {
        isLoading ? <Skeleton height="70px" />
        : <>
        <EditJobModal
          job={job}
          history={history}
          isOpen={isOpen}
          onClose={onClose}
          user={user}
        />
        
        <Button 
          onClick={() => history.push('/jobs')} 
          marginBottom="0.8em" 
          variant="link" 
          fontSize="1.2em" 
          leftIcon={AiOutlineArrowLeft}
        >
          Go back to jobs
        </Button>
        <Heading marginBottom="1em" fontSize="1.6em" as="h1">{job.title}</Heading>
        <Flex 
          flexDirection="column"
        >
          <Text>
            Link to posting: <Link color="blue.300" href={job.jobLink} isExternal>{job.jobLink} <Icon name="external-link" /></Link>
          </Text>
          <Text>Location: <Text as="strong">{job.location}</Text></Text>
          <Text>Company: <Text as="strong">{job.company}</Text></Text>
          <Text>Date Applied: <Text as="strong">{dayjs.utc(job.dateApplied).format('MMM DD, \'YY')}</Text></Text>
          <Text>Status: <Text as="strong" color={colors[job.status]}>{statuses[job.status]}</Text></Text>
        </Flex>
        <ButtonGroup display="flex" width="100%" marginTop="2em">
          <Button 
            backgroundColor="#38B2AC" 
            _hover={{backgroundColor: 'teal.300'}}
            onClick={onOpen}
            leftIcon={AiOutlineEdit}
            flex="1"
          >
            Edit Job
          </Button>
            
          <Button 
            backgroundColor="#F86868" 
            _hover={{backgroundColor: 'red.300'}}
            onClick={deleteJob}
            isLoading={deleting}
            loadingText="Deleting"
            leftIcon={AiOutlineDelete}
            flex="1"
          >
            Delete Job
          </Button>
        </ButtonGroup>
        
      </>
      }
      
    </Box>
  )
}

export { Job };