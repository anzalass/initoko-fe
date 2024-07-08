import React, { useState } from "react";
import Discountcard from "../card/discountcard";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export default function DiscountSection({ discount }: { discount: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 - 1 ? 0 : currentSlide + 1);
  };
  return (
    <div className="w-full mt-10">
      <div className="w-11/12 mx-auto  ">
        <h1 className="font-poppins font-[700]">Kejar Diskon {currentSlide}</h1>
      </div>
      <div className="w-11/12 h-[300px]   mx-auto rounded-md relative">
        <div className="absolute -z-10  pt-20 left-0 h-full w-[20%] p-4 rounded-md bg-slate-200">
          <div className="w-[50%]">
            <h1 className="font-poppins font-[600]">Up to</h1>
            <h1 className="text-5xl font-poppins  font-[800]">45%</h1>
            <h1 className="font-[600] font-poppins  text-[16px]">
              Kejar Diskon Spesial
            </h1>
          </div>
        </div>
        <div className="w-[85%] z-50 relative  ml-[15%] overflow-hidden">
          <div
            className="flex ml-[0%] gap-3  transition-all mt-5 duration-1000 ease-in-out rounded-md"
            style={{
              transform: `translateX(-${currentSlide * 500}px)`,
              width: `${10 * 500}px`,
            }}
          >
            {discount.map((d: any, i: any) => (
              <div className="" key={i}>
                <Discountcard data={d} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={prevSlide}>
          <IoIosArrowDropleftCircle
            className="absolute left-[170px] cursor-pointer top-[120px] z-[888]"
            color="gray"
            size={30}
          />
        </button>
        <button
          onClick={nextSlide}
          className="cursor-pointer absolute right-0 top-[120px]  z-[888]"
        >
          <IoIosArrowDroprightCircle
            className="right-3 top-0"
            color="gray"
            size={30}
          />
        </button>
      </div>
    </div>
  );
}
