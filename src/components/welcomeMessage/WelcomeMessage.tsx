import React from 'react';
import styled, { keyframes } from 'styled-components';
import '../../style/styleFonte2.css';

const rotateIn = keyframes`
  0% {
    transform: translateX(0%);
	opacity: 0;
  }
  50% {
    transform: translateX(5%);
	opacity: 1;
  }

  100% {
    transform: translateX(30%);
	opacity: 0;
  }
`;

const WelcomeContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	font-family: 'gothamPro', sans-serif;
	text-align: center;
	align-items: center;
	color: #042174;
	/* background-color: rgb(240, 240, 240); */
	margin-top: 20vh;
	gap: 0.5rem;
	padding: 1rem;
`;

const LeftArrow = styled.span`
	animation: ${rotateIn} 8s ease-in-out infinite alternate;
`;

const WelcomeMessage: React.FC = () => {
	return (
		<WelcomeContainer>
			<LeftArrow>
				<h2>
					Bem vindo ao meu espaço de Beleza, Estética Facial Avançada
					e Tratamentos Capilares!
				</h2>
			</LeftArrow>
		</WelcomeContainer>
	);
};

export default WelcomeMessage;
