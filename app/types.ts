export interface BookDoc {
	author_name: string[];
	author_key: string[];
	cover_edition_key: string;
	key: string;
	title: string;
	thumbnail: string;
	editions: any;
}

export interface workData {
	description: string;
}

export interface BooksApiData {
	numFound: number;
	docs: BookDoc[];
}

export interface PaginationData {
	previousPages: number[];
	currentPage: number;
	nextPages: number[];
	maxPages: number;
}
