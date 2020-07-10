import React from 'react';
import { Box, Image, Flex, Heading, Text, Button, ButtonGroup } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactHelmet from 'react-helmet';

import HeroImage from '../../assets/undraw_job_offers_kw5d.png';

const Landing = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <Box padding="2em">
      <ReactHelmet>
        <title>JaOrganizer!</title>
      </ReactHelmet>
      <Flex  
        flexDir={isMobile ? 'column' : 'row'}
        alignItems="center"
      >
        <Flex 
          width={isMobile ? '100%' : '40%'}
          flexDirection="column"
          order={isMobile ? 2 : 1}
        >
          <Heading fontWeight="700" fontSize="2em" marginBottom="0.4em">Job App Organizer!</Heading>
          <Text fontWeight="500" fontSize="1.2em" marginBottom="1em">Applying for jobs is messy. Organize all your apps and keep track</Text>
          <Text>Built with ReactJs and Node/Express</Text>
          <ButtonGroup spacing="10px" marginTop="20px">
            <Link to="/signup">
              <Button variantColor="teal">Get Started</Button>
            </Link>
          </ButtonGroup>
        </Flex>
        <Image 
          width={isMobile ? '100%' : '60%'}
          src={HeroImage} 
          order={isMobile ? 1 : 2}
        />
      </Flex>
    </Box>
  )
}

export default Landing ;