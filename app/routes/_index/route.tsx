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
	console.log(books.bookData.length);

	return { books, q };
}

export default function Index() {
	const { books, q } = useLoaderData<typeof loader>();
	return (
		<>
			<Form
				className="items-center flex space-x-2 mt-16 justify-center w-screen px-3"
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
			<div>
				{books.bookData ? (
					<div>
						<h1>Kirjoja!</h1>
					</div>
				) : (
					<div className="flex mt-20 justify-center w-screen mx-auto">
						<p>Perform a search to find books!</p>
					</div>
				)}
			</div>
		</>
	);
}
