"use client";
import Image from "next/image";
import { Fragment } from "react";
import dashboardBanner from "@/assets/banner.png";
import { FaRegClipboard } from "react-icons/fa";
import spinnerIcon from "@/assets/spin.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import profileIcon from "@/assets/user.png";
import { LogOutIcon } from "lucide-react";
import { logoutFromCookie } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";
import Link from "next/link";

export default function CommonBanner({ user }: { user: IUser }) {
  const router = useRouter();

  // logout
  const handleLogout = async () => {
    await logoutFromCookie();
    router.push("/login");
  };

  return (
    <Fragment>
      <div className="w-full h-[175px] relative">
        {/* banner image */}
        <Image
          src={dashboardBanner}
          alt="Dashboard banner image"
          fill
          className="object-cover"
        />

        {/* overlay  */}
        <div className="absolute inset-0 xl:px-20 lg:px-16 md:px-10  lg:py-6  text-white ">
          <div className="flex xl:items-center items-start justify-between">
            {/*  logo and nav */}
            <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:flex-1 lg:items-center lg:justify-between  ">
              {/* logo */}

              <div className="flex flex-1  items-center gap-2 ">
                <div className="w-6 h-6 bg-[#477368] bg-opacity-20 rounded-md flex items-center justify-center">
                  <span className="text-white text-2xl ">⏱️</span>
                </div>
                <span className="text-2xl lg:text-lg font-semibold">
                  <Link href="/">Tasko</Link>
                </span>
              </div>

              {/* nav */}
              <div className="flex  flex-col md:flex-row gap-2 md:gap-10 flex-1 text-sm ">
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
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <Image
                      src={profileIcon}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <span className="flex gap-2 items-center text-base cursor-pointer">
                      <LogOutIcon className="w-6 h-6" />
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-xl md:text-lg text-white font-medium">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
