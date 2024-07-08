import { BsBoxSeam } from "react-icons/bs";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuCopyCheck } from "react-icons/lu";
import BayarCard from "@/components/card/bayarcart";
import { server } from "@/server";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function DetailPesananAdmin() {
  const [detailpesanan, setdetailpesanan] = useState<any>();
  const [resi, setresi] = useState("");

  const router = useRouter();
  const GetPesananById = async () => {
    const data = await fetch(`${server}pesanan/detail/${router.query.slug}`);
    const data2 = await data.json();
    setdetailpesanan(data2.data);
    console.log(detailpesanan);
  };

  useEffect(() => {
    GetPesananById();
  }, [router.query.slug]);

  const Bayar = (a: any) => {
    window.location.href = a;
  };

  const InputResi = async (e: any) => {
    await axios
      .put(`${server}pesanan/inputresi/${router.query.slug}`, {
        resi: resi,
      })
      .then((res) => {
        Swal.fire({
          text: "berhasil",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-11/12 mx-auto mt-36">
      <div className="flex w-[70%] justify-between jus mx-auto h-screen">
        <div className="">
          <div className="">
            <h1 className="font-medium">Harga</h1>
            <h1 className="text-4xl font-medium">
              Rp{detailpesanan?.harga.toLocaleString()}
            </h1>
          </div>
          <div className="mt-3">
            <h1 className="font-medium mt-5">Status</h1>
            <h1>{detailpesanan?.status}</h1>
            <h1 className="font-medium mt-5">Status Pembayaran</h1>
            <h1>{detailpesanan?.status_pembayaran}</h1>
            <h1 className="font-medium mt-5">Nama Penerima</h1>
            <h1>{detailpesanan?.nama_user}</h1>
            <h1 className="font-medium mt-5">Alamat Penerima</h1>
            <h1 className="w-[300px]">{detailpesanan?.alamat}</h1>
            <h1 className="font-medium mt-5">Resi</h1>
            {detailpesanan?.status === "sedang dikirim" ? (
              detailpesanan?.resi
            ) : (
              <div className="">
                <input
                  type="text"
                  placeholder="masukan resi"
                  className="p-2 border-2 pl-2"
                  value={resi}
                  onChange={(e: any) => setresi(e.target.value)}
                />
                <button onClick={InputResi} className="p-2 border-2">
                  masukan
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="">
          {detailpesanan?.product &&
            detailpesanan?.product.map((d: any, i: any) => (
              <div className="" key={i}>
                <BayarCard data={d} />
              </div>
            ))}
        </div>
      </div>
      {/* <div className="w-[50%] mx-auto">
        <h1 className="font-poppins">Detail Pesanan</h1>
        <div className="w-full min-h-screen mt-10">
          <div className=" flex gap-6 w-full justify-between">
            <HiMiniClipboardDocumentList size={26} />
            <BsBoxSeam size={40} />
            <CiDeliveryTruck size={40} />
            <LuCopyCheck size={40} />
          </div>
          <div className="mt-6">
            <img
              alt=""
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              className="w-[200px] h-[200px]  border-2 p-2 object-cover mx-auto rounded-md"
            />
          </div>
          <div className="mt-5">
            <div className="">
              <h1 className="font-[600]">ID Pesanan</h1>
              <h1>0101-101001-01001-0101</h1>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">Nama Barang</h1>
              <h1>
                Iphone Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quia, veritatis?
              </h1>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">Quantity</h1>
              <h1>x4</h1>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">Total Harga</h1>
              <h1>Rp70.000.000</h1>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">Status</h1>

              <h1>Sedang Dikirim</h1>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">No Resi</h1>
              <h1>JPX32423423</h1>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">Metode Pembayaran</h1>

              <h1>Transfer</h1>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">Alamat</h1>

              <h1>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora, vel aliquam aspernatur dolor non maxime quod nisi
                commodi, provident corrupti repellat. Laborum cupiditate eos
                aliquid vel commodi, non dolorum provident.
              </h1>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
