import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Stack } from '@chakra-ui/core';

import "react-datepicker/dist/react-datepicker.css";

import { CustomInput } from '../custom-input/CustomInput.component';
import { CustomSelect } from '../custom-select/CustomSelect.component';

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

const AddJobForm = ({ history }) => {
  
  const [ isAdding, setIsAdding ] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      dateApplied: '',
      jobLink: '',
      status: '',
      company: '',
      location: ''
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
      try {
        setIsAdding(true);
        const resp = await axios.post('https://infinite-garden-10545.herokuapp.com/api/jobs', values)
        toast.success(`Successfully added ${resp.data.title}`);
        formik.resetForm();
        history.goBack();
        
      }
      catch(e) {
        toast.error(`Failed to add ${values.title}`);
      }
    }
  });

  console.log(typeof formik.values.dateApplied)

  return (
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
        <Button 
          isLoading={isAdding}
          alignSelf="stretch"
          backgroundColor="teal.400" 
          _hover={{backgroundColor: 'teal.300'}} 
          type="submit"
        >
          Add Job
        </Button>
      </Stack>
    </form>
  )
}

export { AddJobForm };