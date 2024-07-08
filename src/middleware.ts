import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";


export function mainmiddleware(req: NextRequest) {
    const res = NextResponse.next();
    return res
}


export default withAuth(mainmiddleware, ["/profile", "/auth/masuk", "/auth/daftar" ,"/auth/requestotp", "/auth/aktivasiakun", "/profile/pesanan", "/admin/barang", "/admin/barang/tambah", "/admin/barang/edit", "/admin/jumbotron", "/admin/jumbotron/tambag", "/admin/jumbotron/edit", "/admin/kategori", "/admin/kategori/edit", "/admin/kategori/tambah", "/admin/pesanan", "/admin/pesanan/edit", "/admin/pesanan/tambah"])