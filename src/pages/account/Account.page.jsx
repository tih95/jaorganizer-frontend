import React from 'react';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactHelmet from 'react-helmet';
import { 
  Box, 
  Heading, 
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Text } from '@chakra-ui/core';

import { editUser } from '../../services/users';

const Account = ({ user, setUser }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string()
        .email('Must be valid email format')
    }),
    onSubmit: async values => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }

      try {
        const data = await editUser(user.id, values, config);
        window.localStorage.setItem('loggedInUser', JSON.stringify(data))
        setUser(data);
        toast.success(`Successfully changed!`);
      }
      catch(e) {
        toast.error('Failed to make changes');
      }
    }
  })

  return (
    <Box maxW="900px" padding="2em" margin="0 auto">
      <ReactHelmet>
        <title>Profile</title>
      </ReactHelmet>
      <Heading>Profile </Heading>
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

        <Button 
          type="submit"
          disabled={formik.values.name === user.name && formik.values.email === user.email}
        >
          Change
        </Button>
      </form>
    </Box>
  )
}

export default Account;