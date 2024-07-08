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
  url: string;
};
export default function Editbarang() {
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [harga, setHarga] = useState<number>(0);
  const [diskon, setDiskon] = useState<number>(0);
  const [kategori, setKategori] = useState("");
  const [allkategori, setAllkategori] = useState<any>([]);
  const [tags, setTags] = useState("");
  const [stok, setStok] = useState(0);
  const [image, setImage] = useState<any>(null);
  const [content, setContent] = useState<string>("");

  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();
  console.log(router.query.slug);

  const GetAllKategori = async () => {
    try {
      const data = await axios.get(`${server}kategori/all`);
      setAllkategori(data.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    GetAllKategori();
  }, []);

  const GetBarangById = async () => {
    try {
      const data = await axios.get(`${server}product/${router.query.slug}`);
      setName(data.data.data.name);
      setHarga(data.data.data.harga);
      setDiskon(data.data.data.diskon);
      setStok(data.data.data.stok);
      setTags(data.data.data.tags);
      setKategori(data.data.data.kategori);
      setContent(data.data.data.deskripsi);
      console.log(data.data.data.deskripsi);
      setImages(data.data.data.foto);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  useEffect(() => {
    GetBarangById();
  }, [router.query.slug]);

  const EditBarang = async (e: any) => {
    e.preventDefault();
    Swal.showLoading();

    try {
      const data: any = new FormData();
      data.append("name", name);
      data.append("harga", harga);
      data.append("diskon", diskon);
      data.append("kategori", kategori);
      data.append("deskripsi", content);
      data.append("tags", tags);
      data.append("stok", stok);
      data.append("dibuat_oleh", "aku");

      const updatebarang = await axios.put(
        `${server}product/update/${router.query.slug}`,
        data
      );
      if (updatebarang.status === 200) {
        router.push("/admin/barang");
      }
      Swal.hideLoading();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Menugpdate barang",
      });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.error,
      });
    }
  };

  return (
    <div className="w-[97%] mx-auto relative mt-5 h-[200vh]">
      <RxHamburgerMenu
        className="absolute left-0 "
        size={25}
        onClick={() => setMenu(!menu)}
      />
      {menu ? <Navbaradmin menu={menu} setMenu={setMenu} /> : null}
      <div className="">
        <h1 className="ml-8">Barang</h1>
        <div className=" w-11/12 mx-auto mt-10 ">
          <div className="w-[70%] mx-auto">
            <form className="w-full mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="nama_barang"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  id="nama_barang"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="harga_barang"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Harga Barang
                </label>
                <input
                  type="number"
                  id="harga_barang"
                  value={harga}
                  onChange={(e) => setHarga(parseInt(e.target.value))}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="discount"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Discount
                </label>
                <input
                  value={diskon}
                  onChange={(e) => setDiskon(parseInt(e.target.value))}
                  type="number"
                  id="discount"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="stok"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Stok
                </label>
                <input
                  type="number"
                  value={stok}
                  onChange={(e) => setStok(parseInt(e.target.value))}
                  id="stok"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="tags"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
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
                  Kategori
                </label>
                <select
                  name=""
                  id=""
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                >
                  <option value="">Pilih Kategori</option>
                  {allkategori &&
                    allkategori?.map((k: any, i: any) => (
                      <option value={k.name} key={i}>
                        {k.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-[60%] justify-start overflow-x-auto flex">
                {images &&
                  images?.map((i) => (
                    <>
                      <div className="w-full relative ">
                        <img
                          src={i.url}
                          className="rounded-md ml-3 h-[200px] px-2 w-[200px] object-cover "
                          alt=""
                        />
                      </div>
                    </>
                  ))}
              </div>
              <div className="mb-5 mt-5">
                <label
                  htmlFor="deskripsi"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Deskripsi
                </label>
                <div className="w-full m">
                  {content === "" ? null : (
                    <Tiptap
                      content={content}
                      onChange={(newContent: string) => setContent(newContent)}
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                onClick={EditBarang}
                className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Barang
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
