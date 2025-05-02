"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import signupBanner from "@/assets/signup.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidation } from "./signup.validation";
import { registerUser } from "@/services/Auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      const response = await registerUser(data);
      console.log(response);

      if (response?.success) {
        toast.success(response?.message);
        router.push("/login");
      } else {
        toast.error(response?.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* banner */}
      <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto">
        <Image
          src={signupBanner}
          alt="Signup Banner Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 lg:px-20 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h3 className="text-xl lg:text-4xl font-bold">Sign Up</h3>
            <p className="text-[#667085] text-base mt-2">
              To Create Account, Please Fill in the From Below.
            </p>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Retype password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4 bg-[#60E5AE] cursor-pointer hover:bg-[#46C98C] text-[#1F1F1F] text-lg"
              >
                {isSubmitting ? "Signing Up..." : "SignUp"}
              </Button>
            </form>
          </FormProvider>

          {/* separator  */}
          <div className="flex items-center gap-4 my-6">
            <Separator className="flex-1 border-2 border-[#9EA4B1]" />
            <span className="text-sm text-[#667085] ">Or</span>
            <Separator className="flex-1 border-2 border-[#9EA4B1]" />
          </div>

          <p className="text-center text-sm text-[#667085]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1F1F1F] font-bold hover:underline"
            >
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
