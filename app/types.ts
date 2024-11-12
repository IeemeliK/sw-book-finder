interface VolumeInfo {
	title: string;
	subtitle?: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	industryIdentifiers: { type: string; identifier: string }[];
	readingModes: { text: boolean; image: boolean };
	pageCount: number;
	printType: string;
	categories: string[];
	maturityRating: string;
	allowAnonLogging: boolean;
	contentVersion: string;
	panelizationSummary?: {
		containsEpubBubbles: boolean;
		containsImageBubbles: boolean;
	};
	imageLinks: { smallThumbnail: string; thumbnail: string };
	language: string;
	previewLink: string;
	infoLink: string;
	canonicalVolumeLink: string;
}

interface SingleVolumeInfo extends VolumeInfo {
	imageLinks: {
		smallThumbnail: string;
		thumbnail: string;
		small: string;
		medium: string;
		large: string;
		extraLarge: string;
	};
}

interface Item {
	id: string;
	volumeInfo: VolumeInfo;
}

export interface BookData extends VolumeInfo {
	id: string;
}

export interface BooksApiData {
	totalItems: number;
	items: Item[];
}
