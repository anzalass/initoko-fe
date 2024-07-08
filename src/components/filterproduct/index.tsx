import { ContextSearch } from "@/context/searchContext";
import { useContext, useState } from "react";

// type Filter = {
//   min: number;
//   setmin: (value: any) => void;
//   max: number;
//   setmax: (value: any) => void;
//   filterrr: string;
//   setfilterrr: (value: any) => void;
// };

export default function FilterProduct() {
  const [filterr, setfilterr] = useState("");
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const { filter, setfilter } = useContext(ContextSearch);

  const handlefilter = (e: any) => {
    e.preventDefault();
    // filter.setmin(min);
    // filter.setmax(max);
    // filter.setfilterrr(filterr);
    setfilter((prevfilter: any) => ({
      ...prevfilter,
      min: min,
      max: max,
      filter: filterr,
    }));
  };

  return (
    <div className="h-[90vh]  overflow-y-auto ml-2">
      <form className=" mx-auto mt-4 h-[60vh] font-poppins">
        <div className=" w-full mx-auto justify-center">
          {/* <div className="">
                  <button className="bg-[#fff] p-3 rounded-md shadow-lg">
                    Kategori
                  </button>
                </div> */}
          <div className="  ">
            <div className="">
              <h1 className="font-medium text-sm">Minimum</h1>
              <input
                value={min < 0 ? 0 : min}
                onChange={(e: any) => setmin(e.target.value)}
                type="number"
                placeholder="price min"
                className="pl-2 w-full h-[35px] text-center rounded-md border-[1px] border-black shadow-lg"
              />
            </div>
            <div className="mt-3">
              <h1 className="font-medium text-sm">Maximal</h1>
              <input
                value={max < 0 ? 0 : max}
                onChange={(e: any) => setmax(e.target.value)}
                type="number"
                placeholder="price max"
                className="pl-2 w-full text-center h-[35px] mt border-[1px] border-black rounded-md  shadow-lg"
              />
            </div>
          </div>
          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="laris"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "laris"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Terlaris
            </label>
          </div>
          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="kurang laris"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "kurang laris"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Kurang Laris
            </label>
          </div>
          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="diskon tertinggi"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "diskon tertinggi"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Diskon Tertinggi
            </label>
          </div>
          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="diskon terendah"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "diskon terendah"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Diskon Terendah
            </label>
          </div>

          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="rating tertinggi"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "rating tertinggi"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Rating Tertinggi
            </label>
          </div>
          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="rating terendah"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "rating terendah"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Rating Terendah
            </label>
          </div>
          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="terbaru"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "terbaru"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Terbaru
            </label>
          </div>
          <div className="flex items-center mb-4 mt-3">
            <input
              // id="default-radio-1"
              type="radio"
              value="terlama"
              onChange={(e: any) => setfilterr(e.target.value)}
              checked={filterr === "terlama"}
              // name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Terlama
            </label>
          </div>
          <div onClick={handlefilter} className="w-full mt-3">
            <button className="w-full rounded-md mt-3 h-[40px] bg-green-500 text-white border-[1px] ">
              Set Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
