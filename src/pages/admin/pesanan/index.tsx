import Navbaradmin from "@/components/admin/navbaradmin";
import TabelBarang from "@/components/tabel/tabelbarang";
import TabelPesanan from "@/components/tabel/tabelpesanan";
import { RenderTableUser } from "@/context/renderTable";
import { server } from "@/server";
import { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
type PesananType = {
  id: string;
  nama_user: string;
  harga: number;
  status: number;
  status_pembayaran: string;
};
export default function PesananAdmin() {
  const [menu, setMenu] = useState<boolean>(false);
  const { render, setRender } = useContext(RenderTableUser);
  const [pesanan, setpesanan] = useState<PesananType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}pesanan`);
      const response = await res.json();
      setpesanan(response.data);
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
        <h1 className="ml-8">Barang</h1>
        <div className=" w-11/12 mx-auto mt-10">
          <div className="">
            {/* <button className="px-3 py-2 border-[1px] border-black">
              Tambah Barang +
            </button> */}
          </div>
          {pesanan && <TabelPesanan barang={pesanan} />}
        </div>
      </div>
    </div>
  );
}
