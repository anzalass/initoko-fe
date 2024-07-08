import Navbaradmin from "@/components/admin/navbaradmin";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { server } from "@/server";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

type ImagesProps = {
  name: string;
  image: any;
};
export default function EditJumbotron() {
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [status, setstatus] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setfoto] = useState("");

  const [image, setImage] = useState<any>(null);
  const router = useRouter();
  const TambahKategori = async (e: any) => {
    e.preventDefault();

    Swal.showLoading();

    try {
      const data: any = new FormData();
      data.append("name", name);
      data.append("status", status);
      data.append("deskripsi", deskripsi);
      data.append("file", image);

      const addkategori = await axios.put(
        `${server}jumbotron/update/${router.query.slug}`,
        data
      );
      if (addkategori.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Jumbotron created successfully",
        });
        router.push("/admin/jumbotron");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "gagal",
      });
    }
  };

  const GetJumbotronByID = async () => {
    try {
      const res = await axios.get(`${server}jumbotron/${router.query.slug}`);
      setName(res.data.data.name);
      setstatus(res.data.data.status);
      setDeskripsi(res.data.data.deskripsi);
      setfoto(res.data.data.foto);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetJumbotronByID();
  }, [router.query.slug]);

  return (
    <div className="w-[97%] mx-auto relative mt-5 h-[200vh]">
      <RxHamburgerMenu
        className="absolute left-0 "
        size={25}
        onClick={() => setMenu(!menu)}
      />
      {menu ? <Navbaradmin menu={menu} setMenu={setMenu} /> : null}
      <div className="">
        <h1 className="ml-8">Edit Jumbotron</h1>
        <div className=" w-11/12 mx-auto mt-10 ">
          <div className="w-[70%] mx-auto">
            <form className="w-full mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="deskripsi"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  onChange={(e) => setDeskripsi(e.target.value)}
                  value={deskripsi}
                  className="shadow-sm bg-gray-50 border h-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Status
                </label>
                <select
                  name=""
                  id=""
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                >
                  <option value="">Pilih status</option>
                  <option value="tidak">tidak</option>
                  <option value="aktif">aktif</option>
                </select>
              </div>

              <label
                className="block mb-4 text-sm  font-medium w-[100px] text-gray-900 border-2 p-3"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className=" w-full hidden text-sm h-[40px] text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={(e: any) => setImage(e.target.files[0])}
              />
              {image ? (
                <div className="">
                  <img src={URL.createObjectURL(image)} alt="" />
                </div>
              ) : null}

              {foto && image === null ? (
                <div className="">
                  <img src={foto} alt="" />
                </div>
              ) : null}

              <button
                type="submit"
                onClick={TambahKategori}
                className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tambah Jumbotron
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
