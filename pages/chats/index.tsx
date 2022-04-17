import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const Write: NextPage = () => {
	const router = useRouter();
	const onClickChat = (idx: number) => {
		router.push(`/chats/${idx}`);
	};
	return (
		<Layout title="채팅" hasTabBar>
			<div className="py-4 divide-y-[1px]">
				{[1, 1, 1, 1, 1, 1].map((_, i) => (
					<div key={i} className="flex px-4 cursor-pointer py-3 items-center space-x-3" onClick={() => onClickChat(i)}>
						<div className="w-10 h-10 rounded-full bg-slate-300" />
						<div>
							<p className="text-gray-700">Steve Jebs</p>
							<p className="text-sm font-medium text-gray-500">See you tomorrow in the corner at 2pm!</p>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
};
export default Write;
