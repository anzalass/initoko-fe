import { RenderTableUser } from "@/context/renderTable";
import { server } from "@/server";
import { DataGrid } from "@mui/x-data-grid";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";

type PesananType = {
  id: string;
  nama_user: string;
  harga: number;
  status: number;
  status_pembayaran: string;
};

export default function TabelPesanan({ barang }: { barang: PesananType[] }) {
  const [gridKey, setGridKey] = useState(0);
  const [rows, setRows] = useState<any[]>([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "nama_user",
      headerName: "Nama User",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "harga",
      headerName: "Harga",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status_pembayaran",
      headerName: "Status Pembayaran",
      headerClassName: "bg-slate-200 text-center font-poppins font-bold",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "aksi",
      headerName: "Aksi",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      flex: 0.7,
      minWidth: 150,

      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className="flex">
            {params.row.status_pembayaran === "sudah bayar" ? (
              <button className="mr-4 mt-4">
                <FaArrowRight
                  size={20}
                  onClick={() => HandleTrigerDelete(params.id)}
                />
              </button>
            ) : null}

            {/* <button className="">
              <BiEditAlt
                onClick={() => HandleTrigerEdit(params.id)}
                color="blue"
                size={20}
              />
            </button> */}
          </div>
        );
      },
    },
  ];

  const router = useRouter();
  const HandleTrigerEdit = (id: any) => {
    router.push(`/admin/barang/edit/${id}`);
  };
  const { render, setRender } = useContext(RenderTableUser);
  const HandleTrigerDelete = async (id: any) => {
    // setRender(false);
    // Swal.fire({
    //   title: "Do you want to save the changes?",
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "Delete",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const hapus = axios
    //       .delete(`${server}product/delete/${id}`)
    //       .then((result) => {
    //         setRender(true);
    //         Swal.fire("Deleted!", "", "success");
    //       });
    //   }
    // });
    // setRender(false);
    router.push(`/admin/pesanan/detail/${id}`);
  };
  const InsertData = () => {
    const data = barang?.map((p, index) => ({
      id: p.id,
      nama_user: p.nama_user,
      harga: p.harga,
      status: p.status,
      status_pembayaran: p.status_pembayaran,
    }));
    setRows(data); // Mengatur rows menggunakan setRows
  };

  useEffect(() => {
    InsertData();
  }, [barang]);

  return (
    <>
      <div className=""></div>
      <div className="w-full relative">
        <div className="flex justify-between w-full ">
          <div className="flex justify-between w-full">
            <div className="flex ">
              <div className=""></div>
            </div>
          </div>
        </div>
        <div className="mt-7 w-full mx-auto">
          <DataGrid
            key={gridKey}
            disableRowSelectionOnClick
            autoHeight
            columns={columns}
            getRowId={(rows) => rows?.id}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
}
