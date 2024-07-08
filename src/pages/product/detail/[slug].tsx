import Deskripsi from "@/components/productdetail/deskripsi";
import ImageDetail from "@/components/productdetail/image";
import Relatedproduct from "@/components/productdetail/relatedproduct";
import Review from "@/components/productdetail/review";
import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

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

export default function ProductDetail() {
  const [image, setImaga] = useState(0);
  const router = useRouter();
  const path = router.asPath;
  const productPath = path.split("/").slice(1, 2).join("  ");
  const detailPath = path.split("/").slice(2, 3).join("  ");
  const productcapital = productPath.split(productPath[0]);
  const productcapital2 = productPath[0].toUpperCase();
  const Detailcapital = detailPath.split(detailPath[0]);
  const Detailcapital2 = detailPath[0].toUpperCase();

  const [product, setproduct] = useState<DetailProduct>();

  const GetProductByID = async () => {
    try {
      const res = await axios.get(`${server}product/${router.query.slug}`);
      setproduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetProductByID();
  }, [router.query.slug]);

  return (
    // <div className="w-11/12 mt-36 mx-auto relative h-[200vh] overflow-hidden ">
    <div className="w-11/12 mt-36 mx-auto relative min-h-screen ">
      {/* <Review /> */}
      <div className="mt-10 w-full  mx-auto gap-2 flex justify-between">
        <div className="w-[50%] ">
          <div className="flex">
            <h1 className="font-poppins mb-3 text-sm mr-2">
              {productcapital2}
              {productcapital}
            </h1>
            <h1 className="font-poppins mb-3 text-sm">{" / "}</h1>
            <h1 className="ml-2 font-poppins mb-3 text-sm">
              {Detailcapital2}
              {Detailcapital}
            </h1>
            <h1></h1>
          </div>
          <ImageDetail image={product?.foto} />
        </div>
        <div className="w-[50%]">
          {product ? <Deskripsi deskripsi={product} /> : null}
        </div>
      </div>
      <div className="mt-10 ">
        <h1 className="font-poppins mb-5 text-lg font-[600]">
          Related Product
        </h1>
        <Relatedproduct kategori={product?.kategori || ""} />
      </div>
    </div>
  );
}
