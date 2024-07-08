import { IoMdCart } from "react-icons/io";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { useContext, useState } from "react";
import { ContextSearch } from "@/context/searchContext";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Kategorimodal from "../kategori/kategorimodal";
import { OpenKategoriCtx } from "@/context/openKategoriContext";
import { OpenCartCtx } from "@/context/openCartContext";
import { useStoree } from "@/zustand/store";
export default function Navbar() {
  const [find, setFind] = useState("");
  const { filter, setfilter } = useContext(ContextSearch);
  const { opencart, setopencart } = useContext(OpenCartCtx);
  const products = useStoree((state) => state?.products);
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: "/product",
      query: { cari: find },
    });
    setfilter((prev: any) => ({
      ...prev,
      cari: "",
    }));
  };
  const { data }: any = useSession();
  const Diskon = () => {
    setfilter((prev: any) => ({
      ...prev,
      filter: "diskon tertinggi",
    }));
  };
  const Terlaris = () => {
    setfilter((prev: any) => ({
      ...prev,
      filter: "laris",
    }));
  };
  const { open, setopen } = useContext(OpenKategoriCtx);
  return (
    <>
      <div className="font-poppins  fixed  z-[888] top-0 ">
        <nav className="bg-white  border-b-[1px] fixed  left-0 right-0 poppins-regular border-gray-200 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a
              href="https://flowbite.com"
              className="flex items-centerspace-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
              {/* <span className="self-center text-2xl   whitespace-nowrap">
              Initoko
            </span> */}
            </a>
            <div className="items-center w-[600px] flex ">
              <div className="w-full font-poppins  mx-auto ">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-3 h-3 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full  p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                    required
                    value={find}
                    onChange={(e) => setFind(e.target.value)}
                  />
                  <button
                    onClick={handleClick}
                    type="submit"
                    className="text-white  absolute end-1 bottom-[5px] bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 "
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className=" items-center flex rtl:space-x-reverse">
              {data?.user ? (
                <div className=" flex space-x-3">
                  <div className="relative">
                    <h1 className="absolute bg-red-500 w-5 h-5 text-[13px] font-medium  text-white -top-2 right-0 text-center rounded-full">
                      {products.length}
                    </h1>
                    <IoMdCart size={30} onClick={() => setopencart(true)} />
                  </div>
                  <BiHeart size={30} />
                  <div className="">
                    <Link href={"/profile"}>
                      <img
                        src={data?.user.image || ""}
                        className=" w-[30px] -mt-1 rounded-full object-cover h-[30px]"
                        alt={data?.user.name || ""}
                      />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="  space-x-[1px]">
                  <Link href={"/auth/masuk"}>
                    <button
                      type="button"
                      className="text-gray-900 font-medium hover:text-white bg-white border border-green-500 focus:outline-none hover:bg-green-500 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-4 py-2 me-2 mb-2 0"
                    >
                      Daftar / Masuk
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <nav className="bg-gray-50 border-b-[1px] ">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center">
                <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                  <Link href={"/"}>
                    <li>
                      <div
                        className="text-gray-900 hover:underline"
                        aria-current="page"
                      >
                        Home
                      </div>
                    </li>
                  </Link>
                  <Link href={"/product?cari="}>
                    <li>
                      <div className="text-gray-900 hover:underline">
                        Product
                      </div>
                    </li>
                  </Link>

                  <li>
                    <div
                      onClick={() => setopen(true)}
                      className="text-gray-900 hover:underline"
                    >
                      Kategori
                    </div>
                  </li>

                  <Link href={"/product?cari="} onClick={Diskon}>
                    <li>
                      <div className="text-gray-900  hover:underline">
                        Diskon
                      </div>
                    </li>
                  </Link>
                  <Link href={"/product?cari="} onClick={Terlaris}>
                    <li>
                      <div className="text-gray-900  hover:underline">
                        Terlaris
                      </div>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </nav>
        </nav>
      </div>
    </>
  );
}
