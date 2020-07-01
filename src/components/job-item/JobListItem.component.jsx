import React from 'react';
import { Link } from 'react-router-dom';
import { PseudoBox, Heading, Text, Stack } from '@chakra-ui/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { BsBuilding, GrLocation, AiOutlineCalendar, GrStatusInfo } from 'react-icons/all';

dayjs.extend(utc);

const statuses = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  'under-review': "Under Review",
  offered: 'Job Offered',
  rejected: 'Rejected'
}

const JobListItem = ({ job, color }) => {
  return (
    <Link to={`/jobs/${job.id}`}>
      <PseudoBox 
        borderLeft={`8px solid ${color}`}
        borderRadius="10px"
        padding="1em"
        backgroundColor="#EDF2F7"
        transition="0.4s all"
        _hover={{backgroundColor: 'teal.50', transition: "0.4s all"}}
      >
        <Heading fontSize="1.1em" marginBottom="0.4em">{job.title}</Heading>
        <Stack isInline alignItems="center">
          <Stack isInline alignItems="center">
            <BsBuilding size={20} />
            <Text marginLeft="0.2em">{job.company}</Text>
          </Stack>
          <Stack isInline alignItems="center">
            <GrLocation size={20} />
            <Text marginLeft="0.2em">{job.location}</Text>
          </Stack>
        </Stack>
        <Stack isInline alignItems="center">
          <GrStatusInfo />
          <Text marginLeft="0.4em">Application Status: {statuses[job.status]}</Text>
        </Stack>
        
        <Stack isInline alignItems="center" marginTop="0.4em">
          <AiOutlineCalendar size={18} />
          <Text as="i" fontSize="0.8em" marginLeft="0.4em" >Applied {dayjs.utc(job.dateApplied).format('MMM DD, \'YY')}</Text>
        </Stack>
        
      </PseudoBox>
    </Link>
    
  )
}

export { JobListItem };