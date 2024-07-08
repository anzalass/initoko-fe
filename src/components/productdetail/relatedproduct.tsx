import React, { useEffect, useState } from "react";
import Cardproduct from "../card/cardproduct";
import { server } from "@/server";
import axios from "axios";

export default function Relatedproduct({ kategori }: { kategori: any }) {
  const [product, setproduct] = useState<any[]>([]);
  const RelatedProduct = async () => {
    try {
      const res = await fetch(`${server}product/related/${kategori}`);
      const data = await res.json();
      setproduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    RelatedProduct();
  }, [kategori]);
  return (
    <div className="w-full gap-3 grid grid-cols-6 mb-20">
      {product?.map((p: any, i: any) => (
        <div className="" key={i}>
          <Cardproduct data={p} />
        </div>
      ))}
      {/* <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct />
      <Cardproduct /> */}
    </div>
  );
}
