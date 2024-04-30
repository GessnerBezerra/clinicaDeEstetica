import Button from '@mui/material/Button';
import { SvgIconProps } from '@mui/material/SvgIcon';
import React, { useState } from 'react';
import './Icon.css';

export interface IconProps extends SvgIconProps {
	height?: string;
	width?: string;
	component: React.FC<SvgIconProps>;
	iconColor?: string;
	hoverColor?: string;
	iconBackgroundColor?: string;
	hoverBackgroundColor?: string;
}

const Icon: React.FC<IconProps> = ({
	height,
	width,
	component: IconComponent,
	iconColor,
	hoverColor,
	iconBackgroundColor,
	hoverBackgroundColor,
	...rest
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const iconStyles = {
		'--icon-height': height,
		'--icon-width': width,
		color: isHovered ? hoverColor : iconColor,
		background: isHovered ? hoverBackgroundColor : iconBackgroundColor,
	} as React.CSSProperties;

	return (
		<Button
			sx={{
				marginTop: '0px',
				minWidth: '0px',
				borderRadius: '30%',
				height: '24px',
			}}
			className="icon-container"
			style={iconStyles}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<IconComponent {...rest} />
		</Button>
	);
};

export default Icon;
