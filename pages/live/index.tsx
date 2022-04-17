import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const Live: NextPage = () => {
	const router = useRouter();

	const onClickLive = (id: number) => {
		router.push(`/live/${id}`);
	};
	const onClickCreateLive = () => {
		router.push("/live/create");
	};
	return (
		<Layout title="라이브" hasTabBar>
			<div className="py-4 divide-y-2 space-y-4">
				{[1, 1, 1, 1, 1, 1].map((_, idx) => (
					<div key={idx} className="pt-4 px-4" onClick={() => onClickLive(idx)}>
						<div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />
						<h3 className="cursor-pointer text-gray-700 text-lg mt-2">[라이브] 마이프로틴 임팩트 웨이</h3>
					</div>
				))}
				<button
					onClick={onClickCreateLive}
					className="fixed border-transparent shadow-xl bottom-24 right-5 bg-orange-400 rounded-full p-4 text-white hover:bg-orange-500 cursor-pointer"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</button>
			</div>
		</Layout>
	);
};

export default Live;
