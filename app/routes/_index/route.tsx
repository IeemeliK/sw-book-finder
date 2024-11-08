import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { fetchBooks } from "~/apiFunctions";

export const meta: MetaFunction = () => {
	return [
		{ title: "Star Wars book finder" },
		{ name: "description", content: "Find your favorite star wars books!" },
	];
};

// export async function loader({ request }: LoaderFunctionArgs) {
// 	const data = await fetchBooks("Bane");
// 	console.log(data);
// 	return null;
// }

export default function Index() {
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
}
