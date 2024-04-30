import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import '../../style/styleFonte2.css';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { IFeedItem } from '../../types';
import styles from './sectionComponente.module.css';

import { PauseCircleFilledOutlined } from '@mui/icons-material';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInCarrossel = keyframes`
  from {
    opacity: 0;
	
  }
  to {
    opacity: 1;
	
  }
`;

const rotateIn = keyframes`
  from {
    transform: translateX(-30%);
	opacity: 1;
  }
  to {
    transform: translateX(30%);
	opacity: 0;
  }
`;

const CarouselContainer = styled.div`
	display: flex;
	overflow: hidden;
	position: relative;
`;

const CarouselItem = styled.div`
	min-width: 100%;
	transition: transform 0.8s ease-in-out;
`;

const CarouselContentContainer = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-around;
	height: auto;
	overflow: hidden;
	position: relative;
`;

const Text = styled.div`
	position: absolute;
	font-size: 20px;
	top: 20%;
	left: 65%;
	transform: translateX(-50%);
	/* background: rgba(255, 128, 95, 0.21); */
	/* box-shadow: rgba(12, 12, 12, 0.44) 8px 5px 8px; */
	color: #7b193f;
	border-radius: 2%;
	font-family: 'gothamPro', sans-serif;
	width: auto;
	opacity: 0;
	animation: ${fadeIn} 1s ease-out forwards 1s;

	/* Adicione o efeito neon */
	text-shadow: rgb(123 25 63 / 66%) 0px 0px 10px,
		rgb(151 95 117 / 45%) 0px 0px 10px, rgb(228 169 192 / 34%) 0px 0px 10px;

	@media (max-width: 896px) {
		font-size: 70%; // Ajuste conforme necessário
		/* display: none; */
	}

	p:houver {
		content: none;
	}
`;

const Image = styled.img`
	width: 100%;
	// height: 100%;
	object-fit: cover;
	/* border-radius: 50%; */
	box-shadow: rgb(12 12 12 / 44%) 8px 5px 8px;
	opacity: 0;
	animation: ${fadeInCarrossel} 0.5s ease-out forwards 0.5s;

	// @media (max-width: 896px) {
	// 	width: 30vw;
	// 	height: 50vh;
	// }
`;

const Video = styled.video`
	width: 100%;
	// height: 80%;
	object-fit: cover;
	box-shadow: rgb(12 12 12 / 44%) 8px 5px 8px;
	opacity: 0;
	animation: ${fadeInCarrossel} 0.5s ease-out forwards 0.5s;
`;

const ButtonContainer = styled.div`
	position: absolute;
	display: flex;
	top: 50%;
	/* transform: translateY(-50%); */
	width: 100%;
	justify-content: space-between;
`;

const StyledButton = styled.button`
	background-color: #7b193f;
	border: none;
	border-radius: 50%;
	color: white;
	font-size: 10px;
	cursor: pointer;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s;
	box-shadow: rgba(12, 12, 12, 0.44) 2px 5px 8px;

	&:hover {
		background-color: #bd728f;
	}

	&:focus {
		outline: none;
	}
`;

const RightArrow = styled.span`
	animation: ${rotateIn} 0.5s ease-in-out infinite;
`;

const LeftArrow = styled.span`
	animation: ${rotateIn} 0.5s ease-in-out infinite reverse;
`;

const TypografContaener = styled(Typography)`
	p:houver {
		content: 'none';
	}
`;

const CarouselContent: React.FC<{ item: IFeedItem }> = ({ item }) => {
	const theme = useTheme();

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const playVideo = () => {
		if (videoRef.current) {
			videoRef.current.play();
			setIsPlaying(true);
		}
	};

	const pauseVideo = () => {
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	const stopVideo = () => {
		// Parar o vídeo
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0; // Definir o tempo de volta para o início
			setIsPlaying(false);
		}
	};

	const togglePlayPause = () => {
		if (isPlaying) {
			stopVideo();
		} else {
			playVideo();
		}
	};

	const previwVideo = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 20;
		}
	};

	const SkipVideo = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 20;
		}
	};

	useEffect(() => {
		// Pausar o vídeo quando o componente é desmontado
		return () => {
			pauseVideo();
		};
	}, []);

	return (
		<Card sx={{ display: 'flex', background: '#f0e6e6f9' }}>
			<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent
					sx={{
						display: 'flex',
						maxWidth: '40%',
						justifyContent: 'space-around',
					}}
				>
					{item.media_type === 'IMAGE' ? (
						<CardContent
							sx={{
								display: 'flex',
								maxWidth: '100%',
							}}
						>
							<a
								href={item.permalink}
								target="_blank"
								rel="noreferrer"
							>
								<Image
									src={item.media_url}
									alt={item.caption}
								/>
							</a>
						</CardContent>
					) : item.media_type === 'VIDEO' ? (
						<CardContent
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								maxWidth: '100%',
								ml: '2em',
							}}
						>
							<a href="" target="" rel="noreferrer">
								<Video ref={videoRef}>
									<source src={item.media_url}></source>
								</Video>
							</a>
							<CardContent
								sx={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<IconButton
									aria-label="previous"
									onClick={SkipVideo}
									sx={{
										display: 'flex',
									}}
								>
									<SkipPreviousIcon
										sx={{
											color: '#bd728f',
										}}
									/>
								</IconButton>
								<IconButton
									aria-label="previous"
									onClick={pauseVideo}
								>
									<PauseCircleFilledOutlined
										sx={{ color: '#bd728f' }}
									/>
								</IconButton>
								<IconButton
									aria-label="previous"
									onClick={stopVideo}
								>
									{isPlaying ? (
										<StopIcon sx={{ color: '#e03131' }} />
									) : (
										<StopIcon sx={{ color: '#bd728f' }} />
									)}
								</IconButton>
								<IconButton
									aria-label="play/pause"
									onClick={playVideo}
								>
									<PlayArrowIcon sx={{ color: '#bd728f' }} />
								</IconButton>
								<IconButton
									aria-label="next"
									onClick={previwVideo}
								>
									<SkipNextIcon sx={{ color: '#bd728f' }} />
								</IconButton>
							</CardContent>
						</CardContent>
					) : (
						<>
							<CardContent
								sx={{
									display: 'flex',
									maxWidth: '100%',
								}}
							>
								<a
									href={item.permalink}
									target="_blank"
									rel="noreferrer"
								>
									<Image
										src={item.media_url}
										alt={item.caption}
									/>
								</a>
							</CardContent>
						</>
					)}
				</CardContent>
			</CardContent>
			<CardContent>
				<TypografContaener variant="body2" color="text.secondary">
					<>
						<Text>
							<p id={styles.post}>{item.caption}</p>
						</Text>
					</>
				</TypografContaener>
			</CardContent>
		</Card>
	);
};

const CarouselComponent: React.FC<{ feedList: IFeedItem[] }> = ({
	feedList,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const videoRef = useRef<HTMLVideoElement | null>(null);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % feedList.length);
		pauseVideo(); // Pausar o vídeo ao mudar de slide
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + feedList.length) % feedList.length,
		);
		pauseVideo(); // Pausar o vídeo ao mudar de slide
	};

	const pauseVideo = () => {
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	useEffect(() => {
		// Pausar o vídeo quando o componente é desmontado
		return () => {
			pauseVideo();
		};
	}, []);

	return (
		<>
			<CarouselContainer>
				{feedList.map((item) => (
					<CarouselItem
						key={item.id}
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
						}}
					>
						<CarouselContentContainer>
							<CarouselContent item={item} />
						</CarouselContentContainer>
					</CarouselItem>
				))}
				<ButtonContainer>
					<StyledButton onClick={prevSlide}>
						<LeftArrow>
							<ArrowLeftIcon fontSize="large" />
						</LeftArrow>
					</StyledButton>
					<StyledButton onClick={nextSlide}>
						<RightArrow>
							<ArrowRightIcon fontSize="large" />
						</RightArrow>
					</StyledButton>
				</ButtonContainer>
			</CarouselContainer>
		</>
	);
};

export default CarouselComponent;
