import React, { useEffect, useState } from 'react';

import Footer2 from '../../components/footer copy/Footer2';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/loading';
import Main from '../../components/main/Main';
import '../../style/globalStyle.module.css';

const Welcome: React.FC = () => {
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
					<Main />
					<Footer />
					<Footer2 />
				</>
			)}
		</>
	);
};

export default Welcome;
