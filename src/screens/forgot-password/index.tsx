import SlideBox from "@/components/slide-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";

export interface ForgotPasswordData {
  email: string;
}

export const ForgotPasswordSchema: ZodType<ForgotPasswordData> = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<ForgotPasswordData>();

  const emailValue = watch("email");

  return (
    <form>
      <section className="bg-green-bg h-screen w-full flex items-center justify-center">
        <SlideBox stepAmount={3} currentStep={1}>
          <h1 className="text-3xl font-semibold">Reset password</h1>
          <p>Forgot your password? Please enter your email and we'll send you a 6-digit code.</p>

          <div>
            <Label>Email</Label>
            <Input {...register("email")} id="email" placeholder="Enter your email" />
          </div>
          <div className="flex justify-between items-center">
            <Button type="button" variant={"secondary"}>
              <Link to={"/login"}>Back to login</Link>
            </Button>
            <Button disabled={!isValid || !emailValue.length} type="submit">
              Send reset link
            </Button>
          </div>
        </SlideBox>
      </section>
    </form>
  );
}
