import React from 'react';
import { Box, Image, Flex, Heading, Text, Button, ButtonGroup } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

import HeroImage from '../../assets/undraw_job_offers_kw5d.png';

const Landing = () => {
  return (
    <Box padding="2em">
      <Flex alignItems="center">
        <Flex width="40%" flexDirection="column">
          <Heading fontWeight="700" fontSize="2em" marginBottom="0.4em">Job App Organizer!</Heading>
          <Text fontWeight="500" fontSize="1.2em" marginBottom="1em">Applying for jobs is messy. Organize all your apps and keep track</Text>
          <Text>Built with ReactJs and Node/Express</Text>
          <ButtonGroup marginTop="20px">
            <Button variantColor="teal">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button>
              <Link to="login">Log In</Link>
            </Button>
          </ButtonGroup>
        </Flex>
        <Image width="60%" src={HeroImage} />
      </Flex>
    </Box>
  )
}

export { Landing };