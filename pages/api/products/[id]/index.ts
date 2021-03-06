import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { id } = req.query;
  const { user } = req.session;
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  //연관 상품을 찾기 위한 쿼리 조건
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  console.log("terms", terms);

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  console.log(product);
  console.log("연관상품", relatedProducts);
  const isLiked = !!(await client.fav.findFirst({
    where: {
      productId: product?.id,
      userId: user?.id,
    },
    select: {
      id: true,
    },
  }));
  res.json({
    ok: true,
    product,
    isLiked,
    relatedProducts,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: true,
  })
);
