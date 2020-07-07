import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Stack, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from '@chakra-ui/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import "react-datepicker/dist/react-datepicker.css";

import { CustomInput } from '../custom-input/CustomInput.component';
import { CustomSelect } from '../custom-select/CustomSelect.component';

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

const EditJobModal = ({ history, job, isOpen, onClose, user }) => {
  
  const [ isAdding, setIsAdding ] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: job.title,
      dateApplied: dayjs.utc(job.dateApplied).format('YYYY-MM-DD'),
      jobLink: job.jobLink,
      status: job.status,
      company: job.company,
      location: job.location
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
        .required('Required')
    }),
    onSubmit: async values => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      try {
        setIsAdding(true);
        const resp = await axios.put(`http://localhost:3001/api/jobs/${job.id}`, values, config)
        toast.success(`Successfully edited ${resp.data.title}`);
        formik.resetForm();
        history.goBack();
        
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
                <CustomInput
                  label="Job Title"
                  type="text" 
                  id="title"
                  name="title"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  touched={formik.touched.title}
                  error={formik.errors.title}
                  value={formik.values.title}
                />
                <CustomInput
                  label="Date Applied"
                  type="date" 
                  id="dateApplied"
                  name="dateApplied"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  touched={formik.touched.dateApplied}
                  error={formik.errors.dateApplied}
                  value={formik.values.dateApplied}
                />
                <CustomInput
                  label="Link to Posting"
                  type="text" 
                  id="jobLink"
                  name="jobLink"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  touched={formik.touched.jobLink}
                  error={formik.errors.jobLink}
                  value={formik.values.jobLink}
                />
                <CustomSelect 
                  label="Select Job Application Status"
                  handleChange={formik.handleChange}
                  name="status"
                  options={options}
                  error={formik.errors.status}
                  touched={formik.touched.status}
                  defaultValue={job.status}
                />
                <CustomInput
                  label="Job Location"
                  type="text" 
                  id="location"
                  name="location"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  touched={formik.touched.location}
                  error={formik.errors.location}
                  value={formik.values.location}
                />
                <CustomInput
                  label="Company"
                  type="text" 
                  id="company"
                  name="company"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  touched={formik.touched.company}
                  error={formik.errors.company}
                  value={formik.values.company}
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

export { EditJobModal };