import { useEffect, useState } from "react";
import Pesanancard from "../card/pesanancard";
import { useSession } from "next-auth/react";
import { server } from "@/server";

export default function PesananComponent() {
  const { data }: any = useSession();
  const [pesanan, setpesanan] = useState<any[]>([]);
  const GetAllPesananByEmail = async () => {
    const datas = await fetch(`${server}pesanan/${data?.user?.email}`);
    const datas2 = await datas.json();
    setpesanan(datas2.data);
  };

  useEffect(() => {
    GetAllPesananByEmail();
  }, [data?.user?.email]);

  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-3 gap-3">
        {pesanan &&
          pesanan.map((p, i) => (
            <div className="" key={i}>
              <Pesanancard data={p} />
            </div>
          ))}
      </div>
    </div>
  );
}
