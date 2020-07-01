import React from 'react';
import { Select, Text, Box, FormLabel } from '@chakra-ui/core';

const CustomSelect = ({ handleChange, name, label, options, error, touched, defaultValue }) => {
  return (
    <Box marginBottom="1.5em">
      <FormLabel>{label}</FormLabel>
      <Select defaultValue={defaultValue} placeholder="Select status" onChange={handleChange} name={name}>
        {options.map((option) => (
          <option key={option.status} value={option.status}>{option.text}</option>
        ))}
      </Select>
      {
        error && touched 
          ? <Text color="red.300">{error}</Text>
          : null
      }
    </Box>
  )
}

export { CustomSelect }