import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
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
  AiOutlineUser, 
  AiOutlineMail,
  AiOutlineLock } from 'react-icons/ai';

import { addUser } from '../../services/users';

const SignUp = ({ setUser }) => {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isSigningUp, setIsSigningUp ] = useState(false);
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
    onSubmit: async values => {
      try {
        setIsSigningUp(true);
        const data = await addUser(values);
        window.localStorage.setItem('loggedInUser', JSON.stringify(data));
        setUser(data);
      } 
      catch (error) {
        toast.error('There was an error with your request');
        setIsSigningUp(false);
      } 
    }
  })

  return (
    <Box maxWidth="1000px" margin="0 auto" padding="1em">
      <ReactHelmet>
        <title>Sign Up | JaOrganizer</title>
      </ReactHelmet>

      <Text 
        fontWeight="500" 
        fontSize="1.5em" 
        textAlign="center" 
        marginBottom="1.5em"
      >
        Create an account today!
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl marginBottom="1.5em">
          <FormLabel htmlFor="name">Name</FormLabel>
          <InputGroup>
            <InputLeftElement color="gray.400">
              <AiOutlineUser size={20} />
            </InputLeftElement>
            <Input 
              type="name"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              borderColor={
                formik.touched.name && formik.errors.name ? '#FC8181' : '#CBD5E0'
              }
            />
          </InputGroup>
          {formik.touched.name && formik.errors.name
            ? <Text color="#FC8181">{formik.errors.name}</Text>
            : null
          }
        </FormControl>
        
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
          isLoading={isSigningUp} 
          loadingText="Submitting" 
          width="100%" 
          type="submit"
        >
          Sign Up!
        </Button>
      </form>
    </Box>
  )
}

export default SignUp ;