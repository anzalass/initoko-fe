import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface NavbarProps {
  menu: boolean;
  setMenu: (menu: boolean) => void;
}

export default function Navbaradmin({ menu, setMenu }: NavbarProps) {
  return (
    <div>
      <RxHamburgerMenu
        className="absolute left-0 "
        size={25}
        onClick={() => setMenu(!menu)}
      />
      {menu ? (
        <div className="absolute font-poppins p-3 z-[500] bg-slate-50 shadow-lg left-0 top-5  ">
          <Link href={"/admin"}>
            {" "}
            <h1 className="mt-3 cursor-pointer">Dashboard</h1>
          </Link>
          <Link href={"/admin/barang"}>
            {" "}
            <h1 className="mt-3 cursor-pointer">Barang</h1>
          </Link>{" "}
          <Link href={"/admin/kategori"}>
            {" "}
            <h1 className="mt-3 cursor-pointer">Kategori</h1>
          </Link>{" "}
          <Link href={"/admin"}>
            {" "}
            <h1 className="mt-3 cursor-pointer">Jumbotron</h1>
          </Link>
          <Link href={"/admin"}>
            {" "}
            <h1 className="mt-3 cursor-pointer">Pesanan</h1>
          </Link>{" "}
        </div>
      ) : null}
    </div>
  );
}
