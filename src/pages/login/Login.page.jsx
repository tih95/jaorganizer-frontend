import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/core';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { CustomInput } from '../../components/custom-input/CustomInput.component';

const Login = ({ setUser }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email format')
        .required('Email is required'),
      password: Yup.string()
        .required('Password required')
    }),
    onSubmit: async () => {
      try {
        const resp = await axios.post('http://localhost:3001/api/users/login', formik.values);

        window.localStorage.setItem('loggedInUser', JSON.stringify(resp.data));
        setUser(resp.data);
        
      } 
      catch (error) {
        formik.setFieldError('password', 'Invalid password or email');
        console.log('error', error);
      } 
    }
  })

  return (
    <Box maxWidth="1000px" margin="0 auto" padding="1em">
      <Heading marginBottom="1.5em" textAlign="center">Log In</Heading>
      <form onSubmit={formik.handleSubmit}>
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
        <Button width="100%" type="submit">Log In</Button>
      </form>
    </Box>
  )
}

export { Login };