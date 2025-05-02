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

const taskStatusOptions = [
  { value: "allTask", label: "All Task" },
  { value: "onGoing", label: "On Going" },
  { value: "pending", label: "Pending" },
  { value: "collaborativeTask", label: "Collaborative Task" },
  { value: "done", label: "Done" },
];

export default function TaskDetails() {
  const form = useForm({
    defaultValues: {
      status: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <Fragment>
      <Card className="relative z-10 xl:w-[calc(100%-150px)] lg:w-[calc(100%-125px)] md:w-[calc(100%-94px)] mx-auto shadow-xl border-2 border-red-500 md:-mt-15 -mt-6">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 md:gap-0  md:justify-between">
            {/* title */}
            <div>
              <p className="text-2xl text-[#1F1F1F] font-bold">All Task List</p>
            </div>

            {/* action buttons */}
            <div className="flex gap-5 justify-end">
              <Button className="bg-[#F7E4C9] hover:bg-[#F3D1A1]  text-lg text-[#FFAB00] cursor-pointer">
                Edit Task
              </Button>
              <Button className="bg-[#60E5AE] hover:bg-[#46C98C]  text-lg text-[#1F1F1F] cursor-pointer">
                Back
              </Button>
            </div>
          </div>
          {/* separator */}
          <Separator className="border-2 mt-8" />
          {/* text */}
          <div>
            {/* form start */}
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex  gap-4 border-2 border-red-500">
                  <div className="bg-[#60E5AE] border-2 border-red-500 xl:h-20 h-12 xl:w-20 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaSwatchbook className="xl:w-10 xl:h-10 w-6 h-6" />
                  </div>
                  <div className="space-y-16">
                    {/* title and description */}
                    <div>
                      <p className="text-[#1F1F1F] font-bold xl:text-3xl lg:text-2xl text-xl capitalize">
                        Task Craft
                      </p>
                      <p className="text-[#667085] text-base mt-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Porro nostrum fugit nihil at natus, repellat
                        quibusdam itaque atque! Adipisci illo exercitationem
                        sint explicabo dolorem soluta ipsam tempore nobis
                        temporibus rerum.s Lorem ipsum dolor, sit amet
                        consectetur adipisicing elit. Ea et incidunt dolor
                        labore molestiae rem quibusdam laboriosam quaerat porro
                        aliquid eum voluptas error, fugiat libero itaque
                        quisquam omnis quasi ab cum. Corporis dignissimos
                        eveniet cumque dolor totam, illo temporibus illum
                        veritatis officiis delectus? Deserunt similique quasi
                        magni, illo veritatis nostrum.
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
                            Friday, April-25,2025
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
                        }`}
                          />
                          <p
                            className={`xl:text-3xl lg:text-2xl text-xl font-medium capitalize 
                        }`}
                          >
                            inProgress
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
                    <div className="flex gap-5 justify-end mt-20">
                      <Button className="bg-[#F5DBD5] hover:bg-[#eec9c0] cursor-pointer text-red-500 text-lg">
                        Delete Task
                      </Button>
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
