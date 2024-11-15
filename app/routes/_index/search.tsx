import { Form } from "@remix-run/react";
import { FunctionComponent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const SearchComponent: FunctionComponent<{ q: string }> = ({ q }) => {
	return (
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
	);
};
