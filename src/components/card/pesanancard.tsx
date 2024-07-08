import { useRouter } from "next/router";

export default function Pesanancard({ data }: { data: any }) {
  const router = useRouter();
  const Nav = (a: any) => {
    router.push(`/profile/pesanan/${a}`);
  };
  return (
    <div
      className="w-[400px] mt-3  gap-2 p-2 border-[1px] cursor-pointer"
      onClick={() => Nav(data.id)}
    >
      {/* <div className="w-[30%]">
        <img
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          className="w-full h-[135px] object-cover"
          alt=""
        />
      </div> */}
      <div className="w-[70%]">
        <h1 className="font-poppins text-sm font-[600]">{data.id}</h1>
        <h1 className="mt-2 text-sm text-red-500">{data.status}</h1>
        <h1 className="mt-2 text-sm font-medium">{data.status_pembayaran}</h1>
        <h1 className="mt-2 text-sm">Rp{data.harga.toLocaleString()}</h1>
      </div>
    </div>
  );
}
