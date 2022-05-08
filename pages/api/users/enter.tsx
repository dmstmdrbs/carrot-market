import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// req.body는 req의 인코딩을 기준으로 인코딩 된다
	// 그냥 fetch POST로 요청을 보내서 req.body.email처럼 접근하면 undefined가 뜬다.
	// 이것을 해결하려면 프론트엔드 단에서 헤더를 설정해주어야한다.
	/**
  * headers: {
			"Content-Type": "application/json",
		},
   * 
   */
	if (req.method !== "POST") {
		res.status(401).end();
	}

	console.log(req.body.email);
	res.status(200).end();
}
