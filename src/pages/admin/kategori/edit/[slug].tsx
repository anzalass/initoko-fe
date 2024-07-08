import Navbaradmin from "@/components/admin/navbaradmin";
import Tiptap from "@/components/tiptap/Tiptap";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { server } from "@/server";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

type ImagesProps = {
  name: string;
  image: any;
};
export default function EditKategori() {
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [tipe, setTipe] = useState("");
  const [foto, setfoto] = useState("");

  const [image, setImage] = useState<any>(null);
  const router = useRouter();
  const TambahKategori = async (e: any) => {
    e.preventDefault();

    Swal.showLoading();

    try {
      const data: any = new FormData();
      data.append("name", name);
      data.append("tipe", tipe);
      data.append("file", image);

      const addkategori = await axios.put(
        `${server}kategori/update/${router.query.slug}`,
        data
      );
      if (addkategori.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Kategori created successfully",
        });
        router.push("/admin/kategori");
      }
    } catch (error) {
      console.log(error);
      // Swal.fire({
      //   icon: "error",
      //   text: error,
      // });
    }
  };

  const GetKategoriById = async () => {
    try {
      const res = await axios.get(`${server}kategori/${router.query.slug}`);
      if (res.status === 200) {
        setName(res.data.data.name);
        setTipe(res.data.data.tipe);
        setfoto(res.data.data.foto);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetKategoriById();
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
        <h1 className="ml-8">Tambah Kategori</h1>
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
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Tipe
                </label>
                <select
                  name=""
                  id=""
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                >
                  <option value="">Pilih tipe</option>
                  <option value="inti">inti</option>
                  <option value="tidak">tidak</option>
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

              {image && foto !== "" ? (
                <div className="">
                  <img src={URL.createObjectURL(image)} alt="" />
                </div>
              ) : null}
              {foto && image == null ? (
                <div className="">
                  <img src={foto} alt="" />
                </div>
              ) : null}

              <button
                type="submit"
                onClick={TambahKategori}
                className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Kategori
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
