import { server } from "@/server";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Profile() {
  const { data }: any = useSession();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [render, setrender] = useState(false);

  const GetProfileByEmail = async () => {
    try {
      const res: any = await fetch(
        `${server}user/profile/${data?.user?.email}`
      );
      const datas = await res.json();
      setname(datas.data?.name);
      setemail(datas.data?.email);
      seturlimg(datas.data?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateProfile = async () => {
    if (password === confirmpass) {
      try {
        const res = await axios.put(`${server}user/update/${data?.user.id}`, {
          name: name,
          password: password,
        });
        Swal.fire({
          icon: "success",
          text: "Success",
        });
        setrender(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    GetProfileByEmail();
  }, [data, render]);

  const inputfile: any = useRef(null);
  const [img, setimg] = useState<any>(null);
  console.log(img);

  const Pilihfile = () => {
    inputfile?.current?.click();
  };

  const UpdateAvatar = async () => {
    const image: any = new FormData();
    image.append("file", img);
    await axios
      .put(`${server}user/avatar/${data?.user?.id}`, image)
      .then((res) => {
        setrender(true);
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex w-full mx-auto mt-[170px]">
      <input
        type="file"
        onChange={(e: any) => setimg(e.target.files[0])}
        className="hidden"
        ref={inputfile}
      />
      <div className="w-[40%] mx-auto border-[1px] rounded-md font-poppins">
        <div className="" onClick={Pilihfile}>
          {img ? (
            <img
              src={URL.createObjectURL(img)}
              alt=""
              className="w-[70%] mx-auto object-cover"
            />
          ) : (
            <img
              src={urlimg || ""}
              alt=""
              className="w-[70%] mx-auto object-cover"
            />
          )}
        </div>

        <div className="w-[68%] mt-2 mx-auto bg-slate-200 justify-items-center justify-end  items-center">
          {data?.user?.tipeakun === "google" ? null : (
            <button
              onClick={UpdateAvatar}
              className="w-[100%] text-white  bg-black border-[1px] rounded-md h-[40px]"
            >
              Upload Foto
            </button>
          )}
        </div>
      </div>
      <div className="w-[50%] mx-auto mt-5">
        <div className=" md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              disabled={data?.user?.tipeakaun === "google" ? true : false}
              value={name}
              onChange={(e: any) => setname(e.target.value)}
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nama
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            disabled={true}
            value={email}
            onChange={(e: any) => setemail(e.target.value)}
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            value={password}
            onChange={(e: any) => setpassword(e.target.value)}
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            value={confirmpass}
            onChange={(e: any) => setconfirmpass(e.target.value)}
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        {/* 
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_company"
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Company (Ex. Google)
            </label>
          </div>
        </div> */}
        <button
          onClick={UpdateProfile}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
