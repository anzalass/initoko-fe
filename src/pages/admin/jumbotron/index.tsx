import Navbaradmin from "@/components/admin/navbaradmin";
import { RenderTableUser } from "@/context/renderTable";
import { server } from "@/server";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

type JumbotronType = {
  id: number;
  name: string;
  deskripsi: string;
  status: string;
  foto: string;
};

export default function Jumbotron() {
  const [menu, setMenu] = useState<boolean>(false);
  const { render, setRender } = useContext(RenderTableUser);

  const [jumbotron, setjumbotron] = useState<JumbotronType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}jumbotron/all`);
      const response = await res.json();
      setjumbotron(response.data);
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
        <h1 className="ml-8">Jumbotron</h1>
        <div className=" w-11/12 mx-auto mt-10">
          <div className="">
            <button className="px-3 py-2 border-[1px] border-black">
              Tambah Jumbotron +
            </button>
          </div>
          <div className="w-[85%] mt-5 mx-auto">
            {jumbotron &&
              jumbotron.map((j, i) => (
                <div className="w-full mt-5" key={i}>
                  <img
                    src={j.foto}
                    className="w-full h-[250px] border-2  object-cover "
                    alt=""
                  />
                  <div className="flex gap-3 ">
                    <Link href={`/admin/jumbotron/edit/${j.id}`}>
                      <button className="underline text-blue-500">Edit</button>
                    </Link>
                    <button className="underline text-red-500">Hapus</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
