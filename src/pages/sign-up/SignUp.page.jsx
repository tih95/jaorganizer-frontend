import React from 'react';
import { useFormik } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import * as Yup from 'yup';
import axios from 'axios';
import { CustomInput } from '../../components/custom-input/CustomInput.component';

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      email: Yup.string()
        .email('Must be a valid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be 8 characters or longer')
        .required('Password required')
    }),
    onSubmit: async () => {
      // const resp = await axios.post('http://localhost:3001/api/signup');
    }
  })
  return (
    <Box maxWidth="1000px" margin="0 auto" padding="1em">
      <form onSubmit={formik.handleSubmit}>
        <CustomInput 
          name="name"
          type="name"
          id="name"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={formik.errors.name}
          value={formik.values.name}
          touched={formik.touched.name}
          label="Name"
        />
        <CustomInput 
          name="email"
          type="email"
          id="email"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={formik.errors.email}
          value={formik.values.email}
          touched={formik.touched.email}
          label="Email"
        />
        <CustomInput 
          name="password"
          type="password"
          id="password"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={formik.errors.password}
          value={formik.values.password}
          touched={formik.touched.password}
          label="Password"
        />
        <Button type="submit">Sign Up!</Button>
      </form>
    </Box>
  )
}

export { SignUp };