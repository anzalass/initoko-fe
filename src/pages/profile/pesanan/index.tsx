import PesananComponent from "@/components/profile/pesanan";
import { server } from "@/server";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Pesanan() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="w-11/12 mx-auto mt-36 min-h-screen relative">
      <RxHamburgerMenu
        className="absolute left-0 "
        size={25}
        onClick={() => setMenu(!menu)}
      />
      {menu ? (
        <div className="absolute p-3 bg-slate-50 shadow-lg left-0 top-5  ">
          <h1>Profile</h1>
          <h1 className="mt-3">Pesanan</h1>
        </div>
      ) : null}

      <h1 className="font-poppins text-lg ml-10">Pesanan</h1>
      <div className="">
        {/* {pesanan &&
          pesanan?.map((p, i) => (
            <div className="" key={i}>
            </div>
          ))} */}
        <PesananComponent />
      </div>
    </div>
  );
}
