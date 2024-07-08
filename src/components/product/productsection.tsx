import React from "react";
import Cardproduct from "../card/cardproduct";

export default function Productsection({ product }: { product: any }) {
  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-xl font-[700] font-poppins">
        Rekomendasi Untuk Anda
      </h1>
      <div className="w-full gap-3 grid grid-cols-6">
        {product.map((p: any, i: any) => (
          <div key={i} className="">
            <Cardproduct data={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
