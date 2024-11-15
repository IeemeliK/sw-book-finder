import { BooksApiData } from "./types";

const libraryUrl = "https://openlibrary.org/search.json";
const coversUrl = "https://covers.openlibrary.org/b";

export async function getBooks(userInput: string, page = 1) {
	const params = new URLSearchParams({
		q: `title:"Star Wars"+${userInput}`,
		page: page.toString(),
		limit: "10",
		fields:
			"title,author_name,author_key,cover_edition_key,key,editions,editions.*",
	});

	const url = new URL(libraryUrl);
	url.search = params.toString();

	try {
		const res = await fetch(url);
		const data: BooksApiData = await res.json();

		for (const bookData of data.docs) {
			const keyUrl = bookData.key.split("/").pop();

			bookData.key = keyUrl ?? "";
			if (bookData.cover_edition_key) {
				bookData.thumbnail = `${coversUrl}/olid/${bookData.cover_edition_key}-M.jpg`;
			}
		}

		return { totalItems: data.numFound, bookData: data.docs };
	} catch (error: any) {
		throw new Response(error.message, {
			status: 500,
			statusText: "Internal server error",
		});
	}
}

export async function getAuthor(authorKey: string) {
	const authorUrl = `https://openlibrary.org/author/${authorKey}.json`;

	try {
		const res = await fetch(authorUrl);
		const data: any = await res.json();

		return data;
	} catch (error: any) {
		throw new Response(error.message, {
			status: 500,
			statusText: "Internal server error",
		});
	}
}

export async function getBook(workKey: string) {
	// /works/[bookData.key].json gets data of a single work
	const worksUrl = "https://openlibrary.org/works/";
	const url = `${worksUrl}${workKey}.json`;

	try {
		const res = await fetch(url);
		const data: any = await res.json();

		data.image = data.covers ? `${coversUrl}/id/${data.covers[0]}-L.jpg` : "";

		data.author_name = [];
		for (const authorItem of data.authors) {
			const authorData = await getAuthor(
				authorItem.author.key.split("/").pop(),
			);
			data.author_name.push(authorData.name);
		}

		return data;
	} catch (error: any) {
		throw new Response(error.message, {
			status: 500,
			statusText: "Internal server error",
		});
	}
}
