import CardWishlist from "@/components/card/wishlistcard";
import { server } from "@/server";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setwishlist] = useState<any[]>([]);
  const { data }: any = useSession();
  const GetWishlistByIDUser = async () => {
    await axios
      .get(`${server}wishlist/${data?.user?.id}`)
      .then((res) => {
        setwishlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetWishlistByIDUser();
  }, [data?.user?.id]);
  return (
    <div className="w-11/12 mx-auto">
      <div className="h-screen mt-[150px]">
        <div className="mx-auto grid grid-cols-6">
          {wishlist.map((d: any, i: any) => (
            <div className="" key={i}>
              <CardWishlist data={d} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
