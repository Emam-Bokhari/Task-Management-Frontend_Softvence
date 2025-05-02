"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { TTask } from "@/types";
import { Fragment } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FaSwatchbook } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdOutlineEditCalendar } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import confirmDeleteImage from "@/assets/confirmDelete.png";
import Image from "next/image";
import { useState } from "react";
import { deleteTaskById, updateTaskStatusById } from "@/services/Task";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const taskStatusOptions = [
  { value: "allTask", label: "All Task" },
  { value: "onGoing", label: "On Going" },
  { value: "pending", label: "Pending" },
  { value: "collaborativeTask", label: "Collaborative Task" },
  { value: "done", label: "Done" },
];

function ConfirmDeleteModal({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#F5DBD5] hover:bg-[#eec9c0] cursor-pointer text-red-500 text-lg">
          Delete Task
        </Button>
      </DialogTrigger>
      <DialogTitle className="sr-only">Confirm Delete</DialogTitle>
      <DialogContent>
        <div className="flex justify-center space-y-3">
          <div className="space-y-3">
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                src={confirmDeleteImage}
                alt="Confirm Delete Image"
              />
            </div>
            <p className="text-2xl font-bold text-[#1F1F1F] text-center">
              Are You Sure!!
            </p>
            <p className="text-base text-[#667085] text-center">
              Do you want to delete this Task on this app?
            </p>
            <div className="flex gap-5 justify-center">
              <Button
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
                className="bg-[#60E5AE] hover:bg-[#46C98C] cursor-pointer text-[#1F1F1F] font-bold"
              >
                Yes
              </Button>
              <Button
                onClick={() => setOpen(false)}
                className="bg-[#F5DBD5] hover:bg-[#eec9c0] cursor-pointer text-red-500 font-bold"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TaskDetails({ task }: { task: TTask }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      status: "",
    },
  });

  // delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await deleteTaskById(id);
      if (response?.success) {
        toast.success("Task deleted successfully");
        router.push("/");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await updateTaskStatusById(task._id, data);

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wring!");
    }
  };

  function handleBack() {
    router.push("/");
  }

  return (
    <Fragment>
      <Card className="relative z-10 xl:w-[calc(100%-150px)] lg:w-[calc(100%-125px)] md:w-[calc(100%-94px)] mx-auto shadow-xl  md:-mt-15 -mt-6">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 md:gap-0  md:justify-between">
            {/* heading */}
            <div>
              <p className="text-2xl text-[#1F1F1F] font-bold">Task Details</p>
            </div>

            {/* action buttons */}
            <div className="flex gap-5 items-center justify-end">
              {task.status === "done" ? (
                <p className="text-[#E343E6] font-bold text-lg">20 Points</p>
              ) : (
                <Button className="bg-[#F7E4C9] hover:bg-[#F3D1A1]  text-lg text-[#FFAB00] cursor-pointer">
                  Edit Task
                </Button>
              )}

              <Button
                onClick={handleBack}
                className="bg-[#60E5AE] hover:bg-[#46C98C]  text-lg text-[#1F1F1F] cursor-pointer"
              >
                Back
              </Button>
            </div>
          </div>
          {/* separator */}
          <Separator className="border-2 mt-8" />
          {/* text */}
          <div className="mt-8">
            {/* form start */}
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex  gap-4 ">
                  <div className="bg-[#60E5AE]  xl:h-20 h-12 xl:w-20 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaSwatchbook className="xl:w-10 xl:h-10 w-6 h-6" />
                  </div>
                  <div className="space-y-16 w-full">
                    {/* title and description */}
                    <div>
                      <p className="text-[#1F1F1F] font-bold xl:text-3xl lg:text-2xl text-xl capitalize">
                        {task.title}
                      </p>
                      <p className="text-[#667085] text-base mt-2 ">
                        {task.description}
                      </p>
                    </div>
                    {/* date and status */}
                    <div className="flex flex-col md:flex-row lg:gap-8 md:gap-5 gap-3 md:items-center">
                      <div>
                        <p className="text-xl text-[#1F1F1F] font-bold">
                          End Date
                        </p>
                        <div className="flex gap-4 mt-3">
                          <MdOutlineEditCalendar className="text-2xl text-[#1F1F1F] font-medium" />
                          <p className="text-[#1F1F1F]  text-base font-medium">
                            {task.endDate}
                          </p>
                        </div>
                      </div>
                      {/* vertical separator */}
                      <div className="h-12 border-l-2 border-[#D1D1D1]"></div>
                      {/* status */}
                      <div>
                        <div className="flex gap-2">
                          <GoDotFill
                            className={`text-2xl font-medium 
                                ${
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
                            className={`xl:text-3xl lg:text-2xl text-xl font-medium capitalize 
                                ${
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
                    </div>
                    {/* status */}
                    <div>
                      <p className="text-xl text-[#1F1F1F] font-bold">
                        Change Status
                      </p>

                      <div className="mt-3">
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
                                  <SelectTrigger className="md:min-w-sm ">
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
                    </div>
                    {/* task actions */}
                    <div className="flex w-full gap-5 justify-end mt-20 ">
                      <ConfirmDeleteModal
                        onConfirm={() => handleDeleteTask(task._id)}
                      />
                      <Button className="bg-[#60E5AE] hover:bg-[#46C98C] cursor-pointer text-[#1F1F1F] text-lg ">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
                {/* form end */}
              </form>
            </FormProvider>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
