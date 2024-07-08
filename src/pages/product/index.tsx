import Cardproduct from "@/components/card/cardproduct";
import FilterProduct from "@/components/filterproduct";
import { ContextSearch } from "@/context/searchContext";
import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type AllProduct = {
  id: number;
  name: string;
  harga: number;
  kategori: string;
  tags: string;
  ratings: number;
  foto: any[];
};

export default function Productlist() {
  const [allproduct, setallproduct] = useState<AllProduct[]>([]);
  // const [filterrr, setfilterrr] = useState("");
  // const [cari, setcari] = useState("");
  // const [kategori, setkategori] = useState("Fashion Wanita");
  // const [min, setmin] = useState(0);
  // const [max, setmax] = useState(0);
  const { filter, setfilter } = useContext(ContextSearch);
  const router = useRouter();
  const searchterm = router.query.cari;
  const kategori = router.query.kategori;
  const GetAllProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/product/all?min=${filter.min}&max=${filter.max}&cari=${searchterm}&kategori=${filter.kategori}&filter=${filter.filter}`
      );
      setallproduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const filter = {
  //   min,
  //   setmin: (value: number) => setmin(value),
  //   max,
  //   setmax: (value: number) => setmax(value),
  //   filterrr,
  //   setfilterrr: (value: string) => setfilterrr(value),
  // };

  const deletekategori = () => {
    setfilter((prev: any) => ({
      ...prev,
      kategori: "",
    }));
  };

  useEffect(() => {
    GetAllProduct();
  }, [filter.min, filter.max, filter.filter, searchterm, filter.kategori]);
  return (
    <div className="w-full flex font-poppins  bg-white ">
      <div className="w-full mx-auto flex">
        <div className="w-[20%] bg-white  mt-[120px] p-2">
          <div className="w-[90%]">
            <div className="px-2">
              <FilterProduct />
            </div>
          </div>
        </div>
        <div className="w-[90%]  mt-[140px] bg-blackl">
          <h1 className="flex ">
            Product{" "}
            {filter.kategori !== "" ? (
              <span className="flex ml-2 relative">
                Kategori : {filter.kategori}{" "}
                <IoMdClose
                  className=" mt-1 ml-2 cursor-pointer"
                  onClick={deletekategori}
                />{" "}
              </span>
            ) : null}
          </h1>
          <div className="grid w-full grid-cols-5 gap-3">
            {allproduct.map((p: any, i: any) => (
              <div className="" key={i}>
                <Cardproduct data={p} />
              </div>
            ))}
          </div>
          <div className="h-[500px]"></div>
        </div>
      </div>
    </div>
  );
}
