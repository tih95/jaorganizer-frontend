import React from 'react';
import { Box } from '@chakra-ui/core';

const Header = () => {
  return (
    <Box 
      as="header"
      padding="1em 2em"
      boxShadow="0px 0px 9px 3px rgba(41,41,41,.25);"
    >
      <h1>JaOrganizer</h1>
    </Box>
  )
}

export { Header };