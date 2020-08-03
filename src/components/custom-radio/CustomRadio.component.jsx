import React from 'react';
import { Button } from '@chakra-ui/core';

const CustomRadio = React.forwardRef((props, ref) => {
	const { isChecked, isDisabled, value, ...rest } = props;
	return (
		<Button
			size="sm"
			ref={ref}
			variant={isChecked ? 'solid' : 'link'}
			aria-checked={isChecked}
			role="radio"
			isDisabled={isDisabled}
			{...rest}
		/>
	);
});

export default CustomRadio;
