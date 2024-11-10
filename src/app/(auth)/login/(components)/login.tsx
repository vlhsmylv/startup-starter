"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import redirect from "@/lib/actions/redirect.action";
import { SignInFormData, signInSchema } from "@/lib/utils/zod.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Droplets } from "lucide-react";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const methods = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitFn = async (formData: SignInFormData) => {
    try {
      signIn("credentials", {
        ...formData,
        redirectTo: "/",
      });
    } catch (error: any) {
      // Signin can fail for a number of reasons, such as the user
      // not existing, or the user not having the correct role.
      // In some cases, you may want to redirect to a custom error
      if (error instanceof AuthError) {
        return await redirect(`/login?error=${error.type}`);
      }

      // Otherwise if a redirects happens Next.js can handle it
      // so you can just re-thrown the error and let Next.js handle it.
      // Docs:
      // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
      throw error;
    }
  };

  useEffect(() => {
    const error = searchParams.get("error");
    const code = searchParams.get("code");

    if (error === "CredentialsSignin" && code === "credentials") {
      setError("Invalid email or password");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <Droplets
            key={i}
            className="text-blue-500 absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 10}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md shadow-none border-none bg-white bg-opacity-80 backdrop-blur-sm z-10">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Droplets className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-blue-600">
            Aventra Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitFn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  {...register("email")}
                />
                <span className="text-destructive h-4 text-sm">
                  {errors.email?.message}
                </span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-600">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  {...register("password")}
                />
                <span className="text-destructive h-4 text-sm">
                  {errors.password?.message}
                </span>
              </div>
              {error && (
                <div className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                Sign In
              </Button>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 mt-4 w-full">
            Don&apos;t have an account? Contact your administrator.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
