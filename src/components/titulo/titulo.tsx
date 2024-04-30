import React from 'react';
import styled from 'styled-components';

const Contaener = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const Titul = styled.h3`
	font-style: normal;
	font-size: 3em;
	margin: 0;
	color: #7f25ce;
	font-family: 'Stela', sans-serif;
	font-weight: 'bold';
	@media (max-width: 768px) {
		font-size: 1em;
	}
`;

interface HeaderProps {
	tituloFrase: string; // Adicione a propriedade para a frase do título
}

const Titulo: React.FC<HeaderProps> = ({ tituloFrase }) => {
	return (
		<Contaener>
			<Titul>{tituloFrase}</Titul>
		</Contaener>
	);
};

export default Titulo;
