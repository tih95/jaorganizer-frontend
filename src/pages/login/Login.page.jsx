import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactHelmet from 'react-helmet';
import { 
  Box, 
  Button, 
  Text, 
  Input, 
  InputGroup, 
  InputRightElement, 
  InputLeftElement,
  FormLabel,
  FormControl } from '@chakra-ui/core';
import { 
  AiOutlineEye, 
  AiOutlineEyeInvisible, 
  AiOutlineMail,
  AiOutlineLock } from 'react-icons/ai';

import { login } from '../../services/users';

const Login = ({ setUser }) => {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);

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
    onSubmit: async values => {
      try {
        setIsLoggingIn(true);
        const data = await login(values);

        window.localStorage.setItem('loggedInUser', JSON.stringify(data));
        setUser(data);
        
      } 
      catch (error) {
        formik.setFieldError('password', 'Invalid password or email');
        console.log('error', error);
      } 
    }
  })

  return (
    <Box maxWidth="1000px" margin="0 auto" padding="1em">
      <ReactHelmet>
        <title>Login | JaOrganizer</title>
      </ReactHelmet>

      <Text 
        fontSize="1.5em" 
        fontWeight="500" 
        marginBottom="1.5em" 
        textAlign="center"
      >
        Log In
      </Text>
      
      <form onSubmit={formik.handleSubmit}>
        <FormControl marginBottom="1.5em">
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputGroup>
            <InputLeftElement color="gray.400">
              <AiOutlineMail size={20} />
            </InputLeftElement>
            <Input 
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              borderColor={
                formik.touched.email && formik.errors.email ? '#FC8181' : '#CBD5E0'
              }
            />
          </InputGroup>
          {formik.touched.email && formik.errors.email
            ? <Text color="#FC8181">{formik.errors.email}</Text>
            : null
          }
        </FormControl>
        
        <FormControl marginBottom="1.5em">
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <InputLeftElement color="gray.400">
              <AiOutlineLock size={20} />
            </InputLeftElement>
            <Input 
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              borderColor={
                formik.touched.password && formik.errors.password 
                  ? '#FC8181' 
                  : '#CBD5E0'
              }
            />
            <InputRightElement 
              cursor="pointer" 
              color="gray.400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword 
                ? <AiOutlineEyeInvisible size={20} /> 
                : <AiOutlineEye size={20} />}
            </InputRightElement>
          </InputGroup>
          {formik.touched.password && formik.errors.password
            ? <Text color="#FC8181">{formik.errors.password}</Text>
            : null
          }
        </FormControl>
        <Button 
          isLoading={isLoggingIn} 
          loadingText="Logging In..." 
          width="100%" 
          type="submit"
        >
          Log In
        </Button>
      </form>
    </Box>
  )
}

export default Login;