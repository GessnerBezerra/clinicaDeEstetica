import { PDFDocument, PageSizes, StandardFonts, rgb } from 'pdf-lib';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../public/assets/Logo.png';
import '../../style/styleFonte2.css';
import Buttom from '../button/button';
import Loading from '../loading/loading';

export interface AnamnesePDFPropsFacial {
	data: {
		nomeCompleto: string;
		email: string;
		idade: string;
		sexo: string;
		endereco: string;
		bairro: string;
		cidade: string;
		cep: string;
		foneRes: string;
		foneCel: string;
		estadoCivil: string;
		nascimento: string;
		profissao: string;
		motivoVisita: string;
		cpf: string;
		dataConsulta: string;
		lentesDeContato: string;
		estéticoAnterior: string;
		estéticoAnteriorResp: string;
		utilizCosmeticos: string;
		utilizCosmeticosResp: string;
		exposicaoAoSol: string;
		exposicaoAoSolResp: string;
		filtroSolar: string;
		filtroSolarResp: string;
		tabagismo: string;
		tabagismoResp: string;
		ingereAlcool: string;
		ingereAlcoolResp: string;
		funcintestinalSemana: string;
		funcintestinalDia: string;
		qualidadeSono: string;
		qualidadeSonoResp: string;
		alimentacao: string;
		ativFisica: string;
		ativFisicaResp: string;
		usoAnticoncepcional: string;
		usoAnticoncepcionalResp: string;
		gestante: string;
		ultimaMenstruacao: string;
		gestacoes: string;
		qtsGestacoes: string;
		tmpUltimaGestacao: string;
		tratMedico: string;
		medicemUso: string;
		antAlergicos: string;
		antAlergicosResp: string;
		marcaPasso: string;
		alteracoesCardiacas: string;
		alteracoesCardiacasResp: string;
		hipoHipertensaoArterial: string;
		distRenal: string;
		distRenalResp: string;
		distHormonal: string;
		distHormonalResp: string;
		distGastroIntest: string;
		distGastroIntestResp: string;
		eplepsiaConvulsoes: string;
		eplepsiaConvulsoesResp: string;
		altPsicPsiquiatr: string;
		altPsicPsiquiatrResp: string;
		estresse: string;
		estresseResp: string;
		antecOncologicos: string;
		antecOncologicosResp: string;
		diabetes: string;
		diabetesResp: string;
		algumaDoenca: string;
		algumaDoencaResp: string;
		implDentario: string;
		implDentarioResp: string;
		tratDermatEstetico: string;
		tratDermatEsteticoResp: string;
		cirurPlastEstetica: string;
		cirurPlastEsteticaResp: string;
		cirurgReparadora: string;
		cirurgReparadoraResp: string;
	};
}

const AnamnesePDFFacial: React.FC<AnamnesePDFPropsFacial> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [perguntas, setPerguntas] = useState(data);
	const history = useNavigate();

	useEffect(() => {
		// Carregar os valores do localStorage quando o componente é montado
		const savedDataString = localStorage.getItem('anamneseFormDataFacial');
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
					await currentPage.drawText(`${key}:`, {
						x: leftColumnX,
						y: y - 20,
						font: await pdfDoc.embedFont(StandardFonts.Helvetica),
						color: rgb(0.4824, 0.098, 0.2471),
						size: fontSize,
						textAlign: 'left',
						// Center: 0,
					});

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

			page.drawText('Data da consulta porposta pelo cliente:', {
				x: 250,
				y: page.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(`${perguntas.dataConsulta.toLowerCase()}`, {
				x: 430,
				y: page.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 185,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText('Formulário de Anamnese Facial', {
				x: 230,
				y: page.getHeight() - 175,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 215,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			//Dados Pessoais
			page.drawText('Dados Pessoais', {
				x: 230,
				y: page.getHeight() - 205,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawText(`Nome Completo:`, {
				x: 50,
				y: page.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.nomeCompleto.toLowerCase()}`, {
				x: 130,
				y: page.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`idade:`, {
				x: 300,
				y: page.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.idade.toLowerCase()}`, {
				x: 350,
				y: page.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Sexo:`, {
				x: 450,
				y: page.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			}); //dataConsulta
			page.drawText(`${perguntas.sexo}`, {
				x: 500,
				y: page.getHeight() - 235,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			}); //dataConsulta

			page.drawText(`E-mail:`, {
				x: 50,
				y: page.getHeight() - 255,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.email}`, {
				x: 90,
				y: page.getHeight() - 255,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`endereço:`, {
				x: 300,
				y: page.getHeight() - 255,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.endereco}`, {
				x: 350,
				y: page.getHeight() - 255,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Bairro:`, {
				x: 50,
				y: page.getHeight() - 275,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.bairro.toLowerCase()}`, {
				x: 90,
				y: page.getHeight() - 275,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Cidade:`, {
				x: 280,
				y: page.getHeight() - 275,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.cidade.toLowerCase()}`, {
				x: 320,
				y: page.getHeight() - 275,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Cep:`, {
				x: 450,
				y: page.getHeight() - 275,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			}); //dataConsulta
			page.drawText(`${perguntas.cep}`, {
				x: 480,
				y: page.getHeight() - 275,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			}); //dataConsulta

			page.drawText(`Tel. Resid:`, {
				x: 50,
				y: page.getHeight() - 295,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.foneRes}`, {
				x: 110,
				y: page.getHeight() - 295,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Tel. Cel:`, {
				x: 300,
				y: page.getHeight() - 295,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.foneCel}`, {
				x: 350,
				y: page.getHeight() - 295,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Nascimento:`, {
				x: 50,
				y: page.getHeight() - 315,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.nascimento}`, {
				x: 120,
				y: page.getHeight() - 315,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`CPF:`, {
				x: 300,
				y: page.getHeight() - 315,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.cpf}`, {
				x: 340,
				y: page.getHeight() - 315,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Estado civil:`, {
				x: 50,
				y: page.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.estadoCivil}`, {
				x: 120,
				y: page.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Profissão:`, {
				x: 300,
				y: page.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.profissao}`, {
				x: 350,
				y: page.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`Motivo da visita:`, {
				x: 50,
				y: page.getHeight() - 355,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.motivoVisita}`, {
				x: 130,
				y: page.getHeight() - 355,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 400,
				width: pageWidth,
				height: 30,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			//HÁBITOS DIÁRIOS
			page.drawText('HÁBITOS DIÁRIOS', {
				x: 230,
				y: page.getHeight() - 390,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 440,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText(`HISTÓRICO PESSOAL`, {
				x: 230,
				y: page.getHeight() - 435,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 470,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 470,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});

			//Histórico Capilar
			page.drawText(`Usa lentes de contato?`, {
				x: 70,
				y: page.getHeight() - 465,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.lentesDeContato.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 465,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 510,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 495,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 495,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Tratamento estético anterior?`, {
				x: 70,
				y: page.getHeight() - 490,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Quais?`, {
				x: 250,
				y: page.getHeight() - 490,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 510,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`${perguntas.estéticoAnterior.toLowerCase()}`, {
				x: 70,
				y: page.getHeight() - 505,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`${perguntas.estéticoAnteriorResp.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 505,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 555,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 540,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 540,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Utilização de cosméticos`, {
				x: 70,
				y: page.getHeight() - 535,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Quais?`, {
				x: 250,
				y: page.getHeight() - 535,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 555,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`${perguntas.utilizCosmeticos.toLowerCase()}`, {
				x: 70,
				y: page.getHeight() - 550,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`${perguntas.utilizCosmeticosResp.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 550,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 585,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 585,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});

			page.drawText(`Exposição ao sol`, {
				x: 70,
				y: page.getHeight() - 580,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.exposicaoAoSol.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 580,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 630,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 615,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 615,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Filtro solar`, {
				x: 70,
				y: page.getHeight() - 610,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Frequência?`, {
				x: 250,
				y: page.getHeight() - 610,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 630,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`${perguntas.filtroSolar.toLowerCase()}`, {
				x: 70,
				y: page.getHeight() - 625,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawText(`${perguntas.filtroSolarResp.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 625,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 675,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 660,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 660,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Tabagismo`, {
				x: 70,
				y: page.getHeight() - 655,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Quantidade de cigarros/dia`, {
				x: 250,
				y: page.getHeight() - 655,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 675,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`${perguntas.tabagismo.toLowerCase()}`, {
				x: 70,
				y: page.getHeight() - 670,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.tabagismoResp.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 670,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 720,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 705,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 705,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Ingere bebida alcoólica`, {
				x: 70,
				y: page.getHeight() - 700,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Frequência`, {
				x: 250,
				y: page.getHeight() - 700,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 720,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`${perguntas.ingereAlcool.toLowerCase()}`, {
				x: 70,
				y: page.getHeight() - 715,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.ingereAlcoolResp.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 715,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 765,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 765,
				width: pageWidth - 320, //=180
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 750,
				width: pageWidth - 340,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 390,
				y: page.getHeight() - 750,
				width: pageWidth - 340,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Funcionamento intestinal`, {
				x: 70,
				y: page.getHeight() - 750,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 765,
				width: pageWidth - 340,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Por semana`, {
				x: 250,
				y: page.getHeight() - 745,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Por dia`, {
				x: 420,
				y: page.getHeight() - 745,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.funcintestinalSemana.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 760,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.funcintestinalDia.toLowerCase()}`, {
				x: 420,
				y: page.getHeight() - 760,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 810,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 795,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawRectangle({
				x: 230,
				y: page.getHeight() - 795,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`Qualidade do sono`, {
				x: 70,
				y: page.getHeight() - 790,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawText(`Quantas horas/noite`, {
				x: 250,
				y: page.getHeight() - 790,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize,
			});
			page.drawRectangle({
				x: 50,
				y: page.getHeight() - 810,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page.drawText(`${perguntas.qualidadeSono.toLowerCase()}`, {
				x: 70,
				y: page.getHeight() - 805,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});
			page.drawText(`${perguntas.qualidadeSonoResp.toLowerCase()}`, {
				x: 250,
				y: page.getHeight() - 805,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize,
			});

			// Adicionar cabeçalho com logo e informações pagina 2
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
				`Adrimelo - Beleza, Estética Facial Avançada e Tratamentos Capilares`,
				{
					x: 150,
					y: page2.getHeight() - 90,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: fontSize + 2,
				},
			);

			const infoFontSize2 = 10;
			page2.drawText('Endereço:', {
				x: 50,
				y: page2.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText('R Ana Vilar, 348, Cruzeiro, campina Grande - PB', {
				x: 110,
				y: page2.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawText('Fone:', {
				x: 50,
				y: page2.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText('(83)99383-7785', {
				x: 90,
				y: page2.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawText('E-mail:', {
				x: 50,
				y: page2.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText('adrianamelonunes@gmail.com', {
				x: 90,
				y: page2.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawText('Data da consulta porposta pelo cliente:', {
				x: 250,
				y: page2.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});

			page2.drawText(`${perguntas.dataConsulta.toLowerCase()}`, {
				x: 430,
				y: page2.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 185,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page2.drawText('Formulário de Anamnese Facial', {
				x: 230,
				y: page2.getHeight() - 175,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 235,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page2.drawText(`HISTÓRICO PESSOAL`, {
				x: 230,
				y: page2.getHeight() - 230,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 265,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 265,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			//Histórico Capilar
			page2.drawText(`Alimentação`, {
				x: 70,
				y: page2.getHeight() - 260,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.alimentacao.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 260,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 310,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 295,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 295,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Pratica atividade fisica?`, {
				x: 70,
				y: page2.getHeight() - 290,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Que tipo?`, {
				x: 250,
				y: page2.getHeight() - 290,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 310,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.ativFisica.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.ativFisicaResp.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 355,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 340,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 340,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Uso de anticoncepcional`, {
				x: 70,
				y: page2.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Qual?`, {
				x: 250,
				y: page2.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 355,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.usoAnticoncepcional.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 350,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawText(
				`${perguntas.usoAnticoncepcionalResp.toLowerCase()}`,
				{
					x: 250,
					y: page2.getHeight() - 350,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize2,
				},
			);

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 400,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 385,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 385,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Gestante`, {
				x: 70,
				y: page2.getHeight() - 380,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Data da ultima menstruação`, {
				x: 250,
				y: page2.getHeight() - 380,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 400,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.gestante.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 395,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.ultimaMenstruacao.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 395,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 445,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 445,
				width: pageWidth - 320, //=180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 430,
				width: pageWidth - 340,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 390,
				y: page2.getHeight() - 430,
				width: pageWidth - 340,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Gestações`, {
				x: 70,
				y: page2.getHeight() - 425,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 445,
				width: pageWidth - 340,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Quantas`, {
				x: 250,
				y: page2.getHeight() - 425,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`A quanto tempo`, {
				x: 420,
				y: page2.getHeight() - 425,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.gestacoes.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 440,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.qtsGestacoes.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 440,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.tmpUltimaGestacao.toLowerCase()}`, {
				x: 400,
				y: page2.getHeight() - 440,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 490,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 475,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 475,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Tratamento médico atual`, {
				x: 70,
				y: page2.getHeight() - 470,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Medicamento em uso`, {
				x: 250,
				y: page2.getHeight() - 470,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 490,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.tratMedico.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 485,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.medicemUso.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 485,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 535,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 520,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 520,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Antecedentes alérgicos`, {
				x: 70,
				y: page2.getHeight() - 515,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Quais?`, {
				x: 250,
				y: page2.getHeight() - 515,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 535,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.antAlergicos.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 530,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.antAlergicosResp.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 530,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 565,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 565,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Portador de marca-passo`, {
				x: 70,
				y: page2.getHeight() - 560,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.marcaPasso.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 560,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 610,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 595,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 595,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Alterações cardiacas`, {
				x: 70,
				y: page2.getHeight() - 590,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Quais?`, {
				x: 250,
				y: page2.getHeight() - 590,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 610,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.alteracoesCardiacas.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 605,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(
				`${perguntas.alteracoesCardiacasResp.toLowerCase()}`,
				{
					x: 250,
					y: page2.getHeight() - 605,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize2,
				},
			);

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 640,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 640,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			//Histórico Capilar
			page2.drawText(`Hipo/hipertensão arterial`, {
				x: 70,
				y: page2.getHeight() - 635,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(
				`${perguntas.hipoHipertensaoArterial.toLowerCase()}`,
				{
					x: 250,
					y: page2.getHeight() - 635,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize2,
				},
			);

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 680,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 665,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 665,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Disturbio renal`, {
				x: 70,
				y: page2.getHeight() - 660,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Qual?`, {
				x: 250,
				y: page2.getHeight() - 660,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 680,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.distRenal.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 675,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.distRenalResp.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 675,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 725,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 710,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 710,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Distúrbio hormonal`, {
				x: 70,
				y: page2.getHeight() - 705,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Qual?`, {
				x: 250,
				y: page2.getHeight() - 705,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 725,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.distHormonal.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 720,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.distHormonalResp.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 720,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 770,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 755,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 755,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Distúrbio gastro-intestinal`, {
				x: 70,
				y: page2.getHeight() - 750,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Qual?`, {
				x: 250,
				y: page2.getHeight() - 750,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 770,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.distGastroIntest.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 765,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(`${perguntas.distGastroIntestResp.toLowerCase()}`, {
				x: 250,
				y: page2.getHeight() - 765,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});

			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 815,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 800,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawRectangle({
				x: 230,
				y: page2.getHeight() - 800,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`Epilepsia-convulsões`, {
				x: 70,
				y: page2.getHeight() - 795,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawText(`Frequência`, {
				x: 250,
				y: page2.getHeight() - 795,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page2.drawRectangle({
				x: 50,
				y: page2.getHeight() - 815,
				width: pageWidth - 320,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page2.drawText(`${perguntas.eplepsiaConvulsoes.toLowerCase()}`, {
				x: 70,
				y: page2.getHeight() - 810,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize2,
			});
			page2.drawText(
				`${perguntas.eplepsiaConvulsoesResp.toLowerCase()}`,
				{
					x: 250,
					y: page2.getHeight() - 810,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize2,
				},
			);

			// Adicionar cabeçalho com logo e informações pagina 3
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
				`Adrimelo - Beleza, Estética Facial Avançada e Tratamentos Capilares`,
				{
					x: 150,
					y: page3.getHeight() - 90,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: fontSize + 2,
				},
			);

			const infoFontSize3 = 10;
			page3.drawText('Endereço:', {
				x: 50,
				y: page3.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText('R Ana Vilar, 348, Cruzeiro, campina Grande - PB', {
				x: 110,
				y: page3.getHeight() - 115,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawText('Fone:', {
				x: 50,
				y: page3.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText('(83)99383-7785', {
				x: 90,
				y: page3.getHeight() - 135,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawText('E-mail:', {
				x: 50,
				y: page3.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText('adrianamelonunes@gmail.com', {
				x: 90,
				y: page3.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawText('Data da consulta porposta pelo cliente:', {
				x: 250,
				y: page3.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});

			page3.drawText(`${perguntas.dataConsulta.toLowerCase()}`, {
				x: 430,
				y: page3.getHeight() - 155,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 185,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page3.drawText('Formulário de Anamnese Facial', {
				x: 230,
				y: page3.getHeight() - 175,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 220,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page3.drawText(`HISTÓRICO PESSOAL`, {
				x: 230,
				y: page3.getHeight() - 215,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 265,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 250,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 250,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Alterações psicológicas/psiquiátricas`, {
				x: 60,
				y: page3.getHeight() - 245,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Quais?`, {
				x: 250,
				y: page3.getHeight() - 245,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 265,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.altPsicPsiquiatr.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 260,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(`${perguntas.altPsicPsiquiatrResp.toLowerCase()}`, {
				x: 250,
				y: page3.getHeight() - 260,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 310,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 295,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 295,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Estresse`, {
				x: 70,
				y: page3.getHeight() - 290,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Obs.:`, {
				x: 250,
				y: page2.getHeight() - 290,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize2,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 310,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.estresse.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawText(`${perguntas.estresseResp.toLowerCase()}`, {
				x: 250,
				y: page3.getHeight() - 305,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 355,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 340,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 340,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Antecedentes oncológicos`, {
				x: 70,
				y: page3.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Qual`, {
				x: 250,
				y: page3.getHeight() - 335,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 355,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.antecOncologicos.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 350,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(`${perguntas.antecOncologicosResp.toLowerCase()}`, {
				x: 250,
				y: page3.getHeight() - 350,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 400,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 385,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 385,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Diabetes`, {
				x: 70,
				y: page3.getHeight() - 380,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Tipo`, {
				x: 250,
				y: page3.getHeight() - 380,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 400,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.diabetes.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 395,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(`${perguntas.diabetesResp.toLowerCase()}`, {
				x: 250,
				y: page3.getHeight() - 395,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 445,
				width: pageWidth,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 430,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 430,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Algum tipo de doença`, {
				x: 70,
				y: page3.getHeight() - 425,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Qual?`, {
				x: 250,
				y: page3.getHeight() - 425,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 445,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.algumaDoenca.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 440,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(`${perguntas.algumaDoencaResp.toLowerCase()}`, {
				x: 250,
				y: page3.getHeight() - 440,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 475,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page3.drawText(`TRATAMENTO DA MEDICINA ESTÉTICA E CIRÚRGICA`, {
				x: 200,
				y: page3.getHeight() - 470,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 520,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 505,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 505,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Implante dentário`, {
				x: 70,
				y: page3.getHeight() - 500,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Qual?`, {
				x: 250,
				y: page3.getHeight() - 500,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 520,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.implDentario.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 515,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(`${perguntas.implDentarioResp.toLowerCase()}`, {
				x: 250,
				y: page3.getHeight() - 515,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 565,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 550,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 550,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Tratamento dermatológico/Estético`, {
				x: 60,
				y: page3.getHeight() - 545,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Qual?`, {
				x: 250,
				y: page3.getHeight() - 545,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 565,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.tratDermatEstetico.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 560,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(
				`${perguntas.tratDermatEsteticoResp.toLowerCase()}`,
				{
					x: 250,
					y: page3.getHeight() - 560,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize3,
				},
			);

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 610,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 595,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 595,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Cirurgia Plástica Estética`, {
				x: 70,
				y: page3.getHeight() - 590,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Qual?`, {
				x: 250,
				y: page3.getHeight() - 590,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 610,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.cirurPlastEstetica.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 605,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(
				`${perguntas.cirurPlastEsteticaResp.toLowerCase()}`,
				{
					x: 250,
					y: page3.getHeight() - 605,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0, 0, 0),
					size: infoFontSize3,
				},
			);

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 655,
				width: pageWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 640,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawRectangle({
				x: 230,
				y: page3.getHeight() - 640,
				width: pageWidth - 180,
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`Cirurgia Reparadora`, {
				x: 70,
				y: page3.getHeight() - 635,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawText(`Qual?`, {
				x: 250,
				y: page3.getHeight() - 635,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});
			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 655,
				width: pageWidth - 320, //180
				height: 15,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(`${perguntas.cirurgReparadora.toLowerCase()}`, {
				x: 70,
				y: page3.getHeight() - 650,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});
			page3.drawText(`${perguntas.cirurgReparadoraResp.toLowerCase()}`, {
				x: 250,
				y: page3.getHeight() - 650,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0, 0, 0),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 685,
				width: pageWidth,
				height: 20,
				// borderColor: rgb(0, 0, 0),
				// borderWidth: 1.5,
				color: rgb(0.9686, 0.6784, 0.6863),
			});

			page3.drawText(`Termo de Responsabilidade`, {
				x: 200,
				y: page3.getHeight() - 680,
				font: await pdfDoc.embedFont(StandardFonts.Helvetica),
				color: rgb(0.4824, 0.098, 0.2471),
				size: infoFontSize3,
			});

			page3.drawRectangle({
				x: 50,
				y: page3.getHeight() - 800,
				width: pageWidth,
				height: 100,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1.5,
				// color: rgb(0.9686, 0.6784, 0.6863),
			});
			page3.drawText(
				`Estou ciente que os tratamentos faciais requerem minha colaboração diariamente, utilizando os cosméticos\n` +
					`adequados e protetor solar. Permito o tratamento de peeling químico, físico e mecânico, sabendo\n` +
					`que existe um risco, mesmo que temporário, da minha pele ficar mais escura. Me proponho a usar o que\n` +
					`for necessário para a pele ficar melhor.\n`,
				{
					x: 60,
					y: page3.getHeight() - 715,
					font: await pdfDoc.embedFont(StandardFonts.Helvetica),
					color: rgb(0.4824, 0.098, 0.2471),
					size: infoFontSize3,
				},
			);

			/////////////////////////////////////////////////////////////////////////////////////
			const pdfBytes = await pdfDoc.save();
			const pdfUrl = URL.createObjectURL(
				new Blob([pdfBytes], { type: 'application/pdf' }),
			);

			setPerguntas((perguntas) => {
				const a = document.createElement('a');
				a.href = pdfUrl;
				a.download = `Cons-facial-${fileName}.pdf`;
				window.open(pdfUrl, '_blank');
				a.click();

				history(0);
				localStorage.removeItem('anamneseFormDataFacial');
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
				background="#7B193F"
				fontSize="12px"
				titlePhrase="Gerar Relatório em PDF"
				onClick={() => generatePDF(perguntas.cpf)}
			/>
		</>
	);
};

export default AnamnesePDFFacial;
