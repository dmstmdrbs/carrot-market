import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { id } = req.query;
  const { user } = req.session;
  //좋아요가 이미 존재하는지 확인
  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    //delete => unique한 속성으로만 삭제 가능
    //deleteMany = unique한 속성이 아닌것으로 모두 찾아 삭제해버림
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    //create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
