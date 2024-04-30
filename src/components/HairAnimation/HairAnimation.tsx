import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

const HairContainer = styled.div`
	position: relative;
	width: 0.2%;
	height: 100vh;
	overflow: hidden;
`;

const HairStrand = styled(animated.div)`
	position: absolute;
	margin-top: 15vh;
	width: 2px;
	height: 50%;
	background-color: #000;
`;

const HairAnimation = () => {
	const [strands, setStrands] = useState<number[]>([]);

	useEffect(() => {
		// Inicializar os fios de cabelo
		const strandsArray: number[] = [];
		for (let i = 0; i < 20; i++) {
			strandsArray.push(i);
		}
		setStrands(strandsArray);
	}, []);

	const hairAnimations = useSpring({
		loop: true,
		to: { y: 5 },
		from: { y: 0 },
	});

	return (
		<HairContainer>
			{strands.map((strand) => (
				<HairStrand key={strand} style={hairAnimations} />
			))}
		</HairContainer>
	);
};

export default HairAnimation;
