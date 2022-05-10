import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../@components/button/button";
import Layout from "../@components/layout";

const ItemDetail: NextPage = () => {
	const router = useRouter();

	return (
		<Layout canGoBack>
			<div className="px-4 py-4">
				<div className="mb-5">
					<div className=" bg-slate-300 h-96" />
					<div className="cursor-pointer flex items-center space-x-3 p-3 border-t border-b">
						<div className="w-12 h-12 rounded-full bg-slate-300" />
						<div>
							<p className="text-small font-medium text-gray-700s">Steve Jebs</p>
							<p className="text-xs font-medium text-gray-500">View profile &rarr;</p>
						</div>
					</div>
					<div className="mt-5">
						<h1 className="text-3xl font-bold text-gray-900">Galaxy S50</h1>
						<span className="text-3xl mt-3 text-gray-900 block">$140</span>
						<p className="text-base my-6 text-gray-700">
							My money&apos;s in that office, right? If she start giving me some bullshit about it ain&apos;t there, and
							we got to go someplace else and get it, I&apos;m gonna shoot you in the head then and there. Then I&apos;m
							gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey,
							look at me when I&apos;m talking to you, motherfucker. You listen: we go in there, and that ni**a Winston
							or anybody else is in there, you the first motherfucker to get shot. You understand?
						</p>
						<div className="flex items-center justify-between space-x-2">
							<Button large text="Talk to seller" />
							<button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none ">
								<svg
									className="h-6 w-6 "
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-col p-4 border-t space-y-2">
					<h2 className="font-semibold text-gray-900 text-2xl">Similar items</h2>
					<div className="grid grid-cols-2 gap-4 mt-6">
						{[1, 2, 3, 4, 5, 6].map((_, i) => (
							<div key={i}>
								<div className="h-56 w-full mb-4 bg-gray-400 rounded-md" />
								<h3 className="-mb-1 text-gray-700">Galaxy S60</h3>
								<p className="text-sm font-medium text-gray">$6</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ItemDetail;
