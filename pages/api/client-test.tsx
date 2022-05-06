// connection 핸들러 함수를 export default해주면 된다

import { NextApiRequest, NextApiResponse } from "next";

import client from "../../libs/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await client.user.create({
		data: {
			email: "hi",
			name: "hi",
		},
	});

	res.json({
		ok: true,
		data: "xx",
	});
}
