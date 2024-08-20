import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/auth/authService";
import Logo from "@/components/logo";

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
    formState: { errors, isValid },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
  });

  const handleSignIn = async ({ email, password }: SignInData) => {
    try {
      console.log(email, password);
      const session = await signIn(email, password);
      console.log(session);
      // if (session && typeof session.AccessToken !== "undefined") {
      //   sessionStorage.setItem("accessToken", session.AccessToken);
      //   if (sessionStorage.getItem("accessToken")) {
      //     window.location.href = "/home";
      //   } else {
      //     console.error("Session token was not set properly.");
      //   }
      // } else {
      //   console.error("SignIn session or AccessToken is undefined.");
      // }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <section className="bg-green-bg w-full h-screen flex items-center justify-center overflow-scroll fixed">
        <div className="w-full flex items-center h-full flex-col gap-4">
          <Logo className="mt-12 mb-2" />

          <div className="bg-white w-[30%] min-w-[325px] shadow rounded-2xl px-6 py-10">
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
                <span className="text-red-500 text-sm">{errors?.password?.message}</span>
                <a href="/forgot-password" className="text-green-primary underline text-sm w-fit">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button type="submit" disabled={!isValid} className="w-full mt-8">
              Sign in
            </Button>
            <div className="flex items-center justify-center gap-2 mt-4">
              <p>Don't have an account?</p>
              <a href="/sign-up" className="text-green-primary underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
