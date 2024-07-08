import Image from "next/image";
import { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

type CarouselType = {
  deskripsi: string;
  name: string;
  foto: string;
  status: string;
};

export default function Carousel({ carousel }: { carousel: CarouselType[] }) {
  let [current, setCurrent] = useState<any>(0);
  const [btn, setBtn] = useState(false);

  let PrevSlide = () => {
    setCurrent(current === 0 ? carousel.length - 1 : current - 1);
  };

  let NextSlide = () => {
    setCurrent(current === carousel.length - 1 ? 0 : current + 1);
  };

  const MouseLeave = () => {
    setTimeout(() => {
      setBtn(false);
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === carousel.length - 1 ? 0 : current + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  let slide = ["/family.jpg", "/nego.jpg", "/school.jpeg"];
  return (
    <div className="overflow-hidden mt-3 relative w-11/12 mx-auto">
      <div
        className="flex transition-all duration-1000 ease-in-out rounded-md"
        style={{
          transform: `translateX(-${current * (100 / carousel.length)}%)`,
          width: `${carousel.length * 100}%`,
        }}
      >
        {carousel?.map((i, n) => (
          <Image
            width={1000}
            height={1000}
            onMouseOver={() => setBtn(true)}
            onMouseLeave={MouseLeave}
            src={i?.foto}
            alt=""
            key={n}
            className="object-cover w-full h-[400px] rounded-md"
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-2 flex gap-2">
        {carousel?.map((i, n) => {
          return (
            <div
              onClick={() => setCurrent(n)}
              key={n}
              className={`${
                n == current ? "bg-white" : "bg-gray-500"
              } rounded-full w-3 h-3 cursor-pointer `}
            ></div>
          );
        })}
      </div>
      {btn ? (
        <div className="absolute top-0 transition-all duration-1000 ease-in-out h-full w-full flex justify-between items-center">
          <button onClick={PrevSlide}>
            <IoIosArrowDropleftCircle color="white" size={40} />
          </button>
          <button onClick={NextSlide}>
            <IoIosArrowDroprightCircle color="white" size={40} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
