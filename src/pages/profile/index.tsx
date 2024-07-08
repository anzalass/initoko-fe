import Alamat from "@/components/profile/alamat";
import Profile from "@/components/profile/profile";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Profilepage() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="h-[70vh]  mt-36 w-11/12 mx-auto relative">
      <RxHamburgerMenu
        className="absolute left-0 "
        size={25}
        onClick={() => setMenu(!menu)}
      />
      {menu ? (
        <div className="absolute p-3 bg-slate-50 shadow-lg left-0 top-5  ">
          <h1>Profile</h1>
          <h1 className="mt-3">Alamat</h1>
          <h1 className="mt-3">Pesanan</h1>
        </div>
      ) : null}

      <div className="w-[90%] mx-auto">
        <Profile />
      </div>
    </div>
  );
}
