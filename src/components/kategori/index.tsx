import { ContextSearch } from "@/context/searchContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export default function Kategori({ kategori }: { kategori: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [kategoriinti, setkategoriInti] = useState<any>([]);
  const { filter, setfilter } = useContext(ContextSearch);
  useEffect(() => {
    const inti = kategori.filter((item: any) => item.tipe === "inti");
    setkategoriInti(inti);
  }, []);
  const router = useRouter();

  const SearchKategori = (name: any) => {
    setfilter((prevFilter: any) => ({
      ...prevFilter,
      kategori: name,
    }));
    router.push(`/product?cari=`);
  };

  const ListKategori = [
    {
      img: "https://s1.bukalapak.com/attachment/614771/rekomendasi_item_fashion_-_image_utama.jpg",
      name: "Fashion Pria",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_WhO91JPGXiDltx9tTnWrqNBs3LlEAwPqw-w1jLBSjyyhsGIrpEHuugi&s=10",
      name: "Elektronik",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbuDsg43HQC71t8cupbrEimK03US88-nSrXnlaRosozM18P1O9aFRYNQa&s=10",
      name: "Hobi",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9qHtJzvvVrIi96qaCQCexSpORYYktXOueAAeHNSsOfrNYV7rwTAJU4w&s=10",
      name: "Sepatu",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Bu9lz_LvSWcziwQ72ZjjWHg9Em-PdW5u5l5htqasQxHd847hei2CUGZz&s=10",
      name: "Perlengkapan Rumah",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbrmBvDDmVz3JnfHhC7TQRtM7A1TnjztxDsMztFNtL-GsZwAQ9vfYU8ja&s=10",
      name: "Fashion Wanita",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcalqcU60v8Gv30rTbTahIi0T05CVu2smX2ZCggGi2g_AzVyR1qGNC4L5Y&s=10",
      name: "Pakaian Bayi",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBV1wRJKIbgbxcVI_wv0sdEJawsrBxFuELH1paDCvKeC9tAktr3oFgaGQ&s=10",
      name: "Furniture",
    },
    {
      img: "https://s1.bukalapak.com/attachment/614771/rekomendasi_item_fashion_-_image_utama.jpg",
      name: "Fashion Pria",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_WhO91JPGXiDltx9tTnWrqNBs3LlEAwPqw-w1jLBSjyyhsGIrpEHuugi&s=10",
      name: "Elektronik",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide === 2 - 1 ? 0 : currentSlide + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  //   const ListKategori.length = Math.ceil(ListKategori.length / 5);

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? kategoriinti.length - 8 : currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="w-11/12 mx-auto relative mt-5 border-[1px] rounded-md p-3">
      <h1 className="font-poppins font-[700]">
        Kategori Pilihan {kategoriinti.length}
      </h1>
      <div className="absolute top-2 right-4  transition-all duration-1000 ease-in-out  flex justify-between items-center">
        <button onClick={prevSlide}>
          <IoIosArrowDropleftCircle color="gray" size={30} />
        </button>
        <button onClick={nextSlide}>
          <IoIosArrowDroprightCircle color="gray" size={30} />
        </button>
      </div>
      <div className="overflow-hidden mt-3 relative w-full mx-auto">
        <div
          className="flex transition-all duration-1000 ease-in-out rounded-md"
          style={{
            transform: `translateX(-${
              currentSlide * (kategoriinti.length * 80)
            }px)`,
            width: `${kategoriinti.length * 80}px`,
          }}
        >
          {/* {Array.from({ length: ListKategori.length }).map((_, slideIndex) => ( */}
          <div className="flex items-center">
            {kategoriinti.map((p: any, index: any) => (
              <div
                onClick={() => SearchKategori(p.name)}
                key={index}
                className="h-[90px] relative w-[226px] mr-2 ml-2 border-[1px] gap-3 rounded-md overflow-hidden"
              >
                <img
                  src={p.foto}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div
                  onClick={() => console.log("woi")}
                  className="absolute bg-black opacity-30 top-0 w-full h-full text-center hover:text-white text-transparent items-center justify-center flex z-40 transition-all duration-500 ease-in-out hover:opacity-100  cursor-pointer hover:bg-[#000004ba]  "
                >
                  <h1 className="text-sm font-[700] font-poppins right-auto left-auto ">
                    {p?.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}
