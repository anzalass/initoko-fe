import { useContext, useEffect, useState } from "react";
import Alamatcard from "./alamatcard";
import axios from "axios";
import {
  desaurl,
  kabupatenurl,
  kecamatanurl,
  provinsiurl,
  server,
} from "@/server";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { EditAlamatCtx } from "@/context/alamatContext";
type Provinsi = {
  id: string;
  name: string;
};
type Kabupaten = {
  id: string;
  id_provinsi: string;
  name: string;
};
type Kecamatan = {
  id: string;
  id_kabupaten: string;
  name: string;
};
type Desa = {
  id: string;
  id_kecamatan: string;
  name: string;
};

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

export default function Alamat() {
  const [provinsi, setprovinsi] = useState<Provinsi[]>([]);
  const [kabupaten, setkabupaten] = useState<Kabupaten[]>([]);
  const [kecamatan, setkecamatan] = useState<Kecamatan[]>([]);
  const [desa, setdesa] = useState<Desa[]>([]);
  const [prov, setprov] = useState("");
  const [kab, setkab] = useState("");
  const [kec, setkec] = useState("");
  const [des, setdes] = useState("");
  const [provid, setprovid] = useState("");
  const [kabid, setkabid] = useState("");
  const [kecid, setkecid] = useState("");
  const [desid, setdesid] = useState("");
  const [namapenerima, setnamapenerima] = useState("");
  const [nowa, setnowa] = useState("");
  const [alamatlengkap, setalamatlengkap] = useState("");
  const [alamatuser, setalamatuser] = useState<AlamatUser[]>([]);
  const { idalamat, setidalamat } = useContext(EditAlamatCtx);
  const [render, setrender] = useState(false);

  const GetProvinsi = async () => {
    const res = await fetch(
      `${provinsiurl}${process.env.NEXT_PUBLIC_BINDERBYTE_API}`
    );
    const data = await res.json();

    setprovinsi(data.value);
  };
  useEffect(() => {
    GetProvinsi();
  }, []);

  const GetKabupaten = async () => {
    const res = await fetch(
      `${kabupatenurl}${process.env.NEXT_PUBLIC_BINDERBYTE_API}&id_provinsi=${provid}`
    );
    const data = await res.json();

    setkabupaten(data.value);
  };
  useEffect(() => {
    GetKabupaten();
  }, [provid]);

  const GetKecamatan = async () => {
    const res = await fetch(
      `${kecamatanurl}${process.env.NEXT_PUBLIC_BINDERBYTE_API}&id_kabupaten=${kabid}`
    );
    const data = await res.json();
    setkecamatan(data.value);
  };
  useEffect(() => {
    GetKecamatan();
  }, [kabid]);

  const GetDesa = async () => {
    const res = await fetch(
      `${desaurl}${process.env.NEXT_PUBLIC_BINDERBYTE_API}&id_kecamatan=${kecid}`
    );
    const data = await res.json();
    setdesa(data.value);
  };
  useEffect(() => {
    GetDesa();
  }, [kecid]);

  const Daerah = () => {
    const provname: any = provinsi?.find((p) => p.id === provid);
    const kabname: any = kabupaten?.find((k) => k.id === kabid);
    const kecname: any = kecamatan?.find((k) => k.id === kecid);
    const desname: any = desa?.find((d) => d.id === desid);
    setdes(desname?.name);
    setkab(kabname?.name);
    setkec(kecname?.name);
    setprov(provname?.name);
  };

  useEffect(() => {
    Daerah();
  }, [provid, kabid, kecid, desid]);

  const CreateAlamat = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}alamat/create`, {
        id_user: data?.user?.id || null,
        email: data?.user?.email,
        name: namapenerima,
        no_whatsapp: nowa,
        desa: des,
        kecamatan: kec,
        kabupaten: kab,
        provinsi: prov,
        alamat_lengkap: alamatlengkap,
      });
      Swal.fire({
        text: res.data.message,
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      setrender(true);
      setnamapenerima("");
      setalamatlengkap("");
      setnowa("");
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "error",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  const { data }: any = useSession();
  console.log(data?.user?.id);

  const GetAlamatByEmail = async () => {
    try {
      const res = await axios.get(`${server}user/alamat/${data?.user?.email}`);
      setalamatuser(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAlamatByEmail();
  }, [data, render]);

  const GetAlamatByID = async () => {
    try {
      const res = await axios.get(`${server}alamat/${idalamat}`);
      setalamatlengkap(res.data.data.alamat_lengkap);
      setnamapenerima(res.data.data.name);
      setnowa(res.data.data.no_whatsapp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAlamatByID();
  }, [idalamat]);

  const EditAlamatByID = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${server}alamat/update/${idalamat}`, {
        id_user: data?.user?.id,
        email: data?.user?.email,
        name: namapenerima,
        no_whatsapp: nowa,
        desa: des,
        kecamatan: kec,
        kabupaten: kab,
        provinsi: prov,
        alamat_lengkap: alamatlengkap,
      });

      if (res.status === 201) {
        setnamapenerima("");
        setalamatlengkap("");
        setnowa("");
        Swal.fire({
          icon: "success",
          text: "Berhasil Mengubah Alamat",
        });
        setrender(true);
      }
    } catch (error) {
      console.log(error);
    }
    // setrender(false);
  };

  return (
    <div className="w-full  flex justify-between ">
      <div className="mt-[50px] w-[50%]">
        <h1>Alamat {idalamat} </h1>
        <div className="flex gap-2 mt-3">
          <div className="">
            <select
              value={provid}
              onChange={(e) => setprovid(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Provinsi</option>
              {provinsi?.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select
              value={kabid}
              onChange={(e) => setkabid(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Kabupaten / Kota</option>
              {kabupaten?.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select
              value={kecid}
              onChange={(e) => setkecid(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Kecamatan</option>
              {kecamatan?.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <select
              id="countries"
              value={desid}
              onChange={(e) => setdesid(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Desa</option>
              {desa?.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <form className="max-w-sm">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nama Penerima
              </label>
              <input
                type="text"
                value={namapenerima}
                onChange={(e) => setnamapenerima(e.target.value)}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                No WhatsApp
              </label>
              <input
                value={nowa}
                onChange={(e) => setnowa(e.target.value)}
                type="number"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Alamat Lengkap
            </label>
            <textarea
              value={alamatlengkap}
              onChange={(e) => setalamatlengkap(e.target.value)}
              id="message"
              className="block p-2.5 w-full text-sm mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            {idalamat ? (
              <button
                type="submit"
                onClick={EditAlamatByID}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Alamat
              </button>
            ) : (
              <button
                type="submit"
                onClick={CreateAlamat}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tambah Alamat
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="mt-10 w-[45%] pb-20">
        {alamatuser?.map((a, i) => (
          <div className="" key={i}>
            <Alamatcard alamat={a} />
          </div>
        ))}
      </div>
    </div>
  );
}
