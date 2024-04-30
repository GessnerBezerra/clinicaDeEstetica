/* eslint-disable prettier/prettier */
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Importe o ícone do WhatsApp
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import styled from 'styled-components';

import '../../style/styleFonte2.css';
import MapWithCoordinates from '../Geolocation/geolocation';
import MapWithCoordinatesDois from '../Geolocation/geolocationUndDois';
import Icon from '../Icon/Icon';

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-around;
	align-items: baseline;
	flex-direction: row;
	background-color: #f7adaf;
	font-family: 'gothamPro', sans-serif;
	color: white;
	padding: 5px;
	text-align: center;
	position: fixed;
	bottom: 0%;
	width: 100%;
	transition: height 0.3s;
	overflow: hidden;
	height: 60px;
	z-index: 999;
	content: none;
	font-weight: 'bold';

	&:hover {
		height: 45vh;
		font-size: xx-small;
	}

	@media (max-width: 768px) {
		flex-direction: row;
		flex-wrap: wrap;
		height: 50px;
		font-size: xx-small;
		font-weight: bold;

		&:hover {
			height: auto;
			font-size: xx-small;
		}
	}

	@media (max-width: 450px) {
		justify-content: space-around;
		font-weight: 'bold';
		height: 8vh;
	}
`;
const ConteudoContent = styled.div`
	display: flex;
	align-items: stretch;
	flex-direction: column;
	content: '';
`;

const ExpandedContent = styled.div`
	color: #7b193f; /* Cor diferente para o texto expandido */
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-evenly;
	content: '';
	font-size: small;
	font-weight: 'bold';

	@media (max-width: 768px) {
		flex-wrap: wrap;
		margin-top: 2px;
		height: auto;
		justify-content: space-around;
		content: '';
		font-size: xx-small;
		font-weight: 'bold';

		&:hover {
			height: auto;
		}
	}

	p:after {
		content: '';
	}
`;
const ExpandedContentEnd = styled.div`
	color: #7b193f; /* Cor diferente para o texto expandido */
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	font-size: small;
	font-weight: 'bold';

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		margin-top: 2px;
		height: 20vh;
		justify-content: space-around;
		/* content: ''; */
		font-size: xx-small;
		font-weight: 'bold';

		&:hover {
			height: auto;
		}
	}

	p:after {
		content: none;
	}
`;

const ContainerGeolocation = styled.div`
	color: #7b193f; /* Cor diferente para o texto expandido */
	display: flex;
	/* align-items: center; */
	flex-direction: column;
	justify-content: space-around;
	font-size: small;
	font-weight: 'bold';
	height: 35vh;
	width: 40vw;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		/* flex-wrap: wrap; */
		margin-bottom: 5vh;
		height: 35vh;
		/* width: 7vw; */
		justify-content: space-around;
		/* content: ''; */
		font-size: xx-small;
		font-weight: 'bold';

		&:hover {
			height: 20vh;
			/* width: 7vw; */
		}
	}

	p:after {
		content: none;
	}
`;

const Text = styled.p`
	display: flex;
	align-items: center;
	position: relative;
	justify-content: center;
	flex-direction: row;
	margin-bottom: 0rem;
	content: '';
	font-weight: 'bold';
`;

const Btn = styled.div`
	border-radius: 30%;
	height: 24px;
	&:hover:nth-child(1) {
		background: radial-gradient(
			#5851db 5%,
			#833ab4 35%,
			#e1306c 65%,
			#fd1d1d 90%
		);
	}

	&:hover:nth-child(2) {
		background: radial-gradient(
			#5851db 5%,
			#833ab4 35%,
			#e1306c 65%,
			#fd1d1d 90%
		);
	}
`;

const Footer: React.FC = () => {
	//Funções para entrar em contato com as principais redes sociais

	const [selectedMap, setSelectedMap] = useState<
		'unidade1' | 'unidade2' | null
	>('unidade1');

	const handleButtonClick = () => {
		// Substitua 'SEU_NUMERO_DE_TELEFONE' pelo número real para o qual deseja enviar mensagem
		window.open(
			'https://wa.me/5583993837785?text=Olá!%20:)%20Gostaria%20de%20marcar%20uma%20avaliação!',
			'_blank',
		);
	};

	const openInstagramChat = () => {
		// Substitua 'SEU_USUARIO_DO_INSTAGRAM' pelo seu nome de usuário no Instagram
		const instagramUsername = 'adrimelo_tricologista';

		// Abra a URL do Instagram para mensagens diretas
		window.open(
			`https://www.instagram.com/${instagramUsername}/?hl=en&action=chat`,
		);
	};

	//Funções para compartilhar as principais redes sociais

	// const handleFacebookShare = () => {
	// 	const url = encodeURIComponent(
	// 		'https://www.facebook.com/ProfGessner/about',
	// 	);
	// 	const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
	// 	window.open(facebookShareUrl, '_blank');
	// };

	// const handleTwitterShare = () => {
	// 	const url = encodeURIComponent(window.location.href);
	// 	const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}`;
	// 	window.open(twitterShareUrl, '_blank');
	// };

	const handleInstagramShare = () => {
		const instagramUsername = 'adrimelo_tricologista';
		const url = encodeURIComponent(
			'https://www.instagram.com/adrimelo_tricologista/',
		);
		const instagramShareUrl = `https://www.instagram.com/${instagramUsername}/?hl=en&action=share&url=${url}`;
		window.open(instagramShareUrl, '_blank');
	};

	// const handleLinkedInShare = () => {
	// 	const url = encodeURIComponent(window.location.href);
	// 	const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
	// 	window.open(linkedInShareUrl, '_blank');
	// };
	return (
		<FooterContainer>
			{' '}
			{/*row */}
			{/* Conteúdo adicional expandido ao passar o mouse */}
			<ConteudoContent>
				{' '}
				{/*colunm */}
				<ExpandedContent>
					<Text>Compartilhem e nos sigam nas redes sociais</Text>
				</ExpandedContent>
				<ExpandedContent>
					<Btn>
						<Icon
							component={InstagramIcon}
							iconColor="#7B193F"
							hoverColor="#f8f8f8"
							onClick={handleInstagramShare}
						/>
					</Btn>

					{/* <Icon
						component={FacebookIcon}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#3445db"
						onClick={handleFacebookShare}
					/> */}
					<Icon
						component={LinkedInIcon}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#3445db"
						// onClick={handleLinkedInShare}
					/>
					{/* <Icon
						component={TwitterIcon}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#3445db"
						onClick={handleTwitterShare}
					/> */}
				</ExpandedContent>
				<ExpandedContent>
					<Text>Fale cononsco pelas redes sociais</Text>
				</ExpandedContent>
				<ExpandedContent>
					<Icon
						component={WhatsAppIcon}
						onClick={handleButtonClick}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#50db34"
					/>
					<Btn>
						<Icon
							component={InstagramIcon}
							onClick={openInstagramChat}
							iconColor="#7B193F"
							hoverColor="#f8f8f8"
						/>
					</Btn>
					{/* <Mensseger
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#3445db"
					/> */}
					<Icon
						component={TelegramIcon}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#3445db"
					/>
				</ExpandedContent>
			</ConteudoContent>
			<ExpandedContent>
				<ExpandedContentEnd>
					<Text>UNIDADE I : R Ana Vilar, 348</Text>
					<Text>Cruzeiro</Text>
					<Text>Campina Grande - PB</Text>
					<Text>Fone:</Text>
					<Text>(83)99383-7785</Text>
				</ExpandedContentEnd>
			</ExpandedContent>
			<ExpandedContent>
				<ExpandedContentEnd>
					<Text>UNIDADE II : R Odilon almeida Barreto, 11</Text>
					<Text>Centro</Text>
					<Text>Comercial Miranda, 1º Andar, sala 3</Text>
					<Text>Queimadas PB</Text>
					<Text>Fone:</Text>
					<Text>(83)99383-7785</Text>
				</ExpandedContentEnd>
			</ExpandedContent>
			<ExpandedContent></ExpandedContent>
			<ContainerGeolocation>
				{/* Alteração aqui para incluir os links */}
				<ExpandedContent
					style={{
						columnGap: '25px',
					}}
				>
					<a
						href="#"
						onClick={() => setSelectedMap('unidade1')}
						style={{ color: '#7b193f' }}
					>
						Localização da Unidade I
					</a>
					<a
						href="#"
						onClick={() => setSelectedMap('unidade2')}
						style={{ color: '#7b193f' }}
					>
						Localização da Unidade II
					</a>
				</ExpandedContent>

				{/* Condicionalmente renderizando o componente do mapa com base na seleção */}
				{selectedMap === 'unidade1' ? <MapWithCoordinates /> : null}
				{selectedMap === 'unidade2' ? <MapWithCoordinatesDois /> : null}
			</ContainerGeolocation>
			<ConteudoContent></ConteudoContent>
		</FooterContainer>
	);
};

export default Footer;
