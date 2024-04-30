import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import customIconUrl from '../../../public/assets/pngegg.png'; // Ajuste para o caminho da sua imagem

const customIcon = new L.Icon({
	iconUrl: customIconUrl,
	iconSize: [35, 35],
	iconAnchor: [17, 34],
	popupAnchor: [0, -34],
});

const MapWithGeocoding: React.FC = () => {
	const [location, setLocation] = useState<[number, number] | null>(null);

	useEffect(() => {
		const lat = -7.247724;
		const lng = -35.901747;
		setLocation([lat, lng]);
	}, []);

	return (
		<div
			id="map"
			style={{
				height: '30vh',
				width: '35vw',
				boxShadow: '2px 5px 9px',
				borderRadius: '5%',
			}}
		>
			{location && (
				<MapContainer
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
						<Popup>Seu local personalizado!</Popup>
					</Marker>
				</MapContainer>
			)}
		</div>
	);
};

export default MapWithGeocoding;
