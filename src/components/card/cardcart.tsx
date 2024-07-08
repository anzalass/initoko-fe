import { useStoree } from "@/zustand/store";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

type CartDetail = {
  email: string;
  id: number;
  price: number;
  qty: number;
  title: string;
  img: string;
};
export default function Cardcart({ cart }: { cart: CartDetail }) {
  const increment = useStoree((state) => state?.incrementProduct);
  const decrement = useStoree((state) => state?.decrementProduct);
  const remove = useStoree((state) => state?.removeProduct);
  const totall = useStoree((state) => state?.totalHarga);
  const checkoutarray = useStoree((state) => state?.checkout);
  const addcheckout = useStoree((state) => state?.addCheckout);
  const removecheckout = useStoree((state) => state?.removeCheckout);
  const [check, setCheck] = useState(false);
  const [array, setArray] = useState<any>([]);
  const HandleCheck = () => {
    setCheck((prevCheck) => {
      const newCheck = !prevCheck;
      if (newCheck) {
        const checkout: any = {
          title: cart.title,
          price: cart.price,
          qty: cart.qty,
          id: cart.id,
          img: cart.img,
        };
        addcheckout(checkout);
      } else {
        removecheckout(cart.id);
      }
      return newCheck;
    });
  };

  return (
    <div>
      <div className="flex max-w-md mx-auto  mb-3 overflow-hidden bg-slate-50 shadow-lg">
        <div className="w-[5%] p-2 bg-cover bg-landscape">
          <div className="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              checked={check}
              onChange={HandleCheck}
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div className="w-[30%] p-1 bg-cover bg-landscape">
          <img
            src={cart.img}
            alt=""
            className=" object-cover w-[130px] h-[130px]"
          />
        </div>
        <div className="w-[70%] relative py-5 px-2 bg-slate-50">
          <HiOutlineTrash
            onClick={() => remove(cart.id)}
            className="right-5 bottom-7 absolute"
            size={26}
          />
          <h1 className="text-[15px] font-poppins  text-gray-900">
            {cart.title}
          </h1>
          <h1 className="text-[17px] font-bold text-gray-900">
            {(cart.price * cart.qty).toLocaleString("id-ID", {
              currency: "IDR",
              style: "currency",
            })}
          </h1>
          <div className="border-[1px] px-3 font-poppins rounded-md flex mt-2 w-[40%] justify-between">
            <h1 className="cursor-pointer" onClick={() => decrement(cart.id)}>
              -
            </h1>
            <h1>{cart.qty}</h1>
            <h1 className="cursor-pointer" onClick={() => increment(cart.id)}>
              +
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
