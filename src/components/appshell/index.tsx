import { useRouter } from "next/router";
import Navbar from "./navbar";
import Footer from "./footer";
import Keranjang from "../keranjang";
import KategoriModal from "../kategori/kategorimodal";

type AppShellProps = {
  children: React.ReactNode;
};

const disableNavbar = [
  "/admin/barang",
  "/admin/barang/tambah",
  "/admin/barang/edit/[slug]",
  "/admin/kategori",
  "/admin/kategori/tambah",
  "/admin/kategori/edit/[slug]",
  "/admin/jumbotron",
  "/admin/jumbotron/tambah",
  "/admin/jumbotron/edit/[slug]",
  "/auth/masuk",
  "/auth/daftar",
  "/auth/requestotp",
  "/auth/aktivasiakun",
  "/admin/pesanan",
  "/admin/pesanan/detail/[slug]",
];

export default function AppShell(props: AppShellProps) {
  const router = useRouter();
  const { children } = props;
  return (
    <div>
      <Keranjang />
      <KategoriModal />
      {!disableNavbar.includes(router.pathname) && <Navbar />}
      {children}
      {!disableNavbar.includes(router.pathname) && <Footer />}
    </div>
  );
}
