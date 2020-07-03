import React from 'react';
import { Box, Heading, ButtonGroup, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box 
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      as="header"
      padding="1.5em 2em"
      boxShadow="0px 0px 9px 3px rgba(41,41,41,.25);"
    >
      <Heading fontSize="1.2em">JaOrganizer</Heading>
      <ButtonGroup>
        <Button variantColor="teal">
          <Link to="/signup">Sign Up!</Link>
        </Button>
        <Button>
          <Link to="login">Log In</Link>
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export { Header };