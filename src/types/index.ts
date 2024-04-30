//Molde dos dados que a API vai buscar

export interface Dados {
	id: string;
	name: string;
	language: string;
}

export interface IFeedItem {
	id: string;
	media_type: 'IMAGE' | 'VIDEO';
	media_url: string;
	permalink: string;
	caption: string;
}
