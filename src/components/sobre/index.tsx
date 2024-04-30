import React from 'react';
import styled from 'styled-components';
import '../../style/styleFonte2.css';

const TermsContainer = styled.div`
	width: 90%;
	color: #7b193f;
	text-shadow: rgb(123 25 63 / 66%) 0px 0px 10px,
		rgb(151 95 117 / 45%) 0px 0px 10px, rgb(228 169 192 / 34%) 0px 0px 10px;
	max-width: 1200px;
	margin: 1rem 2vw 4vh 2rem;
	text-align: left;
	text-indent: 20px;
	font-family: 'gothamPro', sans-serif;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	padding-bottom: 1rem;

	p:after {
		content: none;
		position: relative;
	}
	@media (max-width: 788px) {
		/* z-index: 10; */
		/* opacity: 0.8; */
		width: 80vw;
		margin-top: 20%;
	}

	@media (max-width: 360px) {
		width: 80vw;
		margin-top: 10vh;
	}
`;

const Paragrafo = styled.h2`
	color: #7b193f;
`;

const Paragrafo3 = styled.h3`
	color: #7b193f;
`;

const SobreComponente: React.FC = () => {
	return (
		<TermsContainer>
			<Paragrafo>
				Por que me tornei Esteticista e Terapeuta Capilar?
			</Paragrafo>
			<p>
				Busquei uma terapia e despertei um dom... O couro cabeludo é um
				universo encantador. Tratar as alterações no couro cabeludo vai
				além da aplicação de {`"`}cremes{`"`}. É preciso um olhar
				terapêutico e humanizado para entender o que está por trás de
				uma simples alteração do couro cabeludo. Ao tocar na pele do
				outro, é preciso entender sua essência.
			</p>

			<Paragrafo3>Quem sou eu?</Paragrafo3>
			<ul>
				<li>✓ Educadora.</li>
				<li>✓ Pedagoga.</li>
				<li>✓ Esteticista Cosmetológa.</li>
				<li>✓ Especialista em educação básica.</li>
				<li>✓ Especialista em Tricologia Cosmética.</li>
				<li>
					✓ Especialista em Cosmetologia Aplicada à Dermoestética.
				</li>
				<li>✓ Técnica em Estética.</li>
				<li>✓ Terapeuta capilar.</li>
				<li>
					✓ Técnica em Microscopia de Luz Polarizada em Análise
					capilar.
				</li>
				<li>
					✓ Vários outros cursos livres na área da estética capilar.
				</li>
				<li>✓ Cursando Biomedicina.</li>
				<li>
					✓ Com mais de 5 anos de atuação na área da estética capilar.
				</li>
			</ul>
			<Paragrafo3>Um olhar para a saúde</Paragrafo3>
			<ul>
				<li>
					Atuar na estética capilar é despertar um olhar clínico para
					a saúde do couro cabeludo e dos fios, contribuindo para a
					autoestima através do embelezamento dos cabelos.
				</li>
			</ul>
		</TermsContainer>
	);
};

export default SobreComponente;
