import React from 'react';
import styled from 'styled-components';
import '../../style/globalStyle.module.css';
import '../../style/styleFonte2.css';

import AnimatedContent from '../imageAnimation/ImageAnimation';
import SectionComponent from '../SectionComponent/sectionComponente';
import WelcomeMessage from '../welcomeMessage/WelcomeMessage';
import styles from './index.module.css';

const MainContainer = styled.main`
	display: grid;
	justify-content: space-evenly;
	flex-direction: column;
	margin-top: 1vh;
	align-items: stretch;
	font-family: 'gothamPro', sans-serif;
	gap: 1.5rem;
	padding-top: 2rem;
	padding-bottom: 3rem;
`;

const Container = styled.div`
	position: relative;
	width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Main: React.FC = () => {
	const items = [
		{
			id: 1,
			permalink: 'link1',
			media_url: '/assets/section/Screenshot_1.png',
			caption: `Madeixas longas e exuberantes. Com um plano de tratamento personalizado, adaptado às suas 
					necessidades únicas de cabelo. Nosso processo de avaliação abrangente e abordagem direcionada 
					levam seus cabelos a um crescimento significativo e a um aumento na confiante.`,
		},
		{
			id: 2,
			permalink: 'link2',
			media_url: '/assets/section/Screenshot_2.png',
			caption: `Supere a queda de cabelo com nossas soluções inovadoras e eficazes. Atravez de uma rotina 
					personalizada de cuidados capilares a tratamentos de restauração capilar, nossa equipe 
					fornece cuidados abrangentes que levam a uma melhora significativa na densidade 
					capilar e na saúde geral.`,
		},
		{
			id: 3,
			permalink: 'link3',
			media_url: '/assets/section/Tricoscopia.png',
			caption: `Descubra o segredo para cabelos saudáveis e radiantes! Nosso tratamento capilar é a solução 
						perfeita para acabar com a queda de cabelo e os probleminhas no couro cabeludo. 
						Transforme a saúde dos seus fios de maneira simples e eficaz. Convide a beleza a 
						fazer parte do seu dia a dia – experimente e veja a diferença!`,
		},
		{
			id: 4,
			permalink: 'link4',
			media_url: '/assets/section/BarbaTerapiaTransparente.png',
			caption: `Babaterapia é um procedimento que faz parte da Terapia Capilar. coceira, descamação, 
					ressecamento e desidratação, alopecia na barba "falhas", foliculite, são algumas patologias 
					que acometem a barba. Você sofre com alguma dessas patologias? Entre em contato ou agende uma 
					avaliação e inicie sua BARBATERAPIA.`,
		},
		{
			id: 5,
			permalink: 'link5',
			media_url: '/assets/section/depoisTransparente.png',
			caption: `Seus cachos estão danificados? Então a plástica capilar é o que você precisa!
					Essa técnica é um tipo de reconstrução, para fortalecer e nutrir os fios danificados 
					e quebradiços 😍.
					Através da aplicação de aminoácidos e nutrientes essenciais para a vida do fio, 
					os cabelos são nutridos e hidratados profundamente recuperando sua vida e elasticidade 😱.
					Ao contrário do que se pensa, ele 🚫 não tem o poder de alisar ou alterar a textura dos fios.
					Ele é feito depois da lavagem normal dos fios e recomenda-se que não utilize secador e/ou 
					outro aparelho térmico ♨️ após o procedimento, porque eles fecham a cutícula, não deixando 
					que a nutrição profunda aconteça.`,
		},
		{
			id: 6,
			permalink: 'link6',
			media_url: '/assets/section//Bioestimulacao2Transparente.png',
			caption: `Por meio da fototerapia Luz de LED em protocolos de terapia capilar para acelerar o 
					processo cicatrização e restruturação do couro cabeludo. Tem sua indicações e contra 
					indicações. A partir de uma avaliação tricológica é possível elaborar o protocolo 
					específico e personalizado.`,
		},

		{
			id: 7,
			permalink: 'link8',
			media_url: '/assets/section/limpezaPele.png',
			caption: `Limpeza de pele em pele madura. Tratamento de rejuvenescimento.`,
		},

		// ... outros itens
	];
	return (
		<main id={styles.container}>
			<Container>
				<WelcomeMessage />
			</Container>
			<AnimatedContent /> {/*carrosel */}
			<MainContainer>
				{items.map((item, index) => (
					<SectionComponent
						key={item.id}
						item={item}
						flexDirection={index % 2 === 0 ? 'row' : 'row-reverse'}
					/>
				))}{' '}
			</MainContainer>
			{/*section que muda de lado se for impar */}
		</main>
	);
};

export default Main;
