export async function fetchBooks(userInput: string) {
	const baseUrl = "https://www.googleapis.com/books/v1/volumes";

	const params = new URLSearchParams({
		q: `Star Wars ${userInput}`,
		printType: "books",
		key: process.env.BOOKS_API_KEY || "",
	});

	const url = new URL(baseUrl);
	url.search = params.toString();

	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return {};
	}
}
