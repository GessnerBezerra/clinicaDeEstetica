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
`;

const Paragrafo = styled.h2`
	color: #042174;
`;

const Conduta: React.FC = () => {
	return (
		<>
			{/* <SaibaMaisPage /> */}
			<TermsContainer>
				<Paragrafo>
					Termos de Serviço- Estética e Tratamento Facial Avançada
				</Paragrafo>
				<p>
					Ao acessar e utilizar o site Estética e Tratamento Facial
					Avançada, você concorda em obedecer e cumprir os seguintes
					termos de serviço. Certifique-se de ler atentamente antes de
					prosseguir, pois seu acesso e uso deste site estão
					condicionados à aceitação destes termos. Se discordar de
					qualquer disposição, é proibido o acesso ou uso deste site.
				</p>
				<Paragrafo>1. Termos Gerais</Paragrafo>
				<p>
					Ao utilizar este site, compromete-se a cumprir todas as leis
					e regulamentos locais aplicáveis. Reconhece ser responsável
					pelo cumprimento das leis em sua localidade. Os materiais
					presentes no site estão protegidos por direitos autorais e
					marcas comerciais.
				</p>
				<Paragrafo>2. Uso de Licença</Paragrafo>
				<p>
					É concedida uma licença temporária para baixar materiais do
					site exclusivamente para visualização pessoal e não
					comercial. Sob esta licença, você não pode modificar,
					copiar, usar para fins comerciais, realizar engenharia
					reversa de software ou transferir os materiais para
					terceiros. A licença será rescindida em caso de violação,
					sendo de sua responsabilidade apagar os materiais baixados.
				</p>
				<Paragrafo>3. Isenção de Responsabilidade</Paragrafo>
				<p>
					Os materiais no site são fornecidos {`"`}como estão{`"`},
					sem garantias expressas ou implícitas. Estética e Tratamento
					Facial Avançada renuncia a todas as garantias, incluindo
					comerciabilidade, adequação a um propósito específico e não
					violação de propriedade intelectual. Não garantimos a
					precisão, resultados ou confiabilidade do uso dos materiais.
				</p>
				<Paragrafo>4. Limitações de Responsabilidade</Paragrafo>
				<p>
					Estética e Tratamento Facial Avançada e seus fornecedores
					não serão responsáveis por danos decorrentes do uso ou
					incapacidade de usar os materiais, incluindo perda de dados
					ou lucro. As limitações podem não se aplicar em algumas
					jurisdições.
				</p>
				<Paragrafo>5. Precisão dos Materiais</Paragrafo>
				<p>
					O site pode conter erros técnicos, tipográficos ou
					fotográficos. Não garantimos a precisão, completude ou
					atualidade dos materiais, reservando-nos o direito de fazer
					alterações sem aviso prévio.
				</p>
				<Paragrafo>6. Links</Paragrafo>
				<p>
					Links para sites de terceiros são fornecidos apenas para
					conveniência. Não endossamos ou nos responsabilizamos pelo
					conteúdo desses sites, sendo o uso por conta e risco do
					usuário.
				</p>
				<Paragrafo>Modificações</Paragrafo>
				<p>
					Estética e Tratamento Facial Avançada reserva-se o direito
					de revisar estes termos a qualquer momento sem aviso prévio.
					Ao continuar a usar o site, concorda em ficar vinculado à
					versão mais recente dos termos de serviço
				</p>
				<Paragrafo>Lei Aplicável</Paragrafo>
				<p>
					Estes termos são regidos pelas leis de Estética e Tratamento
					Facial Avançada, e você aceita a jurisdição exclusiva dos
					tribunais nessa localidade.
				</p>
				<Paragrafo>Termos e Condições</Paragrafo>
				<p>
					Ao utilizar o site, concorda com os Termos e Condições, que
					incluem a Política de Privacidade disponível em
					esteticaetratamento@email.com. © 2023 - Todos os Direitos
					Reservados - Estética e Tratamento Facial Avançada.
					Recomendamos seguir as orientações médicas em paralelo às
					terapias complementares e não suspender nenhum tratamento
					sem a orientação do seu médico.
				</p>
			</TermsContainer>
		</>
	);
};

export default Conduta;
