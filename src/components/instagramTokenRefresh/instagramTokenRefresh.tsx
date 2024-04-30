import React, { useEffect } from 'react';

const InstagramTokenRefresh: React.FC = () => {
	useEffect(() => {
		const refreshToken = async () => {
			// Define o caminho do arquivo que contém o token atual
			const currentToken = import.meta.env.VITE_API_INSTA;

			const url = 'https://graph.instagram.com/refresh_access_token';

			const dataArray = {
				grant_type: 'ig_refresh_token',
				access_token: currentToken,
			};

			try {
				const response = await fetch(
					`${url}?${new URLSearchParams(dataArray)}`,
				);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						`Erro na solicitação: ${response.status} - ${errorData.error.message}`,
					);
				}

				const data = await response.json();
				if (data.access_token) {
					// Atualiza o token no arquivo ou no estado da aplicação, conforme necessário
					console.log('Token atualizado:', data.access_token);
				} else {
					console.log('Erro ao obter novo token:', data);
				}
			} catch (error: any) {
				console.error(error.message);
			}
		};

		// Chama a função para atualizar o token quando o componente é montado
		refreshToken();
	}, []);

	return <div>Atualizando token do Instagram...</div>;
};

export default InstagramTokenRefresh;
