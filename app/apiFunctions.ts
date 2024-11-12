export async function fetchBooks(userInput: string) {
	const volumesUrl = "https://www.googleapis.com/books/v1/volumes";

	const params = new URLSearchParams({
		q: `Star Wars ${userInput}`,
		printType: "books",
		key: process.env.BOOKS_API_KEY || "",
		fields: "totalItems,items/volumeInfo",
	});

	const url = new URL(volumesUrl);
	url.search = params.toString();

	try {
		const res = await fetch(url);
		const data = await res.json();

		console.log(data);

		const books = [];
		for (let i = 0; i < data.items.length; i++) {
			const volumeInfo: any = data.items[i].volumeInfo;

			if (!volumeInfo) {
				continue;
			}

			books.push(volumeInfo);
		}

		return { totalItems: data.totalItems, bookData: books };
	} catch (error) {
		console.error(error);
		throw new Response("Server error!", {
			status: 500,
			statusText: "Internal server error",
		});
	}
}
