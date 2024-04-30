import React from 'react';

import 'leaflet/dist/leaflet.css';
import InstagramTokenRefresh from '../../components/instagramTokenRefresh/instagramTokenRefresh';

const TokenRefresh: React.FC = () => {
	return (
		<div
			id="map"
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '30vh',
				width: '35vw',
				boxShadow: '2px 5px 9px',
				borderRadius: '5%',
			}}
		>
			<InstagramTokenRefresh />
		</div>
	);
};

export default TokenRefresh;
