import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { GiBleedingEye } from "react-icons/gi";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
export default function CardWishlist({ data }: { data: any }) {
  const [diskon, setDiskon] = useState(0);
  const router = useRouter();
  const Potongan = () => {
    const res = (data.diskon / 100) * data.harga;
    setDiskon(data.harga - res);
  };

  useEffect(() => {
    Potongan();
  }, [data]);

  const Navigasi = () => {
    router.push(`/product/detail/${data.id_product}`);
  };

  const DeleteWishlist = async () => {
    await axios
      .delete(`${server}wishlist/delete/${data?.id}`)
      .then((response) => {
        Swal.fire({
          text: "Behasil Menghapus",
        });
        window.location.reload();
      });
  };
  return (
    <div
      onClick={Navigasi}
      className="w-[210px] mx-auto h-[320px] hover:border-[2px] bg-[#fff] mt-5 shadow-md hover:shadow-lg rounded-lg "
    >
      <div className="w-full mx-auto">
        <div className="w-full mx-auto p-1">
          <img
            src={data.foto}
            alt=""
            className="w-full object-contain h-[200px] rounded-lg"
          />
        </div>
        <div className="w-full p-2 -mt-1 mb-3">
          <p className="text-sm">
            {data.name.length > 25 ? data.name.slice(0, 25) + "..." : data.name}
          </p>
          <h1 className="font-Poppins mt-2 font-[600]">
            {data.harga.toLocaleString("id-ID", {
              currency: "IDR",
              style: "currency",
            })}
          </h1>
          {/* <div className="flex">
            <p className="text-xs text-gray-500 line-through">
              {" "}
              {data.harga.toLocaleString("id-ID", {
                currency: "IDR",
                style: "currency",
              })}
            </p>
            <p className="text-red-500 text-[11px] rounded-sm font-[600] ml-2">
              {data.diskon}%
            </p>
          </div> */}
          {/* {data.ratings === 0 ? (
            <p className="text-xs mt-2 font-medium">Belum Ada Rating</p>
          ) : (
            <div className={` relative mt-2 flex`}>
              <FaStar size={14} color="gold" />{" "}
              <p className={`text-xs ml-1 text-gray-400`}>{data.ratings}/5</p>
            </div>
          )} */}
          <div className="flex mt-2">
            {/* <GiBleedingEye size={20} /> */}
            <HiOutlineTrash
              size={25}
              onClick={DeleteWishlist}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
