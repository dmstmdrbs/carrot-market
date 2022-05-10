import { NextApiRequest, NextApiResponse } from "next";

import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// req.body는 req의 인코딩을 기준으로 인코딩 된다
	// 그냥 fetch POST로 요청을 보내서 req.body.email처럼 접근하면 undefined가 뜬다.
	// 이것을 해결하려면 프론트엔드 단에서 헤더를 설정해주어야한다.
	/**
  * headers: {
			"Content-Type": "application/json",
		},
   * 
   */
	const { phone, email } = req.body;

	//upsert를 사용한다 => where 조건에 맞는 것을 찾고 없다면 create에 쓴 조건에 따라 새로 생성한다.
	// create,update,where을 모두 써주어야 한다.
	//

	const payload = phone ? { phone: +phone } : { email };
	// const user = await client.user.upsert({
	// 	where: {
	// 		...payload,
	// 	},
	// 	create: {
	// 		...payload,
	// 		name: "Anonymous",
	// 	},
	// 	update: {},
	// });
	// console.log(user);
	// token을 받아와야함

	const token = await client.token.create({
		data: {
			payload: "1234",
			user: {
				connectOrCreate: {
					// 조건에 만족하는 유저가 있으면 토큰과 연결하고, 없으면 유저를 만들고 토큰을 만든다
					where: {
						...payload,
					},
					create: {
						name: "Anonymous",
						...payload,
					},
				},
			},
		},
	});
	console.log(token);
	return res.status(200).end();
}

export default withHandler("POST", handler);
