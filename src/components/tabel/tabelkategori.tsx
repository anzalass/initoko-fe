import { RenderTableUser } from "@/context/renderTable";
import { server } from "@/server";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";

type KategoriType = {
  id: number;
  name: string;
  tipe: string;
  foto: string;
  created_at: string;
};

export default function TabelKategori({
  kategori,
}: {
  kategori: KategoriType[];
}) {
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
      field: "name",
      headerName: "Nama Kategori",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "tipe",
      headerName: "Tipe",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "foto",
      headerName: "Foto",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params: any) => {
        if (params.row.foto == null) {
          return <></>;
        } else {
          return <img src={params.row.foto} alt="" />;
        }
      },
    },

    {
      field: "created_at",
      headerName: "Created At",
      headerClassName: "bg-slate-200 text-center font-poppins font-[500]",
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
            <button className="mr-4">
              <BsTrash3
                color="red"
                size={20}
                onClick={() => HandleTrigerDelete(params.id)}
              />
            </button>
            <button className="">
              <BiEditAlt
                onClick={() => HandleTrigerEdit(params.id)}
                color="blue"
                size={20}
              />
            </button>
          </div>
        );
      },
    },
  ];

  const router = useRouter();
  const HandleTrigerEdit = (id: any) => {
    router.push(`/admin/kategori/edit/${id}`);
  };
  const { render, setRender } = useContext(RenderTableUser);
  const HandleTrigerDelete = async (id: any) => {
    setRender(false);
    Swal.fire({
      title: "Do you want to delete changes?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const hapus = axios
          .delete(`${server}kategori/delete/${id}`)
          .then((result) => {
            setRender(true);
            Swal.fire("Deleted!", "", "success");
          });
      }
    });
    setRender(false);
  };
  const InsertData = () => {
    const data = kategori?.map((p, index) => ({
      id: p.id,
      name: p.name,
      tipe: p.tipe,
      foto: p.foto,
      created_at: p.created_at,
    }));
    setRows(data); // Mengatur rows menggunakan setRows
  };

  useEffect(() => {
    InsertData();
  }, [kategori]);

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
