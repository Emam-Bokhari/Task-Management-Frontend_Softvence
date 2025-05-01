"use client";
import loginBanner from "@/assets/login.png";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { loginValidation } from "./login.validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* banner */}
      <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto">
        <Image
          src={loginBanner}
          alt="Login Banner Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 lg:px-20 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h3 className="text-xl lg:text-4xl font-bold">Login</h3>
            <p className="text-[#667085] text-base mt-2">
              Welcome back, please enter your details to log in.
            </p>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mb-0 text-[#667085] font-normal">
                        Remember Me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link
                  href="#"
                  className="text-sm text-[#667085] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-[#60E5AE] cursor-pointer hover:bg-[#46C98C] text-[#1F1F1F] text-lg"
              >
                {isSubmitting ? "Logging..." : "Login"}
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#1F1F1F] font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
