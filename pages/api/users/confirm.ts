import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { token } = req.body;

	const foundToken = await client.token.findUnique({
		where: {
			payload: token,
		},
		// include: { user: true }, //유저 정보를 같이 가져옴. relation이 있기 때문에 userId를 가지고 User 테이블에서 가져옴
	});
	if (!foundToken) return res.status(404).end();

	console.log(foundToken);
	// 존재하면 userId를 session에 저장한다.
	req.session.user = {
		id: foundToken.userId,
	};
	await req.session.save(); //  세션이 쿠키에 담기게 된다.

	await client.token.deleteMany({
		where: {
			userId: foundToken.userId,
		},
	});
	return res.json({ ok: true });
}

export default withApiSession(
	withHandler({
		method: "POST",
		handler,
		isPrivate: false,
	})
);
