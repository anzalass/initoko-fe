import { OpenKategoriCtx } from "@/context/openKategoriContext";
import { ContextSearch } from "@/context/searchContext";
import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

// interface KategoriModalProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

// export default function KategoriModal({ open, setOpen }: KategoriModalProps) {
export default function KategoriModal() {
  const [allkategori, setallkategori] = useState<any[]>([]);
  const { open, setopen } = useContext(OpenKategoriCtx);
  const GetAllKategoriName = async () => {
    await axios
      .get(`${server}kategori/name`)
      .then((response) => {
        setallkategori(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { filter, setfilter } = useContext(ContextSearch);
  const router = useRouter();
  const HandleClick = (name: any) => {
    setfilter((prevFilter: any) => ({
      ...prevFilter,
      kategori: name,
    }));
    router.push(`/product?cari=`);
  };

  useEffect(() => {
    GetAllKategoriName();
  }, []);
  return (
    <div
      className={`w-full fixed left-0 flex items-center h-screen top-0 bg-[#00000080] z-[999] ${
        open ? "block" : "hidden"
      } `}
    >
      <div className="w-[80%] bg-white mx-auto p-3 relative">
        <IoMdClose
          onClick={() => setopen(false)}
          className="absolute right-2 top-2"
        />
        <h1 className="pl-4 mb-5">Kategori</h1>
        <div className="grid grid-cols-4 px-4 gap-2 mx-auto text-start font-medium text-[15px]">
          {allkategori?.map((d, i) => (
            <h1
              className="cursor-pointer hover:underline"
              onClick={() => HandleClick(d?.name)}
              key={i}
            >
              {d.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}
