import React from 'react';
import { Box, Image, Flex, Heading, Text, Button, ButtonGroup, Stack } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactHelmet from 'react-helmet';

import HeroImage from '../../assets/undraw_job_offers_kw5d.png';

import FeatureImage from '../../assets/feature.png';

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
        marginBottom="2em"
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

      <Box>
        <Heading marginBottom="1.2em" textAlign="center">Features</Heading>
        <Flex marginBottom="1.5em" flexDir={isMobile ? 'column' : 'row'}>
          <Stack spacing={5} flex="1">
            <Text fontWeight="500" fontSize="1.3em">- Have an organized view of all current job applications</Text>
            <Text fontWeight="500" fontSize="1.3em">- Use markdown to take notes about a specific job</Text>
          </Stack>
          <Image width={isMobile ? '100%' : '60%'} flex="1" src={FeatureImage} alt="job-list feature" />
        </Flex>
      </Box>
    </Box>
  )
}

export default Landing ;