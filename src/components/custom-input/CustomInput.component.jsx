import React from 'react';
import { Input, Box, Text, FormLabel } from '@chakra-ui/core';

const CustomInput = ({ label, error, touched, type, id, name, handleChange, handleBlur, value }) => {
  return (
    <Box marginBottom="1.5em">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        borderColor={touched && error ? '#FC8181' : '#CBD5E0'}
        type={type}
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {touched && error ? <Text color="red.300">{error}</Text> : null}
    </Box>
  )
}

export { CustomInput };