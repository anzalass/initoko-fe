import { server } from "@/server";
import { useStoree } from "@/zustand/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

type FotoProduct = {
  id_product: number;
  url: string;
};

type DetailProduct = {
  id: number;
  name: string;
  harga: number;
  rating: number;
  terjual: number;
  deskripsi: string;
  diskon: number;
  kategori: string;
  foto: FotoProduct[];
  review: [];
};
export default function Deskripsi({ deskripsi }: { deskripsi: DetailProduct }) {
  const [seemore, setseemore] = useState(false);
  const [harga, setharga] = useState(deskripsi);
  const [qty, setqty] = useState(1);
  const { data }: any = useSession();
  const AddWishlist = async () => {
    const res = await axios.post(`${server}wishlist/create`, {
      email: data?.user?.email,
      name: deskripsi?.name,
      harga: deskripsi.harga,
      id_user: data?.user?.id,
      id_product: deskripsi.id,
      foto: deskripsi.foto[0].url,
    });
  };

  const addProduct = useStoree((state) => state?.addProduct);
  // const increment = useStoree((state) => state?.incrementProduct);
  // const decrement = useStoree((state) => state?.decrementProduct);
  // const remove = useStoree((state) => state?.removeProduct);
  // const totall = useStoree((state) => state?.totalHarga);
  const total = useStoree((state) => state?.totalHarga);
  // const storedArray = JSON.parse(localStorage.getItem("cartstorage"));
  const handleAddProduct = () => {
    const newProduct: any = {
      id: deskripsi.id,
      email: data?.user.email,
      title: deskripsi.name,
      price: deskripsi.harga,
      img: deskripsi.foto[0].url,
      qty: qty,
    };
    addProduct(newProduct);
    // total();
  };

  return (
    <div className="w-full ml-14 font-poppins bg--400">
      <div className="mt-7 ">
        <h1 className="text-lg font-[500]">{deskripsi.name}</h1>
        <h1 className="mt-2 text-red-500 text-[15px]">{deskripsi.kategori}</h1>
        <h1 className="mt-5 text-xl font-[600] ">
          {deskripsi.harga.toLocaleString("id-ID", {
            currency: "IDR",
            style: "currency",
          })}
        </h1>
        <div className="flex gap-3">
          <h1 className="mt-3 text-sm">Rating{deskripsi.rating}</h1>
          <h1 className="mt-3 text-sm">Terjual {deskripsi.terjual}</h1>
        </div>
      </div>
      <div className="border-[1px] px-3 font-poppins rounded-md flex mt-4 w-[25%] border-slate-500 h-[40px] rounded-r-full rounded-l-full justify-between">
        <h1
          className={`cursor-pointer my-auto font-[700] ${
            qty < 2 ? "hidden" : "block"
          }`}
          onClick={(e) => setqty(qty - 1)}
        >
          -
        </h1>
        <h1 className="my-auto">{qty}</h1>
        <h1
          className="cursor-pointer my-auto font-[700]"
          onClick={(e) => setqty(qty + 1)}
        >
          +
        </h1>
      </div>
      <div className="mt-6">
        <h1 className="font-[600]">Deskripsi</h1>
        {seemore ? (
          <div className="mt-3 w-[90%] h- rounded-md">
            {deskripsi.deskripsi}
            <span
              onClick={() => setseemore(false)}
              className="underline font-[600] ml-2 cursor-pointer text-sm hover:text-black text-gray-600"
            >
              See Litle
            </span>
          </div>
        ) : (
          <div className="mt-3 w-[90%] h- rounded-md">
            {deskripsi.deskripsi.length > 1000
              ? deskripsi.deskripsi.slice(0, 999) + "..."
              : deskripsi.deskripsi}
            <span
              onClick={() => setseemore(true)}
              className="underline font-[600] ml-2 cursor-pointer text-sm hover:text-black text-gray-600"
            >
              See More
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-start items-center mt-3 gap-3">
        <button
          onClick={handleAddProduct}
          className="w-[40%] h-[45px] hover:bg-green-500  border-slate-500 rounded-r-full rounded-l-full border-[1px]"
        >
          Add To Cart +
        </button>
        <button
          onClick={AddWishlist}
          className="w-[40%] h-[45px] hover:bg-red-500  border-slate-500 rounded-r-full rounded-l-full border-[1px]"
        >
          Wishlist
        </button>
      </div>
      <div className=" mt-5 flex">
        <h1 className="underline hover:text-black text-gray-600 cursor-pointer ">
          See Review{" "}
        </h1>
        <h1 className="underline ml-3 hover:text-black text-gray-600 cursor-pointer ">
          Write Review{" "}
        </h1>
      </div>
    </div>
  );
}
