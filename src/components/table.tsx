import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Dados } from '../types';

export default function BasicTable(rows: Dados[]) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left">id</TableCell>
						<TableCell>nome</TableCell>
						<TableCell align="right">linguagem</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((rows) => (
						<TableRow
							key={rows.id}
							sx={{
								'&:last-child td, &:last-child th': {
									border: 0,
								},
							}}
						>
							<TableCell component="th" scope="row">
								{rows.id}
							</TableCell>
							<TableCell component="th" scope="row">
								{rows.name}
							</TableCell>
							<TableCell align="right">{rows.language}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
