import { signUp } from "@/auth/authService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider";
import PasswordCheck from "@/components/auth/password-check";
import StepsBar from "@/components/steps-bar";
import PasswordInput from "@/components/auth/password-input";

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema: ZodType<SignUpForm> = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export interface CreateAccountSlideProps {
  setShowCreateAccountSlide: Dispatch<SetStateAction<boolean>>;
  setShowVerifyAccountSlide: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function CreateAccountSlide({
  setShowCreateAccountSlide,
  setShowVerifyAccountSlide,
  setEmail,
}: CreateAccountSlideProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [agreed, setAgreed] = useState<boolean>(false);
  const [showRequirements, setShowRequirements] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSignUp = async (data: SignUpForm) => {
    const response = await signUp(data.email, data.password, data.firstName, data.lastName);
    if (response.classType === UsernameExistsException) {
      toast({
        title: response?.error?.toString(),
        description: response.description,
        action: (
          <ToastAction
            onClick={() => {
              window.location.href = "/login";
              reset();
            }}
            altText="Login"
          >
            Login
          </ToastAction>
        ),
      });
      return;
    }

    setEmail(data.email);
    setShowCreateAccountSlide(false);
    setShowVerifyAccountSlide(true);
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="gap-4 sm:gap-8 flex flex-col">
        <h2 className="text-3xl font-semibold">Create your account</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 sm:w-[50%]">
            <Label className="text-base" htmlFor="firstName">
              First name
            </Label>
            <Input placeholder="Enter your first name" {...register("firstName")} />
            <span className="text-red-500 text-sm">{errors?.firstName?.message}</span>
          </div>
          <div className="flex flex-col gap-2 sm:w-[50%]">
            <Label className="text-base" htmlFor="lastName">
              Last name
            </Label>
            <Input placeholder="Enter your last name" {...register("lastName")} />
            <span className="text-red-500 text-sm">{errors?.lastName?.message}</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-base" htmlFor="email">
            Email
          </Label>
          <Input placeholder="Enter your email" {...register("email")} />
          <span className="text-red-500 text-sm">{errors?.email?.message}</span>
        </div>
        <div className="flex flex-col gap-y-2">
          <TooltipProvider>
            <Tooltip open={showRequirements}>
              <TooltipTrigger asChild>
                <Label className="text-base" htmlFor="password">
                  Password
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <PasswordCheck password={watch("password")} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PasswordInput
            placeholder="Enter your password"
            {...register("password")}
            onFocus={() => setShowRequirements(true)}
            onBlur={() => setShowRequirements(false)}
          />
          <span className="text-red-500 text-sm">{errors?.password?.message}</span>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <Label className="text-base" htmlFor="confirmPassword">
              Confirm password
            </Label>
            <PasswordInput placeholder="Re-enter your password" {...register("confirmPassword")} />
            <span className="text-red-500 text-sm">{errors?.confirmPassword?.message}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" checked={agreed} onClick={() => setAgreed(!agreed)} />
          <Label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {"I have read and agree to the "}
            <a
              href="/terms"
              target="_blank"
              rel="noreferrer noopener"
              className="text-green-primary underline"
            >
              Terms and Conditions
            </a>
            .
          </Label>
        </div>
        <div className="flex flex-row justify-between">
          <Button
            type="button"
            className="px-8"
            onClick={() => {
              window.location.href = "/login";
              reset();
            }}
          >
            Back
          </Button>
          <Button className="px-8" disabled={!agreed || isSubmitting} type="submit">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Next"}
          </Button>
        </div>
        <StepsBar currentStep={1} stepAmount={3} />
      </div>
      <Toaster />
    </form>
  );
}
