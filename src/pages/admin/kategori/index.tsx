import Navbaradmin from "@/components/admin/navbaradmin";
import TabelKategori from "@/components/tabel/tabelkategori";
import { RenderTableUser } from "@/context/renderTable";
import { server } from "@/server";
import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

type KategoriType = {
  id: number;
  name: string;
  tipe: string;
  foto: string;
  created_at: string;
};

export default function Kategori() {
  const [menu, setMenu] = useState<boolean>(false);
  const { render, setRender } = useContext(RenderTableUser);
  const [kategori, setkategori] = useState<KategoriType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}kategori/all`);
      const response = await res.json();
      setkategori(response.data);
    }
    fetchData();
  }, [render]);
  return (
    <div className="w-[97%] mx-auto relative mt-5">
      <RxHamburgerMenu
        className="absolute left-0 "
        size={25}
        onClick={() => setMenu(!menu)}
      />
      {menu ? <Navbaradmin menu={menu} setMenu={setMenu} /> : null}
      <div className="">
        <h1 className="ml-8">Kategori</h1>
        <div className=" w-11/12 mx-auto mt-10">
          <div className="">
            <button className="px-3 py-2 border-[1px] border-black">
              Tambah Kategori +
            </button>
          </div>
          {kategori && <TabelKategori kategori={kategori} />}
        </div>
      </div>
    </div>
  );
}
