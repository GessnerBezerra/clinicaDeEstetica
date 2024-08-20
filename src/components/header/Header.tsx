import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import styled from 'styled-components';
import './styles.css';

import logo from '../../../public/assets/logo_trial.png';
import '../../style/style.css';
import Buttom from '../button/button';
import LongMenu from '../menuPdf/menuPdf';
import Titulo from '../titulo/titulo';

const HeaderContainer = styled(AppBar)`
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
	/* padding: 5px; */
	/* background-color: #dfe3e8; */
	/* color: #042174; */
	position: fixed;
	top: 0;
	z-index: 999;
	/* #042174 #7b193f */
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const TooltipContaener = styled(Tooltip)`
	background: #c684ff;
	position: relative;
	cursor: pointer;
	transition: all 0.5s;
	display: flex;
	justify-content: right;
	align-items: flex-start;

	::before {
		content: '';
		width: 0.6em;
		bottom: -0.2em;
		transform: translate(-50%) rotate(45deg);
		background: #c684ff;
	}

	:hover {
		top: -100%;
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		animation: shake 500ms ease-in-out forwards;
		background: #c684ff;
	}

	@keyframes shake {
		0% {
			transform: rotate(2deg);
		}
		50% {
			transform: rotate(-3deg);
		}
		70% {
			transform: rotate(3deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
`;

const Header: React.FC = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null,
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleButtonClick = (page: string) => {
		handleCloseNavMenu();
		// Verifica se a página é igual a "Contato" e redireciona para o WhatsApp
		if (page === 'Contato') {
			// Substitua 'SEU_NUMERO_DE_TELEFONE' pelo número real para o qual deseja enviar mensagem
			window.open(
				'https://wa.me/5583998707436?text=Olá!%20:)%20Olá%20!%20Gostaria%20de%20marcar%20uma%20avaliação?',
				'_blank',
			);
		} else if (page === 'Home') {
			// Se não for "Contato", navegue para a página normalmente
			// Substitua `/${page.toLowerCase()}` pelo caminho real da sua página
			window.location.href = `/`;
		} else if (page === 'Termo de Conduta') {
			// Se não for "Contato", navegue para a página normalmente
			// Substitua `/${page.toLowerCase()}` pelo caminho real da sua página
			window.location.href = `/termo-de-conduta`;
		} else {
			// Se não for "Contato", navegue para a página normalmente
			// Substitua `/${page.toLowerCase()}` pelo caminho real da sua página
			window.location.href = `/${page.toLowerCase()}`;
		}
	};
	const currentUrl = window.location.pathname;
	console.log(currentUrl);
	return (
		<>
			<HeaderContainer
				style={{ backgroundColor: '#DFE3E8' }}
				position="fixed"
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<img
							src={logo}
							alt="Logo"
							style={{
								backgroundColor: 'white',
								borderRadius: '50%',
								marginRight: '10px',
								width: '80px',
								height: '80px',
							}}
						/>
						<Typography
							flexWrap={'wrap'}
							className="font"
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								textDecoration: 'none',
							}}
						>
							<Titulo tituloFrase=" Site para clinicas" />
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: {
										xs: 'block',
										md: 'none',
									},
								}}
							>
								{[
									'Home',
									'Servicos',
									'Sobre',
									'Termo de Conduta',
									'Transparencia',
								].map((page) => (
									<MenuItem
										key={page}
										onClick={() => handleButtonClick(page)}
										disabled={
											currentUrl ===
												`/${page.toLowerCase()}` ||
											(currentUrl === '/' &&
												page.toLowerCase() ===
													'home') ||
											(currentUrl ===
												'/termo-de-conduta' &&
												page.toLowerCase() ===
													'termo de conduta')
										}
									>
										<Typography
											textAlign="center"
											sx={{
												'&:hover': {
													backgroundColor: '#c684ff ', // Cor de fundo ao passar o mouse
													color: '#042174',
												},
												color: '#042174', // Cor do texto (opcional, dependendo do seu design)
												width: '100%',
											}}
										>
											{page}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: {
									xs: 'none',
									md: 'flex',
								},
								marginRight: '3%',
								// fontSize: '12px',
							}}
						>
							{[
								'Home',
								'Servicos',
								'Sobre',
								'Termo de Conduta',
								'Transparencia',
							].map((page) =>
								currentUrl === `/${page.toLowerCase()}` ? (
									<Button
										key={page}
										onClick={() => handleButtonClick(page)}
										sx={{
											my: 2,
											color: 'white',
											display: 'none',
											// fontSize: '10px',
										}}
									>
										{page}
									</Button>
								) : currentUrl === '/' &&
								  page.toLowerCase() === `home` ? (
									<Button
										key={page}
										onClick={() => handleButtonClick(page)}
										sx={{
											my: 2,
											color: 'white',
											display: 'none',
											// fontSize: '10px',
										}}
									>
										{page}
										{/* termo-de-conduta */}
									</Button>
								) : currentUrl === '/termo-de-conduta' &&
								  page.toLowerCase() === `termo de conduta` ? (
									<Button
										key={page}
										onClick={() => handleButtonClick(page)}
										sx={{
											my: 2,
											color: 'white',
											display: 'none',
											// fontSize: '10px',
										}}
									>
										{page}
										{/* termo-de-conduta */}
									</Button>
								) : (
									<Button
										key={page}
										onClick={() => handleButtonClick(page)}
										sx={{
											my: 2,
											color: '#042174',
											display: 'flex',
											fontSize: '10px',
											fontWeight: 'bold',
											'&:hover': {
												backgroundColor: '#c684ff', // Cor de fundo ao passar o mouse
												color: '#042174',
											},
										}}
									>
										{page}
									</Button>
								),
							)}
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Buttom
								background="#7B193F"
								titlePhrase="Quero meu site agora"
								fontSize="12px"
								href="https://app.monetizze.com.br/checkout/KSQ383722"
							/>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							{/* Verificar se a URL é "/pdf" e desabilitar o botão */}
							{currentUrl === '/pre-cons-capilar' ? (
								<TooltipContaener
									// disableFocusListener
									// disableHoverListener
									// disableTouchListener
									title="Escolha um dos serviços disponíveis e solicite uma avaliação"
									placement="left-start"
								>
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0 }}
									>
										{/* <Buttom
											// background="#7B193F"
											titlePhrase="Faça a sua Avaliação"
											to="/pre-cons-capilar"
											fontSize="12px"
										/> */}
										<LongMenu />
									</IconButton>
								</TooltipContaener>
							) : (
								// Se não for "/pdf", exibir o botão normalmente
								<TooltipContaener
									className="tooltip-container"
									// disableFocusListener
									// disableHoverListener
									// disableTouchListener
									title="Escolha um dos serviços disponíveis e solicite uma avaliação"
									placement="left-start"
								>
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0 }}
									>
										{/* <Buttom
											background="#7B193F"
											titlePhrase="Faça a sua Avaliação"
											to="/pre-cons-capilar"
											fontSize="12px"
										/> */}
										<LongMenu />
									</IconButton>
								</TooltipContaener>
							)}
						</Box>
					</Toolbar>
				</Container>
			</HeaderContainer>
		</>
	);
};

export default Header;
