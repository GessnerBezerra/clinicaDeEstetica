import Button from '@mui/material/Button';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../style/styleFonte2.css';

interface SectionContainerProps {
	flexDirection?: string;
	fontSize?: string;
	background?: string;
}

const StyledButton = styled(Button)<SectionContainerProps>`
	&& {
		background-color: ${(props) => props.background};
		border: none;
		color: white;
		font-size: ${(props) => props.fontSize || '10px'};
		font-family: 'gothamPro', sans-serif;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.3s;
		box-shadow: rgba(12, 12, 12, 0.44) 2px 5px 8px;

		&:hover {
			background-color: #f7adaf;
		}

		&:focus {
			outline: none;
		}

		// Adicionando estilos responsivos usando media queries
		@media (max-width: 768px) {
			font-size: 30%; // Ajuste conforme necessário
		}
	}
`;

interface ButtonProps {
	titlePhrase?: ReactNode;
	onClick?: () => void;
	endIcon?: ReactNode;
	to?: string;
	id?: string;
	fontSize?: string;
	disabled?: boolean;
	children?: ReactNode;
	background?: string;
}

const Buttom: React.FC<ButtonProps> = ({
	titlePhrase,
	onClick,
	endIcon,
	to,
	fontSize,
	id,
	disabled,
	children,
	background,
}) => {
	return (
		<StyledButton
			onClick={onClick}
			endIcon={endIcon}
			fontSize={fontSize}
			id={id}
			disabled={disabled}
			background={background}
		>
			{to ? (
				<Link
					to={to}
					style={{
						textDecoration: 'none',
						color: 'white',
					}}
				>
					{titlePhrase}
					{children}
				</Link>
			) : (
				<span>{titlePhrase}</span>
			)}
		</StyledButton>
	);
};

export default Buttom;
