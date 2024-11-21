"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/utils/zod.utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const methods = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: any) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  useEffect(() => {
    if (searchParams.get("error")) {
      setError(searchParams.get("error"));
    }
  }, [searchParams]);

  return (
    <div className="mt-24 rounded-lg w-full max-w-[500px] mx-auto shadow-xl bg-gray-100 border p-4">
      <h1 className="text-xl text-center font-semibold">Login</h1>
      {error && <p className="error">{error}</p>}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              className="border-black focus:border-black focus:ring-black"
              {...methods.register("email")}
            />
            <span className="text-destructive h-4 text-sm">
              {methods.formState.errors.email?.message}
            </span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              required
              className="border-black focus:border-black focus:ring-black"
              {...methods.register("password")}
            />
            <span className="text-destructive h-4 text-sm">
              {methods.formState.errors.password?.message}
            </span>
          </div>
          <div className="flex">
            <Button className="w-full" type="submit">Login</Button>
          </div>
        </form>
      </FormProvider>
      <hr className="my-4" />
      <div className="flex">
        <Button className="w-full" variant="outline" onClick={() => signIn("google")}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
