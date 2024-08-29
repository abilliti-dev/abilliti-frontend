import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/auth/authService";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import AuthLayout from "@/layouts/auth-layout";

export interface SignInData {
  email: string;
  password: string;
}

export const SignInSchema: ZodType<SignInData> = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSignIn = async ({ email, password }: SignInData) => {
    const { auth: session, error } = await signIn(email, password);

    if (error) {
      setLoginError(error);
      return;
    }

    if (session && typeof session.AccessToken !== "undefined") {
      sessionStorage.setItem("accessToken", session.AccessToken);
      if (sessionStorage.getItem("accessToken")) {
        window.location.href = "/home";
      } else {
        console.error("Session token was not set properly.");
      }
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <h2 className="text-3xl text-center font-semibold">Welcome back</h2>
        <div className="flex flex-col gap-8 my-4">
          <div className="flex flex-col gap-2">
            <Label className="text-base" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />

            <span className="text-red-500 text-sm">{errors?.email?.message}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-base" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <span className="text-red-500 text-sm">{loginError}</span>
            <span className="text-red-500 text-sm">{errors?.password?.message}</span>
            <a href="/forgot-password" className="text-green-primary underline text-sm w-fit">
              Forgot password?
            </a>
          </div>
        </div>
        <Button type="submit" disabled={!isValid || isSubmitting} className="w-full mt-8">
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
        <div className="flex items-center justify-center gap-2 mt-4">
          <p>Don't have an account?</p>
          <a href="/sign-up" className="text-green-primary underline">
            Sign up
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
