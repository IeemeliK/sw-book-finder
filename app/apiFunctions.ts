import { BookData, BooksApiData } from "./types";

const volumesUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = process.env.BOOKS_API_KEY || "";

export async function getBooks(userInput: string, startIndex = "0") {
	const params = new URLSearchParams({
		q: `Star Wars ${userInput}`,
		printType: "books",
		key: apiKey,
		fields: "totalItems,items(volumeInfo,id)",
		startIndex: startIndex,
		maxResults: "10",
		intitle: "Star+Wars",
	});

	const url = new URL(volumesUrl);
	url.search = params.toString();

	try {
		const res = await fetch(url);
		const data: BooksApiData = await res.json();

		const books: Array<BookData> = [];
		for (let i = 0; i < data.items.length; i++) {
			const item = data.items[i];
			books.push({ id: item.id, ...item.volumeInfo });
		}

		return { totalItems: data.totalItems, bookData: books };
	} catch (error: any) {
		throw new Response(error.message, {
			status: 500,
			statusText: "Internal server error",
		});
	}
}

export async function getBook(volumeId: string) {}
