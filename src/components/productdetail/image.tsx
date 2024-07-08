import { useState } from "react";

type FotoProduct = {
  id_product: number;
  url: string;
};

export default function ImageDetail({
  image,
}: {
  image: FotoProduct[] | undefined;
}) {
  const [foto, setfoto] = useState(0);

  return (
    <div className="w-full border-slate-500">
      <div className="w-full">
        {image ? (
          <img
            src={image[foto]?.url || ""}
            className="w-full rounded-md h-[500px] object-contain"
            alt=""
          />
        ) : null}
      </div>
      <div className="w-full gap-2 flex mt-2">
        <div className="mx-auto gap-2 flex">
          {image?.map((i, index) => (
            <img
              onClick={() => setfoto(0 + index)}
              src={i.url}
              key={index}
              alt=""
              className="rounded-md object-contain w-[120px] h-[120px] "
            />
          ))}
        </div>
      </div>
    </div>
  );
}
