import { BooksApiData } from "./types";

const libraryUrl = "https://openlibrary.org/search.json";
const coversUrl = "https://covers.openlibrary.org/b/olid/";

export async function getBooks(userInput: string, page = 1) {
	const params = new URLSearchParams({
		q: `title:"Star Wars"+${userInput}`,
		page: page.toString(),
		limit: "10",
		fields: "title,author_name,cover_edition_key,key",
	});

	const url = new URL(libraryUrl);
	url.search = params.toString();

	try {
		const res = await fetch(url);
		const data: BooksApiData = await res.json();

		for (const bookData of data.docs) {
			if (bookData.cover_edition_key) {
				bookData.thumbnail = `${coversUrl}${bookData.cover_edition_key}-M.jpg`;
			}
		}
		console.log(data);

		return { totalItems: data.numFound, bookData: data.docs };
	} catch (error: any) {
		throw new Response(error.message, {
			status: 500,
			statusText: "Internal server error",
		});
	}
}

export async function getBook(volumeId: string) {}
