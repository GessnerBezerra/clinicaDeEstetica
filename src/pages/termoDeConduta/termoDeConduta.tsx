import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Conduta from '../../components/conduta/condutaTermo';
import Footer2 from '../../components/footer copy/Footer2';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/loading';
import '../../style/globalStyle.module.css';

const MainContainer = styled.main`
	position: relative;
	/* height: 'calc(85vh  - 150px)'; */
	margin-top: 10vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const TermoDeConduta: React.FC = () => {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const [isLoading, setIsLoading] = useState(true);
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
					<Conduta />
					<Footer />
					<Footer2 />
				</>
			)}
		</>
	);
};

export default TermoDeConduta;
