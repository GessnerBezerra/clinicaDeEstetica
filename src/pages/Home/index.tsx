import axios from 'axios';
import { useEffect, useState } from 'react';

import { IFeedItem } from '../../types';
import styles from './index.module.css';

export function InstaFeed() {
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
				{feedList.slice(0, 50).map((item) => (
					<div key={item.id} id="insta">
						{item.media_type === 'IMAGE' ? (
							<>
								<a
									href={item.permalink}
									target="_blank"
									className={styles.item}
									rel="noreferrer"
								>
									<img src={item.media_url} />
								</a>
								<p id="post">{item.caption}</p>
							</>
						) : item.media_type === 'VIDEO' ? (
							<>
								<a
									href={item.permalink}
									target="_blank"
									className={styles.item}
									rel="noreferrer"
								>
									<video controls>
										<source src={item.media_url}></source>
									</video>
								</a>
								<p id="post">{item.caption}</p>
							</>
						) : (
							<>
								<a
									href={item.permalink}
									target="_blank"
									className={styles.item}
									rel="noreferrer"
								>
									<img src={item.media_url} />
								</a>

								<p id="post">{item.caption}</p>
							</>
						)}
					</div>
				))}
			</section>
		</body>
	);
}
