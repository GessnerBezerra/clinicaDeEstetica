import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

import LogoImage from '../../../public/assets/logo_trial.png'; // Substitua pelo caminho real da sua logo

const Container = styled.div`
	position: relative;
`;

const Imagem = styled.img`
	position: absolute;
	top: 58%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 65px;
	height: 65px;
	border-radius: 50%;
`;

const Loading = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			bgcolor="rgba(219, 211, 211, 0.719)" // Cor de fundo com opacidade
			position="fixed"
			top={0}
			left={0}
			width="100%"
			zIndex={9999}
		>
			<Container>
				<Imagem src={LogoImage} alt="Logo" />
				<CircularProgress
					style={{ marginTop: '20px', color: '#9063cd' }}
					size={80}
				/>
			</Container>
		</Box>
	);
};

export default Loading;
