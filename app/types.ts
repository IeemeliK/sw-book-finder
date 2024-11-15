export interface BookDoc {
	author_name: string[];
	cover_edition_key: string;
	key: string;
	title: string;
	thumbnail: string;
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
