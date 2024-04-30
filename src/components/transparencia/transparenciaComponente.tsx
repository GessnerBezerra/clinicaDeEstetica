import React from 'react';
import styled from 'styled-components';
import '../../style/styleFonte2.css';

const TermsContainer = styled.div`
	width: 90%;
	color: #042174;
	text-shadow: rgba(183 160 219 / 66%) 0px 0px 10px,
		rgb(151 95 117 / 45%) 0px 0px 10px, rgb(228 169 192 / 34%) 0px 0px 10px;
	max-width: 1200px;
	margin: 7rem 2vh 4vw 2vw;
	text-align: left;
	font-family: 'gothamPro', sans-serif;
	text-indent: 20px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	padding-bottom: 1rem;

	p:after {
		content: none;
		position: relative;
	}
`;

const Paragrafo = styled.h2`
	color: #042174;
`;

const Paragrafo3 = styled.h4`
	color: #042174;
`;

const Paragrafo4 = styled.p`
	text-align: justify;
`;

const ItemLista = styled.li`
	text-align: justify;
`;

const TransparenciaComponente: React.FC = () => {
	return (
		<>
			{/* <SaibaMaisPage /> */}
			<TermsContainer>
				<Paragrafo>
					Política de Transparência e Privacidade - Estética e
					Tratamento Facial Avançada
				</Paragrafo>
				<Paragrafo4>
					A sua privacidade é uma prioridade para nós na Estética e
					Tratamento Facial Avançada. Comprometemo-nos a respeitar e
					proteger suas informações pessoais. Esta política de
					transparência e privacidade explica como coletamos, usamos e
					protegemos as informações que você fornece ao usar nosso
					site e outros sites relacionados.
				</Paragrafo4>
				<Paragrafo3>Coleta e Uso de Informações:</Paragrafo3>
				<ul>
					<ItemLista>
						Solicitamos informações pessoais apenas quando
						necessário para fornecer nossos serviços, sempre com seu
						conhecimento e consentimento.
					</ItemLista>
					<ItemLista>
						Informamos claramente o motivo da coleta de informações
						e como serão utilizadas.
					</ItemLista>
					<ItemLista>
						Retemos suas informações pelo tempo necessário para
						oferecer o serviço solicitado, protegendo-as contra
						perdas, roubos e acessos não autorizados.
					</ItemLista>
				</ul>
				<Paragrafo3>Compartilhamento de Informações:</Paragrafo3>
				<ul>
					<ItemLista>
						Não compartilhamos suas informações de identificação
						pessoal publicamente ou com terceiros, a menos que
						exigido por lei.
					</ItemLista>
					<ItemLista>
						Advertimos que links externos em nosso site não são
						operados por nós, e não temos controle sobre suas
						políticas de privacidade.
					</ItemLista>
				</ul>
				<Paragrafo3>
					Direito de Recusa e Compromisso do Usuário:
				</Paragrafo3>
				<ul>
					<ItemLista>
						Você tem o direito de recusar a fornecer informações
						pessoais, compreendendo que isso pode afetar a
						disponibilidade de alguns serviços.
					</ItemLista>
					<ItemLista>
						Comprometemo-nos a oferecer um ambiente online seguro e
						a respeitar a ordem pública. Esperamos que os usuários
						também se comprometam a utilizar nosso site de maneira
						ética e legal, sem envolvimento em atividades ilegais ou
						prejudiciais.
					</ItemLista>
				</ul>
				<Paragrafo3>Cookies e Publicidade:</Paragrafo3>
				<ul>
					<ItemLista>
						Utilizamos cookies para melhorar sua experiência online.
						Os cookies de publicidade comportamental garantem
						anúncios relevantes, rastreando anonimamente seus
						interesses.
					</ItemLista>
					<ItemLista>
						Colaboramos com parceiros e utilizamos cookies de
						rastreamento de afiliados para avaliar a eficácia de
						nossas promoções.
					</ItemLista>
				</ul>
				<Paragrafo3>Compromisso do Usuário:</Paragrafo3>
				<ul>
					<ItemLista>
						O usuário compromete-se a utilizar nosso site de maneira
						apropriada, respeitando a legalidade, a boa-fé e a ordem
						pública.
					</ItemLista>
					<ItemLista>
						Não é permitido difundir conteúdo ilegal, racista,
						xenofóbico, pornográfico, terrorista ou contra os
						direitos humanos.
					</ItemLista>
				</ul>
				<Paragrafo3>Mais Informações:</Paragrafo3>
				<ul>
					<ItemLista>
						Esta política é efetiva a partir de 7 de maio de 2023,
						às 19:00.
					</ItemLista>
					<ItemLista>
						Se você tiver dúvidas sobre como lidamos com seus dados,
						entre em contato conosco. Estamos aqui para esclarecer e
						garantir sua segurança online.
					</ItemLista>
				</ul>
				<Paragrafo3>
					Esperamos que esta política de transparência e privacidade
					forneça a confiança necessária ao usar nossos serviços.
					Obrigado por confiar na Estética e Tratamento Facial
					Avançada.
				</Paragrafo3>
			</TermsContainer>
		</>
	);
};

export default TransparenciaComponente;
