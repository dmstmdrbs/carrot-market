import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
	method: "GET" | "POST" | "DELETE",
	fn: (req: NextApiRequest, res: NextApiResponse) => Promise<object>
) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (req.method !== method) {
			return res.status(405).end; // bad request
		}
		try {
		} catch (err) {
			await fn(req, res);
			console.log(err);
			return res.status(500).json({ error: err });
		}
	};
}
