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

type KategoriType = {
  id: number;
  name: string;
};
export default function Tambahbarang() {
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [harga, setHarga] = useState<number>(0);
  const [allkategori, setAllKategori] = useState<KategoriType[]>([]);
  const [diskon, setDiskon] = useState<number>(0);
  const [kategori, setKategori] = useState("");
  const [tags, setTags] = useState("");
  const [stok, setStok] = useState(0);

  const [image, setImage] = useState<any>(null);
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const [images, setImages] = useState<ImagesProps[]>([]);

  const hapusGambar = (e: any) => {
    const del = images.filter((img) => img.name !== e);
    setImages(del);
  };

  const addGambar = (e: any) => {
    e.preventDefault();
    setImages((prevImages: ImagesProps[]) => [
      ...prevImages,
      {
        name: image.name,
        image: image,
      },
    ]);
    setImage(null);
  };

  const GetAllKategori = async () => {
    try {
      const data = await axios.get(`${server}kategori/all`);
      setAllKategori(data.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    GetAllKategori();
  }, []);

  const router = useRouter();
  const TambahBarang = async (e: any) => {
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

      const addbarang = await axios.post(`${server}product/create`, data);

      const formfoto = new FormData();

      images.forEach((i: any) => {
        formfoto.append("idproduct", addbarang.data.data.id);
        formfoto.append("files", i.image);
      });
      const addfoto = await axios.post(`${server}product/foto`, formfoto);
      router.push("/admin/barang");
      Swal.hideLoading();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "gagal",
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
                    allkategori?.map((k, i) => (
                      <option value={k.name} key={i}>
                        {k.name}
                      </option>
                    ))}
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
                  <button
                    className="p-2 border-2"
                    onClick={(e: any) => addGambar(e)}
                  >
                    +
                  </button>
                </div>
              ) : null}
              <div className="w-[60%] justify-start overflow-x-auto flex">
                {images &&
                  images?.map((i) => (
                    <>
                      <div className="w-full relative ">
                        <img
                          src={URL.createObjectURL(i.image)}
                          className="rounded-md ml-3 h-[200px] px-2 w-[200px] object-cover "
                          alt=""
                        />
                        <div
                          onClick={() => hapusGambar(i.name)}
                          className="absolute left-5 rounded-lg text-center pb-1    top-0 h-[25px] w-[20px] bg-red-600 text-white"
                        >
                          <h1>X</h1>
                        </div>
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
                  <Tiptap
                    content={content}
                    onChange={(newContent: string) =>
                      handleContentChange(newContent)
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={TambahBarang}
                className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tambah Barang
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
