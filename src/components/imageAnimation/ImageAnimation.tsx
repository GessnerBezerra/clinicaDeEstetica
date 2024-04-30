// AnimatedContent.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { IFeedItem } from '../../types';
import Carousel from '../carousel/Carousel';
import styles from './indexAnimation.module.css';

const AnimatedContent: React.FC = () => {
	const [feedList, setFeedList] = useState<IFeedItem[]>([]);

	async function getInstaFeed() {
		const token = import.meta.env.VITE_API_INSTA;
		const fields = 'media_url,media_type,permalink,caption';
		const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

		const { data } = await axios.get(url);
		setFeedList(data.data);
		console.log(data);
	}

	useEffect(() => {
		getInstaFeed();
	}, []);

	return (
		<body className={styles.body}>
			<section className={styles.container}>
				{feedList.length > 0 && (
					<Carousel feedList={feedList.slice(0, 5)} />
				)}
			</section>
		</body>
	);
};

export default AnimatedContent;
