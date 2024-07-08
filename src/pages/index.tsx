import Carousel from "@/components/carousel";
import { useRouter } from "next/router";
import Kategori from "@/components/kategori";
import DiscountSection from "@/components/discountsection";
import Productsection from "@/components/product/productsection";
import Keranjang from "@/components/keranjang";
import { server } from "@/server";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Kategorimodal from "@/components/kategori/kategorimodal";
import KategoriModal from "@/components/kategori/kategorimodal";
import { useContext } from "react";
import { OpenKategoriCtx } from "@/context/openKategoriContext";

export default function Home(props: any) {
  const { homepage } = props;
  const router = useRouter();
  const { q } = router.query;
  const { data }: any = useSession();
  console.log(data);

  return (
    <div className={`relative min-h-screen mt-[150px] `}>
      {/* <Carousel carousel={homepage.data} /> */}
      <Kategori kategori={homepage.data2} />
      <DiscountSection discount={homepage.data3} />
      <Productsection product={homepage.data4} />

      <div className="h-[100px] w-[40%] mx-auto mt-10">
        <Link href={"/product?cari="}>
          <button className="w-full text-white mx-auto bg-green-600 p-3 rounded-md font-medium">
            Selengkapnya
          </button>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${server}homepage`);
  const data = await res.json();

  return {
    props: {
      homepage: data,
    },
  };
}
