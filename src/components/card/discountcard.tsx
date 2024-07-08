import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Discountcard({ data }: { data: any }) {
  const [sisa, setsisa] = useState(0);
  const router = useRouter();
  const Tersisa = () => {
    const res = (data.terjual / data.stok) * 100;
    setsisa(res);
  };

  useEffect(() => {
    Tersisa();
  }, []);
  const Navigasi = () => {
    router.push(`/product/detail/${data.id}`);
  };

  return (
    <div
      onClick={Navigasi}
      className="w-[200px] h-[265px] z-50 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700"
    >
      <a href="#">
        <img
          className="rounded-t-lg h-[150px] w-[200px] object-contain"
          src={data.foto[0].url}
          alt={data.foto[0].url}
        />
      </a>
      <div className="p-2 w-full ">
        <h5 className="mb-1 text-sm  tracking-tight text-gray-900 ">
          {data.name.length > 25 ? data.name.slice(0, 25) + "..." : data.name}
        </h5>

        <p className="mb-3  font-[700] text-gray-700 ">
          {data.harga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}{" "}
          <span className="text-red-500 text-[13px]">{data.diskon}%</span>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 ">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${sisa}%` }}
          ></div>
          <h1 className="font-medium text-sm mt-1">
            Tersisa {data.stok - data.terjual}
          </h1>
        </div>
      </div>
    </div>
  );
}
