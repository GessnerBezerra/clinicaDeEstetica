import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import styled from 'styled-components';

const options = [
	'Capilar',
	'Facial',
	// 'Questionario4',
	// 'Questionario5',
	// 'Questionario6',
	// 'Questionario7',
	// 'Questionario8',
	// 'Questionario9',
	// 'Questionario10',
	// 'Questionario11',
	// 'Questionario12',
	// 'Questionario13',
	// 'Questionario14',
];

const ITEM_HEIGHT = 28;

const ButtonStyle = styled(Button)`
	background-color: '#73BAFB';
	transition: background-color 0.3s;
	box-shadow: rgba(12, 12, 12, 0.44) 2px 5px 8px;
	color: wheat;
	&:hover {
		background-color: '#c684ff';
	}
	@media (max-width: 768px) {
		background-color: '#c684ff';
		font-size: 10%; // Ajuste conforme necessário
	}
`;

const ParagrafoConteinar = styled(Typography)`
	display: flex;
	&::after {
		content: none;
	}
`;

export default function LongMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (option: string) => {
		// Verificando se a opção é "Anamnese" e, em caso afirmativo, navegando para "/pdf"
		if (option === 'Capilar') {
			// window.location.href = `/termo-de-conduta`;
			window.location.href = `/pre-cons-capilar`;
		} else if (option === 'Facial') {
			// window.location.href = `/termo-de-conduta`;
			window.location.href = `/pre-cons-facial`;
		}
		// else if (option === 'Barbaterapia') {
		// 	// window.location.href = `/termo-de-conduta`;
		// 	window.location.href = `/pre-cons-barbaterapia`;
		// } else if (option === 'Questionario4') {
		// 	// window.location.href = `/termo-de-conduta`;
		// 	window.location.href = `/pre-cons-pdf4`;
		// }

		handleClose();
	};

	const currentUrl = window.location.pathname;
	console.log(currentUrl);

	return (
		<div>
			{/* <Buttom
				background="#7B193F"
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				titlePhrase="Pré-Consulta"
				fontSize="12px"
				// onClick={() => generatePDF(perguntas.cpf)}
				onClick={() => handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			/> */}
			<ButtonStyle
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				sx={{
					backgroundColor: '#73BAFB',
					color: 'white',
					'&:hover': {
						backgroundColor: '#c684ff', // Cor de fundo ao passar o mouse
						color: '#042174',
					},
				}}
				// disableElevation
				onClick={handleClick}
				endIcon={
					open ? (
						<ArrowDropUp fontSize="large" />
					) : (
						<ArrowDropDown fontSize="large" />
					)
				}
			>
				Pré-Consulta
			</ButtonStyle>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						display: 'flex',
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
						color: '#042174',
					},
				}}
			>
				{/* <div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						padding: '8px',
					}}
				>
					<IconButton size="small" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</div> */}
				{options.map((option) => (
					<MenuItem
						key={option}
						selected={option === 'Pyxis'}
						onClick={() => handleMenuItemClick(option)} // Usando a função de tratamento de clique personalizada
						disabled={
							(currentUrl === '/pre-cons-barbaterapia' &&
								option.toLowerCase() === 'barbaterapia') ||
							(currentUrl === '/pre-cons-capilar' &&
								option.toLowerCase() === 'capilar') ||
							(currentUrl === '/pre-cons-facial' &&
								option.toLowerCase() === 'facial') ||
							(currentUrl === '/pre-cons-pdf4' &&
								option.toLowerCase() === 'questionario4')
						}
						sx={{
							'&:hover': {
								backgroundColor: '#c684ff', // Cor de fundo ao passar o mouse
								color: '#042174',
							},
							color: '#042174', // Cor do texto (opcional, dependendo do seu design)
							width: '100vw',
						}}
					>
						{/* {option.toLowerCase() === `facial` ? (
							<ParagrafoConteinar>
								<Badge
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									badgeContent={'Breve'}
									color="error"
								>
									{option}
								</Badge>
							</ParagrafoConteinar>
						) : (
							<ParagrafoConteinar textAlign="center">
								{option}
							</ParagrafoConteinar>
						)} */}
						{/* LOGICA PARA DEIXAR AS OPTIONS OCULTAS COMENTADAS A BAIXO  */}

						{/* {currentUrl === `/pre-cons-facial` &&
						option.toLowerCase() === `facial` ? (
							<Typography
								textAlign="center"
								style={{
									display: 'none',
									// fontSize: '12px',
								}}
							>
								{option}
							</Typography>
						) : currentUrl === '/pre-cons-capilar' &&
						  option.toLowerCase() === `capilar` ? (
							<Typography
								textAlign="center"
								style={{ display: 'none' }}
							>
								{option}
							</Typography>
						) : currentUrl === '/pre-cons-estetica' &&
						  option.toLowerCase() === `estética` ? (
							<Typography
								textAlign="center"
								style={{ display: 'none' }}
							>
								{option}
							</Typography>
						) : (
							<Typography textAlign="center">{option}</Typography>
						)} */}
						<ParagrafoConteinar textAlign="center">
							{option}
						</ParagrafoConteinar>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
