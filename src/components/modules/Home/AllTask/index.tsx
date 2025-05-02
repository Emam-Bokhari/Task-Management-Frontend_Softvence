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
import profileIcon from "@/assets/user.png";
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
import { IUser, TTask } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { logoutFromCookie } from "@/services/Auth";
import { useRouter } from "next/navigation";
import NoTaskFound from "./NoTaskFound";
import { deleteTaskById } from "@/services/Task";
import { toast } from "sonner";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

const taskCategoryOptions = [
  { value: "artsAndCraft", label: "Arts and Craft" },
  { value: "nature", label: "Nature" },
  { value: "family", label: "Family" },
  { value: "sport", label: "Sport" },
  { value: "friends", label: "Friends" },
  { value: "meditation", label: "Meditation" },
];

const taskStatusOptions = [
  { value: "allTask", label: "All Task" },
  { value: "onGoing", label: "On Going" },
  { value: "pending", label: "Pending" },
  { value: "collaborativeTask", label: "Collaborative Task" },
  { value: "done", label: "Done" },
];

export default function AllTask({
  tasks,
  user,
}: {
  tasks: TTask[];
  user: IUser;
}) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      status: "",
      category: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  // logout
  const handleLogout = async () => {
    await logoutFromCookie();
    router.push("/login");
  };

  // delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await deleteTaskById(id);
      if (response?.success) {
        toast.success("Task deleted successfully");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
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
        <div className="absolute inset-0 xl:px-20 lg:px-16 md:px-10  lg:py-6  text-white  border-2 border-blue-500">
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

          <div className="absolute xl:left-20 lg:left-16 md:left-10  md:top-1/2 transform -translate-y-1/2 top-[60%]">
            <h3 className="text-[#60E5AE] text-lg font-medium">
              Hi, {user.name}
            </h3>
            <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold mt-2 ">
              Welcome to Dashboard
            </p>
          </div>
        </div>
      </div>

      <Card className="relative z-10 xl:w-[calc(100%-150px)] lg:w-[calc(100%-125px)] md:w-[calc(100%-94px)] mx-auto shadow-xl border-2 border-red-500 -mt-15">
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col  gap-2 lg:gap-0 lg:flex-row lg:justify-between">
                {/* title */}
                <div>
                  <p className="text-2xl text-[#1F1F1F] font-bold">
                    All Task List
                  </p>
                </div>

                {/* dropdown */}
                <div className="flex flex-wrap gap-5">
                  <div>
                    <FormField
                      control={form.control}
                      name="category"
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
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Task Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {taskStatusOptions.map((option) => (
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
            </form>
          </FormProvider>
          {/* card */}
          <div className="my-10">
            {tasks === undefined ? (
              <NoTaskFound />
            ) : (
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                {tasks?.map((task) => (
                  <Card key={task._id}>
                    <CardContent className="space-y-8">
                      {/* icon,title,action button */}
                      <div className="flex justify-between">
                        <div className="flex  gap-4 border-2 border-red-500">
                          <div className="bg-[#60E5AE] border-2 border-red-500 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaSwatchbook size={24} />
                          </div>
                          <div>
                            <p className="text-[#1F1F1F] font-bold text-xl capitalize">
                              {task.title}
                            </p>
                            <p className="text-[#667085] text-base mt-2">
                              {task.description}
                            </p>
                          </div>
                        </div>
                        {/* action button */}
                        <ConfirmDeleteModal
                          onConfirm={() => handleDeleteTask(task._id)}
                        />
                      </div>
                      {/* end date , status */}
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <MdOutlineEditCalendar className="text-2xl text-[#3B3B3B] font-medium" />
                          <p className="text-[#3B3B3B]  text-base font-medium">
                            {task.endDate}
                          </p>
                        </div>
                        {/* status */}
                        <div className="flex gap-2">
                          <GoDotFill
                            className={`text-2xl font-medium ${
                              task.status === "collaborativeTask"
                                ? "text-blue-500"
                                : task.status === "done"
                                ? "text-[#60E5AE]"
                                : task.status === "inProgress"
                                ? "text-[#DF992F]"
                                : task.status === "pending"
                                ? "text-[#E343E6]"
                                : task.status === "onGoing"
                                ? "text-[#FFA500]"
                                : "text-gray-500"
                            }`}
                          />
                          <p
                            className={`text-base font-medium capitalize ${
                              task.status === "collaborativeTask"
                                ? "text-blue-500"
                                : task.status === "done"
                                ? "text-[#60E5AE]"
                                : task.status === "inProgress"
                                ? "text-[#DF992F]"
                                : task.status === "pending"
                                ? "text-[#E343E6]"
                                : task.status === "onGoing"
                                ? "text-[#FFA500]"
                                : "text-gray-500"
                            }`}
                          >
                            {task.status}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
