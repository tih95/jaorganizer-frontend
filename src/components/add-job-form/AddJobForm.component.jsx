import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { 
  Button, 
  Text, 
  Input, 
  InputGroup, 
  Stack,
  Textarea,
  FormLabel,
  FormControl, 
  Select } from '@chakra-ui/core';

import { addJob } from '../../services/jobs';

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

const AddJobForm = ({ history, user }) => {
  const [ isAdding, setIsAdding ] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      dateApplied: '',
      jobLink: '',
      status: '',
      company: '',
      location: '',
      notes: ''
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
      try {
        const config = {
          headers: {
            Authorization: `bearer ${user.token}`
          }
        }

        setIsAdding(true);
        const data = await addJob(values, config);

        toast.success(`Successfully added ${data.title}`);

        formik.resetForm();
        history.goBack();
        
      }
      catch(e) {
        toast.error(`Failed to add ${values.title}`);
      }
    }
  });

  return (
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
        <Button 
          marginTop="1em"
          isLoading={isAdding}
          alignSelf="stretch"
          backgroundColor="teal.400" 
          _hover={{backgroundColor: 'teal.300'}} 
          type="submit"
          loadingText="Adding..."
        >
          Add Job
        </Button>
        
      </Stack>
    </form>
  )
}

export default AddJobForm;