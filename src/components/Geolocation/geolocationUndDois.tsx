import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

import customIconUrl from '../../../public/assets/pngegg.png'; // Ajuste para o caminho da sua imagem

const customIcon = new L.Icon({
	iconUrl: customIconUrl,
	iconSize: [35, 35],
	iconAnchor: [17, 34],
	popupAnchor: [0, -34],
});

const GeolocationContainer = styled(MapContainer)`
	/* height: '30vh';
	width: '35vw';
	box-shadow: '2px 5px 9px';
	border-radius: '5%'; */

	@media (max-width: 768px) {
		height: '10vh';
		width: '15vw';

		&:hover {
			height: '10vh';
			width: '15vw';
		}
	}
`;

const MapWithCoordinatesDois: React.FC = () => {
	const [location, setLocation] = useState<[number, number] | null>(null);

	useEffect(() => {
		const lat = -7.366154;
		const lng = -35.905543;
		setLocation([lat, lng]);
	}, []);

	return (
		<div
			id="map"
			style={{
				height: '100%',
				width: '100%',
				boxShadow: '2px 5px 9px',
				borderRadius: '5%',
			}}
		>
			{location && (
				<GeolocationContainer
					center={location}
					zoom={15}
					style={{
						height: '100%',
						width: '100%',
						borderRadius: '5%',
					}}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={location} icon={customIcon}>
						<Popup>
							R Odilon almeida Barreto, 11 Centro Comercial
							Miranda, 1º Andar, sala 3 Queimadas PB
						</Popup>
					</Marker>
				</GeolocationContainer>
			)}
		</div>
	);
};

export default MapWithCoordinatesDois;
