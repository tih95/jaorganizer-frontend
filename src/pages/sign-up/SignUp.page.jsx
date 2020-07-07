import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Box, Button, Heading } from '@chakra-ui/core';
import * as Yup from 'yup';
import { CustomInput } from '../../components/custom-input/CustomInput.component';

const SignUp = ({ setUser }) => {
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
      try {
        const resp = await axios.post('http://localhost:3001/api/users/signup', formik.values);
        window.localStorage.setItem('loggedInUser', JSON.stringify(resp.data));
        setUser(resp.data);
      } 
      catch (error) {
        console.log(error);
      } 
    }
  })
  return (
    <Box maxWidth="1000px" margin="0 auto" padding="1em">
      <Heading textAlign="center" marginBottom="1.5em">Create an account today!</Heading>
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
        <Button width="100%" type="submit">Sign Up!</Button>
      </form>
    </Box>
  )
}

export { SignUp };