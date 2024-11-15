import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import React from "react";
import { getBooks } from "~/apiFunctions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";
import { PaginationData } from "~/types";

export const meta: MetaFunction = () => {
	return [
		{ title: "Star Wars book finder" },
		{ name: "description", content: "Find your favorite star wars books!" },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") || "";
	const page = parseInt(url.searchParams.get("page") || "1");

	let books;
	if (!q) {
		books = await getBooks("Episode", page);
	} else {
		books = await getBooks(q, page);
	}

	const maxPages = books.totalItems / 10;

	const pageNumbers: PaginationData = {
		previousPages: [],
		currentPage: page,
		nextPages: [],
		maxPages: maxPages,
	};

	for (
		let pageNumber = page;
		pageNumber < Math.min(page + 1, maxPages);
		pageNumber++
	) {
		pageNumbers.nextPages.push(pageNumber + 1);
	}

	for (
		let pageNumber = page;
		pageNumber > Math.max(page - 1, 1);
		pageNumber--
	) {
		pageNumbers.previousPages.unshift(pageNumber - 1);
	}

	return { books, q, pageNumbers };
}

export default function Index() {
	const { books, q, pageNumbers } = useLoaderData<typeof loader>();

	const [searchParams] = useSearchParams();

	function generatePaginationParam(pageNumber: number) {
		const params = searchParams;
		params.set("page", pageNumber.toString());

		return params.toString();
	}

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
						placeholder="Search by title, author or description"
						className="max-w-3xl text-center md:text-left"
					/>
					<Button className="hidden md:inline-flex" type="submit">
						Search
					</Button>
				</Form>
			</section>
			<main className="flex flex-col mt-8 items-center w-screen pb-5">
				{books.bookData ? (
					<div className="bg-muted w-10/12 sm:max-w-fit grid justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 rounded-lg p-8">
						{books.bookData.map((book) => (
							<div
								key={book.key}
								className="flex flex-col py-3 text-center hover:scale-110 transition ease-in items-center text-wrap w-52"
							>
								{book.thumbnail ? (
									<img
										src={book.thumbnail}
										className="w-36 h-52 rounded object-fit mb-2"
										draggable="false"
									/>
								) : (
									<div className="w-36 h-52 text-center flex items-center rounded mb-2 bg-violet-400">
										<i>No images available</i>
									</div>
								)}
								<h4 className="font-bold max-w-40">{book.title}</h4>
								{book.author_name && (
									<p className="mt-1 text-sm text-muted-foreground max-w-40">
										{`Author${book.author_name.length > 1 ? "s" : ""}: `}
										{book.author_name.map((author, idx) => (
											<React.Fragment key={`${author}${book.key}`}>
												<span className="dark:hover:bg-primary-foreground hover:bg-stone-300 rounded">
													{author}
												</span>
												{idx < book.author_name.length - 1 && ", "}
											</React.Fragment>
										))}
									</p>
								)}
							</div>
						))}
					</div>
				) : (
					<p>No books found!</p>
				)}
				<Pagination className="mt-2">
					<PaginationContent>
						{pageNumbers.currentPage > 1 && (
							<PaginationItem>
								<PaginationPrevious
									to={{
										search: generatePaginationParam(
											pageNumbers.currentPage - 1,
										),
									}}
									preventScrollReset
									prefetch="intent"
								/>
							</PaginationItem>
						)}
						{pageNumbers.previousPages.map((pageNumber) => (
							<PaginationItem key={`${pageNumber}-prev`}>
								<PaginationLink
									to={{ search: generatePaginationParam(pageNumber) }}
									preventScrollReset
									prefetch="intent"
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationLink
								to={{
									search: generatePaginationParam(pageNumbers.currentPage),
								}}
								isActive
								preventScrollReset
							>
								{pageNumbers.currentPage}
							</PaginationLink>
						</PaginationItem>
						{pageNumbers.nextPages.map((pageNumber) => (
							<PaginationItem key={`${pageNumber}-next`}>
								<PaginationLink
									to={{ search: generatePaginationParam(pageNumber) }}
									preventScrollReset
									prefetch="intent"
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						))}
						{pageNumbers.currentPage < pageNumbers.maxPages && (
							<PaginationItem>
								<PaginationNext
									to={{
										search: generatePaginationParam(
											pageNumbers.currentPage + 1,
										),
									}}
									preventScrollReset
									prefetch="intent"
								/>
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			</main>
		</>
	);
}
