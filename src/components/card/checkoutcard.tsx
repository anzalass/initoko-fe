import { useStoree } from "@/zustand/store";
import { HiOutlineTrash } from "react-icons/hi";

export default function CheckoutCard({ data }: { data: any }) {
  const remove = useStoree((state) => state?.deleteInCheckout);
  const checkout = useStoree((state) => state?.checkout);

  return (
    <div className="w-[400px] relative mt-3 flex gap-2 p-2 border-[1px] ">
      <HiOutlineTrash
        onClick={() => remove(data.id)}
        className="right-5 bottom-7 absolute"
        size={26}
      />
      <div className="w-[30%]">
        <img src={data.img} className="w-full h-[135px] object-cover" alt="" />
      </div>
      <div className="w-[70%]">
        <h1 className="font-poppins text-sm font-[600]">{data.title}</h1>

        <h1 className="mt-2 text-sm">x{data.qty}</h1>
        <h1 className="mt-2 text-sm">
          {data.price.toLocaleString("id-ID", {
            currency: "IDR",
            style: "currency",
          })}
        </h1>
      </div>
    </div>
  );
}
