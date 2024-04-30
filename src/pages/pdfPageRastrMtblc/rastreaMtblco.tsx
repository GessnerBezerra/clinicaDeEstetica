import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Footer2 from '../../components/footer copy/Footer2';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 10,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function createData(name: string, Sim: number, Nao: number) {
	return { name, Sim, Nao };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0),
	createData('Ice cream sandwich', 237, 9.0),
	createData('Eclair', 262, 16.0),
	createData('Cupcake', 305, 3.7),
	createData('Gingerbread', 356, 16.0),
];

const rows2 = [
	createData('Frozen yoghurt', 159, 6.0),
	createData('Ice cream sandwich', 237, 9.0),
	createData('Eclair', 262, 16.0),
	createData('Cupcake', 305, 3.7),
	createData('Gingerbread', 356, 16.0),
];
// const Sobre: React.FC = () =>
const RastreaMtlblco: React.FC = () => {
	return (
		<>
			<Header />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					flexDirection: 'row',
					flexWrap: 'wrap',
					marginTop: '15vh',
				}}
			>
				<TableContainer sx={{ width: 500 }} component={Paper}>
					<Table sx={{ minWidth: 35 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell
									sx={{ width: 20, fontSize: 15 }}
								>
									SINTOMAS DE HIPERPERMEABILIDADE INTESTINAL
								</StyledTableCell>
								<StyledTableCell
									sx={{ width: 5 }}
									align="right"
								>
									Sim
								</StyledTableCell>
								<StyledTableCell
									sx={{ width: 5 }}
									align="right"
								>
									Nao
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<StyledTableRow key={row.name}>
									<StyledTableCell component="th" scope="row">
										{row.name}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.Sim}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.Nao}
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<TableContainer sx={{ width: 500 }} component={Paper}>
					<Table sx={{ minWidth: 35 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell
									sx={{ width: 20, fontSize: 15 }}
								>
									SINTOMAS TRATO GASTROINTESTINAL
								</StyledTableCell>
								<StyledTableCell
									sx={{ width: 5 }}
									align="right"
								>
									Sim
								</StyledTableCell>
								<StyledTableCell
									sx={{ width: 5 }}
									align="right"
								>
									Não
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows2.map((row2) => (
								<StyledTableRow key={row2.name}>
									<StyledTableCell component="th" scope="row">
										{row2.name}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row2.Sim}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row2.Nao}
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			<Footer />
			<Footer2 />
		</>
	);
};

export default RastreaMtlblco;
