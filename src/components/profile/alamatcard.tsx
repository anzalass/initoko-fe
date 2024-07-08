import { EditAlamatCtx } from "@/context/alamatContext";
import { server } from "@/server";
import axios from "axios";

import { useContext } from "react";
import { BiPencil } from "react-icons/bi";
import { CiTrash } from "react-icons/ci";

type AlamatUser = {
  id: number;
  name: string;
  no_whatsapp: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  Provinsi: string;
  alamat_lengkap: string;
};

export default function Alamatcard({ alamat }: { alamat: AlamatUser }) {
  const { idalamat, setidalamat } = useContext(EditAlamatCtx);
  const DeleteAlamatByID = async (id: any) => {
    await axios.delete(`${server}alamat/delete/${id}`).then((res) => {
      window.location.reload();
    });
  };
  return (
    <div>
      <div className="block mt-3 w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  ">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
          {alamat.name}
        </h5>
        <h5>{alamat.no_whatsapp}</h5>
        <h5>
          {alamat.Provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{" "}
          {alamat.desa}
        </h5>
        <p className="font-normal text-gray-700 ">{alamat.alamat_lengkap}</p>
        <div className=" flex gap-2 mt-3">
          <CiTrash
            size={25}
            color="red"
            onClick={() => DeleteAlamatByID(alamat.id)}
          />
          <BiPencil
            size={25}
            color="blue"
            onClick={() => setidalamat(alamat.id)}
          />
        </div>
      </div>
    </div>
  );
}
