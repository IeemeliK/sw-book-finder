import type { LoaderFunctionArgs } from "@remix-run/node";
import { getBook } from "~/apiFunctions";
import invariant from "tiny-invariant";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import React from "react";

export async function loader({ params }: LoaderFunctionArgs) {
	invariant(params.workId, "Missing workId param");
	const bookData = await getBook(params.workId);

	return bookData;
}

export default function Book() {
	const bookData: any = useLoaderData();
	const navigate = useNavigate();

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-4">
			<div className="flex space-x-3 w-full max-w-4xl mb-4">
				<Button onClick={() => navigate(-1)}>Back</Button>
				<Link to={"/"}>
					<Button>Home</Button>
				</Link>
			</div>
			<Card className="max-w-4xl w-full bg-secondary rounded-lg overflow-hidden">
				<div className="flex flex-col md:flex-row">
					<img
						src={bookData.image}
						alt={bookData.title}
						className="w-full md:w-1/3 object-cover max-h-96"
					/>
					<CardContent className="p-4 md:p-6 flex-1 overflow-auto">
						<CardHeader className="pl-0">
							<CardTitle className="text-2xl font-bold">
								{bookData.title}
							</CardTitle>
							<CardDescription className="mt-2">
								{bookData.author_name && (
									<>
										{`Author${bookData.author_name.length > 1 ? "s" : ""}: `}
										{bookData.author_name.map((author: string, idx: number) => (
											<React.Fragment key={`${author}${idx}`}>
												<Link
													to={`/author/${bookData.authors[idx].author.key.split("/").pop()}`}
												>
													<span className="dark:hover:bg-primary-foreground hover:bg-stone-300 rounded">
														{author}
													</span>
												</Link>
												{idx < bookData.author_name.length - 1 && ", "}
											</React.Fragment>
										))}
									</>
								)}
							</CardDescription>
						</CardHeader>
						<p className="mt-4 max-h-48 overflow-auto">
							{bookData.description}
						</p>
					</CardContent>
				</div>
			</Card>
		</main>
	);
}
