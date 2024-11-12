import { BookData, BooksApiData } from "./types";

const volumesUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = process.env.BOOKS_API_KEY || "";

export async function getBooks(userInput: string) {
	const params = new URLSearchParams({
		q: `Star Wars ${userInput}`,
		printType: "books",
		key: apiKey,
		fields: "totalItems,items(volumeInfo,id)",
	});

	const url = new URL(volumesUrl);
	url.search = params.toString();

	try {
		const res = await fetch(url);
		const data: BooksApiData = await res.json();

		const books: BookData[] = [];
		for (let i = 0; i < data.items.length; i++) {
			const volumeInfo = data.items[i].volumeInfo;

			const description = volumeInfo.description ?? "";
			const title = volumeInfo.title ?? "";

			if (description.includes("Star Wars") || title.includes("Star Wars")) {
				books.push({ id: data.items[i].id, ...volumeInfo });
			}
		}

		console.log(books);

		return { totalItems: data.totalItems, bookData: books };
	} catch (error: any) {
		console.error(error);
		throw new Response(error.message, {
			status: 500,
			statusText: "Internal server error",
		});
	}
}

export async function getBook(volumeId: string) {}
