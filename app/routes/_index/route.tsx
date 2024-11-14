import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getBooks } from "~/apiFunctions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
	return [
		{ title: "Star Wars book finder" },
		{ name: "description", content: "Find your favorite star wars books!" },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const page = url.searchParams.get("page") || 1;

	if (!q) {
		return { books: { totalItems: 0, bookData: null } };
	}

	const books = await getBooks(q);
	return { books, q };
}

export default function Index() {
	const { books, q } = useLoaderData<typeof loader>();
	return (
		<>
			<section className="flex flex-col mt-16 space-y-8 items-center w-screen">
				<h1 className="font-bold text-3xl">Star Wars Book Finder</h1>
				<Form
					className="flex space-x-2 w-screen justify-center px-7"
					id="search-form"
					role="search"
				>
					<Input
						type="search"
						defaultValue={q || ""}
						id="q"
						name="q"
						placeholder="Search for a Star Wars book"
						className="max-w-3xl text-center md:text-left"
					/>
					<Button className="hidden md:inline-flex" type="submit">
						Search
					</Button>
				</Form>
			</section>
			<main className="flex mt-8 justify-center w-screen pb-5">
				{books.bookData ? (
					<div className="bg-muted w-10/12 sm:max-w-fit grid justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 rounded-lg px-4 py-8">
						{books.bookData.map((book) => (
							<div
								key={book.id}
								className="flex flex-col py-3 text-center hover:scale-110 transition ease-in items-center text-wrap w-52"
							>
								{book.imageLinks ? (
									<img
										src={book.imageLinks.thumbnail}
										className="w-36 h-52 rounded object-fit mb-2"
										draggable="false"
									/>
								) : (
									<div className="w-36 h-52 text-center flex items-center rounded mb-2 bg-violet-400">
										<i>No images available</i>
									</div>
								)}
								<h4>{book.title}</h4>
								{book.authors && (
									<p className="mt-2 text-sm opacity-45">
										{`Author${book.authors.length > 1 ? "s" : ""}: `}
										{book.authors.map((author, idx) => (
											<span key={author}>
												{author}
												{idx < book.authors.length - 1 && ", "}
											</span>
										))}
									</p>
								)}
							</div>
						))}
					</div>
				) : (
					<p>No books found!</p>
				)}
			</main>
		</>
	);
}
