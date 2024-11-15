import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getAuthor } from "~/apiFunctions";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export async function loader({ params }: LoaderFunctionArgs) {
	invariant(params.authorId, "Missing authorId param");

	const authorData = await getAuthor(params.authorId);

	return authorData;
}

export default function Author() {
	const authorData: any = useLoaderData();
	const navigate = useNavigate();

	return (
		<main className="flex flex-col items-center min-h-screen p-4">
			<div className="flex justify-between w-full max-w-4xl mb-4">
				<Button onClick={() => navigate(-1)}>Back</Button>
				<Link to="/">
					<Button>Home</Button>
				</Link>
			</div>
			<Card className="max-w-4xl w-full bg-secondary shadow-secondary-foreground shadow-sm rounded-lg overflow-hidden">
				<div className="flex flex-col md:flex-row">
					{authorData.photos && authorData.photos.length > 0 && (
						<img
							src={`https://covers.openlibrary.org/b/id/${authorData.photos[0]}-L.jpg`}
							alt={authorData.name}
							className="w-full md:w-1/3 object-cover max-h-96"
						/>
					)}
					<CardContent className="p-4 md:p-6 flex-1 overflow-auto">
						<CardHeader className="pl-0">
							<CardTitle className="text-2xl font-bold">
								{authorData.name}
							</CardTitle>
							<CardDescription className="mt-2">
								{authorData.birth_date && (
									<p>Birth Date: {authorData.birth_date}</p>
								)}
								{authorData.alternate_names && (
									<p>
										Alternate Names: {authorData.alternate_names.join(", ")}
									</p>
								)}
							</CardDescription>
						</CardHeader>
						<p className="mt-4 max-h-48 overflow-auto">{authorData.bio}</p>
					</CardContent>
				</div>
			</Card>
		</main>
	);
}
