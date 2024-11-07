import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Star Wars book finder" },
		{ name: "description", content: "Find your favorite star wars books!" },
	];
};

export default function Index() {
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
}
