"use client";
import Image from "next/image";
import { Fragment } from "react";
import dashboardBanner from "@/assets/banner.png";
import { FaRegClipboard } from "react-icons/fa";
import spinnerIcon from "@/assets/spin.svg";
import { Card, CardContent } from "@/components/ui/card";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { FaSwatchbook } from "react-icons/fa";
import { MdOutlineEditCalendar } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const taskCategoryOptions = [
  { value: "artsAndCraft", label: "Arts and Craft" },
  { value: "nature", label: "Nature" },
  { value: "family", label: "Family" },
  { value: "sport", label: "Sport" },
  { value: "friends", label: "Friends" },
  { value: "meditation", label: "Meditation" },
];

export default function AllTaskPage() {
  const form = useForm({
    defaultValues: {
      condition: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="relative z-10 xl:w-[calc(100%-150px)] mx-auto shadow-xl border-2 border-red-500 -mt-15">
            <CardContent>
              <div className="flex justify-between">
                {/* title */}
                <div>
                  <p className="text-2xl text-[#1F1F1F] font-bold">
                    All Task List
                  </p>
                </div>

                {/* dropdown */}
                <div className="flex gap-5">
                  <div>
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full ">
                                <SelectValue placeholder="Select Task Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {taskCategoryOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="hover:bg-[#E7FBF3] focus:bg-[#E7FBF3]"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Task Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {taskCategoryOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="hover:bg-[#E7FBF3] focus:bg-[#E7FBF3]"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* action button */}
                  <div>
                    <Button className="bg-[#60E5AE] hover:bg-[#46C98C] text-[#1F1F1F] cursor-pointer">
                      <HiOutlineDocumentPlus />
                      Add New Task
                    </Button>
                  </div>
                </div>
              </div>

              {/* card */}
              <div className="my-10">
                <div className="grid grid-cols-4 gap-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Card key={index}>
                      <CardContent className="space-y-8">
                        {/* icon,title,action button */}
                        <div className="flex justify-between">
                          <div className="flex gap-4">
                            <div className="bg-[#60E5AE] h-12 w-12 rounded-full flex items-center justify-center">
                              <FaSwatchbook className="text-xl" />
                            </div>
                            <div>
                              <p className="text-[#1F1F1F] font-bold text-xl">
                                Art and Craft
                              </p>
                              <p className="text-[#667085] text-base mt-2">
                                Select the role that you want to candidates for
                                and upload your job description.
                              </p>
                            </div>
                          </div>
                          {/* action button */}
                          <div>
                            <RiDeleteBinLine className="text-2xl text-red-500" />
                          </div>
                        </div>
                        {/* end date , status */}
                        <div className="flex justify-between">
                          <div className="flex gap-4">
                            <MdOutlineEditCalendar className="text-2xl text-[#3B3B3B] font-medium" />
                            <p className="text-[#3B3B3B]  text-base font-medium">
                              Friday, April 19 - 2024
                            </p>
                          </div>
                          {/* status */}
                          <div className="flex gap-2">
                            <GoDotFill className="text-2xl text-[#E343E6] font-medium" />
                            <p className="text-[#E343E6] text-base font-medium">
                              Pending
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </Fragment>
  );
}
