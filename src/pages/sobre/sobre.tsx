import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Imagem from '../../../public/assets/avatar/prof-estetica.png';
import Footer2 from '../../components/footer copy/Footer2';
// eslint-disable-next-line import-helpers/order-imports
import Footer from '../../components/footer/Footer';

import '../../style/globalStyle.module.css';

import Header from '../../components/header/Header';
import Loading from '../../components/loading/loading';
import SobreComponente from '../../components/sobre';

interface AvatarProps {
	isExpanded?: boolean;
	alt?: string;
	src?: string;
}

const ItensContainer = styled.div`
	position: relative;
	display: flex;
	margin-top: 4vh;
	width: 100vw;
	/* height: auto; */
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;

	@media (min-width: 789px) {
		height: auto;
		margin-top: auto;
	}
`;
const AvatarContainer = styled.div`
	position: fixed;
	bottom: 6vh;
	width: 100vw;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	z-index: 10;

	@media (min-width: 789px) {
		display: none;
	}
`;

const SobreContainer = styled.div`
	position: relative;
	width: 80vw;
	margin-top: 0vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: stretch;

	@media (min-width: 789px) {
		margin-top: 10%;
	}
`;

const ImagemContainer = styled.div`
	width: 80vw;
	height: 100%;
	display: flex;
	/* flex-direction: column; */
	justify-content: space-evenly;
	/* -webkit-box-align: stretch; */
	/* align-items: stretch; */
	/* margin-top: 0px; */
	/* top: 64px; */
	position: fixed;
	z-index: -1;
	opacity: 0.6;

	@media (min-width: 789px) {
		top: 12%;
	}
`;

const Image = styled.img`
	width: 90%;
	height: 100%;
	object-fit: contain;
	transition: drop-shadow 0.2s ease-in-out;

	/* border-radius: 5% 5% 5% 5%; */
	filter: drop-shadow(rgba(183, 160, 219, 0.5) 8px 8px 8px);
	/* border-image: right 0 linear-gradient(to right, #0000, #0009); */

	&:hover {
		filter: drop-shadow(rgba(183, 160, 219, 0.5) -8px 4px 8px);
		/* border-image: fill 0 linear-gradient(#0003, #000); */
	}

	@media (max-width: 788px) {
		display: none;
	}
`;

const AvatarImagem = styled(Avatar)<AvatarProps>`
	margin-bottom: 0;
	position: relative;
	right: 5vw;
	border-radius: 20%;
	transition: transform 0.3s ease-in-out;
	cursor: pointer;

	${({ isExpanded }) =>
		isExpanded &&
		`
    transform: scale(4.5);
    right: 30vw;
    bottom: 20vh;
  `}

	@media (min-width: 789px) {
		display: none;
	}
`;

// const ConteudoContainer = styled.div`
// 	position: relative;
// 	margin-top: 5%;
// 	width: 50vw;
// 	height: 100vh;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-evenly;
// 	align-items: stretch;
// 	z-index: 1;
// `;

// const IconContainer = styled.div`
// 	text-align: center;
// 	position: relative;
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: space-between;
// 	align-items: center;
// `;

const Sobre: React.FC = () => {
	// const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
	// 	null,
	// );
	// const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
	// 	setAnchorElUser(event.currentTarget);
	// };
	// const handleButtonClick = () => {
	// 	// Verifica se a página é igual a "Contato" e redireciona para o WhatsApp

	// 	// Substitua 'SEU_NUMERO_DE_TELEFONE' pelo número real para o qual deseja enviar mensagem
	// 	window.open('https://wa.me/5583998707436?text=Olá!%20:)', '_blank');
	// };

	const [isLoading, setIsLoading] = useState(true);
	const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

	// Suponha que você tenha algum código assíncrono que dispare o setLoading(false) quando for concluído.
	// Exemplo fictício usando setTimeout
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		// Lembre-se de limpar o timer para evitar vazamentos de memória
		return () => clearTimeout(timer);
	}, []);

	const handleAvatarClick = () => {
		setIsAvatarExpanded(true);

		setTimeout(() => {
			setIsAvatarExpanded(false);
		}, 3000);
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Header />
					<ItensContainer>
						<SobreContainer>
							<SobreComponente />
						</SobreContainer>

						<ImagemContainer>
							<Image src={Imagem} />
						</ImagemContainer>
					</ItensContainer>
					<AvatarContainer>
						<AvatarImagem
							alt="Remy Sharp"
							src={Imagem}
							sx={{ width: 80, height: 80 }}
							isExpanded={isAvatarExpanded}
							onClick={handleAvatarClick}
						/>
					</AvatarContainer>

					<Footer />
					<Footer2 />
				</>
			)}
		</>
	);
};

export default Sobre;
