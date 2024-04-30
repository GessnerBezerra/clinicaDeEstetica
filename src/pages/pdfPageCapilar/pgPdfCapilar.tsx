import {
	Box,
	FormControl,
	FormControlLabel,
	IconButton,
	InputLabel,
	Modal,
	Paper,
	Radio,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import btnEnvDds from '../../../public/assets/componentes/btn_enviarDados_Zap.png';
import btnImgPdf from '../../../public/assets/componentes/btn_gerar_Pdf.png';
import Buttom from '../../components/button/button';
import Footer2 from '../../components/footer copy/Footer2';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/loading';
import AnamnesePDF from '../../components/pdf-pg/pdfPageCapilar';

import '../../style/globalStyle.module.css';

const RastrMetab = styled.div`
	display: flex;
	justify-content: space-around;
	flex-direction: row;
	align-items: center;
	/* width: 100%; */
	gap: 10px;
	margin: 15px;

	&:hover {
		content: '';
	}

	@media (max-width: 768px) {
		display: flex;
		flex-wrap: wrap;
		/* width: auto; */
	}
`;

const RastrPaper = styled(Paper)`
	padding: 5px;
	margin: 10px 0;
	width: 50vw;
	content: '';

	&:hover {
		content: '';
	}

	@media (max-width: 468px) {
		width: 90%;
		padding: 10px;
		margin: 15px;
	}
`;

const closeButtonStyle = {
	position: 'absolute' as const,
	button: 0,
	right: 10,
	// backgroundColor: '#f7adaf',
	// color: '#7B193F',
	mb: 2,
};

const ParagrafoConteinar = styled(Typography)`
	&::after {
		content: none;
	}
`;

const PgPdfCapilar: React.FC = () => {
	const initialState = {
		nomeCompleto: '',
		email: '',
		cpf: '',
		dataConsulta: '',
		cuidadosComCabelo: '',
		frequenciaLavaCabelo: '',
		produtosQueUsa: '',
		problemasCpilar: '',
		problemasDermatologicos: '',
		historicoMedico: '',
		usandoMedicacao: '',
		alimentacaoDiaria: '',
		praticaExercicio: '',
		historicoFamiliar: '',
		exposicaoAoClima: '',
		expectativaaoTratamento: '',
		diarreiaConstipacao: '',
		dordistesaoabdominal: '',
		inchacoArticulares: '',
		fadigaFrequenteOuCronica: '',
		alergIntolSensibAlimentar: '',
		confMemRuimAltHumor: '',
		usoAntInlamComFreq: '',
		usaUsouMuitoAntib: '',
		consAlcFreqOuSenteMalAposCons: '',
		candidiaseDeRepet: '',
		abdomenDoloroso: '',
		gengivaSangFacil: '',
		alergiasIntolerAliment: '',
		diareiaConstirp: '',
		fezesFeticas: '',
		peleOleosaAcne: '',
		lingBrcHaltFetico: '',
		sedeExcesBocaSeca: '',
		ExecGasesPesoEstomago: '',
		maosEPesFrios: '',
		peleSecaCabeloSeco: '',
		ausenSuor: '',
		fadCansaco: '',
		baixaLibd: '',
		dificulPerdPeso: '',
		dificConcentr: '',
		quedaCapilar: '',
		menstIrreg: '',
		palpRstInchado: '',
		tontAoLevantar: '',
		presSangBaixa: '',
		difcDecisao: '',
		fadgCansaco: '',
		melhorAposComerDoce: '',
		doresArticul: '',
		difcDormir: '',
		fadiga: '',
		edemaInchaco: '',
		palpitacoes: '',
		ansiedadeDepres: '',
		gordAbd: '',
		sonoDurDia: '',
		acordNoiteCansado: '',
		perdEnergia: '',
		tristSemMotivo: '',
		irritado: '',
		panico: '',
		mudancaHumor: '',
		antconcep: '',
		hipersensPrdLimp: '',
		Infertilidade: '',
		menopausa: '',
		doencaAutoimune: '',
		mialgias: '',
		bocaAmarga: '',
		odoresFortesUrina: '',
		suorFetido: '',
		reacaoAMedicacao: '',
	};

	const [errorModalOpen, setErrorModalOpen] = useState(false);

	const [acertoModalOpen, setAcertoModalOpen] = useState(false);

	const [perguntas, setPerguntas] = useState(initialState);

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const [isLoading, setIsLoading] = useState(true);

	// Suponha que você tenha algum código assíncrono que dispare o setLoading(false) quando for concluído.
	// Exemplo fictício usando setTimeout
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		// Lembre-se de limpar o timer para evitar vazamentos de memória
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		// Carregar os valores do localStorage quando o componente montar
		const savedDataString = localStorage.getItem('anamneseFormData');
		if (savedDataString) {
			const savedData = JSON.parse(savedDataString);
			setPerguntas(savedData);
		}
	}, []);

	// Largura mínima da tela para ativar o tamanho personalizado do modal
	const minWidthForCustomSize = 790;

	// Lógica para determinar o tamanho do modal com base na largura da tela
	const getModalSize = () => {
		const windowWidth = window.innerWidth;

		if (windowWidth >= minWidthForCustomSize) {
			return {
				width: 300,
				height: 200,
			};
		} else {
			return {
				width: 200,
				height: 200,
			};
		}
	};

	const getModalAcertoSize = () => {
		const windowWidth = window.innerWidth;

		if (windowWidth >= minWidthForCustomSize) {
			return {
				width: 500,
				height: 400,
			};
		} else {
			return {
				width: 300,
				height: 500,
			};
		}
	};

	const [modalStyle, setModalStyle] = useState({
		position: 'absolute' as const,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		...getModalSize(),
		p: 0,
		border: '2px solid #f7adaf',
		borderRadius: 3,
	});

	const [modalAcertoStyle, setModalAcertoStyle] = useState({
		position: 'absolute' as const,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		...getModalAcertoSize(),
		p: 0,
		border: '2px solid #f7adaf',
		borderRadius: 3,
	});

	const modalImageStyle = {
		content: "''",
		position: 'absolute' as const,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage: 'url("/assets/Logo.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		opacity: 0.2,
		zIndex: -1,
	};

	const handleResize = () => {
		setModalStyle({
			...modalStyle,
			...getModalSize(),
		});

		setModalAcertoStyle({
			...modalAcertoStyle,
			...getModalAcertoSize(),
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []); // Adiciona/remova o ouvinte apenas uma vez no carregamento/montagem do componente

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseModal = () => {
		// Adicione a lógica para fechar o modal aqui
		setErrorModalOpen(false);
		setAcertoModalOpen(false);
	};

	const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remover caracteres não numéricos
		const numericValue = e.target.value.replace(/\D/g, '');

		// Limitar a 11 dígitos
		const limitedValue = numericValue.slice(0, 11);

		setPerguntas({
			...perguntas,
			cpf: limitedValue,
		});
	};

	const formatarDataParaSalvar = (data: string) => {
		const [ano, mes, dia] = data.split('-');
		return `${dia}-${mes}-${ano}`;
	};

	const handleInputChange = (
		key: keyof typeof initialState,
		value: string,
	) => {
		if (
			key === 'diarreiaConstipacao' ||
			key === 'dordistesaoabdominal' ||
			key === 'inchacoArticulares' ||
			key === 'fadigaFrequenteOuCronica' ||
			key === 'alergIntolSensibAlimentar' ||
			key === 'confMemRuimAltHumor' ||
			key === 'usoAntInlamComFreq' ||
			key === 'usaUsouMuitoAntib' ||
			key === 'consAlcFreqOuSenteMalAposCons' ||
			key === 'candidiaseDeRepet' ||
			key === 'abdomenDoloroso' ||
			key === 'gengivaSangFacil' ||
			key === 'alergiasIntolerAliment' ||
			key === 'diareiaConstirp' ||
			key === 'fezesFeticas' ||
			key === 'peleOleosaAcne' ||
			key === 'lingBrcHaltFetico' ||
			key === 'sedeExcesBocaSeca' ||
			key === 'ExecGasesPesoEstomago' ||
			key === 'maosEPesFrios' ||
			key === 'peleSecaCabeloSeco' ||
			key === 'ausenSuor' ||
			key === 'fadCansaco' ||
			key === 'baixaLibd' ||
			key === 'dificulPerdPeso' ||
			key === 'dificConcentr' ||
			key === 'quedaCapilar' ||
			key === 'menstIrreg' ||
			key === 'palpRstInchado' ||
			key === 'tontAoLevantar' ||
			key === 'presSangBaixa' ||
			key === 'difcDecisao' ||
			key === 'fadgCansaco' ||
			key === 'melhorAposComerDoce' ||
			key === 'doresArticul' ||
			key === 'difcDormir' ||
			key === 'fadiga' ||
			key === 'edemaInchaco' ||
			key === 'palpitacoes' ||
			key === 'ansiedadeDepres' ||
			key === 'gordAbd' ||
			key === 'sonoDurDia' ||
			key === 'acordNoiteCansado' ||
			key === 'perdEnergia' ||
			key === 'tristSemMotivo' ||
			key === 'irritado' ||
			key === 'panico' ||
			key === 'mudancaHumor' ||
			key === 'antconcep' ||
			key === 'hipersensPrdLimp' ||
			key === 'Infertilidade' ||
			key === 'menopausa' ||
			key === 'doencaAutoimune' ||
			key === 'mialgias' ||
			key === 'bocaAmarga' ||
			key === 'odoresFortesUrina' ||
			key === 'suorFetido' ||
			key === 'reacaoAMedicacao'
		) {
			// Se a mudança for no campo de diarreiaConstipacao, atualize diretamente
			setPerguntas({
				...perguntas,
				[key]: value,
			});
		} else {
			// Para outros campos, faça o processamento padrão
			const limitedValue = value.slice(0, 80);
			setPerguntas({
				...perguntas,
				[key]: limitedValue,
			});
		}
	};

	const SalvarLocalStore = () => {
		// Salvar os valores no localStorage

		// Salvar os valores no localStorage
		localStorage.setItem('anamneseFormData', JSON.stringify(perguntas));
		console.log('Dados do formulário salvos no localStorage:', perguntas);

		// Redefinir o estado para o estado inicial vazio
		setPerguntas(initialState);
	};

	const [showPDF, setShowPDF] = useState(false);

	const GerarPDF = () => {
		if (
			perguntas.nomeCompleto &&
			perguntas.email &&
			perguntas.cpf &&
			perguntas.dataConsulta &&
			perguntas.cuidadosComCabelo &&
			perguntas.frequenciaLavaCabelo &&
			perguntas.produtosQueUsa &&
			perguntas.problemasCpilar &&
			perguntas.problemasDermatologicos &&
			perguntas.historicoMedico &&
			perguntas.usandoMedicacao &&
			perguntas.alimentacaoDiaria &&
			perguntas.praticaExercicio &&
			perguntas.historicoFamiliar &&
			perguntas.exposicaoAoClima &&
			perguntas.expectativaaoTratamento &&
			perguntas.diarreiaConstipacao &&
			perguntas.inchacoArticulares &&
			perguntas.fadigaFrequenteOuCronica &&
			perguntas.alergIntolSensibAlimentar &&
			perguntas.confMemRuimAltHumor &&
			perguntas.usoAntInlamComFreq &&
			perguntas.usaUsouMuitoAntib &&
			perguntas.consAlcFreqOuSenteMalAposCons &&
			perguntas.candidiaseDeRepet &&
			perguntas.abdomenDoloroso &&
			perguntas.gengivaSangFacil &&
			perguntas.alergiasIntolerAliment &&
			perguntas.diareiaConstirp &&
			perguntas.fezesFeticas &&
			perguntas.peleOleosaAcne &&
			perguntas.lingBrcHaltFetico &&
			perguntas.sedeExcesBocaSeca &&
			perguntas.ExecGasesPesoEstomago &&
			perguntas.maosEPesFrios &&
			perguntas.peleSecaCabeloSeco &&
			perguntas.ausenSuor &&
			perguntas.fadCansaco &&
			perguntas.baixaLibd &&
			perguntas.dificulPerdPeso &&
			perguntas.dificConcentr &&
			perguntas.quedaCapilar &&
			perguntas.menstIrreg &&
			perguntas.palpRstInchado &&
			perguntas.tontAoLevantar &&
			perguntas.presSangBaixa &&
			perguntas.difcDecisao &&
			perguntas.fadgCansaco &&
			perguntas.melhorAposComerDoce &&
			perguntas.doresArticul &&
			perguntas.difcDormir &&
			perguntas.fadiga &&
			perguntas.edemaInchaco &&
			perguntas.palpitacoes &&
			perguntas.ansiedadeDepres &&
			perguntas.gordAbd &&
			perguntas.sonoDurDia &&
			perguntas.acordNoiteCansado &&
			perguntas.perdEnergia &&
			perguntas.tristSemMotivo &&
			perguntas.irritado &&
			perguntas.panico &&
			perguntas.mudancaHumor &&
			perguntas.antconcep &&
			perguntas.hipersensPrdLimp &&
			perguntas.Infertilidade &&
			perguntas.menopausa &&
			perguntas.doencaAutoimune &&
			perguntas.mialgias &&
			perguntas.bocaAmarga &&
			perguntas.odoresFortesUrina &&
			perguntas.suorFetido &&
			perguntas.reacaoAMedicacao
		) {
			setShowPDF(true);
			// Salvar os valores no localStorage
			const dataFormatada = formatarDataParaSalvar(
				perguntas.dataConsulta,
			);

			localStorage.setItem(
				'anamneseFormData',
				JSON.stringify({
					...perguntas,
					dataConsulta: dataFormatada,
				}),
			);
			window.alert(
				'A data escolhida para a consulta será confirmada posteriormente através dos meios de comunicação fornecidos!!',
			);
			window.alert('Dados do formulário salvos com sucesso!!');
			// setAcertoModalOpen(true);

			// Redefinir o estado para o estado inicial vazio
			setPerguntas(initialState);
		} else {
			// Exibir modal de erro
			setErrorModalOpen(true);
		}
		// setShowPDF(true);
		// const dataFormatada = formatarDataParaSalvar(perguntas.dataConsulta);

		// localStorage.setItem(
		// 	'anamneseFormData',
		// 	JSON.stringify({
		// 		...perguntas,
		// 		dataConsulta: dataFormatada,
		// 	}),
		// );
		// console.log('Dados do formulário salvos no localStorage:', perguntas);
		// // setAcertoModalOpen(true);
		// //Redefinir o estado para o estado inicial vazio
		// setPerguntas(initialState);
	};

	const handleCloseErrorModal = () => {
		setErrorModalOpen(false);
	};

	// const handleButtonClick = () => {
	// 	// Verifica se a página é igual a "Contato" e redireciona para o WhatsApp

	// 	// Substitua 'SEU_NUMERO_DE_TELEFONE' pelo número real para o qual deseja enviar mensagem
	// 	window.open('https://wa.me/5583998707436?text=Olá!%20:)', '_blank');
	// };
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						height: '100vh', // Definir a altura para ocupar a tela inteira
						color: '#7B193F',
					}}
				>
					<Header />
					<div
						style={{
							overflowY: 'auto',
							height: 'calc(85vh - 100px)', // Ajustar a altura conforme necessário
							// Ajustar a margem superior conforme necessário
							// fontFamily: 'gothamPro',
						}}
					>
						<>
							<ParagrafoConteinar
								variant="h6"
								align="center"
								gutterBottom
								fontFamily="gothamPro"
								margin="20px 15px"
								padding="5px"
								sx={{ background: '#f7adaf' }}
							>
								Formulário de Anamnese Capilar
							</ParagrafoConteinar>
							{/* Seu formulário com TextField */}

							<Paper
								elevation={3}
								style={{
									padding: 16,
									margin: '20px 15px',
									color: '#7B193F',
								}}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Dados Pessoais
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										required
										label="Nome completo:"
										variant="outlined"
										style={{ fontFamily: 'gothamPro' }}
										fullWidth
										margin="normal"
										value={perguntas.nomeCompleto}
										onChange={(e) =>
											handleInputChange(
												'nomeCompleto',
												e.target.value,
											)
										}
									/>
									<TextField
										required
										label="E-mail"
										variant="outlined"
										type="email"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										margin="normal"
										value={perguntas.email}
										onChange={(e) =>
											handleInputChange(
												'email',
												e.target.value,
											)
										}
									/>
								</FormControl>
								<FormControl
									fullWidth
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-around',
										columnGap: '5px',
									}}
								>
									<TextField
										label="CPF:"
										variant="outlined"
										required
										fullWidth
										style={{
											fontFamily: 'gothamPro',
											marginTop: '40px',
										}}
										margin="normal"
										value={perguntas.cpf}
										onChange={handleCPFChange}
									/>
									<FormControl fullWidth>
										<Paper
											elevation={3}
											style={{
												padding: 10,
												margin: '20px 15px',
												color: '#7B193F',
											}}
										>
											<InputLabel
												style={{
													color: '#7B193F',
													fontFamily: 'gothamPro',
												}}
											>
												Data da Consulta
											</InputLabel>
											<TextField
												// label="Data da Consulta:"
												variant="outlined"
												required
												type="date"
												name="date"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={perguntas.dataConsulta}
												onChange={(e) =>
													handleInputChange(
														'dataConsulta',
														e.target.value,
													)
												}
											/>
										</Paper>
									</FormControl>
								</FormControl>
							</Paper>

							<Paper
								elevation={3}
								style={{ padding: 16, margin: '20px 15px' }}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Histórico Capilar
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										label="Histórico Capilar: Qual é a sua rotina de cuidados com o cabelo?"
										variant="outlined"
										style={{ fontFamily: 'gothamPro' }}
										required
										fullWidth
										margin="normal"
										value={perguntas.cuidadosComCabelo}
										onChange={(e) =>
											handleInputChange(
												'cuidadosComCabelo',
												e.target.value,
											)
										}
									/>
									<TextField
										label="Histórico Capilar: Com que frequência você lava o cabelo?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.frequenciaLavaCabelo}
										onChange={(e) =>
											handleInputChange(
												'frequenciaLavaCabelo',
												e.target.value,
											)
										}
									/>
									<TextField
										label="Quais produtos capilares você costuma usar regularmente?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.produtosQueUsa}
										onChange={(e) =>
											handleInputChange(
												'produtosQueUsa',
												e.target.value,
											)
										}
									/>
								</FormControl>
							</Paper>

							<Paper
								elevation={3}
								style={{ padding: 16, margin: '20px 15px' }}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Problemas Capilares
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										label="Você está com queda de cabelo, coceira no couro cabeludo, ou caspa?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.problemasCpilar}
										onChange={(e) =>
											handleInputChange(
												'problemasCpilar',
												e.target.value,
											)
										}
									/>
									<TextField
										label="Alguma problema dermatológico no couro cabeludo, como eczema ou psoríase?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={
											perguntas.problemasDermatologicos
										}
										onChange={(e) =>
											handleInputChange(
												'problemasDermatologicos',
												e.target.value,
											)
										}
									/>
								</FormControl>
							</Paper>

							<Paper
								elevation={3}
								style={{ padding: 16, margin: '20px 15px' }}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Histórico Médico
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										label="Possui histórico médico, como diabetes, problemas hormonais, ou distúrbios da tireoide?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.historicoMedico}
										onChange={(e) =>
											handleInputChange(
												'historicoMedico',
												e.target.value,
											)
										}
									/>
									<TextField
										label="Está usando alguma medicamento que possa influenciar a saúde do cabelo?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.usandoMedicacao}
										onChange={(e) =>
											handleInputChange(
												'usandoMedicacao',
												e.target.value,
											)
										}
									/>
								</FormControl>
							</Paper>
							<Paper
								elevation={3}
								style={{ padding: 16, margin: '20px 15px' }}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Alimentação e Estilo de Vida
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										label="Como é a sua alimentação diária? "
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.alimentacaoDiaria}
										onChange={(e) =>
											handleInputChange(
												'alimentacaoDiaria',
												e.target.value,
											)
										}
									/>
									<TextField
										label="Você pratica exercícios físicos regularmente?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.praticaExercicio}
										onChange={(e) =>
											handleInputChange(
												'praticaExercicio',
												e.target.value,
											)
										}
									/>
								</FormControl>
							</Paper>
							<Paper
								elevation={3}
								style={{ padding: 16, margin: '20px 15px' }}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Histórico Genético
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										label="Existe histórico de perda de cabelo ou condições capilares na sua família?"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.historicoFamiliar}
										onChange={(e) =>
											handleInputChange(
												'historicoFamiliar',
												e.target.value,
											)
										}
									/>
								</FormControl>
							</Paper>
							<Paper
								elevation={3}
								style={{ padding: 16, margin: '20px 15px' }}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Ambiente e Exposição
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										label="Está frequentemente exposto a condições ambientais, sol, vento, ou poluição"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={perguntas.exposicaoAoClima}
										onChange={(e) =>
											handleInputChange(
												'exposicaoAoClima',
												e.target.value,
											)
										}
									/>
								</FormControl>
							</Paper>
							<Paper
								elevation={3}
								style={{ padding: 16, margin: '20px 15px' }}
							>
								<InputLabel
									style={{
										color: '#7B193F',
										fontFamily: 'gothamPro',
									}}
								>
									Expectativas e Preferências
								</InputLabel>
								<FormControl fullWidth>
									<TextField
										label="Qual é a sua expectativa em relação ao tratamento capilar"
										variant="outlined"
										fullWidth
										style={{ fontFamily: 'gothamPro' }}
										required
										margin="normal"
										value={
											perguntas.expectativaaoTratamento
										}
										onChange={(e) =>
											handleInputChange(
												'expectativaaoTratamento',
												e.target.value,
											)
										}
									/>
								</FormControl>
							</Paper>
							<ParagrafoConteinar
								variant="h6"
								align="center"
								gutterBottom
								margin="20px 15px"
								padding="5px"
								fontFamily="gothamPro"
								sx={{ background: '#f7adaf' }}
							>
								QUESTIONÁRIO DE RASTREAMENTO METABÓLICO
							</ParagrafoConteinar>
							<RastrMetab
							// style={{
							// 	display: 'flex',
							// 	justifyContent: 'space-around',
							// 	flexDirection: 'row',
							// 	marginTop: 10,
							// }}
							>
								<RastrPaper
									elevation={3}
									// style={{
									// 	padding: 16,
									// 	margin: '10px 0',
									// 	width: '40vw',
									// }}
								>
									<InputLabel
										style={{
											color: '#7B193F',
											fontFamily: 'gothamPro',
											fontSize: '12px',
											background: '#f7adaf',
											textAlign: 'center',
											content: 'none',
										}}
									>
										SINTOMAS DE HIPERPERMEABILIDADE
										INTESTINAL
									</InputLabel>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
												content: '',
											}}
										>
											Diarreia e/ou constipação?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.diarreiaConstipacao ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'diarreiaConstipacao',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.diarreiaConstipacao ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'diarreiaConstipacao',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Dor ou distensão abdominal?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.dordistesaoabdominal ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'dordistesaoabdominal',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.dordistesaoabdominal ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'dordistesaoabdominal',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Dor ou inchaço nas articulares ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.inchacoArticulares ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'inchacoArticulares',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.inchacoArticulares ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'inchacoArticulares',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Fadiga frequente ou crônica ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadigaFrequenteOuCronica ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'fadigaFrequenteOuCronica',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadigaFrequenteOuCronica ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'fadigaFrequenteOuCronica',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Alergias, intolerâncias e
											sensibilidades alimentares?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.alergIntolSensibAlimentar ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'alergIntolSensibAlimentar',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.alergIntolSensibAlimentar ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'alergIntolSensibAlimentar',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Confusão, memoria ruim, alterações
											de humor ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.confMemRuimAltHumor ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'confMemRuimAltHumor',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.confMemRuimAltHumor ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'confMemRuimAltHumor',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Uso de anti-inflamatórios com
											frequência ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.usoAntInlamComFreq ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'usoAntInlamComFreq',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.usoAntInlamComFreq ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'usoAntInlamComFreq',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Usa ou usou muito antibiótico
											(histórico) ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.usaUsouMuitoAntib ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'usaUsouMuitoAntib',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.usaUsouMuitoAntib ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'usaUsouMuitoAntib',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Consumo de álcool frequente, ou
											sente-se mal após consumo ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.consAlcFreqOuSenteMalAposCons ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'consAlcFreqOuSenteMalAposCons',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.consAlcFreqOuSenteMalAposCons ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'consAlcFreqOuSenteMalAposCons',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
								</RastrPaper>
								<RastrPaper
									elevation={3}
									// style={{
									// 	padding: 16,
									// 	margin: '10px 0',
									// 	width: '40vw',
									// }}
								>
									<InputLabel
										style={{
											color: '#7B193F',
											fontFamily: 'gothamPro',
											fontSize: '12px',
											background: '#f7adaf',
											textAlign: 'center',
										}}
									>
										SINTOMAS TRATO GASTROINTESTINAL
									</InputLabel>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Candidiase de repetição?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.candidiaseDeRepet ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'candidiaseDeRepet',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.candidiaseDeRepet ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'candidiaseDeRepet',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Abdômen Doloroso, Inchado?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.abdomenDoloroso ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'abdomenDoloroso',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.abdomenDoloroso ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'abdomenDoloroso',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Gengiva Sangra facilmente?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gengivaSangFacil ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'gengivaSangFacil',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gengivaSangFacil ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'gengivaSangFacil',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Alergias – Intolerância a Alimentos?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.alergiasIntolerAliment ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'alergiasIntolerAliment',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.alergiasIntolerAliment ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'alergiasIntolerAliment',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Diarreia e/ou constipação?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.diareiaConstirp ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'diareiaConstirp',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.diareiaConstirp ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'diareiaConstirp',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Fezes Fétidas?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fezesFeticas ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'fezesFeticas',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fezesFeticas ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'fezesFeticas',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Pele Oleosa, acne ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.peleOleosaAcne ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'peleOleosaAcne',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.peleOleosaAcne ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'peleOleosaAcne',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Língua Branca? Hálito Fétido ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.lingBrcHaltFetico ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'lingBrcHaltFetico',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.lingBrcHaltFetico ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'lingBrcHaltFetico',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Sede excessiva? Boca seca ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.sedeExcesBocaSeca ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'sedeExcesBocaSeca',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.sedeExcesBocaSeca ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'sedeExcesBocaSeca',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Excesso de Gases Intestinais?
											Sensação de peso no estômago ? Azia
											?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.ExecGasesPesoEstomago ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'ExecGasesPesoEstomago',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.ExecGasesPesoEstomago ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'ExecGasesPesoEstomago',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
								</RastrPaper>
							</RastrMetab>
							<RastrMetab
							// style={{
							// 	display: 'flex',
							// 	justifyContent: 'space-around',
							// 	flexDirection: 'row',
							// 	marginTop: 10,
							// }}
							>
								<RastrPaper
									elevation={3}
									// style={{
									// 	padding: 16,
									// 	margin: '10px 0',
									// 	width: '40vw',
									// }}
								>
									<InputLabel
										style={{
											color: '#7B193F',
											fontFamily: 'gothamPro',
											fontSize: '12px',
											background: '#f7adaf',
											textAlign: 'center',
										}}
									>
										SINTOMAS DE ALTERAÇÕES TIREOIDIANAS
									</InputLabel>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Mãos e pés frios?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.maosEPesFrios ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'maosEPesFrios',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.maosEPesFrios ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'maosEPesFrios',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Pele seca/ cabelo seco?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.peleSecaCabeloSeco ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'peleSecaCabeloSeco',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.peleSecaCabeloSeco ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'peleSecaCabeloSeco',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Ausência de suor, inclusive ativ
											física?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.ausenSuor ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'ausenSuor',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.ausenSuor ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'ausenSuor',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Fadiga, cansaço, sem vontade de
											coisas novas?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadCansaco ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'fadCansaco',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadCansaco ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'fadCansaco',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Baixa libido ou sem vontade de sexo?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.baixaLibd ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'baixaLibd',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.baixaLibd ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'baixaLibd',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Dificuldade de perder peso, ou perde
											peso fácil?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.dificulPerdPeso ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'dificulPerdPeso',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.dificulPerdPeso ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'dificulPerdPeso',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Dificuldade de concentração e/ou
											memoria ruim?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.dificConcentr ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'dificConcentr',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.dificConcentr ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'dificConcentr',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Queda Capilar ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.quedaCapilar ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'quedaCapilar',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.quedaCapilar ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'quedaCapilar',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Menstruação Irregular, e ou
											volumosa?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.menstIrreg ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'menstIrreg',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.menstIrreg ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'menstIrreg',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Pálpebras e rosto inchado?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.palpRstInchado ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'palpRstInchado',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.palpRstInchado ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'palpRstInchado',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
								</RastrPaper>
								<RastrPaper
									elevation={3}
									// style={{
									// 	padding: 16,
									// 	margin: '10px 0',
									// 	width: '40vw',
									// }}
								>
									<InputLabel
										style={{
											color: '#7B193F',
											fontFamily: 'gothamPro',
											fontSize: '12px',
											background: '#f7adaf',
											textAlign: 'center',
										}}
									>
										SINTOMAS DE ALTERAÇÕES ADRENAIS
									</InputLabel>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Tonturas ao levantar?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.tontAoLevantar ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'tontAoLevantar',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.tontAoLevantar ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'tontAoLevantar',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Pressão Sanguínea Baixa?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.presSangBaixa ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'presSangBaixa',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.presSangBaixa ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'presSangBaixa',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Dificuldade de Decisão? Menos
											Coragem?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.difcDecisao ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'difcDecisao',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.difcDecisao ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'difcDecisao',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Fadiga, cansaço, sem vontade de
											coisas novas?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadgCansaco ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'fadgCansaco',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadgCansaco ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'fadgCansaco',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Sente-se melhor após comer algo
											Doce? Vontade de comer doces?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.melhorAposComerDoce ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'melhorAposComerDoce',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.melhorAposComerDoce ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'melhorAposComerDoce',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Dores articulares/ musculares ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.doresArticul ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'doresArticul',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.doresArticul ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'doresArticul',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Dificuldade para dormir ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.difcDormir ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'difcDormir',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.difcDormir ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'difcDormir',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Fadiga?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadiga ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'fadiga',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.fadiga ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'fadiga',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Edema, inchaços?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.edemaInchaco ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'edemaInchaco',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.edemaInchaco ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'edemaInchaco',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Palpitações?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.palpitacoes ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'palpitacoes',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.palpitacoes ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'palpitacoes',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
								</RastrPaper>
							</RastrMetab>
							<RastrMetab
							// style={{
							// 	display: 'flex',
							// 	justifyContent: 'space-around',
							// 	flexDirection: 'row',
							// 	marginTop: 10,
							// }}
							>
								<RastrPaper
									elevation={3}
									// style={{
									// 	padding: 16,
									// 	margin: '10px 0',
									// 	width: '40vw',
									// }}
								>
									<InputLabel
										style={{
											color: '#7B193F',
											fontFamily: 'gothamPro',
											fontSize: '12px',
											background: '#f7adaf',
											textAlign: 'center',
										}}
									>
										SINTOMAS DE ALTERAÇÕES
										NEUROTRANSMISSORES e HORMONIOS/
										METABOLICO
									</InputLabel>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Ansiedade e ou depressão?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.ansiedadeDepres ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'ansiedadeDepres',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.ansiedadeDepres ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'ansiedadeDepres',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Gordura Abdominal e ou ganho de
											peso?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gordAbd ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'gordAbd',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gordAbd ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'gordAbd',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Sonolência durante o dia? Insônia?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.sonoDurDia ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'sonoDurDia',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.sonoDurDia ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'sonoDurDia',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Acorda várias vezes durante a noite
											e ou acorda cansado?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.acordNoiteCansado ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'acordNoiteCansado',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.acordNoiteCansado ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'acordNoiteCansado',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Perda de energia?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.perdEnergia ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'perdEnergia',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.perdEnergia ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'perdEnergia',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Períodos de tristeza sem motivo?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.tristSemMotivo ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'tristSemMotivo',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.tristSemMotivo ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'tristSemMotivo',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Sente-se Irritada por pequenas
											coisas?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.irritado ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'irritado',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.irritado ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'irritado',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Crises/Episódios de Pânico?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.panico ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'panico',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.panico ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'panico',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Rápidas mudanças de humor?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.mudancaHumor ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'mudancaHumor',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.mudancaHumor ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'mudancaHumor',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Utiliza Pílula Anticoncepcional? DIU
											Mirena e ou Cobre?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.antconcep ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'antconcep',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.antconcep ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'antconcep',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
								</RastrPaper>
								<RastrPaper
									elevation={3}
									// style={{
									// 	padding: 16,
									// 	margin: '10px 0',
									// 	width: '40vw',
									// }}
								>
									<InputLabel
										style={{
											color: '#7B193F',
											fontFamily: 'gothamPro',
											fontSize: '12px',
											background: '#f7adaf',
											textAlign: 'center',
										}}
									>
										SINTOMAS DE INTOXICAÇÃO
									</InputLabel>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Hipersensibilidade a produtos de
											limpeza, maquiagens, metais, odores,
											fumaças, perfumes, medicamentos?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.hipersensPrdLimp ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'hipersensPrdLimp',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.hipersensPrdLimp ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'hipersensPrdLimp',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Infertilidade ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.Infertilidade ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'Infertilidade',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.Infertilidade ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'Infertilidade',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Menopausa/ Andropausa precoce?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.menopausa ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'menopausa',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.menopausa ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'menopausa',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Doenças Autoimunes ?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.doencaAutoimune ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'doencaAutoimune',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.doencaAutoimune ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'doencaAutoimune',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Mialgias, artralgias, fibromialgias,
											síndrome da fadiga crônica?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.mialgias ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'mialgias',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.mialgias ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'mialgias',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Boca amarga e ou seca?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.bocaAmarga ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'bocaAmarga',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.bocaAmarga ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'bocaAmarga',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Odores fortes na urina?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.odoresFortesUrina ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'odoresFortesUrina',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.odoresFortesUrina ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'odoresFortesUrina',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Suor fétido?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.suorFetido ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'suorFetido',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.suorFetido ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'suorFetido',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
											}}
										>
											Reações paradoxais a medicações e
											suplementos?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.reacaoAMedicacao ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'reacaoAMedicacao',
																'Sim',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Sim
													</span>
												}
											/>
											<FormControlLabel
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.reacaoAMedicacao ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'reacaoAMedicacao',
																'Não',
															)
														}
													/>
												}
												label={
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Não
													</span>
												}
											/>
										</div>
									</div>
								</RastrPaper>
							</RastrMetab>

							{/* Componente AnamnesePDF para gerar o PDF */}
							<>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-around',
										flexDirection: 'row',
									}}
								>
									<Tooltip title="Clique para salvar as informações do formulário">
										<IconButton
											onClick={handleOpenUserMenu}
											sx={{ p: 0 }}
										>
											<Buttom
												background="#7B193F"
												titlePhrase="Salvar dados"
												onClick={GerarPDF}
												fontSize="12px"
											/>
										</IconButton>
									</Tooltip>
									<Tooltip
										style={{ fontFamily: 'gothamPro' }}
										title="Clique para baixar as informações"
									>
										<IconButton
											onClick={handleOpenUserMenu}
											sx={{ p: 0 }}
										>
											{showPDF && (
												<AnamnesePDF data={perguntas} />
											)}
										</IconButton>
									</Tooltip>
								</div>
							</>

							{/* Seu rodapé */}
							<Footer />
							<Footer2 />
						</>
					</div>
				</div>
			)}
			{/* Modal de erro */}
			<Modal
				open={errorModalOpen}
				onClose={handleCloseModal}
				aria-labelledby="error-modal-title"
				aria-describedby="error-modal-description"
			>
				<Box sx={modalStyle}>
					<Box sx={modalImageStyle} />

					<Typography
						id="error-modal-title"
						variant="h6"
						component="h6"
						sx={{
							backgroundColor: '#f7adaf',
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'center',
							color: '#7b193f',
							fontFamily: 'gothamPro',
							borderRadius: 3,
						}}
					>
						Erro ao salvar
					</Typography>
					<ParagrafoConteinar
						id="error-modal-description"
						sx={{
							mt: 5,
							color: '#7b193f',
							fontFamily: 'gothamPro',
						}}
					>
						Preencha todos os campos obrigatórios antes de salvar.
					</ParagrafoConteinar>
					<IconButton
						sx={closeButtonStyle}
						onClick={handleCloseModal}
					>
						<Buttom
							background="#7B193F"
							titlePhrase="Fechar"
							fontSize="12px"
						/>
					</IconButton>
				</Box>
			</Modal>

			<Modal
				open={acertoModalOpen}
				onClose={handleCloseModal}
				aria-labelledby="error-modal-title"
				aria-describedby="error-modal-description"
			>
				<Box sx={modalAcertoStyle}>
					<Box sx={modalImageStyle} />

					<Typography
						id="error-modal-title"
						variant="h6"
						component="h6"
						sx={{
							backgroundColor: '#f7adaf',
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'center',
							color: '#7b193f',
							fontFamily: 'gothamPro',
							borderRadius: 3,
						}}
					>
						Dados salvos com sucesso - PARABÉNS!!😁
					</Typography>
					<ParagrafoConteinar
						id="error-modal-description"
						sx={{
							mt: 2,
							color: '#7b193f',
							fontFamily: 'gothamPro',
						}}
					>
						<div style={{ height: '50%', width: '90%' }}>
							<p>Siga as instruções abaixo:</p>
							<p>
								1-Gere o PDF dos dados salvos clincado no botão{' '}
								<div style={{ height: '20px', width: '30px' }}>
									<img src={btnImgPdf} height="100%" />
								</div>
							</p>
							<p>
								2- Envie o arquivo baixado para
								Adrimelo-tricologia clicando no icone do
								Whatsapp no roda-pé da pagina{' '}
								<div style={{ height: '20px', width: '30px' }}>
									<img src={btnEnvDds} height="100%" />
								</div>
							</p>
						</div>
					</ParagrafoConteinar>
					<IconButton
						sx={closeButtonStyle}
						onClick={handleCloseModal}
					>
						<Buttom
							background="#7B193F"
							titlePhrase="Fechar"
							fontSize="8px"
						/>
					</IconButton>
				</Box>
			</Modal>
		</>
	);
};

export default PgPdfCapilar;
