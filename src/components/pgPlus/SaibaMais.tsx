// Importe as bibliotecas necessárias
import React from 'react';
import styled from 'styled-components';
import '../../style/styleFonte2.css';

interface Image {
	height?: string;
	width?: string;
	paddingRight?: string;
	paddingLeft?: string;
}

interface SaibaMais {
	height?: string;
	width?: string;
}
// Estilos para a página Saiba Mais
const SaibaMaisContainer = styled.div<SaibaMais>`
	max-width: 90vw;
	margin-top: 0vh;
	/* height: 85vh; */
	height: ${(props) => props.height};
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	flex-direction: row;
	text-align: left;
`;

const Titulo = styled.h2`
	color: #042174;
	margin-bottom: 10px;
	margin-top: 10px;
`;

const Titulo3 = styled.h3`
	color: #042174;
	margin-bottom: 10px;
	margin-top: 5px;
`;

const Descricao = styled.p`
	/* color: rgb(102, 102, 102); */
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 80vw;
	/* font-size: 30px; */
	text-indent: 20px;
	text-align: left;
	color: #042174;
	text-shadow: rgba(183 160 219 / 66%) 0px 0px 10px,
		rgb(151 95 117 / 45%) 0px 0px 10px, rgb(228 169 192 / 34%) 0px 0px 10px;
	gap: 1.5rem;
	padding-bottom: 1rem;

	&::after {
		content: none;
	}
`;

const Image = styled.img<Image>`
	width: ${(props) => props.width || '45vw'};
	height: ${(props) => props.height || '45vh'};
	padding-left: ${(props) => props.paddingLeft};
	padding-right: ${(props) => props.paddingRight};
	/* Adicionado para alinhar verticalmente com o texto */
	display: inline-block; /* Adicionado para tratar a imagem como um elemento de linha */
	border-radius: 25% 25% 25% 25%;
	box-shadow: #042174 8px 5px 8px;

	&:hover {
		box-shadow: -12px 12px 2px -1px #c4d2e4;
	}
`;
/*width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding-top: 4rem;
    padding-bottom: 1rem; */

const MainContainer = styled.main`
	display: grid;
	justify-content: space-evenly;
	flex-direction: column;
	font-family: 'gothamPro', sans-serif;
	margin-top: 9vh;
	align-items: stretch;
	gap: 1.5rem;
	padding-top: 4rem;
	padding-bottom: 3rem;
`;

// Componente da Página "Saiba Mais"
const SaibaMaisPage: React.FC = () => {
	return (
		<MainContainer>
			<Titulo>Estética Facial Avançada e Tratamentos Capilares.</Titulo>
			<Descricao>
				Bem-vindo à nossa página de {`"`}Saiba Mais{`"`} sobre estética
				facial avançada e tratamentos capilares relacionada à
				tricologia. Aqui você encontrará informações detalhadas e
				atrativas sobre o assunto.
				{/* Adicione mais detalhes conforme necessário */}
			</Descricao>

			<Titulo>Serviços Oferecidos</Titulo>
			<Titulo3>1. Diagnóstico Capilar</Titulo3>
			<Descricao>
				Iniciamos com um diagnóstico capilar detalhado para entender as
				necessidades específicas do seu cabelo e couro cabeludo.
				Utilizamos tecnologias avançadas para analisar a saúde capilar,
				identificando problemas como queda, quebra e danos.
			</Descricao>
			<Titulo3>2. Barbaterapia</Titulo3>
			<SaibaMaisContainer>
				<Descricao>
					Barbaterapia é um procedimento que faz parte da Terapia
					Capilar, trata: Coceira, descamação, ressecamento e
					desidratação, Alopecia na barba {`(`} falhas {`)`},
					Foliculite, são algumas patologias que acometem a barba.
					Você sofre com alguma dessas patologias? Mande um direct ou
					agende uma avaliação e inicie sua BARBATERAPIA.
					{
						<Image
							width="50vw"
							height="50vh"
							paddingLeft="20px"
							src="/assets/section/BarbaTerapiaTransparente.png"
							alt="Babaterapia"
						/>
					}
				</Descricao>
			</SaibaMaisContainer>
			<Titulo3>3. Fotobioestimulação</Titulo3>
			<SaibaMaisContainer>
				<Descricao>
					{
						<Image
							width="50vw"
							height="50vh"
							paddingRight="20px"
							src="/assets/section/BioestimulacaoTransparente.png"
							alt="Tricologia"
						/>
					}
					Por meio da terapia da Luz - LASER E LED - nos procedimentos
					de Tratamentos Capilares e Faciais, para acelerar o processo
					de cicatrização, reestruturação, estímulo de colágeno, entre
					outros benefícios. A partir de uma Avaliação da pele é
					possível elaborar um Plano de tratamento específico e
					personalizado
				</Descricao>
			</SaibaMaisContainer>
			<Titulo3>4. Terapia Capilar em Cabelos Crespos e Cacheados</Titulo3>
			<SaibaMaisContainer>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Image
						width="35vw"
						height="60vh"
						paddingRight="20px"
						src="/assets/section/antesTransparente.png"
						alt="Tricologia"
					/>
					<Titulo3>Antes</Titulo3>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Image
						width="35vw"
						height="60vh"
						paddingRight="20px"
						src="/assets/section/depoisTransparente.png"
						alt="Tricologia"
					/>
					<Titulo3>Depois</Titulo3>
				</div>
			</SaibaMaisContainer>

			{/* <Descricao>
					Recomendamos produtos especializados para manter e aprimorar
					os resultados dos nossos tratamentos. Nossos produtos são
					selecionados cuidadosamente para atender às necessidades
					específicas do seu tipo de cabelo.
				</Descricao>
				<Descricao>
					Na tricologia e estética capilar, acreditamos que cada
					pessoa é única, e nossos serviços são projetados para
					atender às suas necessidades individuais. Descubra uma
					abordagem personalizada para a saúde e beleza dos seus
					cabelos conosco.
				</Descricao> */}
		</MainContainer>
	);
};

export default SaibaMaisPage;
