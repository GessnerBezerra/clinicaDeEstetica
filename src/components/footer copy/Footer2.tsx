/* eslint-disable prettier/prettier */
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Importe o ícone do WhatsApp
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styled from 'styled-components';

import '../../style/styleFonte2.css';
import Icon from '../Icon/Icon';

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	background-color: #887778;
	font-family: 'gothamPro', sans-serif;
	color: white;
	padding: 10px;
	text-align: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	transition: height 0.3s;
	overflow: hidden;
	height: 30px;
	z-index: 999;
	content: none;
	font-weight: 'bold';

	&:hover {
		/* height: auto; */
		font-size: xx-small;
	}

	@media (max-width: 768px) {
		flex-direction: row;
		flex-wrap: wrap;
		height: 35px;
		font-size: xx-small;
		font-weight: 'bold';

		&:hover {
			/* height: auto; */
			font-size: xx-small;
		}
	}

	@media (max-width: 450px) {
		justify-content: space-between;
		font-weight: 'bold';
	}
`;
const ConteudoContent = styled.div`
	display: flex;
	align-items: stretch;
	flex-direction: row;
	content: '';
`;

const ExpandedContent = styled.div`
	color: #7b193f; /* Cor diferente para o texto expandido */
	display: flex;
	align-items: baseline;
	flex-direction: row;
	justify-content: space-around;
	content: '';
	font-size: small;
	font-weight: 'bold';
	margin-top: 8px;

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
		flex-wrap: wrap;
		margin-top: 2px;
		height: auto;
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
	margin-bottom: 10px;
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

const Footer2: React.FC = () => {
	//Funções para entrar em contato com as principais redes sociais

	const handleButtonClick = () => {
		// Substitua 'SEU_NUMERO_DE_TELEFONE' pelo número real para o qual deseja enviar mensagem
		window.open(
			'https://wa.me/5583998707436?text=Olá!%20:)%20Gostaria%20de%20marcar%20uma%20Cotação!',
			'_blank',
		);
	};

	//Funções para compartilhar as principais redes sociais

	const handleInstagramShare = () => {
		const instagramUsername = 'dev_gessner_bezerra';
		const url = encodeURIComponent(
			'https://www.instagram.com/dev_gessner_bezerra/',
		);
		const instagramShareUrl = `https://www.instagram.com/${instagramUsername}/?hl=en&action=share&url=${url}`;
		window.open(instagramShareUrl, '_blank');
	};

	const handleLinkedInShare = () => {
		const url = encodeURIComponent(
			'https://www.linkedin.com/in/gessner-de-oliveira-bezerra/',
		);
		/*www.linkedin.com/in/gessner-de-oliveira-bezerra */
		const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
		window.open(linkedInShareUrl, '_blank');
	};
	return (
		<FooterContainer>
			{/* Conteúdo adicional expandido ao passar o mouse */}
			<ConteudoContent>
				<ExpandedContent>
					<Text>Desenvolvido por Gessner Bezerra</Text>
				</ExpandedContent>
			</ConteudoContent>
			<ConteudoContent>
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

					{/* <Icon
						component={TwitterIcon}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#3445db"
						onClick={handleTwitterShare}
					/> */}
				</ExpandedContent>
				<ExpandedContent>
					<Icon
						component={WhatsAppIcon}
						onClick={handleButtonClick}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#50db34"
					/>
				</ExpandedContent>
				<ExpandedContent>
					<Icon
						component={LinkedInIcon}
						iconColor="#7B193F"
						hoverColor="#f8f8f8"
						hoverBackgroundColor="#3445db"
						onClick={handleLinkedInShare}
					/>
				</ExpandedContent>
			</ConteudoContent>
			<ExpandedContent>
				<ExpandedContentEnd>
					<Text>(83) 99870-7436</Text>
				</ExpandedContentEnd>
			</ExpandedContent>
		</FooterContainer>
	);
};

export default Footer2;
