import Image from "next/image";
import { Fragment } from "react";
import dashboardBanner from "@/assets/banner.png";
import { FaRegClipboard } from "react-icons/fa";
import spinnerIcon from "@/assets/spin.svg";

export default function AllTaskPage() {
  return (
    <Fragment>
      <div className="w-full h-[306px] relative">
        {/* banner image */}
        <Image
          src={dashboardBanner}
          alt="Dashboard banner image"
          fill
          className="object-cover"
        />

        {/* overlay  */}
        <div className="absolute inset-0 xl:px-20 lg:px-16 md:px-10 px-6 lg:py-6 py-4 text-white  border-2 border-blue-500">
          <div className="flex xl:items-center items-start justify-between">
            {/*  logo and nav */}
            <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:flex-1 lg:items-center lg:justify-between  border-2 border-red-500">
              {/* logo */}
              <div className="flex flex-1  items-center gap-2 border-2 border-red-500">
                <div className="w-6 h-6 bg-[#477368] bg-opacity-20 rounded-md flex items-center justify-center">
                  <span className="text-white text-2xl ">⏱️</span>
                </div>
                <span className="text-2xl lg:text-lg font-semibold">Tasko</span>
              </div>

              {/* nav */}
              <div className="flex  flex-col md:flex-row gap-2 md:gap-10 flex-1 text-sm border-2 border-blue-500">
                <div className="flex items-center gap-2 sm:w-auto w-full ">
                  <FaRegClipboard className="text-2xl text-[#60E5AE]" />
                  <span className="text-2xl lg:text-lg text-[#60E5AE]">
                    Task List
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:w-auto w-full ">
                  <Image
                    src={spinnerIcon}
                    width={25}
                    height={25}
                    alt="Spinner icon"
                  />
                  <span className="text-2xl lg:text-lg text-white">Spin</span>
                </div>
              </div>
            </div>

            {/* profile */}
            <div className="flex flex-1 items-center justify-end gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white relative">
                <Image
                  src="https://rb.gy/m9b6ro"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl md:text-lg text-white font-medium">
                Thomas M.
              </span>
            </div>
          </div>

          <div className="absolute xl:left-20 lg:left-16 md:left-10 left-6 md:top-1/2 transform -translate-y-1/2 top-[60%]">
            <h3 className="text-[#60E5AE] text-lg font-medium">
              Hi, Moshfiqur Rahman
            </h3>
            <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold mt-2 sm:mt-4">
              Welcome to Dashboard
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
