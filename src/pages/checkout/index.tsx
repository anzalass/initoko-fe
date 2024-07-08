import CheckoutCard from "@/components/card/checkoutcard";
import Pesanancard from "@/components/card/pesanancard";
import { server } from "@/server";
import { useStoree } from "@/zustand/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type AlamatUser = {
  id: number;
  name: string;
  no_whatsapp: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  Provinsi: string;
  alamat_lengkap: string;
};
export default function Checkout() {
  const [alamatuser, setalamatuser] = useState<AlamatUser[]>([]);
  const [kabnya, setkabnya] = useState<any>();
  const { data }: any = useSession();
  const [listkurir, setlistkurir] = useState<any[]>([]);
  const [ongkirnya, setongkirnya] = useState<any[]>([]);
  const [hargaongkirnya, sethargaongkirnya] = useState(0);
  const [hargabarangnya, sethargabarangnya] = useState(0);
  const remove = useStoree((state) => state?.deleteInCheckout);
  //const storedArray = JSON.parse(localStorage?.getItem("cartstorage"));
  // console.log(storedArray);

  const checkout = useStoree((state) => state?.checkout);
  const [render, setrender] = useState(false);
  const [render2, setrender2] = useState(false);
  const [totalak, settotal] = useState(0);
  const HargaOngkirnya = (data: any) => {
    setrender2(true);
    sethargaongkirnya(Number(data));
  };

  const GetAlamatByEmail = async () => {
    try {
      const res = await axios.get(`${server}user/alamat/${data?.user?.email}`);
      setalamatuser(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [kurir, setkurir] = useState("");
  useEffect(() => {
    GetAlamatByEmail();
  }, [data]);

  const GetKurir = async () => {
    try {
      const res = await fetch(
        `https://api.binderbyte.com/v1/list_courier?api_key=${process.env.NEXT_PUBLIC_BINDERBYTE_API}`
      );
      const data = await res.json();
      setlistkurir(data);
    } catch (error) {
      console.log(error);
    }
  };
  const GetOngkir = async () => {
    setrender(false);
    try {
      const res = await fetch(
        `https://api.binderbyte.com/v1/cost?api_key=${process.env.NEXT_PUBLIC_BINDERBYTE_API}&courier=${kurir}&origin=tangerang&destination=${kabnya}&weight=1&volume=100x100x100`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setongkirnya(data.data.costs);
          console.log("asasa", data.data.costs);
          setrender(true);
          console.log("jkj", ongkirnya);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (checkout.length < 0) {
      window.location.href = "/";
    }
  }, [checkout]);

  console.log(checkout.length);

  const TotalKeseluruhan = () => {
    const total = checkout.reduce((ttl, item) => {
      return ttl + item.price * item.qty;
    }, 0);

    const hargaOngkir = Number(hargaongkirnya);
    const totalKeseluruhan = total + hargaOngkir;

    settotal(totalKeseluruhan);
    console.log(totalKeseluruhan);
    sethargabarangnya(total);
  };

  useEffect(() => {
    GetKurir();
  }, []);
  useEffect(() => {
    TotalKeseluruhan();
  }, [hargaongkirnya, checkout]);

  useEffect(() => {
    GetOngkir();
  }, [kurir, kabnya]);
  const GetKabupaten = () => {
    const regex = /(?:KAB\.|KOTA)\s(.+)/;
    const alamatnya = alamatuser[selectedAddress]?.kabupaten;
    const match1 = alamatnya?.match(regex);
    const kabOrKota1 = match1 ? match1[1] : null;
    const match2 = kabOrKota1?.toLocaleLowerCase();
    setkabnya(match2);
  };

  useEffect(() => {
    GetKabupaten();
  }, [alamatuser[selectedAddress]?.kabupaten]);

  const CreateTransaksi = async () => {
    try {
      let product: any = [];
      checkout.map((c, i) => {
        product.push({
          id_product: c.id,
          nama_product: c.title,
          quantity: c.qty,
          harga: c.price,
          foto: c.img,
        });
      });

      console.log(product);

      const datas = await axios.post(`${server}checkout/create`, {
        id_user: data?.user?.id,
        product: product,
        email: data?.user?.email,
        nama_user: alamatuser[selectedAddress]?.name,
        alamat:
          alamatuser[selectedAddress]?.Provinsi +
          " " +
          alamatuser[selectedAddress]?.kabupaten +
          " " +
          alamatuser[selectedAddress]?.kecamatan +
          " " +
          alamatuser[selectedAddress]?.desa +
          " " +
          alamatuser[selectedAddress]?.alamat_lengkap,
        harga: hargabarangnya,
        ongkir: hargaongkirnya,
      });
      if (datas.status === 201) {
        checkout.map((c, i) => {
          remove(c.id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[60%] pb-10 mx-auto flex mt-36 gap-3">
      <div className="w-[50%] ">
        {checkout.map((c, i) => (
          <div className="" key={i}>
            <CheckoutCard data={c} />
          </div>
        ))}
      </div>
      <div className="w-[50%] mt-3">
        <h1 className="block mb-2 text-sm font-medium text-gray-900">
          Pilih Alamat {kabnya}
        </h1>
        <div className="">
          <select
            name=""
            id=""
            onChange={(e: any) => setSelectedAddress(e.target.value)}
            className="h-[40px] w-full border-[1px] border-black rounded-md"
          >
            <option value="">Pilih Alamat</option>
            {alamatuser?.map((a, i) => (
              <option key={i} value={i}>
                <div className="">{`${a.name} ${a.no_whatsapp}`}</div>
              </option>
            ))}
          </select>
        </div>
        {selectedAddress !== null && (
          <div
            className={`${
              selectedAddress ? "block" : "hidden"
            } p-2 border-[1px] border-black mt-2 rounded-md`}
          >
            <p>
              {alamatuser[selectedAddress]?.Provinsi},{" "}
              {alamatuser[selectedAddress]?.kabupaten},{" "}
              {alamatuser[selectedAddress]?.kecamatan},{" "}
              {alamatuser[selectedAddress]?.desa}
            </p>
            <p>{alamatuser[selectedAddress]?.alamat_lengkap}</p>
          </div>
        )}
        {selectedAddress !== null && (
          <div className="mt-3">
            <h1 className="block mb-2 text-sm font-medium text-gray-900">
              Pilih Jasa Kirim {kabnya}
            </h1>
            <select
              name=""
              id=""
              value={kurir}
              onChange={(e: any) => setkurir(e.target.value)}
              className="h-[40px] w-full border-[1px] border-black rounded-md"
            >
              <option value="">Pilih Jasa Pengiriman</option>
              {listkurir?.map((a, i) => (
                <option key={i} className="pl-3" value={a.code}>
                  <div className="pl-2">{a.description}</div>
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mt-4">
          <h1 className="font-medium">List Ongkir</h1>
          {ongkirnya.length > 0 && render ? (
            ongkirnya.map((o, i) => (
              <div
                onClick={() => HargaOngkirnya(o.price)}
                className="mb-2 border-[1px] p-2 border-black rounded-md"
                key={i}
              >
                <h1>{o.name}</h1>
                <p>{o.price}</p>
                <p>{o.estimated}</p>
              </div>
            ))
          ) : (
            <h1>menghitung...</h1>
          )}
        </div>
        <div className="mt-3">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Masukan Pesan
          </label>
          <textarea
            id="message"
            // rows="4"
            className="block p-2.5 w-full text-sm mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div className="mt-4">
          <h1 className="font-[600]">Sub total </h1>
          {render && render2 ? (
            <h1 className="font-[600] text-xl">
              {hargaongkirnya.toLocaleString("id-ID", {
                currency: "IDR",
              })}{" "}
              +{" "}
              {hargabarangnya.toLocaleString("id-ID", {
                currency: "IDR",
                style: "currency",
              })}
            </h1>
          ) : null}
        </div>
        {render && render2 && checkout.length > 0 ? (
          <div onClick={CreateTransaksi} className="w-full mt-4">
            <button className="w-full h-[40px] bg-green-600 rounded-md text-white">
              Bayar
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
