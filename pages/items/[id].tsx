import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "@components/button/button";
import Layout from "@components/layout";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutations";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";

interface ProductWithUser extends Product {
  user: User;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  isLiked: boolean;
  relatedProducts: Product[];
}
const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query?.id}` : null
  );

  const [toggleFav] = useMutation(`/api/products/${router.query?.id}/fav`);
  const onClickFav = () => {
    //Optimistic UI update
    if (!data) return;
    // bound mutate
    boundMutate((prev) => prev && { ...prev, isLiked: !prev?.isLiked }, false);
    toggleFav({});
    // unbound mutate를 이용하면 다른 화면의 캐싱된 데이터도 mutate할 수 있다.
    // 다른 컴포넌트의 데이터를 변경할 때에는 컴포넌트에 데이터가 없다면 데이터로는 변경 불가능
    // 함수를 파라미터로 넣어주면 됨
    // mutate("/api/users/me", (prev: any) => prev && { ok: false }, false);
  };
  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-5">
          <div className=" bg-slate-300 h-96" />
          <div className="cursor-pointer flex items-center space-x-3 p-3 border-t border-b">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-small font-medium text-gray-700s">{data?.product?.user?.name}</p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">View profile &rarr;</a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">{data?.product?.name}</h1>
            <span className="text-3xl mt-3 text-gray-900 block">{data?.product?.price}원</span>
            <p className="text-base my-6 text-gray-700">{data?.product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onClickFav}
                className={cls(
                  "p-3 rounded-md flex items-center justify-center focus:outline-none",
                  data?.isLiked
                    ? "text-red-500 hover:bg-gray-100 hover:text-red-600"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                )}>
                {!data?.isLiked ? (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 border-t space-y-2">
          <h2 className="font-semibold text-gray-900 text-2xl">Similar items</h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {data?.relatedProducts.map((product, i) => (
              <Link key={product.id} href={`/items/${product.id}`} passHref>
                <div>
                  <div className="h-56 w-full mb-4 bg-gray-400 rounded-md" />
                  <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                  <p className="text-sm font-medium text-gray">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
