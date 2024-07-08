import { FaHeart } from "react-icons/fa";
import Cardcart from "../card/cardcart";
import { useContext } from "react";
import { OpenCartCtx } from "@/context/openCartContext";
import { useStoree } from "@/zustand/store";
import { useRouter } from "next/router";

export default function Keranjang() {
  const { opencart, setopencart } = useContext(OpenCartCtx);
  const checkout: any = useStoree((state) => state?.checkout);
  console.log(checkout);

  const deletetocheckout = useStoree((state) => state?.deleteToCheckout);
  const totalll = useStoree((state) => state.totalHargainCheckout);
  const total = useStoree((state) => state.totalHarga);
  const totall = useStoree((state) => state.total);

  const products = useStoree((state) => state?.products);
  // console.log(products);
  const router = useRouter();
  const CheckOut = () => {
    checkout.map((c: any) => deletetocheckout(c.id));
    totalll();
    total();
    router.push("/checkout");
    setopencart(false);
    console.log(totall);
  };

  return (
    <div
      className={`absolute z-[999] transition-all duration-500 ease-in-out  ${
        opencart ? "block  " : "hidden"
      } `}
    >
      <div className="w-full fixed h-screen top-0 left-0 bg-[#000004ba]">
        <div className="w-[35%] p-3  bg-white roundrd-md h-full ">
          <div className="relative ">
            <h1
              className="text-lg font-[600] font-poppins"
              onClick={() => setopencart(false)}
            >
              Keranjang
            </h1>
            <FaHeart className="absolute right-3 top-0" color="red" size={30} />
            <div className="mt-10  overflow-y-scroll h-[80vh] z-[888]">
              {products?.map((p, i) => (
                <div className="" key={i}>
                  <Cardcart cart={p} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[43px] rounded-md bg-blue-500 z-[999] -mt-[px]">
            <button
              onClick={CheckOut}
              className="w-full h-full text-center font-poppins"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
