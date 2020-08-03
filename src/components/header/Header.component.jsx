import React from 'react';
import { Box, Text, ButtonGroup, Button, Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@chakra-ui/core';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Header = ({ user, setUser }) => {
	const isMobile = useMediaQuery({ query: '(max-width: 900px)' });

	const logout = () => {
		window.localStorage.removeItem('loggedInUser');
		setUser(null);
	};

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			as="header"
			padding={isMobile ? '1em' : '1.5em 2em'}
			boxShadow="0px 0px 9px 3px rgba(41,41,41,.25)"
		>
			<Link to="/">
				<Text fontWeight="bold" fontSize="1.2em">
					jaorganizer
				</Text>
			</Link>
			{user ? (
				<Box>
					<Link to="/jobs">
						<Button color="black" marginRight="1em" variant="link">
							My Jobs
						</Button>
					</Link>

					<Menu>
						<MenuButton color="black" rightIcon={RiArrowDropDownLine} variant="link" as={Button}>
							{user.name}
						</MenuButton>
						<MenuList>
							<MenuGroup title="Account">
								<Link to="/account">
									<MenuItem>My Account</MenuItem>
								</Link>
								<MenuItem onClick={logout}>Log Out</MenuItem>
							</MenuGroup>
						</MenuList>
					</Menu>
				</Box>
			) : (
				<ButtonGroup>
					<Link to="/signup">
						<Button variantColor="teal" size={isMobile ? 'sm' : 'md'}>
							Sign Up!
						</Button>
					</Link>
					<Link to="/login">
						<Button marginLeft="0.5em" size={isMobile ? 'sm' : 'md'}>
							Log In
						</Button>
					</Link>
				</ButtonGroup>
			)}
		</Box>
	);
};

export { Header };
