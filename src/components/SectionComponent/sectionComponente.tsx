import React from 'react';
import styled, { keyframes } from 'styled-components';

import Buttom from '../button/button';
import styles from './sectionComponente.module.css';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

interface SectionContainerProps {
	flexDirection?: string;
}

interface ImageAltura {
	height?: string;
}

const SectionContainer = styled.div<SectionContainerProps>`
	display: flex;
	justify-content: space-around;
	position: relative;
	align-items: center;
	margin: 20px;
	flex-direction: ${(props) => props.flexDirection || 'row'};

	@media (max-width: 768px) {
		flex-wrap: wrap;
		margin-top: 2px;
		/* height: auto; */

		&:hover {
			height: 80%;
		}
	}
`;

const ImageContainer = styled.div<ImageAltura>`
	width: 50%;
	height: ${(props) => props.height || '60%'};
	transform: perspective(900px) rotateX(60deg) scale(0.7);
	transition: 0.5s ease all;

	&:hover {
		transform: rotate(0deg) scale(1) translateY(10px);
	}

	@media (max-width: 768px) {
		/* height: 20%; */
	}
`;

const TextContainer = styled.div`
	width: 60%;
	text-align: left;
	position: relative;
	display: flex;
	flex-direction: column-reverse;
	justify-content: space-between;
	align-items: center;
`;

const Text = styled.div`
	font-size: 20px;
	/* box-shadow: rgba(12, 12, 12, 0.44) 8px 5px 8px; */
	color: #042174;
	margin-bottom: 5%;
	position: relative;
	border-radius: 2%;
	/* width: 80%; */
	opacity: 0;
	animation: ${fadeIn} 1s ease-out forwards 1s;
	text-shadow: rgb(123 25 63 / 66%) 0px 0px 10px,
		rgb(151 95 117 / 45%) 0px 0px 10px, rgb(228 169 192 / 34%) 0px 0px 10px;
`;

const Image = styled.img<ImageAltura>`
	width: 100%;
	object-fit: cover;
	opacity: 0;
	animation: ${fadeIn} 0.5s ease-out forwards 0.5s;
	border-radius: 5px;
	transition: box-shadow 0.2s ease-in-out;
	border-radius: 5%;
	filter: drop-shadow rgb(123 25 63 / 66%) 0px 0px 10px,
		rgb(151 95 117 / 45%) 0px 0px 10px, rgb(228 169 192 / 34%) 0px 0px 10px;

	&:hover {
		filter: drop-shadow rgb(123 25 63 / 66%) 0px 0px 10px,
			rgb(151 95 117 / 45%) 0px 0px 10px,
			rgb(228 169 192 / 34%) 0px 0px 10px;
	}
`;

const SectionComponent: React.FC<{
	item: ItemType;
	flexDirection?: string;
}> = ({ item, flexDirection }) => {
	return (
		<>
			<SectionContainer flexDirection={flexDirection}>
				<ImageContainer>
					{/* Removido o link */}
					<Image
						src={item.media_url}
						className={styles.img}
						height="20vh" // Definindo a altura diretamente em pixels ou outra unidade
					/>
				</ImageContainer>
				<TextContainer>
					<Text>
						<p id={styles.post}>{item.caption}</p>
					</Text>
					<Buttom
						background="#73BAFB"
						titlePhrase="Saiba +"
						to="/servicos"
						fontSize="14px"
					/>
				</TextContainer>
			</SectionContainer>
		</>
	);
};

export type ItemType = {
	permalink: string;
	media_url: string;
	caption: string;
};

export default SectionComponent;
