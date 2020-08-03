import React, { useState, useEffect, Suspense, lazy } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { 
  Button, Text, Box, Heading, Stack, Link, 
  useDisclosure, 
  ButtonGroup, Icon, Skeleton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/core';
import ReactMarkdown from 'react-markdown';
import ReactHelmet from 'react-helmet';
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import { fetchJob, deleteJob } from '../../services/jobs';

const EditJobModal = lazy(() => import('../../components/edit-job-modal/EditJobModal.component'))

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
  const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);

  useEffect(() => {
    const getJob = async () => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      try {
        const data = await fetchJob(jobId, config);
        
        setJob(data);
        setIsLoading(false);
      }
      catch(e) {
        setJob(null);
        setIsLoading(false);
      }
    }

    getJob();
  }, [jobId, user])

  const handleDelete = async () => {
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
    try {
      setDeleting(true);
      await deleteJob(jobId, config);
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
      <ReactHelmet>
        <title>Job Page | JaOrganizer</title>
      </ReactHelmet>
      {
        isLoading ? <Skeleton height="70px" />
        : <>
        <Suspense fallback={<div>Loading...</div>}>
          <EditJobModal
            job={job}
            history={history}
            isOpen={isOpen}
            onClose={onClose}
            user={user}
            setJob={setJob}
          />
        </Suspense>
        

        <AlertDialog
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button isLoading={deleting}
            loadingText="Deleting" variantColor="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
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
        <Stack 
          fontSize="1.2em"
          spacing={2}
        >
          <Text>
            <Text as="strong">Link to posting: </Text> <Link color="#63B3ED" href={job.jobLink} isExternal>{job.jobLink} <Icon name="external-link" /></Link>
          </Text>
          <Text><Text as="strong">Company:</Text> {job.company}</Text>
          <Text><Text as="strong">Location:</Text> {job.location}</Text>
          <Text><Text as="strong">Date Applied:</Text> {dayjs.utc(job.dateApplied).format('MMM DD, \'YY')}</Text>
          <Text><Text as="strong">Status:</Text> <Text as="em" color={colors[job.status]}>{statuses[job.status]}</Text></Text>
          <Text as="strong">Notes</Text>
          <Box padding="1em" marginTop="1em" border="2px solid #E2E8F0" borderRadius="4px">
            <ReactMarkdown renderers={ChakraUIRenderer()} source={job.notes} skipHtml={true} />
          </Box>
          
        </Stack>
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
            onClick={() => setDeleteModalOpen(true)}
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

export default Job;