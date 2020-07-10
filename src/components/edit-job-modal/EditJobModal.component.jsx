import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { 
  Button, 
  Stack, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  FormLabel, 
  Textarea,
  Text, 
  Input, 
  InputGroup, 
  FormControl, 
  Select} from '@chakra-ui/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { editJob } from '../../services/jobs';

dayjs.extend(utc);

const options = [
  {
    status: 'applied',
    text: 'Applied'
  },
  {
    status: 'under-review',
    text: 'Under Review'
  },
  {
    status: 'interviewing',
    text: 'Interviewing'
  },
  {
    status: 'offered',
    text: 'Job Offered'
  },
  {
    status: 'rejected',
    text: 'Rejected'
  },
]

const EditJobModal = ({ setJob, job, isOpen, onClose, user }) => {
  
  const [ isAdding, setIsAdding ] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: job.title,
      dateApplied: dayjs.utc(job.dateApplied).format('YYYY-MM-DD'),
      jobLink: job.jobLink,
      status: job.status,
      company: job.company,
      location: job.location,
      notes: job.notes
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Required'),
      dateApplied: Yup.date()
        .required('Required'),
      jobLink: Yup.string()
        .required('Required'),
      status: Yup.string()
        .oneOf(['applied', 'interviewing', 'offered', 'under-review', 'rejected'], 'Invalid Status Type')
        .required('Required'),
      company: Yup.string()
        .required('Required'),
      location: Yup.string()
        .required('Required'),
      notes: Yup.string()
    }),
    onSubmit: async values => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      try {
        setIsAdding(true);
        const data = await editJob(job.id, values, config);
        toast.success(`Successfully edited ${data.title}`);
        setJob(data);
        formik.resetForm();
        onClose();
      }
      catch(e) {
        toast.error(`Failed to add ${values.title}`);
      }
    }
  });

  const hasFormedChanged = () => {
    console.log('has formed changed');
    return ( formik.values.title === job.title
      && formik.values.dateApplied === dayjs.utc(job.dateApplied).format('YYYY-MM-DD')
      && formik.values.company === job.company
      && formik.values.jobLink === job.jobLink
      && formik.values.location === job.location
      && formik.values.status === job.status
      && formik.values.notes === job.notes
    )
  }
  
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Stack>
                <FormControl marginBottom="1.5em">
                  <FormLabel htmlFor="title">Job Title</FormLabel>
                  <InputGroup>
                    <Input 
                      type="text"
                      name="title"
                      id="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      borderColor={
                        formik.touched.title && formik.errors.title 
                        ? '#FC8181' 
                        : '#CBD5E0'
                      }
                    />
                  </InputGroup>
                  {formik.touched.title && formik.errors.title
                    ? <Text color="#FC8181">{formik.errors.title}</Text>
                    : null
                  }
                </FormControl>

                <FormControl marginBottom="1.5em">
                  <FormLabel htmlFor="dateApplied">Date Applied</FormLabel>
                  <InputGroup>
                    <Input 
                      type="date"
                      name="dateApplied"
                      id="dateApplied"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dateApplied}
                      borderColor={
                        formik.touched.date && formik.errors.dateApplied 
                        ? '#FC8181' 
                        : '#CBD5E0'
                      }
                    />
                  </InputGroup>
                  {formik.touched.dateApplied && formik.errors.dateApplied
                    ? <Text color="#FC8181">{formik.errors.dateApplied}</Text>
                    : null
                  }
                </FormControl>
                  
                <FormControl marginBottom="1.5em">
                  <FormLabel htmlFor="jobLink">Link to Posting</FormLabel>
                  <InputGroup>
                    <Input 
                      type="text"
                      name="jobLink"
                      id="jobLink"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.jobLink}
                      borderColor={
                        formik.touched.jobLink && formik.errors.jobLink 
                        ? '#FC8181' 
                        : '#CBD5E0'
                      }
                    />
                  </InputGroup>
                  {formik.touched.jobLink && formik.errors.jobLink
                    ? <Text color="#FC8181">{formik.errors.jobLink}</Text>
                    : null
                  }
                </FormControl>

                <FormControl marginBottom="1.5em">
                  <FormLabel>Select Application Status</FormLabel>
                    <Select
                      placeholder="Select status" 
                      onChange={formik.handleChange} 
                      name="status"
                    >
                      {options.map((option) => (
                        <option key={option.status} value={option.status}>{option.text}</option>
                      ))}
                    </Select>
                    {
                      formik.errors.status && formik.touched.status
                        ? <Text color="red.300">{formik.errors.status}</Text>
                        : null
                    }
                </FormControl>

                <FormControl marginBottom="1.5em">
                  <FormLabel htmlFor="location">Job Location</FormLabel>
                  <InputGroup>
                    <Input 
                      type="text"
                      name="location"
                      id="location"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                      borderColor={
                        formik.touched.location && formik.errors.location 
                        ? '#FC8181' 
                        : '#CBD5E0'
                      }
                    />
                  </InputGroup>
                  {formik.touched.location && formik.errors.location
                    ? <Text color="#FC8181">{formik.errors.location}</Text>
                    : null
                  }
                </FormControl>
                <FormControl marginBottom="1.5em">
                  <FormLabel htmlFor="company">Company</FormLabel>
                  <InputGroup>
                    <Input 
                      type="text"
                      name="company"
                      id="company"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company}
                      borderColor={
                        formik.touched.company && formik.errors.company 
                        ? '#FC8181' 
                        : '#CBD5E0'
                      }
                    />
                  </InputGroup>
                  {formik.touched.company && formik.errors.company
                    ? <Text color="#FC8181">{formik.errors.company}</Text>
                    : null
                  }
                </FormControl>
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Textarea 
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  name="notes"
                  id="notes"
                  placeholder="# Use markdown to create notes about job, interview, etc!" 
                  resize="vertical" 
                />
              </Stack>
            </form>
        </ModalBody>

        <ModalFooter>
          <Button 
            isLoading={isAdding} 
            loadingText="Adding..." 
            backgroundColor="teal.400" 
            _hover={{backgroundColor: 'teal.300'}} 
            variantColor="blue" 
            mr={3} 
            onClick={formik.handleSubmit}
            isDisabled={hasFormedChanged()}
          >
            Edit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditJobModal;