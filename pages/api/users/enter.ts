import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { sendMail } from "@libs/server/mailer";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	// req.body는 req의 인코딩을 기준으로 인코딩 된다
	// 그냥 fetch POST로 요청을 보내서 req.body.email처럼 접근하면 undefined가 뜬다.
	// 이것을 해결하려면 프론트엔드 단에서 헤더를 설정해주어야한다.
	/**
  * headers: {
			"Content-Type": "application/json",
		},
   * 
   */

	//upsert를 사용한다 => where 조건에 맞는 것을 찾고 없다면 create에 쓴 조건에 따라 새로 생성한다.
	// create,update,where을 모두 써주어야 한다.
	//

	const { phone, email } = req.body;
	const user = phone ? { phone: +phone } : email ? { email } : null;

	if (!user) return res.status(400).json({ ok: false });
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

	const payload = Math.floor(100000 + Math.random() * 900000) + "";
	const token = await client.token.create({
		data: {
			payload: payload,
			user: {
				connectOrCreate: {
					// 조건에 만족하는 유저가 있으면 토큰과 연결하고, 없으면 유저를 만들고 토큰을 만든다
					where: {
						...user,
					},
					create: {
						name: "Anonymous",
						...user,
					},
				},
			},
		},
	});
	if (phone) {
		// const message = await twilioClient.messages.create({
		// 	messagingServiceSid: process.env.TWILIO_MESSAGE_SID,
		// 	to: process.env.PHONE_NUMBER!, // trial 계정이라 제한이 있음. 내 번호로 보냄, ts에서 env에 확실히 졶재하는지 모르기때문에 ! 를 뒤에 붙여 확실하다고 알려줌
		// 	body: `인증 번호는 ${payload} 입니다.`,
		// });
		// console.log(message);
	}
	if (email) {
		// const response = sendMail({
		// 	to: "dmstmdrbs98@gmail.com",
		// 	title: "캐럿마켓 클론코딩 인증 메일",
		// 	text: `인증 번호는 ${payload} 입니다.`,
		// });
		// console.log(response);
	}

	return res.json({
		ok: true,
	});
}

export default withHandler("POST", handler);
