import Button from '@mui/material/Button';
import { SvgIconProps } from '@mui/material/SvgIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

interface IconProps extends SvgIconProps {
	height?: string;
	width?: string;
	// component: React.FC<SvgIconProps>;
	iconColor?: string;
	hoverColor?: string;
	iconBackgroundColor?: string;
	hoverBackgroundColor?: string;
}
const Mensseger: React.FC<IconProps> = ({
	height,
	width,
	// component: IconComponent,
	iconColor = '#db7734',
	hoverColor = '#3445db',
	iconBackgroundColor,
	hoverBackgroundColor,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const iconStyles = {
		'--icon-height': height,
		'--icon-width': width,
		color: isHovered ? hoverColor : iconColor,
		background: isHovered ? hoverBackgroundColor : iconBackgroundColor,
	} as React.CSSProperties;

	return (
		<>
			<Button
				sx={{ marginBottom: '10px', minWidth: '0px' }}
				className=".icon-container-messenger"
				style={iconStyles}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* <IconComponent {...rest} /> */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					className="bi bi-messenger"
					viewBox="0 0 16 16"
				>
					<path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
				</svg>
			</Button>
		</>
	);
};

export default Mensseger;
