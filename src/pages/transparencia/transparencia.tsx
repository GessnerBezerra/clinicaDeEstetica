import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Footer2 from '../../components/footer copy/Footer2';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/loading';
import TransparenciaComponente from '../../components/transparencia/transparenciaComponente';
import '../../style/globalStyle.module.css';

const MainContainer = styled.main`
	position: relative;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	-webkit-box-align: stretch;
	align-items: stretch;
`;

const Transparencia: React.FC = () => {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

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
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Header />
					<TransparenciaComponente />

					<Footer />
					<Footer2 />
				</>
			)}
		</>
	);
};

export default Transparencia;
