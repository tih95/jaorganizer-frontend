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

// const colors = {
//   'applied': '#4299E1',
//   'under-review': '#ECC94B',
//   'offered': '#48BB78',
//   'rejected': '#F56565',
//   'interviewing': '#ED8936'
// }

const statuses = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  'under-review': "Under Review",
  offered: 'Job Offered',
  rejected: 'Rejected'
}

const Job = ({ match, history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const jobId = match.params.id;
  const [ job, setJob ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ deleting, setDeleting ] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const resp = await axios.get(`https://infinite-garden-10545.herokuapp.com/api/jobs/${jobId}`);
      
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

  const deleteJob = async () => {
    try {
      setDeleting(true);
      await axios.delete(`https://infinite-garden-10545.herokuapp.com/api/jobs/${jobId}`);
      toast.success(`Sucessfully deleted ${job.title}`);
      history.goBack();
    }
    catch(e) {
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
        <Flex 
          flexDirection="column"
        >
          <Heading marginBottom="1em" fontSize="1.6em" as="h1">{job.title}</Heading>
          <Text>
            Link to posting: <Link href={job.jobLink} isExternal>{job.jobLink} <Icon name="external-link" /></Link>
          </Text>
          <Text>Location: {job.location}</Text>
          <Text>Company: {job.company}</Text>
          <Text>Date Applied: {dayjs.utc(job.dateApplied).format('MMM DD, \'YY')}</Text>
          <Text>Status: {statuses[job.status]}</Text>
        </Flex>
        <ButtonGroup marginTop="2em">
          <Button 
            backgroundColor="#38B2AC" 
            _hover={{backgroundColor: 'teal.300'}}
            onClick={onOpen}
            leftIcon={AiOutlineEdit}
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