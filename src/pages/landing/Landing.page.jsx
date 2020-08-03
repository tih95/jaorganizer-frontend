import React from 'react';
import { Box, Image, Flex, Heading, Text, Button, ButtonGroup, Stack, Link } from '@chakra-ui/core';
import { Link as RRLink } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { useMediaQuery } from 'react-responsive';
import { RiLinkedinBoxLine, RiGithubLine } from 'react-icons/ri';
import ReactHelmet from 'react-helmet';

import HeroImage from '../../assets/undraw_job_offers_kw5d.png';
import DemoImage from '../../assets/screenshot3.png';
import DemoImage2 from '../../assets/screenshot2.png';

const Landing = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

	return (
		<Box>
			<ReactHelmet>
				<title>jaorganizer</title>
			</ReactHelmet>

			<Box margin="0 auto" maxW="1200px" padding="2em">
				<Fade>
					<Flex flexDir={isMobile ? 'column' : 'row'} minH="550px" alignItems="center" marginBottom="4em">
						<Flex
							width={isMobile ? '100%' : '50%'}
							flexDirection="column"
							order={isMobile ? 2 : 1}
							flexBasis="0"
							flexGrow="1"
							flexShrink="1"
						>
							<Heading fontWeight="700" fontSize="44px" marginBottom="0.4em">
								Job Application Organization in One Place
							</Heading>
							<Text fontWeight="500" fontSize="1.2em" marginBottom="1em">
								Applying for jobs is messy. Organize all your apps and keep track
							</Text>
							<Text>Built with ReactJs and Node/Express</Text>
							<ButtonGroup spacing="10px" marginTop="20px">
								<Link as={RRLink} to="/signup">
									<Button variantColor="teal">Get Started</Button>
								</Link>
							</ButtonGroup>
						</Flex>
						<Box flexBasis="0" flexGrow="1" flexShrink="1">
							<Image maxW="100%" src={HeroImage} order={isMobile ? 1 : 2} />
						</Box>
					</Flex>
				</Fade>

				<Box>
					<Heading as="h2" marginBottom="1.2em" fontSize="34px" textAlign="center">
						Built For You
					</Heading>
					<Fade right>
						<Flex alignItems="center" marginBottom="2em" flexDir={isMobile ? 'column' : 'row'}>
							<Stack padding="1em" flexBasis="0" flexGrow="1" flexShrink="1">
								<Heading as="h3" fontWeight="600" fontSize="1.6em">
									Have an organized view of all your applications
								</Heading>
								<Text marginTop="1em" fontWeight="300" fontSize="1.3em">
									Get a view of all your jobs applications listing various information about each job
									app.
								</Text>
							</Stack>
							<Box padding="1em" flexBasis="0" flexGrow="1" flexShrink="1">
								<Image
									borderRadius="22px"
									boxShadow="8px 8px 28px #c9c9c9, -8px -8px 28px #ffffff"
									maxW="100%"
									src={DemoImage}
									alt="demo image"
								/>
							</Box>
						</Flex>
					</Fade>

					<Fade left>
						<Flex marginBottom="2em" alignItems="center" flexDir={isMobile ? 'column' : 'row'}>
							<Box padding="1em" flexBasis="0" flexGrow="1" flexShrink="1">
								<Image
									borderRadius="22px"
									boxShadow="8px 8px 28px #c9c9c9, -8px -8px 28px #ffffff"
									maxW="100%"
									src={DemoImage2}
									alt="demo image"
								/>
							</Box>
							<Stack padding="1em" flexBasis="0" flexGrow="1" flexShrink="1">
								<Heading as="h3" fontWeight="600" fontSize="1.6em">
									Take down notes about a specific job
								</Heading>
								<Text marginTop="1em" fontWeight="300" fontSize="1.3em">
									Have to remember a specific thing to focus on? Use Markdown to take notes about it.
								</Text>
								<Link
									isExternal
									href="https://www.markdownguide.org/basic-syntax/"
									color="blue.500"
									marginTop="1em"
									fontWeight="300"
								>
									Learn more about markdown syntax here.
								</Link>
							</Stack>
						</Flex>
					</Fade>
				</Box>
			</Box>
			<Flex flexDir="column" padding="2em" alignItems="center" color="white" backgroundColor="black" as="footer">
				<Text>Made by Tristan Honda &copy; 2020</Text>
				<Stack marginTop="1em" isInline spacing={6}>
					<Link href="https://github.com/tih95">
						<RiGithubLine size={24} />
					</Link>
					<Link href="https://www.linkedin.com/in/tristanhonda/">
						<RiLinkedinBoxLine size={24} />
					</Link>
				</Stack>
			</Flex>
		</Box>
	);
};

export default Landing;
