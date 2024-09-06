import { resetPassword } from "@/auth/authService";
import StepsBars from "@/components/steps-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { TCurrentSlide } from "..";
import { zodResolver } from "@hookform/resolvers/zod";

export interface ForgotPasswordData {
  email: string;
}

export const ForgotPasswordSchema: ZodType<ForgotPasswordData> = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export interface ResetPasswordSlideProps {
  setCurrentSlide: Dispatch<SetStateAction<TCurrentSlide>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function ResetPasswordSlide({ setCurrentSlide, setEmail }: ResetPasswordSlideProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const emailValue = watch("email");

  const handleResetPassword = async (data: ForgotPasswordData) => {
    const resetPasswordResponse = await resetPassword(data.email);
    if (resetPasswordResponse.error) {
      setError("email", { message: resetPasswordResponse.error });
      return;
    }
    setEmail(data.email);
    setCurrentSlide((prev) => ({
      ...prev,
      resetPassword: false,
      verifyCode: true,
    }));
  };

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-semibold">Reset password</h1>
        <p>
          Enter your email and we'll send you a 6-digit confirmation code to reset your password.
        </p>
      </div>

      <div className="flex flex-col gap-y-2 mt-8 mb-4">
        <Label className="text-base" htmlFor="email">
          Email
        </Label>
        <Input {...register("email")} id="email" placeholder="Enter your email" />
        <div className="my-2">
          <span className="text-red-500 text-sm">{errors.email?.message}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 mb-6">
        <Button type="button" variant="secondary">
          <Link to={"/login"}>Back to login</Link>
        </Button>
        <Button
          disabled={!isValid || !emailValue.length || isSubmitting}
          type="submit"
          className="w-32"
        >
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send reset link"}
        </Button>
      </div>

      <StepsBars stepAmount={3} currentStep={1} />
    </form>
  );
}
