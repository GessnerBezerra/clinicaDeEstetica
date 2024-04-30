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
import AnamnesePDFFacial from '../../components/pdf-pg/pdfPageFacial';
import '../../style/globalStyle.module.css';

const ContainerRastr = styled.div`
	@media (max-width: 768px) {
		display: flex;
		flex-wrap: wrap;
		width: auto;
	}
`;

const RastrMetab = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	width: 80vw;
	gap: 10px;
	margin: 15px;

	&:hover {
		content: '';
	}

	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
		/* flex-direction: column; */
		align-items: center;
		flex-wrap: wrap;
		width: 80%;
	}
`;

const FormControlcontaener = styled(FormControl)`
	@media (max-width: 768px) {
		display: flex;
		flex-wrap: wrap;
		/* width: auto; */
	}
`;

const RastrPaper = styled(Paper)`
	display: flex;
	padding: 5px;
	margin: 10px 0;
	width: 80vw;
	content: '';

	&:hover {
		content: '';
	}

	@media (max-width: 468px) {
		display: flex;
		flex-wrap: wrap;
		width: 90%;
		padding: 10px;
		margin: 15px;
	}
`;

/*const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 200,
	backgroundImage: 'url("../../../public/assets/Logo.png")', // Substitua pelo caminho da sua imagem
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	color: 'white', // Cor do texto
	textAlign: 'center',
	padding: 20,
	borderRadius: 8,
}; */

// const modalStyle = {
// 	position: 'absolute' as const,
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 400,
// 	height: 400,
// 	backgroundColor: 'rgba(255, 255, 255, 0.8)', // Cor de fundo com transparência
// 	border: '2px solid #f7adaf',
// 	borderRadius: 8,
// 	padding: 20,
// 	display: 'flex',
// 	flexDirection: 'column',
// 	alignItems: 'center',
// 	backgroundImage: 'url("../../../public/assets/Logo.png")', // Substitua pelo caminho da sua imagem
// 	backgroundSize: 'cover',
// 	backgroundPosition: 'center',
// };

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

const PgPdfFacial: React.FC = () => {
	const initialState = {
		nomeCompleto: '',
		email: '',
		idade: '',
		sexo: '',
		endereco: '',
		bairro: '',
		cidade: '',
		cep: '',
		foneRes: '',
		foneCel: '',
		estadoCivil: '',
		nascimento: '',
		profissao: '',
		motivoVisita: '',
		cpf: '',
		dataConsulta: '',
		lentesDeContato: '',
		estéticoAnterior: '',
		estéticoAnteriorResp: '',
		utilizCosmeticos: '',
		utilizCosmeticosResp: '',
		exposicaoAoSol: '',
		exposicaoAoSolResp: '',
		filtroSolar: '',
		filtroSolarResp: '',
		tabagismo: '',
		tabagismoResp: '',
		ingereAlcool: '',
		ingereAlcoolResp: '',
		funcintestinalSemana: '',
		funcintestinalDia: '',
		qualidadeSono: '',
		qualidadeSonoResp: '',
		alimentacao: '',
		alimentacaoResp: '',
		ativFisica: '',
		ativFisicaResp: '',
		usoAnticoncepcional: '',
		usoAnticoncepcionalResp: '',
		gestante: '',
		ultimaMenstruacao: '',
		gestacoes: '',
		qtsGestacoes: '',
		tmpUltimaGestacao: '',
		tratMedico: '',
		medicemUso: '',
		antAlergicos: '',
		antAlergicosResp: '',
		marcaPasso: '',
		alteracoesCardiacas: '',
		alteracoesCardiacasResp: '',
		hipoHipertensaoArterial: '',
		distRenal: '',
		distRenalResp: '',
		distHormonal: '',
		distHormonalResp: '',
		distGastroIntest: '',
		distGastroIntestResp: '',
		eplepsiaConvulsoes: '',
		eplepsiaConvulsoesResp: '',
		altPsicPsiquiatr: '',
		altPsicPsiquiatrResp: '',
		estresse: '',
		estresseResp: '',
		antecOncologicos: '',
		antecOncologicosResp: '',
		diabetes: '',
		diabetesResp: '',
		algumaDoenca: '',
		algumaDoencaResp: '',
		implDentario: '',
		implDentarioResp: '',
		tratDermatEstetico: '',
		tratDermatEsteticoResp: '',
		cirurPlastEstetica: '',
		cirurPlastEsteticaResp: '',
		cirurgReparadora: '',
		cirurgReparadoraResp: '',
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
		const savedDataString = localStorage.getItem('anamneseFormDataFacial');
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

	// const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	// Remover caracteres não numéricos
	// 	const numericValue = e.target.value.replace(/\D/g, '');

	// 	// Limitar a 11 dígitos
	// 	const limitedValue = numericValue.slice(0, 11);

	// 	// Garantir que tenha exatamente 11 dígitos
	// 	if (limitedValue.length === 11) {
	// 		// Atualizar o estado do componente
	// 		setPerguntas({
	// 			...perguntas,
	// 			cpf: limitedValue,
	// 		});
	// 	}
	// };

	const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remover caracteres não numéricos
		const numericValue = e.target.value.replace(/\D/g, '');

		// Limitar a 11 dígitos
		const limitedValue = numericValue.slice(0, 11);

		setPerguntas({
			...perguntas,
			cpf: limitedValue,
		});

		// Atualizar o estado do componente
		// if (limitedValue.length <= 10) {
		// 	// Atualizar o estado do componente
		// 	window.alert('O campo CPF deve ter 11 dígitos');
		// } else {
		// 	setPerguntas({
		// 		...perguntas,
		// 		cpf: limitedValue,
		// 	});
		// }

		// if (perguntas.cpf.length < 11) {
		// 	window.alert('O campo CPF deve ter 11 dígitos');
		// 	setPerguntas({
		// 		...perguntas,
		// 		cpf: '',
		// 	});
		// }
		// else {
		// 	setPerguntas({
		// 		...perguntas,
		// 		cpf: limitedValue,
		// 	});
		// qtsGestacoes }
	};

	const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remover caracteres não numéricos
		const numericValueCep = e.target.value.replace(/\D/g, '');

		// Limitar a 11 dígitos
		const limitedValueCep = numericValueCep.slice(0, 8);

		setPerguntas({
			...perguntas,
			cep: limitedValueCep,
		});
	};

	const handleNumGestacoesChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		// Remover caracteres não numéricos
		const numericValueGest = e.target.value.replace(/\D/g, '');

		// Limitar a 11 dígitos
		const limitedValueGest = numericValueGest.slice(0, 2);

		setPerguntas({
			...perguntas,
			qtsGestacoes: limitedValueGest,
		});
	};

	const handleIdadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remover caracteres não numéricos
		const numericValueIdade = e.target.value.replace(/\D/g, '');

		// Limitar a 11 dígitos
		const limitedValueIdade = numericValueIdade.slice(0, 3);

		setPerguntas({
			...perguntas,
			idade: limitedValueIdade,
		});
	};

	const handleFoneCelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remover caracteres não numéricos
		const numericValueFone = e.target.value.replace(/\D/g, '');

		// Limitar a 11 dígitos
		const limitedValueFone = numericValueFone.slice(0, 11);

		setPerguntas({
			...perguntas,
			foneCel: limitedValueFone,
		});
	};

	const handleFoneResChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remover caracteres não numéricos
		const numericValueRes = e.target.value.replace(/\D/g, '');

		// Limitar a 11 dígitos
		const limitedValueRes = numericValueRes.slice(0, 10);

		setPerguntas({
			...perguntas,
			foneRes: limitedValueRes,
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
			key === 'lentesDeContato' ||
			key === 'estéticoAnterior' ||
			key === 'estéticoAnteriorResp' ||
			key === 'utilizCosmeticos' ||
			key === 'utilizCosmeticosResp' ||
			key === 'exposicaoAoSolResp' ||
			key === 'exposicaoAoSol' ||
			key === 'filtroSolar' ||
			key === 'filtroSolarResp' ||
			key === 'tabagismo' ||
			key === 'tabagismoResp' ||
			key === 'ingereAlcool' ||
			key === 'ingereAlcoolResp' ||
			key === 'funcintestinalSemana' ||
			key === 'funcintestinalDia' ||
			key === 'qualidadeSono' ||
			key === 'qualidadeSonoResp' ||
			key === 'alimentacao' ||
			key === 'alimentacaoResp' ||
			key === 'ativFisica' ||
			key === 'ativFisicaResp' ||
			key === 'usoAnticoncepcional' ||
			key === 'usoAnticoncepcionalResp' ||
			key === 'gestante' ||
			key === 'ultimaMenstruacao' ||
			key === 'gestacoes' ||
			key === 'qtsGestacoes' ||
			key === 'tmpUltimaGestacao' ||
			key === 'tratMedico' ||
			key === 'medicemUso' ||
			key === 'antAlergicos' ||
			key === 'antAlergicosResp' ||
			key === 'marcaPasso' ||
			key === 'alteracoesCardiacas' ||
			key === 'alteracoesCardiacasResp' ||
			key === 'hipoHipertensaoArterial' ||
			key === 'distRenal' ||
			key === 'distRenalResp' ||
			key === 'distHormonal' ||
			key === 'distHormonalResp' ||
			key === 'distGastroIntest' ||
			key === 'distGastroIntestResp' ||
			key === 'eplepsiaConvulsoes' ||
			key === 'eplepsiaConvulsoesResp' ||
			key === 'altPsicPsiquiatr' ||
			key === 'altPsicPsiquiatrResp' ||
			key === 'estresse' ||
			key === 'estresseResp' ||
			key === 'antecOncologicos' ||
			key === 'antecOncologicosResp' ||
			key === 'diabetes' ||
			key === 'diabetesResp' ||
			key === 'algumaDoenca' ||
			key === 'algumaDoencaResp' ||
			key === 'implDentario' ||
			key === 'implDentarioResp' ||
			key === 'tratDermatEstetico' ||
			key === 'tratDermatEsteticoResp' ||
			key === 'cirurPlastEstetica' ||
			key === 'cirurPlastEsteticaResp' ||
			key === 'cirurgReparadora' ||
			key === 'cirurgReparadoraResp'
		) {
			// Se a mudança for no campo de diarreiaConstipacao, atualize diretamentegestante: '',
			/*cirurgReparadora: '',
		cirurgReparadoraResp: '',*/
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
		// const limitedValue = value.slice(0, 80);
		// setPerguntas({
		// 	...perguntas,
		// 	[key]: limitedValue,
		// });
	};

	const SalvarLocalStore = () => {
		// Salvar os valores no localStorage

		// Salvar os valores no localStorage
		localStorage.setItem(
			'anamneseFormDataFacial',
			JSON.stringify(perguntas),
		);
		console.log('Dados do formulário salvos no localStorage:', perguntas);

		// Redefinir o estado para o estado inicial vazio
		setPerguntas(initialState);
	};

	const [showPDF, setShowPDF] = useState(false);

	const GerarPDF2 = () => {
		if (
			perguntas.nomeCompleto &&
			perguntas.email &&
			perguntas.idade &&
			perguntas.sexo &&
			perguntas.endereco &&
			perguntas.bairro &&
			perguntas.cidade &&
			perguntas.cep &&
			perguntas.foneRes &&
			perguntas.foneCel &&
			perguntas.estadoCivil &&
			perguntas.nascimento &&
			perguntas.profissao &&
			perguntas.motivoVisita &&
			perguntas.cpf &&
			perguntas.lentesDeContato &&
			!perguntas.utilizCosmeticosResp &&
			perguntas.exposicaoAoSol &&
			perguntas.funcintestinalSemana &&
			perguntas.funcintestinalDia &&
			perguntas.alimentacao &&
			perguntas.marcaPasso &&
			perguntas.hipoHipertensaoArterial &&
			perguntas.dataConsulta
		) {
			if (perguntas.sexo === 'Feminino') {
				if (
					(perguntas.estéticoAnterior === 'Sim' &&
						perguntas.estéticoAnteriorResp) ||
					(perguntas.estéticoAnterior === 'Não' &&
						!perguntas.estéticoAnteriorResp)
				) {
					if (
						(perguntas.utilizCosmeticos === 'Sim' &&
							perguntas.utilizCosmeticosResp) ||
						(perguntas.utilizCosmeticos === 'Não' &&
							!perguntas.utilizCosmeticosResp)
					) {
						if (
							(perguntas.filtroSolar === 'Sim' &&
								perguntas.filtroSolarResp) ||
							(perguntas.filtroSolar === 'Não' &&
								!perguntas.filtroSolarResp)
						) {
							if (
								(perguntas.tabagismo === 'Sim' &&
									perguntas.tabagismoResp) ||
								(perguntas.tabagismo === 'Não' &&
									!perguntas.tabagismoResp)
							) {
								if (
									(perguntas.ingereAlcool === 'Sim' &&
										perguntas.ingereAlcoolResp) ||
									(perguntas.ingereAlcool === 'Não' &&
										!perguntas.ingereAlcoolResp)
								) {
									if (
										perguntas.qualidadeSono === 'Boa' ||
										perguntas.qualidadeSono === 'Regular' ||
										(perguntas.qualidadeSono ===
											'Pessima' &&
											perguntas.qualidadeSonoResp)
									) {
										if (
											(perguntas.ativFisica === 'Sim' &&
												perguntas.ativFisicaResp) ||
											(perguntas.ativFisica === 'Não' &&
												!perguntas.ativFisicaResp)
										) {
											if (
												(perguntas.usoAnticoncepcional ===
													'Sim' &&
													perguntas.usoAnticoncepcionalResp) ||
												(perguntas.usoAnticoncepcional ===
													'Não' &&
													!perguntas.usoAnticoncepcionalResp)
											) {
												if (
													(perguntas.gestante ===
														'Sim' &&
														perguntas.ultimaMenstruacao) ||
													(perguntas.gestante ===
														'Não' &&
														perguntas.ultimaMenstruacao)
												) {
													if (
														(perguntas.gestacoes ===
															'Sim' &&
															perguntas.qtsGestacoes &&
															perguntas.tmpUltimaGestacao) ||
														(perguntas.gestacoes ===
															'Não' &&
															!perguntas.qtsGestacoes)
													) {
														if (
															(perguntas.tratMedico ===
																'Sim' &&
																perguntas.medicemUso) ||
															(perguntas.tratMedico ===
																'Não' &&
																!perguntas.medicemUso)
														) {
															if (
																(perguntas.antAlergicos ===
																	'Sim' &&
																	perguntas.antAlergicosResp) ||
																(perguntas.antAlergicos ===
																	'Não' &&
																	!perguntas.antAlergicosResp)
															) {
																if (
																	(perguntas.alteracoesCardiacas ===
																		'Sim' &&
																		perguntas.alteracoesCardiacasResp) ||
																	(perguntas.alteracoesCardiacas ===
																		'Não' &&
																		!perguntas.alteracoesCardiacasResp)
																) {
																	if (
																		(perguntas.distRenal ===
																			'Sim' &&
																			perguntas.distRenalResp) ||
																		(perguntas.distRenal ===
																			'Não' &&
																			!perguntas.distRenalResp)
																	) {
																		if (
																			(perguntas.distHormonal ===
																				'Sim' &&
																				perguntas.distHormonalResp) ||
																			(perguntas.distHormonal ===
																				'Não' &&
																				!perguntas.distHormonalResp)
																		) {
																			if (
																				(perguntas.distGastroIntest ===
																					'Sim' &&
																					perguntas.distGastroIntestResp) ||
																				(perguntas.distGastroIntest ===
																					'Não' &&
																					!perguntas.distGastroIntestResp)
																			) {
																				if (
																					(perguntas.eplepsiaConvulsoes ===
																						'Sim' &&
																						perguntas.eplepsiaConvulsoesResp) ||
																					(perguntas.eplepsiaConvulsoes ===
																						'Não' &&
																						!perguntas.eplepsiaConvulsoesResp)
																				) {
																					if (
																						(perguntas.altPsicPsiquiatr ===
																							'Sim' &&
																							perguntas.altPsicPsiquiatrResp) ||
																						(perguntas.altPsicPsiquiatr ===
																							'Não' &&
																							!perguntas.altPsicPsiquiatrResp)
																					) {
																						if (
																							(perguntas.estresse ===
																								'Sim' &&
																								perguntas.estresseResp) ||
																							(perguntas.estresse ===
																								'Não' &&
																								!perguntas.estresseResp)
																						) {
																							if (
																								(perguntas.antecOncologicos ===
																									'Sim' &&
																									perguntas.antecOncologicosResp) ||
																								(perguntas.antecOncologicos ===
																									'Não' &&
																									!perguntas.antecOncologicosResp)
																							) {
																								if (
																									(perguntas.diabetes ===
																										'Sim' &&
																										perguntas.diabetesResp) ||
																									(perguntas.diabetes ===
																										'Não' &&
																										!perguntas.diabetesResp)
																								) {
																									if (
																										(perguntas.algumaDoenca ===
																											'Sim' &&
																											perguntas.algumaDoencaResp) ||
																										(perguntas.algumaDoenca ===
																											'Não' &&
																											!perguntas.algumaDoencaResp)
																									) {
																										if (
																											(perguntas.implDentario ===
																												'Sim' &&
																												perguntas.implDentarioResp) ||
																											(perguntas.implDentario ===
																												'Não' &&
																												!perguntas.implDentarioResp)
																										) {
																											if (
																												(perguntas.tratDermatEstetico ===
																													'Sim' &&
																													perguntas.tratDermatEsteticoResp) ||
																												(perguntas.tratDermatEstetico ===
																													'Não' &&
																													!perguntas.tratDermatEsteticoResp)
																											) {
																												if (
																													(perguntas.cirurPlastEstetica ===
																														'Sim' &&
																														perguntas.cirurPlastEsteticaResp) ||
																													(perguntas.cirurPlastEstetica ===
																														'Não' &&
																														!perguntas.cirurPlastEsteticaResp)
																												) {
																													if (
																														(perguntas.cirurgReparadora ==
																															'Sim' &&
																															perguntas.cirurgReparadoraResp) ||
																														(perguntas.cirurgReparadora ===
																															'Não' &&
																															!perguntas.cirurgReparadoraResp)
																													) {
																														setShowPDF(
																															true,
																														);
																														// Salvar os valores no localStorage
																														/*cirurgReparadora: '',
		cirurgReparadoraResp: '',*/

																														const dataFormatadaConsulta =
																															formatarDataParaSalvar(
																																perguntas.dataConsulta,
																															);

																														const dataFormatadaNascimento =
																															formatarDataParaSalvar(
																																perguntas.nascimento,
																															);

																														const dataFormatadaMenstruação =
																															formatarDataParaSalvar(
																																perguntas.ultimaMenstruacao,
																															);

																														localStorage.setItem(
																															'anamneseFormDataFacial',
																															JSON.stringify(
																																{
																																	...perguntas,
																																	dataConsulta:
																																		dataFormatadaConsulta,
																																	nascimento:
																																		dataFormatadaNascimento,
																																	ultimaMenstruacao:
																																		dataFormatadaMenstruação,
																																},
																															),
																														);
																														window.alert(
																															'A data escolhida para a consulta será confirmada posteriormente através dos meios de comunicação fornecidos!!',
																														);
																														window.alert(
																															'Dados do formulário salvos com sucesso!!',
																														);
																														// setAcertoModalOpen(true);

																														// Redefinir o estado para o estado inicial vazio
																														setPerguntas(
																															initialState,
																														);
																													} else {
																														// Exibir modal de erro
																														setErrorModalOpen(
																															true,
																														);
																													}
																												} else {
																													// Exibir modal de erro
																													setErrorModalOpen(
																														true,
																													);
																												}
																											} else {
																												// Exibir modal de erro
																												setErrorModalOpen(
																													true,
																												);
																											}
																										} else {
																											// Exibir modal de erro
																											setErrorModalOpen(
																												true,
																											);
																										}
																									} else {
																										// Exibir modal de erro
																										setErrorModalOpen(
																											true,
																										);
																									}
																								} else {
																									// Exibir modal de erro
																									setErrorModalOpen(
																										true,
																									);
																								}
																							} else {
																								// Exibir modal de erro
																								setErrorModalOpen(
																									true,
																								);
																							}
																						} else {
																							// Exibir modal de erro
																							setErrorModalOpen(
																								true,
																							);
																						}
																					} else {
																						// Exibir modal de erro
																						setErrorModalOpen(
																							true,
																						);
																					}
																				} else {
																					// Exibir modal de erro
																					setErrorModalOpen(
																						true,
																					);
																				}
																			} else {
																				// Exibir modal de erro
																				setErrorModalOpen(
																					true,
																				);
																			}
																		} else {
																			// Exibir modal de erro
																			setErrorModalOpen(
																				true,
																			);
																		}
																	} else {
																		// Exibir modal de erro
																		setErrorModalOpen(
																			true,
																		);
																	}
																} else {
																	// Exibir modal de erro
																	setErrorModalOpen(
																		true,
																	);
																}
															} else {
																// Exibir modal de erro
																setErrorModalOpen(
																	true,
																);
															}
														} else {
															// Exibir modal de erro
															setErrorModalOpen(
																true,
															);
														}
													} else {
														// Exibir modal de erro
														setErrorModalOpen(true);
													}
												} else {
													// Exibir modal de erro
													setErrorModalOpen(true);
												}
											} else {
												// Exibir modal de erro
												setErrorModalOpen(true);
											}
										} else {
											// Exibir modal de erro
											setErrorModalOpen(true);
										}
									} else {
										// Exibir modal de erro
										setErrorModalOpen(true);
									}
								} else {
									// Exibir modal de erro
									setErrorModalOpen(true);
								}
							} else {
								// Exibir modal de erro
								setErrorModalOpen(true);
							}
						} else {
							// Exibir modal de erro
							setErrorModalOpen(true);
						}
					} else {
						// Exibir modal de erro
						setErrorModalOpen(true);
					}
				} else {
					// Exibir modal de erro
					setErrorModalOpen(true);
				}
			} else {
				if (
					(perguntas.estéticoAnterior === 'Sim' &&
						perguntas.estéticoAnteriorResp) ||
					(perguntas.estéticoAnterior === 'Não' &&
						!perguntas.estéticoAnteriorResp)
				) {
					if (
						(perguntas.utilizCosmeticos === 'Sim' &&
							perguntas.utilizCosmeticosResp) ||
						(perguntas.utilizCosmeticos === 'Não' &&
							!perguntas.utilizCosmeticosResp)
					) {
						if (
							(perguntas.filtroSolar === 'Sim' &&
								perguntas.filtroSolarResp) ||
							(perguntas.filtroSolar === 'Não' &&
								!perguntas.filtroSolarResp)
						) {
							if (
								(perguntas.tabagismo === 'Sim' &&
									perguntas.tabagismoResp) ||
								(perguntas.tabagismo === 'Não' &&
									!perguntas.tabagismoResp)
							) {
								if (
									(perguntas.ingereAlcool === 'Sim' &&
										perguntas.ingereAlcoolResp) ||
									(perguntas.ingereAlcool === 'Não' &&
										!perguntas.ingereAlcoolResp)
								) {
									if (
										perguntas.qualidadeSono === 'Boa' ||
										perguntas.qualidadeSono === 'Regular' ||
										(perguntas.qualidadeSono ===
											'Pessima' &&
											perguntas.qualidadeSonoResp)
									) {
										if (
											(perguntas.ativFisica === 'Sim' &&
												perguntas.ativFisicaResp) ||
											(perguntas.ativFisica === 'Não' &&
												!perguntas.ativFisicaResp)
										) {
											if (
												(perguntas.usoAnticoncepcional ===
													'Sim' &&
													perguntas.usoAnticoncepcionalResp) ||
												(perguntas.usoAnticoncepcional ===
													'Não' &&
													!perguntas.usoAnticoncepcionalResp)
											) {
												if (
													(perguntas.tratMedico ===
														'Sim' &&
														perguntas.medicemUso) ||
													(perguntas.tratMedico ===
														'Não' &&
														!perguntas.medicemUso)
												) {
													if (
														(perguntas.antAlergicos ===
															'Sim' &&
															perguntas.antAlergicosResp) ||
														(perguntas.antAlergicos ===
															'Não' &&
															!perguntas.antAlergicosResp)
													) {
														if (
															(perguntas.alteracoesCardiacas ===
																'Sim' &&
																perguntas.alteracoesCardiacasResp) ||
															(perguntas.alteracoesCardiacas ===
																'Não' &&
																!perguntas.alteracoesCardiacasResp)
														) {
															if (
																(perguntas.distRenal ===
																	'Sim' &&
																	perguntas.distRenalResp) ||
																(perguntas.distRenal ===
																	'Não' &&
																	!perguntas.distRenalResp)
															) {
																if (
																	(perguntas.distHormonal ===
																		'Sim' &&
																		perguntas.distHormonalResp) ||
																	(perguntas.distHormonal ===
																		'Não' &&
																		!perguntas.distHormonalResp)
																) {
																	if (
																		(perguntas.distGastroIntest ===
																			'Sim' &&
																			perguntas.distGastroIntestResp) ||
																		(perguntas.distGastroIntest ===
																			'Não' &&
																			!perguntas.distGastroIntestResp)
																	) {
																		if (
																			(perguntas.eplepsiaConvulsoes ===
																				'Sim' &&
																				perguntas.eplepsiaConvulsoesResp) ||
																			(perguntas.eplepsiaConvulsoes ===
																				'Não' &&
																				!perguntas.eplepsiaConvulsoesResp)
																		) {
																			if (
																				(perguntas.altPsicPsiquiatr ===
																					'Sim' &&
																					perguntas.altPsicPsiquiatrResp) ||
																				(perguntas.altPsicPsiquiatr ===
																					'Não' &&
																					!perguntas.altPsicPsiquiatrResp)
																			) {
																				if (
																					(perguntas.estresse ===
																						'Sim' &&
																						perguntas.estresseResp) ||
																					(perguntas.estresse ===
																						'Não' &&
																						!perguntas.estresseResp)
																				) {
																					if (
																						(perguntas.antecOncologicos ===
																							'Sim' &&
																							perguntas.antecOncologicosResp) ||
																						(perguntas.antecOncologicos ===
																							'Não' &&
																							!perguntas.antecOncologicosResp)
																					) {
																						if (
																							(perguntas.diabetes ===
																								'Sim' &&
																								perguntas.diabetesResp) ||
																							(perguntas.diabetes ===
																								'Não' &&
																								!perguntas.diabetesResp)
																						) {
																							if (
																								(perguntas.algumaDoenca ===
																									'Sim' &&
																									perguntas.algumaDoencaResp) ||
																								(perguntas.algumaDoenca ===
																									'Não' &&
																									!perguntas.algumaDoencaResp)
																							) {
																								if (
																									(perguntas.implDentario ===
																										'Sim' &&
																										perguntas.implDentarioResp) ||
																									(perguntas.implDentario ===
																										'Não' &&
																										!perguntas.implDentarioResp)
																								) {
																									if (
																										(perguntas.tratDermatEstetico ===
																											'Sim' &&
																											perguntas.tratDermatEsteticoResp) ||
																										(perguntas.tratDermatEstetico ===
																											'Não' &&
																											!perguntas.tratDermatEsteticoResp)
																									) {
																										if (
																											(perguntas.cirurPlastEstetica ===
																												'Sim' &&
																												perguntas.cirurPlastEsteticaResp) ||
																											(perguntas.cirurPlastEstetica ===
																												'Não' &&
																												!perguntas.cirurPlastEsteticaResp)
																										) {
																											if (
																												(perguntas.cirurgReparadora ==
																													'Sim' &&
																													perguntas.cirurgReparadoraResp) ||
																												(perguntas.cirurgReparadora ===
																													'Não' &&
																													!perguntas.cirurgReparadoraResp)
																											) {
																												setShowPDF(
																													true,
																												);
																												// Salvar os valores no localStorage
																												/*cirurgReparadora: '',
		cirurgReparadoraResp: '',*/

																												const dataFormatadaConsulta =
																													formatarDataParaSalvar(
																														perguntas.dataConsulta,
																													);

																												const dataFormatadaNascimento =
																													formatarDataParaSalvar(
																														perguntas.nascimento,
																													);

																												const dataFormatadaMenstruação =
																													formatarDataParaSalvar(
																														perguntas.ultimaMenstruacao,
																													);

																												localStorage.setItem(
																													'anamneseFormDataFacial',
																													JSON.stringify(
																														{
																															...perguntas,
																															dataConsulta:
																																dataFormatadaConsulta,
																															nascimento:
																																dataFormatadaNascimento,
																															ultimaMenstruacao:
																																dataFormatadaMenstruação,
																														},
																													),
																												);
																												window.alert(
																													'A data escolhida para a consulta será confirmada posteriormente através dos meios de comunicação fornecidos!!',
																												);
																												window.alert(
																													'Dados do formulário salvos com sucesso!!',
																												);
																												// setAcertoModalOpen(true);

																												// Redefinir o estado para o estado inicial vazio
																												setPerguntas(
																													initialState,
																												);
																											} else {
																												// Exibir modal de erro
																												setErrorModalOpen(
																													true,
																												);
																											}
																										} else {
																											// Exibir modal de erro
																											setErrorModalOpen(
																												true,
																											);
																										}
																									} else {
																										// Exibir modal de erro
																										setErrorModalOpen(
																											true,
																										);
																									}
																								} else {
																									// Exibir modal de erro
																									setErrorModalOpen(
																										true,
																									);
																								}
																							} else {
																								// Exibir modal de erro
																								setErrorModalOpen(
																									true,
																								);
																							}
																						} else {
																							// Exibir modal de erro
																							setErrorModalOpen(
																								true,
																							);
																						}
																					} else {
																						// Exibir modal de erro
																						setErrorModalOpen(
																							true,
																						);
																					}
																				} else {
																					// Exibir modal de erro
																					setErrorModalOpen(
																						true,
																					);
																				}
																			} else {
																				// Exibir modal de erro
																				setErrorModalOpen(
																					true,
																				);
																			}
																		} else {
																			// Exibir modal de erro
																			setErrorModalOpen(
																				true,
																			);
																		}
																	} else {
																		// Exibir modal de erro
																		setErrorModalOpen(
																			true,
																		);
																	}
																} else {
																	// Exibir modal de erro
																	setErrorModalOpen(
																		true,
																	);
																}
															} else {
																// Exibir modal de erro
																setErrorModalOpen(
																	true,
																);
															}
														} else {
															// Exibir modal de erro
															setErrorModalOpen(
																true,
															);
														}
													} else {
														// Exibir modal de erro
														setErrorModalOpen(true);
													}
												} else {
													// Exibir modal de erro
													setErrorModalOpen(true);
												}
											} else {
												// Exibir modal de erro
												setErrorModalOpen(true);
											}
										} else {
											// Exibir modal de erro
											setErrorModalOpen(true);
										}
									} else {
										// Exibir modal de erro
										setErrorModalOpen(true);
									}
								} else {
									// Exibir modal de erro
									setErrorModalOpen(true);
								}
							} else {
								// Exibir modal de erro
								setErrorModalOpen(true);
							}
						} else {
							// Exibir modal de erro
							setErrorModalOpen(true);
						}
					} else {
						// Exibir modal de erro
						setErrorModalOpen(true);
					}
				} else {
					// Exibir modal de erro
					setErrorModalOpen(true);
				}
			}
		} else {
			// Exibir modal de erro
			setErrorModalOpen(true);
		}
		// const dataFormatadaConsulta = formatarDataParaSalvar(
		// 	perguntas.dataConsulta,
		// );

		// const dataFormatadaNascimento = formatarDataParaSalvar(
		// 	perguntas.nascimento,
		// );

		// const dataFormatadaMenstruação = formatarDataParaSalvar(
		// 	perguntas.ultimaMenstruacao,
		// );
		// setShowPDF(true);
		// localStorage.setItem(
		// 	'anamneseFormDataFacial',
		// 	JSON.stringify({
		// 		...perguntas,
		// 		dataConsulta: dataFormatadaConsulta,
		// 		nascimento: dataFormatadaNascimento,
		// 		ultimaMenstruacao: dataFormatadaMenstruação,
		// 	}),
		// );
		// console.log('Dados do formulário salvos no localStorage:', perguntas);
		// // setAcertoModalOpen(true);
		// //Redefinir o estado para o estado inicial vazio
		// setPerguntas(initialState);
	};

	//  const [perguntas, setPerguntas] = useState({
	// 		// ... (outros campos)
	// 		diarreiaConstipacao: '', // Novo estado para rastrear a escolha do usuário
	// 	});

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
								Formulário de Anamnese Facial
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
									<FormControlcontaener
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											columnGap: '5px',
										}}
									>
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
											label="Idade:"
											variant="outlined"
											type="number"
											style={{ fontFamily: 'gothamPro' }}
											fullWidth
											margin="normal"
											value={perguntas.idade}
											onChange={handleIdadeChange}
										/>
										{/* <TextField
											required
											label="sexo:"
											variant="outlined"
											type="text"
											style={{ fontFamily: 'gothamPro' }}
											fullWidth
											margin="normal"
											value={perguntas.sexo}
											onChange={(e) =>
												handleInputChange(
													'sexo',
													e.target.value,
												)
											}
										/> */}
										<ContainerRastr
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginTop: 5,
												// width: '100%',
											}}
										>
											<ParagrafoConteinar
												style={{
													color: '#7B193F',
													fontFamily: 'gothamPro',
													margin: '5px 0',
													fontSize: '12px',
													width: '10vw',
													content: '',
												}}
											>
												Sexo
											</ParagrafoConteinar>
											<div
												style={{
													display: 'flex',
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
																perguntas.sexo ===
																'Masculino'
															}
															onChange={(e) =>
																handleInputChange(
																	'sexo',
																	'Masculino',
																)
															}
														/>
													}
													label={
														<span
															style={{
																fontSize:
																	'12px',
																color: '#7B193F',
																fontFamily:
																	'gothamPro',
															}}
														>
															Masculino
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
																perguntas.sexo ===
																'Feminino'
															}
															onChange={(e) =>
																handleInputChange(
																	'sexo',
																	'Feminino',
																)
															}
														/>
													}
													label={
														<span
															style={{
																fontSize:
																	'12px',
																color: '#7B193F',
																fontFamily:
																	'gothamPro',
															}}
														>
															Feminino
														</span>
													}
												/>
											</div>
										</ContainerRastr>
									</FormControlcontaener>

									<FormControlcontaener
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											columnGap: '5px',
										}}
									>
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
										<TextField
											required
											label="Endereço"
											variant="outlined"
											type="text"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.endereco}
											onChange={(e) =>
												handleInputChange(
													'endereco',
													e.target.value,
												)
											}
										/>
									</FormControlcontaener>
									<FormControlcontaener
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											columnGap: '5px',
										}}
									>
										<TextField
											required
											label="Bairro"
											variant="outlined"
											type="text"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.bairro}
											onChange={(e) =>
												handleInputChange(
													'bairro',
													e.target.value,
												)
											}
										/>
										<TextField
											required
											label="Cidade"
											variant="outlined"
											type="text"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.cidade}
											onChange={(e) =>
												handleInputChange(
													'cidade',
													e.target.value,
												)
											}
										/>
										<TextField
											required
											label="cep"
											variant="outlined"
											type="number"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.cep}
											onChange={handleCEPChange}
										/>
									</FormControlcontaener>
									<FormControlcontaener
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											columnGap: '5px',
										}}
									>
										<TextField
											required
											label="Tel. Res."
											variant="outlined"
											type="tel"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.foneRes}
											onChange={handleFoneResChange}
										/>
										<TextField
											required
											label="Tel. Cel."
											variant="outlined"
											type="tel"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.foneCel}
											onChange={handleFoneCelChange}
										/>
									</FormControlcontaener>
									<FormControlcontaener
										fullWidth
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											columnGap: '5px',
										}}
									>
										<FormControlcontaener
											fullWidth
											sx={{
												display: 'flex',

												flexDirection: 'column',
											}}
										>
											{
												<span
													style={{
														fontSize: '10px',
														color: '#7B193F',
														fontFamily: 'gothamPro',
													}}
												>
													Nascimento
												</span>
											}
											<TextField
												required
												label=""
												variant="outlined"
												type="date"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												/*value={
													perguntas.estéticoAnterior ===
													'Sim'
														? perguntas.estéticoAnteriorResp
														: ''
												}*/
												value={
													perguntas.nascimento !==
														null &&
													perguntas.nascimento !==
														undefined &&
													perguntas.nascimento !== ''
														? perguntas.nascimento
														: ''
												}
												onChange={(e) =>
													handleInputChange(
														'nascimento',
														e.target.value,
													)
												}
											/>
										</FormControlcontaener>
										<TextField
											required
											label="CPF"
											variant="outlined"
											type="number"
											fullWidth
											style={{
												fontFamily: 'gothamPro',
											}}
											margin="normal"
											value={perguntas.cpf}
											onChange={handleCPFChange}
										/>
									</FormControlcontaener>

									<FormControlcontaener
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											columnGap: '5px',
										}}
									>
										<TextField
											required
											label="Estado Civil"
											variant="outlined"
											type="text"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.estadoCivil}
											onChange={(e) =>
												handleInputChange(
													'estadoCivil',
													e.target.value,
												)
											}
										/>
										<TextField
											required
											label="Profissão"
											variant="outlined"
											type="text"
											fullWidth
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.profissao}
											onChange={(e) =>
												handleInputChange(
													'profissao',
													e.target.value,
												)
											}
										/>
									</FormControlcontaener>
									<FormControlcontaener
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											columnGap: '5px',
										}}
									>
										<TextField
											required
											label="Motivo da visita"
											variant="outlined"
											fullWidth
											type="text"
											style={{ fontFamily: 'gothamPro' }}
											margin="normal"
											value={perguntas.motivoVisita}
											onChange={(e) =>
												handleInputChange(
													'motivoVisita',
													e.target.value,
												)
											}
										/>
									</FormControlcontaener>
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
								HÁBITOS DIÁRIOS
							</ParagrafoConteinar>
							<RastrMetab
							// style={{
							// 	display: 'flex',
							// 	justifyContent: 'space-around',
							// 	flexDirection: 'row',
							// 	marginTop: 10,
							// }}
							>
								<Paper
									elevation={3}
									style={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										padding: 16,
										width: '80vw',
										// margin: '10px 20px',
										color: '#7B193F',
									}}
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
										HISTÓRICO PESSOAL
									</InputLabel>

									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
											// width: '100%',
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
												width: '30vw',
												content: '',
											}}
										>
											Usa lentes de contato?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.lentesDeContato ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'lentesDeContato',
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
															perguntas.lentesDeContato ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'lentesDeContato',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled
												label="*"
												variant="outlined"
												type="text"
												style={{
													fontFamily: 'gothamPro',
													// width: '40vw',
												}}
												margin="normal"
												value=""
												// onChange={(e) =>
												// 	handleInputChange(
												// 		'profissao',
												// 		e.target.value,
												// 	)
												// }
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Tratamento estético anterior?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.estéticoAnterior ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'estéticoAnterior',
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
															perguntas.estéticoAnterior ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'estéticoAnterior',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.estéticoAnterior ===
													'Não'
												}
												required={
													perguntas.estéticoAnterior ===
													'Sim'
												}
												label="Quais?"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="text"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.estéticoAnterior ===
													'Sim'
														? perguntas.estéticoAnteriorResp
														: ''
												}
												onChange={(e) =>
													perguntas.estéticoAnterior ===
													'Sim'
														? handleInputChange(
																'estéticoAnteriorResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Utilização de cosméticos
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.utilizCosmeticos ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'utilizCosmeticos',
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
															perguntas.utilizCosmeticos ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'utilizCosmeticos',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.utilizCosmeticos ===
													'Não'
												}
												required={
													perguntas.utilizCosmeticos ===
													'Sim'
												}
												label="Quais"
												variant="outlined"
												// multiline
												// rows={2}
												type="text"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.utilizCosmeticos ===
													'Sim'
														? perguntas.utilizCosmeticosResp
														: ''
												}
												onChange={(e) =>
													perguntas.utilizCosmeticos ===
													'Sim'
														? handleInputChange(
																'utilizCosmeticosResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Exposição ao sol
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.exposicaoAoSol ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'exposicaoAoSol',
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
															perguntas.exposicaoAoSol ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'exposicaoAoSol',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled
												required
												label="*"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value=""
												// onChange={(e) =>
												// 	handleInputChange(
												// 		'exposicaoAoSolResp',
												// 		e.target.value,
												// 	)
												// }
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Filtro solar
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.filtroSolar ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'filtroSolar',
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
															perguntas.filtroSolar ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'filtroSolar',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.filtroSolar ===
													'Não'
												}
												required={
													perguntas.filtroSolar ===
													'Sim'
												}
												label="Frequência"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.filtroSolar ===
													'Sim'
														? perguntas.filtroSolarResp
														: ''
												}
												onChange={(e) =>
													perguntas.filtroSolar ===
													'Sim'
														? handleInputChange(
																'filtroSolarResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Tabagismo
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.tabagismo ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'tabagismo',
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
															perguntas.tabagismo ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'tabagismo',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.tabagismo ===
													'Não'
												}
												required={
													perguntas.tabagismo ===
													'Sim'
												}
												label="Quantidade de cigarros/dia"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="number"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.tabagismo ===
													'Sim'
														? perguntas.tabagismoResp
														: ''
												}
												onChange={(e) =>
													perguntas.tabagismo ===
													'Sim'
														? handleInputChange(
																'tabagismoResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Ingere bebida alcoólica
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.ingereAlcool ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'ingereAlcool',
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
															perguntas.ingereAlcool ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'ingereAlcool',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.ingereAlcool ===
													'Não'
												}
												required={
													perguntas.ingereAlcool ===
													'Sim'
												}
												label="Frequência"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="number"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.ingereAlcool ===
													'Sim'
														? perguntas.ingereAlcoolResp
														: ''
												}
												onChange={(e) =>
													perguntas.ingereAlcool ===
													'Sim'
														? handleInputChange(
																'ingereAlcoolResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Funcionamento intestinal
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.funcintestinalSemana ===
															'1-2 vezes/semana'
														}
														onChange={(e) =>
															handleInputChange(
																'funcintestinalSemana',
																'1-2 vezes/semana',
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
														1-2 vezes/semana
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
															perguntas.funcintestinalSemana ===
															'3-4 vezes/semana'
														}
														onChange={(e) =>
															handleInputChange(
																'funcintestinalSemana',
																'3-4 vezes/semana',
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
														3-4 vezes/semana
													</span>
												}
											/>
										</div>
										<div
											style={{
												display: 'flex',
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
															perguntas.funcintestinalDia ===
															'1-2 vezes/dia'
														}
														onChange={(e) =>
															handleInputChange(
																'funcintestinalDia',
																'1-2 vezes/dia',
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
														1-2 vezes/dia
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
															perguntas.funcintestinalDia ===
															'mais de 3 vezes/dia'
														}
														onChange={(e) =>
															handleInputChange(
																'funcintestinalDia',
																'mais de 3 vezes/dia',
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
														mais de 3 vezes/dia
													</span>
												}
											/>
										</div>
										{/* <FormControlcontaener fullWidth>
											<TextField
												required
												label="Frequência"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.ingereAlcoolResp
												}
												onChange={(e) =>
													handleInputChange(
														'exposicaoAoSolResp',
														e.target.value,
													)
												}
											/>
										</FormControlcontaener> */}
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Qualidade do sono
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.qualidadeSono ===
															'Boa'
														}
														onChange={(e) =>
															handleInputChange(
																'qualidadeSono',
																'Boa',
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
														Boa
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
															perguntas.qualidadeSono ===
															'Regular'
														}
														onChange={(e) =>
															handleInputChange(
																'qualidadeSono',
																'Regular',
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
														Regular
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
															perguntas.qualidadeSono ===
															'Pessima'
														}
														onChange={(e) =>
															handleInputChange(
																'qualidadeSono',
																'Pessima',
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
														Péssima
													</span>
												}
											/>
										</div>
										<FormControlcontaener fullWidth>
											<TextField
												required
												label="Quantas horas/noite"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="number"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.qualidadeSonoResp
												}
												onChange={(e) =>
													handleInputChange(
														'qualidadeSonoResp',
														e.target.value,
													)
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Alimentação
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.alimentacao ===
															'Boa'
														}
														onChange={(e) =>
															handleInputChange(
																'alimentacao',
																'Boa',
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
														Boa
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
															perguntas.alimentacao ===
															'Regular'
														}
														onChange={(e) =>
															handleInputChange(
																'alimentacao',
																'Regular',
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
														Regular
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
															perguntas.alimentacao ===
															'Pessima'
														}
														onChange={(e) =>
															handleInputChange(
																'alimentacao',
																'Pessima',
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
														Péssima
													</span>
												}
											/>
										</div>
										<FormControlcontaener fullWidth>
											<TextField
												disabled
												required
												label="*"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value=""
												// onChange={(e) =>
												// 	handleInputChange(
												// 		'alimentacaoResp',
												// 		e.target.value,
												// 	)
												// }
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Pratica atividade fisica?
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.ativFisica ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'ativFisica',
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
															perguntas.ativFisica ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'ativFisica',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.ativFisica ===
													'Não'
												}
												required={
													perguntas.ativFisica ===
													'Sim'
												}
												label="Que tipo"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="text"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.ativFisica ===
													'Sim'
														? perguntas.ativFisicaResp
														: ''
												}
												onChange={(e) =>
													perguntas.ativFisica ===
													'Sim'
														? handleInputChange(
																'ativFisicaResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Uso de anticoncepcional
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.usoAnticoncepcional ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'usoAnticoncepcional',
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
															perguntas.usoAnticoncepcional ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'usoAnticoncepcional',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.usoAnticoncepcional ===
													'Não'
												}
												required={
													perguntas.usoAnticoncepcional ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="text"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.usoAnticoncepcional ===
													'Sim'
														? perguntas.usoAnticoncepcionalResp
														: ''
												}
												onChange={(e) =>
													perguntas.usoAnticoncepcional ===
													'Sim'
														? handleInputChange(
																'usoAnticoncepcionalResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Gestante
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												disabled={
													perguntas.sexo ===
													'Masculino'
												}
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gestante ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'gestante',
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
												disabled={
													perguntas.sexo ===
													'Masculino'
												}
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gestante ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'gestante',
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
										<FormControlcontaener fullWidth>
											{
												<span
													style={{
														fontSize: '12px',
														color: '#7B193F',
														fontFamily: 'gothamPro',
													}}
												>
													Data da ultima Menstruação
												</span>
											}
											<TextField
												disabled={
													perguntas.sexo ===
													'Masculino'
												}
												required={
													perguntas.sexo !==
													'Masculino'
												}
												label=""
												variant="outlined"
												// multiline
												// rows={2}
												type="date"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.sexo ===
													'Feminino'
														? perguntas.ultimaMenstruacao
														: '00'
												}
												onChange={(e) =>
													perguntas.sexo ===
													'Feminino'
														? handleInputChange(
																'ultimaMenstruacao',
																e.target.value,
														  )
														: '00'
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Gestações
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
												// marginTop: 5,
											}}
										>
											<FormControlLabel
												disabled={
													perguntas.sexo ===
													'Masculino'
												}
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gestacoes ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'gestacoes',
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
												disabled={
													perguntas.sexo ===
													'Masculino'
												}
												control={
													<Radio
														sx={{
															'& .MuiSvgIcon-root':
																{
																	fontSize: 15,
																},
														}}
														checked={
															perguntas.gestacoes ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'gestacoes',
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
										<FormControlcontaener
											style={{
												display: 'flex',
												width: '40vw',
												marginRight: '2px',
											}}
										>
											<FormControlcontaener fullWidth>
												{
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														Quantas
													</span>
												}

												<TextField
													// disabled={
													// 	perguntas.sexo ===
													// 	'Masculino'
													// }
													disabled={
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Não'
													}
													required={
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Sim'
													}
													label=""
													variant="outlined"
													// multiline
													// rows={2}
													type="number"
													fullWidth
													style={{
														fontFamily: 'gothamPro',
														width: 'auto',
													}}
													margin="normal"
													value={
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Sim'
															? perguntas.qtsGestacoes
															: ''
													}
													onChange={(e) =>
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Sim'
															? handleInputChange(
																	'qtsGestacoes',
																	e.target
																		.value,
															  )
															: null
													}
												/>
											</FormControlcontaener>
										</FormControlcontaener>
										<FormControlcontaener
											style={{
												display: 'flex',
												width: '40vw',
												marginRight: '2px',
											}}
										>
											<FormControlcontaener fullWidth>
												{
													<span
														style={{
															fontSize: '12px',
															color: '#7B193F',
															fontFamily:
																'gothamPro',
														}}
													>
														A quanto tempo
													</span>
												}

												<TextField
													disabled={
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Não'
													}
													required={
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Sim'
													}
													label="*"
													variant="outlined"
													// multiline
													// rows={2}
													type="number"
													fullWidth
													style={{
														fontFamily: 'gothamPro',
													}}
													margin="normal"
													value={
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Sim'
															? perguntas.tmpUltimaGestacao
															: ''
													}
													onChange={(e) =>
														perguntas.sexo ===
															'Masculino' ||
														perguntas.gestacoes ===
															'Sim'
															? handleInputChange(
																	'tmpUltimaGestacao',
																	e.target
																		.value,
															  )
															: null
													}
												/>
											</FormControlcontaener>
										</FormControlcontaener>
									</ContainerRastr>
								</Paper>
							</RastrMetab>

							<RastrMetab
							// style={{
							// 	display: 'flex',
							// 	justifyContent: 'space-around',
							// 	flexDirection: 'row',
							// 	marginTop: 10,
							// }}
							>
								<Paper
									elevation={3}
									style={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										padding: 16,
										width: '80vw',
										// margin: '10px 20px',
										color: '#7B193F',
									}}
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
										HISTÓRICO CLÍNICO
									</InputLabel>

									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
											// width: '100%',
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
												width: '30vw',
												content: '',
											}}
										>
											Tratamento médico atual
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.tratMedico ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'tratMedico',
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
															perguntas.tratMedico ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'tratMedico',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.tratMedico ===
													'Não'
												}
												required={
													perguntas.tratMedico ===
													'Sim'
												}
												label="Medicamento em uso"
												variant="outlined"
												type="text"
												style={{
													fontFamily: 'gothamPro',
													// width: '40vw',
												}}
												margin="normal"
												value={
													perguntas.tratMedico ===
													'Sim'
														? perguntas.medicemUso
														: ''
												}
												onChange={(e) =>
													perguntas.tratMedico ===
													'Sim'
														? handleInputChange(
																'medicemUso',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Antecedentes alérgicos
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.antAlergicos ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'antAlergicos',
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
															perguntas.antAlergicos ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'antAlergicos',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.antAlergicos ===
													'Não'
												}
												required={
													perguntas.antAlergicos ===
													'Sim'
												}
												label="Quais?"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="text"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.antAlergicos ===
													'Sim'
														? perguntas.antAlergicosResp
														: ''
												}
												onChange={(e) =>
													perguntas.antAlergicos ===
													'Sim'
														? handleInputChange(
																'antAlergicosResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Portador de marca-passo
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.marcaPasso ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'marcaPasso',
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
															perguntas.marcaPasso ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'marcaPasso',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled
												required
												label="*"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value=""
												// onChange={(e) =>
												// 	handleInputChange(
												// 		'',
												// 		e.target.value,
												// 	)
												// }
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Alterações cardiacas
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.alteracoesCardiacas ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'alteracoesCardiacas',
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
															perguntas.alteracoesCardiacas ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'alteracoesCardiacas',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.alteracoesCardiacas ===
													'Não'
												}
												required={
													perguntas.alteracoesCardiacas ===
													'Sim'
												}
												label="Quais"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												type="text"
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.alteracoesCardiacas ===
													'Sim'
														? perguntas.alteracoesCardiacasResp
														: ''
												}
												onChange={(e) =>
													perguntas.alteracoesCardiacas ===
													'Sim'
														? handleInputChange(
																'alteracoesCardiacasResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Hipo/hipertensão arterial
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.hipoHipertensaoArterial ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'hipoHipertensaoArterial',
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
															perguntas.hipoHipertensaoArterial ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'hipoHipertensaoArterial',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled
												required
												label="*"
												variant="outlined"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value=""
												// onChange={(e) =>
												// 	handleInputChange(
												// 		'exposicaoAoSolResp',
												// 		e.target.value,
												// 	)
												// }
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Disturbio renal
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.distRenal ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'distRenal',
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
															perguntas.distRenal ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'distRenal',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.distRenal ===
													'Não'
												}
												required={
													perguntas.distRenal ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												// multiline
												// rows={2}
												type="text"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.distRenal ===
													'Sim'
														? perguntas.distRenalResp
														: ''
												}
												onChange={(e) =>
													perguntas.distRenal ===
													'Sim'
														? handleInputChange(
																'distRenalResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Distúrbio hormonal
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.distHormonal ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'distHormonal',
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
															perguntas.distHormonal ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'distHormonal',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.distHormonal ===
													'Não'
												}
												required={
													perguntas.distHormonal ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.distHormonal ===
													'Sim'
														? perguntas.distHormonalResp
														: ''
												}
												onChange={(e) =>
													perguntas.distHormonal ===
													'Sim'
														? handleInputChange(
																'distHormonalResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Distúrbio gastro-intestinal
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.distGastroIntest ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'distGastroIntest',
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
															perguntas.distGastroIntest ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'distGastroIntest',
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

										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.distGastroIntest ===
													'Não'
												}
												required={
													perguntas.distGastroIntest ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.distGastroIntest ===
													'Sim'
														? perguntas.distGastroIntestResp
														: ''
												}
												onChange={(e) =>
													perguntas.distGastroIntest ===
													'Sim'
														? handleInputChange(
																'distGastroIntestResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Epilepsia-convulsões
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.eplepsiaConvulsoes ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'eplepsiaConvulsoes',
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
															perguntas.eplepsiaConvulsoes ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'eplepsiaConvulsoes',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.eplepsiaConvulsoes ===
													'Não'
												}
												required={
													perguntas.eplepsiaConvulsoes ===
													'Sim'
												}
												label="Frequência"
												variant="outlined"
												// multiline
												// rows={2}
												type="text"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.eplepsiaConvulsoes ===
													'Sim'
														? perguntas.eplepsiaConvulsoesResp
														: ''
												}
												onChange={(e) =>
													perguntas.eplepsiaConvulsoes ===
													'Sim'
														? handleInputChange(
																'eplepsiaConvulsoesResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Alterações
											psicológicas/psiquiátricas
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.altPsicPsiquiatr ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'altPsicPsiquiatr',
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
															perguntas.altPsicPsiquiatr ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'altPsicPsiquiatr',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.altPsicPsiquiatr ===
													'Não'
												}
												required={
													perguntas.altPsicPsiquiatr ===
													'Sim'
												}
												label="Quais"
												variant="outlined"
												// multiline
												// rows={2}
												type="text"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.altPsicPsiquiatr ===
													'Sim'
														? perguntas.altPsicPsiquiatrResp
														: ''
												}
												onChange={(e) =>
													perguntas.altPsicPsiquiatr ===
													'Sim'
														? handleInputChange(
																'altPsicPsiquiatrResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Estresse
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.estresse ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'estresse',
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
															perguntas.estresse ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'estresse',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.estresse === 'Não'
												}
												required={
													perguntas.estresse === 'Sim'
												}
												label="Obs.:"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.estresse === 'Sim'
														? perguntas.estresseResp
														: ''
												}
												onChange={(e) =>
													perguntas.estresse === 'Sim'
														? handleInputChange(
																'estresseResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Antecedentes oncológicos
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.antecOncologicos ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'antecOncologicos',
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
															perguntas.antecOncologicos ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'antecOncologicos',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.antecOncologicos ===
													'Não'
												}
												required={
													perguntas.antecOncologicos ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												// multiline
												// rows={2}
												type="text"
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.antecOncologicos ===
													'Sim'
														? perguntas.antecOncologicosResp
														: ''
												}
												onChange={(e) =>
													perguntas.antecOncologicos ===
													'Sim'
														? handleInputChange(
																'antecOncologicosResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Diabetes
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.diabetes ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'diabetes',
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
															perguntas.diabetes ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'diabetes',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.diabetes === 'Não'
												}
												required={
													perguntas.diabetes === 'Sim'
												}
												label="Tipo"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.diabetes === 'Sim'
														? perguntas.diabetesResp
														: ''
												}
												onChange={(e) =>
													perguntas.diabetes === 'Sim'
														? handleInputChange(
																'diabetesResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Algum tipo de doença
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.algumaDoenca ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'algumaDoenca',
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
															perguntas.algumaDoenca ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'algumaDoenca',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.algumaDoenca ===
													'Não'
												}
												required={
													perguntas.algumaDoenca ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.algumaDoenca ===
													'Sim'
														? perguntas.algumaDoencaResp
														: ''
												}
												onChange={(e) =>
													perguntas.algumaDoenca ===
													'Sim'
														? handleInputChange(
																'algumaDoencaResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
								</Paper>
							</RastrMetab>
							<RastrMetab
							// style={{
							// 	display: 'flex',
							// 	justifyContent: 'space-around',
							// 	flexDirection: 'row',
							// 	marginTop: 10,
							// }}
							>
								<Paper
									elevation={3}
									style={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										padding: 16,
										width: '80vw',
										// margin: '10px 20px',
										color: '#7B193F',
									}}
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
										TRATAMENTO DA MEDICINA ESTÉTICA E
										CIRÚRGICA
									</InputLabel>

									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
											// width: '100%',
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												fontSize: '12px',
												width: '30vw',
												content: '',
											}}
										>
											Implante dentário
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.implDentario ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'implDentario',
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
															perguntas.implDentario ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'implDentario',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.implDentario ===
													'Não'
												}
												required={
													perguntas.implDentario ===
													'Sim'
												}
												label="qual"
												variant="outlined"
												type="text"
												style={{
													fontFamily: 'gothamPro',
													// width: '40vw',
												}}
												margin="normal"
												value={
													perguntas.implDentario ===
													'Sim'
														? perguntas.implDentarioResp
														: ''
												}
												onChange={(e) =>
													perguntas.implDentario ===
													'Sim'
														? handleInputChange(
																'implDentarioResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Tratamento dermatológico/Estético
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.tratDermatEstetico ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'tratDermatEstetico',
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
															perguntas.tratDermatEstetico ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'tratDermatEstetico',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.tratDermatEstetico ===
													'Não'
												}
												required={
													perguntas.tratDermatEstetico ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.tratDermatEstetico ===
													'Sim'
														? perguntas.tratDermatEsteticoResp
														: ''
												}
												onChange={(e) =>
													perguntas.tratDermatEstetico ===
													'Sim'
														? handleInputChange(
																'tratDermatEsteticoResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Cirurgia Plástica Estética
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.cirurPlastEstetica ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'cirurPlastEstetica',
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
															perguntas.cirurPlastEstetica ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'cirurPlastEstetica',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.cirurPlastEstetica ===
													'Não'
												}
												required={
													perguntas.cirurPlastEstetica ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.cirurPlastEstetica ===
													'Sim'
														? perguntas.cirurPlastEsteticaResp
														: ''
												}
												onChange={(e) =>
													perguntas.cirurPlastEstetica ===
													'Sim'
														? handleInputChange(
																'cirurPlastEsteticaResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 5,
										}}
									>
										<ParagrafoConteinar
											style={{
												color: '#7B193F',
												fontFamily: 'gothamPro',
												margin: '5px 0',
												width: '30vw',
												fontSize: '12px',
												content: '',
											}}
										>
											{/* Já teve lentesDeContato? */}
											Cirurgia Reparadora
										</ParagrafoConteinar>
										<div
											style={{
												display: 'flex',
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
															perguntas.cirurgReparadora ===
															'Sim'
														}
														onChange={(e) =>
															handleInputChange(
																'cirurgReparadora',
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
															perguntas.cirurgReparadora ===
															'Não'
														}
														onChange={(e) =>
															handleInputChange(
																'cirurgReparadora',
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
										<FormControlcontaener fullWidth>
											<TextField
												disabled={
													perguntas.cirurgReparadora ===
													'Não'
												}
												required={
													perguntas.cirurgReparadora ===
													'Sim'
												}
												label="Qual"
												variant="outlined"
												type="text"
												// multiline
												// rows={2}
												fullWidth
												style={{
													fontFamily: 'gothamPro',
												}}
												margin="normal"
												value={
													perguntas.cirurgReparadora ===
													'Sim'
														? perguntas.cirurgReparadoraResp
														: ''
												}
												onChange={(e) =>
													perguntas.cirurgReparadora ===
													'Sim'
														? handleInputChange(
																'cirurgReparadoraResp',
																e.target.value,
														  )
														: null
												}
											/>
										</FormControlcontaener>
									</ContainerRastr>
								</Paper>
								<Paper
									elevation={3}
									style={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										padding: 16,
										width: '80vw',
										// margin: '10px 20px',
										color: '#7B193F',
									}}
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
										Termo de Responsabilidade
									</InputLabel>

									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginTop: 5,
											// width: '100%',
											border: '2px solid #f7adaf',
										}}
									>
										<ParagrafoConteinar
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												color: '#7B193F',
												fontFamily: 'gothamPro',
												padding: 5,
												fontSize: '12px',
												width: '100vw',
												content: '',
											}}
										>
											Estou ciente que os tratamentos
											faciais requerem minha colaboração
											diariamente, utilizando os
											cosméticos adequados e protetor
											solar. Permito o tratamento de
											peeling químico, físico e mecânico,
											sabendo que existe um risco, mesmo
											que temporário, da minha pele ficar
											mais escura. Me proponho a usar o
											que for necessário para a pele ficar
											melhor.
										</ParagrafoConteinar>
									</ContainerRastr>
								</Paper>
								<Paper
									elevation={3}
									style={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										padding: 16,
										width: '80vw',
										// margin: '10px 20px',
										color: '#7B193F',
									}}
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
										Agendamento da consulta
									</InputLabel>

									<ContainerRastr
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginTop: 5,
											// width: '100%',
											border: '2px solid #f7adaf',
										}}
									>
										<ContainerRastr
											style={{
												display: 'flex',
												justifyContent: 'center',
												flexDirection: 'column',
												padding: 16,
												margin: 5,
												width: '50vw',
												border: '2px dotted #f7adaf',
												color: '#7B193F',
											}}
										>
											<InputLabel
												style={{
													display: 'flex',
													color: '#7B193F',
													fontFamily: 'gothamPro',
													fontSize: '12px',
													justifyContent: 'center',
													textAlign: 'center',
													width: '100%',
													content: 'none',
												}}
											>
												Data da consulta
											</InputLabel>
											<TextField
												required
												label=""
												type="date"
												variant="outlined"
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
										</ContainerRastr>
										<ContainerRastr
											style={{
												display: 'flex',
												justifyContent: 'center',
												flexDirection: 'column',
												padding: 16,
												margin: 5,
												width: '50vw',
												border: '2px dotted #f7adaf',
												color: '#7B193F',
											}}
										>
											<InputLabel
												style={{
													color: '#7B193F',
													fontFamily: 'gothamPro',
													fontSize: '12px',
													background: '#f7adaf',
													textAlign: 'center',
													width: '100%',
													content: 'none',
												}}
											>
												ATENÇÃO!!
											</InputLabel>
											<ParagrafoConteinar
												style={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													color: '#7B193F',
													fontFamily: 'gothamPro',
													padding: 5,
													fontSize: '12px',
													width: '100%',
													content: '',
												}}
											>
												Estou ciente que a data
												escolhida para a consulta será
												confirmada posteriormente pela
												clinica Adrimello através dos
												meus canais de comunicação
												informados neste questionário.
											</ParagrafoConteinar>
										</ContainerRastr>
									</ContainerRastr>
								</Paper>
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
												onClick={GerarPDF2}
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
												<AnamnesePDFFacial
													data={perguntas}
												/>
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

export default PgPdfFacial;
