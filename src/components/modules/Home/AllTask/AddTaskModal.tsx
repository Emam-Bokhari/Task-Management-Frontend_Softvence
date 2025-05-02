import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addTask } from "@/services/Task";
import { Fragment, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { toast } from "sonner";
import { taskValidation } from "./task.validation";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function AddTaskModal() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      endDate: "",
      status: "",
    },
    resolver: zodResolver(taskValidation),
  });

  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
    form.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setOpen(false);
    try {
      const response = await addTask(data);

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Fragment>
      <FormProvider {...form}>
        <form>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#60E5AE] hover:bg-[#46C98C] text-[#1F1F1F] cursor-pointer">
                <HiOutlineDocumentPlus />
                Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] md:max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="mb-4 text-lg md:text-xl">
                  Add New Task
                </DialogTitle>
              </DialogHeader>

              {/* Scrollable Content */}
              <div className="max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your task title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Enter your task end date e.g, Friday, April-25, 2025"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter your task description..."
                              className="min-h-52"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="button"
                  onClick={handleFormSubmit}
                  className="w-full mt-4 bg-[#60E5AE] hover:bg-[#46C98C] text-[#1F1F1F] cursor-pointer"
                >
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      </FormProvider>
    </Fragment>
  );
}
