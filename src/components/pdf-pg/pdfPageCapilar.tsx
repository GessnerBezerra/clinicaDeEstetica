import { PDFDocument, PageSizes, StandardFonts, rgb } from 'pdf-lib';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../public/assets/Logo.png';
import '../../style/styleFonte2.css';
import Buttom from '../button/button';
import Loading from '../loading/loading';

export interface AnamnesePDFProps {
	data: {
		nomeCompleto: string;
		email: string;
		cpf: string;
		dataConsulta: string;
		cuidadosComCabelo: string;
		frequenciaLavaCabelo: string;
		produtosQueUsa: string;
		problemasCpilar: string;
		problemasDermatologicos: string;
		historicoMedico: string;
		usandoMedicacao: string;
		alimentacaoDiaria: string;
		praticaExercicio: string;
		historicoFamiliar: string;
		exposicaoAoClima: string;
		expectativaaoTratamento: string;
		diarreiaConstipacao: string;
		dordistesaoabdominal: string;
		inchacoArticulares: string;
		fadigaFrequenteOuCronica: string;
		alergIntolSensibAlimentar: string;
		confMemRuimAltHumor: string;
		usoAntInlamComFreq: string;
		usaUsouMuitoAntib: string;
		consAlcFreqOuSenteMalAposCons: string;
		candidiaseDeRepet: string;
		abdomenDoloroso: string;
		gengivaSangFacil: string;
		alergiasIntolerAliment: string;
		diareiaConstirp: string;
		fezesFeticas: string;
		peleOleosaAcne: string;
		lingBrcHaltFetico: string;
		sedeExcesBocaSeca: string;
		ExecGasesPesoEstomago: string;
		maosEPesFrios: string;
		peleSecaCabeloSeco: string;
		ausenSuor: string;
		fadCansaco: string;
		baixaLibd: string;
		dificulPerdPeso: string;
		dificConcentr: string;
		quedaCapilar: string;
		menstIrreg: string;
		palpRstInchado: string;
		tontAoLevantar: string;
		presSangBaixa: string;
		difcDecisao: string;
		fadgCansaco: string;
		melhorAposComerDoce: string;
		doresArticul: string;
		difcDormir: string;
		fadiga: string;
		edemaInchaco: string;
		palpitacoes: string;
		ansiedadeDepres: string;
		gordAbd: string;
		sonoDurDia: string;
		acordNoiteCansado: string;
		perdEnergia: string;
		tristSemMotivo: string;
		irritado: string;
		panico: string;
		mudancaHumor: string;
		antconcep: string;
		hipersensPrdLimp: string;
		Infertilidade: string;
		menopausa: string;
		doencaAutoimune: string;
		mialgias: string;
		bocaAmarga: string;
		odoresFortesUrina: string;
		suorFetido: string;
		reacaoAMedicacao: string;
	};
}

const AnamnesePDF: React.FC<AnamnesePDFProps> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [perguntas, setPerguntas] = useState(data);
	const history = useNavigate();

	useEffect(() => {
		// Carregar os valores do localStorage quando o componente é montado
		const savedDataString = localStorage.getItem('anamneseFormData');
		if (savedDataString) {
			const savedData = JSON.parse(savedDataString);
			setPerguntas(savedData);
		}
	}, []);

	const generatePDF = async (fileName: string) => {
		try {
			setLoading(true);

			const pdfDoc = await PDFDocument.create();
			const page = pdfDoc.addPage(PageSizes.A4);
			const page2 = pdfDoc.addPage(PageSizes.A4);
			const page3 = pdfDoc.addPage(PageSizes.A4);
			const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
			const lineHeight = 20;
			const pageWidth = 500;
			const fontSize = 8;

			const form = pdfDoc.getForm();

			const addTable = async (
				title: string,
				data: { [key: string]: string },
				x: number,
				y: number,
				currentPage: any,
				tableWidth: number, // Largura padrão da tabela
			) => {
				// Adicionar título da tabela
				await currentPage.drawText(title, {
					x,
					y,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: fontSize,
					// Center: 0,
					TextRenderingMode: 2,
				});

				// Definir posições iniciais para os dados da tabela
				const leftColumnX = x;
				const rightColumnX = x + tableWidth;

				// Iterar sobre os dados e adicioná-los à tabela
				for (const [key, value] of Object.entries(data)) {
					await currentPage.drawText(
						`${key}:`,
						{
							x: leftColumnX,
							y: y - 20,
							font: await pdfDoc.embedFont(
								StandardFonts.Helvetica,
							),
							color: rgb(0.4824, 0.098, 0.2471),
							size: fontSize,
							textAlign: 'left',
							// Center: 0,
						},
						`${value}`,
						{
							color: rgb(0, 0, 0),
						},
					);

					await currentPage.drawText(value, {
						x: rightColumnX,
						y: y - 20,
						font: await pdfDoc.embedFont(StandardFonts.Helvetica),
						color: rgb(0, 0, 0),
						size: fontSize,
						// Center: 0,
					});

					// Ajustar posições para a próxima linha
					y -= 20;
				}
			};

			const addSecondTable = async (
				title: string,
				data: { [key: string]: string },
				x: number,
				y: number,
				currentPage: any,
				tableWidth: number,
			) => {
				const offset = 300; // Ajuste a largura da lacuna entre as tabelas conforme necessário
				const rightColumnX = x;

				await addTable(
					title,
					data,
					x + offset,
					y,
					currentPage,
					tableWidth,
				);
			};

			// Adicionar outras informações antes da tabela

			page2.drawRectangle({
				x: 10,
				y: page2.getHeight() - 500,
				width: pageWidth - 250,
				height: 15,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			// Adicionar tabela na segunda página
			await addTable(
				'         SINTOMAS DE HIPERPERMEABILIDADE INTESTINAL',
				{
					'Diarreia e/ou constipação?': `${perguntas.diarreiaConstipacao}`,
					'Dor ou distensão abdominal?': `${perguntas.dordistesaoabdominal}`,
					'Dor ou inchaço nas articulares': `${perguntas.inchacoArticulares}`,
					'Fadiga frequente ou crônica ?': `${perguntas.fadigaFrequenteOuCronica}`,
					'Alergias, intolerâncias e sensibilidades alimentares?': `${perguntas.alergIntolSensibAlimentar}`,
					'Confusão, memoria ruim, alterações de humor ?': `${perguntas.confMemRuimAltHumor}`,
					'Uso de anti-inflamatórios com frequência ?': `${perguntas.usoAntInlamComFreq}`,
					'Usa ou usou muito antibiótico (histórico) ?': `${perguntas.usaUsouMuitoAntib}`,
					'Consumo de álcool frequente, ou sente-se mal após consumo ?': `${perguntas.consAlcFreqOuSenteMalAposCons}`,
					// Adicionar outras colunas conforme necessário
				},
				10,
				page2.getHeight() - 495,
				page2,
				250,
			);

			page2.drawRectangle({
				x: 310,
				y: page2.getHeight() - 500,
				width: pageWidth - 250,
				height: 15,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			await addSecondTable(
				'          SINTOMAS TRATO GASTROINTESTINAL',
				{
					'Candidiase de repetição?': `${perguntas.candidiaseDeRepet}`,
					'Abdômen Doloroso, Inchado?': `${perguntas.abdomenDoloroso}`,
					'Gengiva Sangra facilmente?': `${perguntas.gengivaSangFacil}`,
					'Alergias – Intolerância a Alimentos?': `${perguntas.alergIntolSensibAlimentar}`,
					'Diarreia e/ou constipação?': `${perguntas.diareiaConstirp}`,
					'Fezes Fétidas?': `${perguntas.fezesFeticas}`,
					'Pele Oleosa, acne ?': `${perguntas.peleOleosaAcne}`,
					'Língua Branca? Hálito Fétido ?': `${perguntas.lingBrcHaltFetico}`,
					'Sede excessiva? Boca seca ?': `${perguntas.sedeExcesBocaSeca}`,
					'Exc de Gases Intestinais, estômago pesado ou azia ?': `${perguntas.ExecGasesPesoEstomago}`,
					// Adicionar outras colunas conforme necessário
				},
				10,
				page2.getHeight() - 495,
				page2,
				250,
			);

			// Adicionar outras informações após a tabela

			const addLine = async (text: string, x: number, y: number) => {
				const textWidth = font.widthOfTextAtSize(text, 12);
				if (x + textWidth > pageWidth) {
					yOffset -= lineHeight;
					x = 50;
				}
			};

			const dataEntries = Object.entries(perguntas);

			let yOffset = 900; // Altura inicial da página

			for (let i = 0; i < dataEntries.length; i++) {
				const [key, value] = dataEntries[i];
				const line = `${key}: ${value}`;
				addLine(line, 50, yOffset);

				if (i < dataEntries.length - 1) {
					yOffset -= lineHeight;
					if (yOffset < 50) {
						yOffset = 700;
					}
				}
			}

			// Adicionar cabeçalho com logo e informações
			const logoImage = await fetch(Logo).then((res) =>
				res.arrayBuffer(),
			);
			const pngImage = await pdfDoc.embedPng(logoImage);
			page.drawImage(pngImage, {
				x: 230,
				y: page.getHeight() - 90,
				width: 100,
				height: 100,
			});

			page.drawText(
				`Adrimelo - Beleza, Estética Facial Avançada e Tratamentos Capilares`,
				{
					x: 150,
					y: page.getHeight() - 90,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: fontSize + 2,
				},
			);

			const infoFontSize = 10;
			page.drawText('Endereço:', {
				x: 50,
				y: page.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText('R Ana Vilar, 348, Cruzeiro, campina Grande - PB', {
				x: 110,
				y: page.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText('Fone:', {
				x: 50,
				y: page.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText('(83)99383-7785', {
				x: 90,
				y: page.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText('E-mail:', {
				x: 50,
				y: page.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText('adrianamelonunes@gmail.com', {
				x: 90,
				y: page.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			// page.drawText(
			// 	'---------------------------------------------------------------------------------------------------------------------------------------------------------',
			// 	{
			// 		x: 50,
			// 		y: page.getHeight() - 175,
			// 		font: await pdfDoc.embedFont(StandardFonts.Helvetica),
			// 		color: rgb(0, 0, 0),
			// 		size: infoFontSize,
			// 	},
			// );

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 205,
				width: pageWidth,
				height: 30,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText('FICHA DE ANAMNESE', {
				x: 230,
				y: page.getHeight() - 195,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 240,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			//Dados Pessoais
			page.drawText('Dados Pessoais', {
				x: 230,
				y: page.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Nome Completo:`, {
				x: 50,
				y: page.getHeight() - 265,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.nomeCompleto.toLowerCase()}`, {
				x: 150,
				y: page.getHeight() - 265,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`E-mail:`, {
				x: 50,
				y: page.getHeight() - 285,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.email.toLowerCase()}`, {
				x: 110,
				y: page.getHeight() - 285,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`CPF:`, {
				x: 50,
				y: page.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			}); //dataConsulta
			page.drawText(`${perguntas.cpf}`, {
				x: 90,
				y: page.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			}); //dataConsulta

			page.drawText(`Data da consulta:`, {
				x: 230,
				y: page.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.dataConsulta}`, {
				x: 320,
				y: page.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 340,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText(`Histórico Capilar`, {
				x: 230,
				y: page.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			//Histórico Capilar
			page.drawText(`Qual é a sua rotina de cuidados com o cabelo?`, {
				x: 50,
				y: page.getHeight() - 355,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.cuidadosComCabelo.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 375,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Com que frequência você lava o cabelo?`, {
				x: 50,
				y: page.getHeight() - 395,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(`${perguntas.frequenciaLavaCabelo.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 415,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});
			//
			page.drawText(
				`Quais produtos capilares você costuma usar regularmente?`,
				{
					x: 50,
					y: page.getHeight() - 435,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page.drawText(`${perguntas.produtosQueUsa.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 455,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 480,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText(`Problemas Capilares`, {
				x: 230,
				y: page.getHeight() - 475,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			//Problemas Capilares
			page.drawText(
				`Você está tendo queda de cabelo, coceira no couro cabeludo, ou caspa?`,
				{
					x: 50,
					y: page.getHeight() - 495,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page.drawText(`${perguntas.problemasCpilar.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 515,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(
				`Possui problemas dermatológicos no couro cabeludo, como eczema ou psoríase?`,
				{
					x: 50,
					y: page.getHeight() - 535,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page.drawText(
				`${perguntas.problemasDermatologicos.toLowerCase()}`,
				{
					x: 50,
					y: page.getHeight() - 555,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize,
				},
			);

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 580,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText(`Histórico Médico`, {
				x: 230,
				y: page.getHeight() - 575,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(
				`Histórico como diabetes, problemas hormonais, ou distúrbios da tireoide?`,
				{
					x: 50,
					y: page.getHeight() - 595,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page.drawText(`${perguntas.historicoMedico.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 615,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			//Histórico Médico

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 640,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText(`Alimentação e Estilo de Vida`, {
				x: 200,
				y: page.getHeight() - 635,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(`Como é a sua alimentação diária?`, {
				x: 50,
				y: page.getHeight() - 655,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(`${perguntas.alimentacaoDiaria.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 675,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			//Alimentação e Estilo de Vida

			page.drawText(`Você pratica exercícios físicos regularmente?`, {
				x: 50,
				y: page.getHeight() - 695,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(`${perguntas.praticaExercicio.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 715,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			//Histórico Genético

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 740,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText(`Histórico Genético`, {
				x: 230,
				y: page.getHeight() - 735,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(
				`Possui histórico de perda de cabelo ou condições capilares na sua família?`,
				{
					x: 50,
					y: page.getHeight() - 755,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page.drawText(`${perguntas.historicoFamiliar.toLowerCase()}`, {
				x: 50,
				y: page.getHeight() - 775,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			//Ambiente e Exposição

			//Expectativas e Preferências

			const logoImage2 = await fetch(Logo).then((res) =>
				res.arrayBuffer(),
			);
			const pngImage2 = await pdfDoc.embedPng(logoImage2);
			page2.drawImage(pngImage2, {
				x: 230,
				y: page2.getHeight() - 90,
				width: 100,
				height: 100,
			});

			page2.drawText(
				'Adrimelo - Beleza, Estética Facial Avançada e Tratamentos Capilares',
				{
					x: 150,
					y: page2.getHeight() - 90,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: fontSize + 2,
				},
			);

			page2.drawText('Endereço:', {
				x: 50,
				y: page2.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page2.drawText('R Ana Vilar, 348, Cruzeiro, campina Grande - PB', {
				x: 110,
				y: page2.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page2.drawText('Fone:', {
				x: 50,
				y: page2.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page2.drawText('(83)99383-7785', {
				x: 90,
				y: page2.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page2.drawText('E-mail:', {
				x: 50,
				y: page2.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page2.drawText('adrianamelonunes@gmail.com', {
				x: 90,
				y: page2.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 205,
				width: pageWidth,
				height: 30,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page2.drawText('FICHA DE ANAMNESE', {
				x: 230,
				y: page2.getHeight() - 195,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 240,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page2.drawText(`Ambiente e Exposição`, {
				x: 230,
				y: page2.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page2.drawText(
				`Está frequentemente exposto a condições ambientais, sol, vento, ou poluição?`,
				{
					x: 50,
					y: page2.getHeight() - 265,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page2.drawText(`${perguntas.exposicaoAoClima.toLowerCase()}`, {
				x: 50,
				y: page2.getHeight() - 295,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			//Dados Pessoais***********************

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 320,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page2.drawText(`Expectativas e Preferências`, {
				x: 200,
				y: page2.getHeight() - 315,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page2.drawText(
				`Qual é a sua expectativa em relação ao tratamento capilar?`,
				{
					x: 50,
					y: page2.getHeight() - 345,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);
			page2.drawText(
				`${perguntas.expectativaaoTratamento.toLowerCase()}`,
				{
					x: 50,
					y: page2.getHeight() - 375,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize,
				},
			);

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 440,
				width: pageWidth,
				height: 30,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page2.drawText(
				'                                                QUESTIONÁRIO DE RASTREAMENTO METABÓLICO                                  ',
				{
					x: 50,
					y: page2.getHeight() - 435,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			const logoImage3 = await fetch(Logo).then((res) =>
				res.arrayBuffer(),
			);
			const pngImage3 = await pdfDoc.embedPng(logoImage3);
			page3.drawImage(pngImage3, {
				x: 230,
				y: page3.getHeight() - 90,
				width: 100,
				height: 100,
			});

			page3.drawText(
				'Adrimelo - Beleza, Estética Facial Avançada e Tratamentos Capilares',
				{
					x: 150,
					y: page3.getHeight() - 90,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: fontSize + 2,
				},
			);

			page3.drawText('Endereço:', {
				x: 50,
				y: page3.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page3.drawText('R Ana Vilar, 348, Cruzeiro, campina Grande - PB', {
				x: 110,
				y: page3.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page3.drawText('Fone:', {
				x: 50,
				y: page3.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page3.drawText('(83)99383-7785', {
				x: 90,
				y: page3.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page3.drawText('E-mail:', {
				x: 50,
				y: page3.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page3.drawText('adrianamelonunes@gmail.com', {
				x: 90,
				y: page3.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 205,
				width: pageWidth,
				height: 30,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page3.drawText(
				'                                                                                FICHA DE ANAMNESE                                  ',
				{
					x: 50,
					y: page3.getHeight() - 195,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 250,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page3.drawText(
				'                                                QUESTIONÁRIO DE RASTREAMENTO METABÓLICO                                  ',
				{
					x: 50,
					y: page3.getHeight() - 240,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize,
				},
			);

			page3.drawRectangle({
				x: 10,
				y: page3.getHeight() - 280,
				width: pageWidth - 250,
				height: 15,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			// Adicionar tabela na segunda página
			await addTable(
				'         SINTOMAS DE ALTERAÇÕES TIREOIDIANAS',
				{
					'Mãos e pés frios?': `${perguntas.maosEPesFrios}`,
					'Pele seca/ cabelo seco?': `${perguntas.peleSecaCabeloSeco}`,
					'Ausência de suor, inclusive ativ física?': `${perguntas.ausenSuor}`,
					'Fadiga, cansaço, sem vontade de coisas novas?': `${perguntas.fadCansaco}`,
					'Baixa libido ou sem vontade de sexo?': `${perguntas.baixaLibd}`,
					'Dificuldade de perder peso, ou perde peso fácil?': `${perguntas.dificulPerdPeso}`,
					'Dificuldade de concentração e/ou memoria ruim?': `${perguntas.dificConcentr}`,
					'Queda Capilar ?': `${perguntas.quedaCapilar}`,
					'Menstruação Irregular, e ou volumosa?': `${perguntas.menstIrreg}`,
					'Pálpebras e rosto inchado?': `${perguntas.palpRstInchado}`,
					// Adicionar outras colunas conforme necessário
				},
				10,
				page3.getHeight() - 275,
				page3,
				250,
			);

			page3.drawRectangle({
				x: 310,
				y: page3.getHeight() - 280,
				width: pageWidth - 250,
				height: 15,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			await addSecondTable(
				'      SINTOMAS DE ALTERAÇÕES ADRENAIS',
				{
					'Tonturas ao levantar?': `${perguntas.tontAoLevantar}`,
					'Pressão Sanguínea Baixa?': `${perguntas.presSangBaixa}`,
					'Dificuldade de Decisão? Menos Coragem?': `${perguntas.difcDecisao}`,
					'Fadiga, cansaço, sem vontade de coisas novas?': `${perguntas.fadgCansaco}`,
					'Sente-se melhor após comer algo Doce? Vontade de comer doces?': `${perguntas.melhorAposComerDoce}`,
					'Dores articulares/ musculares ?': `${perguntas.doresArticul}`,
					'Dificuldade para dormir ?': `${perguntas.difcDormir}`,
					'Fadiga?': `${perguntas.fadiga}`,
					'Edema, inchaços?': `${perguntas.edemaInchaco}`,
					'Palpitações?': `${perguntas.palpitacoes}`,
					// Adicionar outras colunas conforme necessário
				},
				10,
				page3.getHeight() - 275,
				page3,
				250,
			);

			page3.drawRectangle({
				x: 10,
				y: page3.getHeight() - 580,
				width: pageWidth - 230,
				height: 15,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			// Adicionar tabela na segunda página
			await addTable(
				'SINT. DE ALT. NEUROTRANSMISSORES e HORMONIOS/METABOLICO',
				{
					'Ansiedade e ou depressão?': `${perguntas.ansiedadeDepres}`,
					'Gordura Abdominal e ou ganho de peso?': `${perguntas.gordAbd}`,
					'Sonolência durante o dia? Insônia?': `${perguntas.sonoDurDia}`,
					'Acorda várias vezes durante a noite e ou acorda cansado?': `${perguntas.acordNoiteCansado}`,
					'Perda de energia?': `${perguntas.perdEnergia}`,
					'Períodos de tristeza sem motivo?': `${perguntas.tristSemMotivo}`,
					'Sente-se Irritada por pequenas coisas?': `${perguntas.irritado}`,
					'Crises/Episódios de Pânico?': `${perguntas.panico}`,
					'Rápidas mudanças de humor?': `${perguntas.mudancaHumor}`,
					'Utiliza Pílula Anticoncepcional? DIU Mirena e ou Cobre?': `${perguntas.antconcep}`,
					// Adicionar outras colunas conforme necessário
				},
				10,
				page3.getHeight() - 575,
				page3,
				250,
			);

			page3.drawRectangle({
				x: 310,
				y: page3.getHeight() - 580,
				width: pageWidth - 250,
				height: 15,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});
			//
			await addSecondTable(
				'      SINTOMAS DE INTOXICAÇÃO',
				{
					'Hipers a prod de limpeza, maquiagens, metais, odores?': `${perguntas.hipersensPrdLimp}`,
					'Infertilidade ?': `${perguntas.Infertilidade}`,
					'Menopausa/ Andropausa precoce?': `${perguntas.menopausa}`,
					'Doenças Autoimunes ?': `${perguntas.doencaAutoimune}`,
					'Mialgias, artralgias, fibromialgias, síndr. da fadiga crônica?': `${perguntas.mialgias}`,
					'Boca amarga e ou seca?': `${perguntas.bocaAmarga}`,
					'Odores fortes na urina?': `${perguntas.odoresFortesUrina}`,
					'Suor fétido?': `${perguntas.suorFetido}`,
					'Reações paradoxais a medicações e suplementos?': `${perguntas.reacaoAMedicacao}`,
					// Adicionar outras colunas conforme necessário
				},
				10,
				page3.getHeight() - 575,
				page3,
				250,
			);

			/////////////////////////////////////////////////////////////////////////////////////
			const pdfBytes = await pdfDoc.save();
			const pdfUrl = URL.createObjectURL(
				new Blob([pdfBytes], { type: 'application/pdf' }),
			);

			setPerguntas((perguntas) => {
				const a = document.createElement('a');
				a.href = pdfUrl;
				a.download = `Cons-capilar-${fileName}.pdf`;
				window.open(pdfUrl, '_blank');
				a.click();

				history(0);
				localStorage.removeItem('anamneseFormData');
				return perguntas;
			});
		} catch (error) {
			console.error('Erro ao gerar o PDF', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading && <Loading />}
			<Buttom
				background="#73BAFB"
				fontSize="12px"
				titlePhrase="Gerar Relatório em PDF"
				onClick={() => generatePDF(perguntas.cpf)}
			/>
		</>
	);
};

export default AnamnesePDF;
