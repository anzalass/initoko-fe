import Cardproduct from "@/components/card/cardproduct";
import FilterProduct from "@/components/filterproduct";
import { server } from "@/server";
import axios from "axios";
import { useEffect, useState } from "react";

type AllProduct = {
  id: number;
  name: string;
  harga: number;
  kategori: string;
  tags: string;
  ratings: number;
  foto: any[];
};

export default function ProductlistCari() {
  const [allproduct, setallproduct] = useState<AllProduct[]>([]);
  const [filterrr, setfilterrr] = useState("");
  const [cari, setcari] = useState("");
  const [kategori, setkategori] = useState("");
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const GetAllProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/product/all?min=${min}&max=${max}&cari=${cari}&kategori=${kategori}&filter=${filterrr}`
      );
      setallproduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filter = {
    min,
    setmin: (value: number) => setmin(value),
    max,
    setmax: (value: number) => setmax(value),
    filterrr,
    setfilterrr: (value: string) => setfilterrr(value),
  };

  useEffect(() => {
    GetAllProduct();
  }, [min, max, filterrr]);
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
          <h1>
            Product {min}-{max}-{filterrr}-
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
