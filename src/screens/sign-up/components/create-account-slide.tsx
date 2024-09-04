import { signUp } from "@/auth/authService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { hasLowerCase, hasNumber, hasSpecialChar, hasUpperCase } from "./utils";
import { Check, Loader2, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider";
import SlideBox from "@/components/slide-box";

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

export default function CreateAccountSlide({
  setShowCreateAccountSlide,
  setShowVerifyAccountSlide,
  setEmail,
}: any) {
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

  const passwordRequirements = {
    hasNumber: hasNumber(watch("password")),
    hasSpecialChar: hasSpecialChar(watch("password")),
    hasUpperCase: hasUpperCase(watch("password")),
    hasLowerCase: hasLowerCase(watch("password")),
    hasMinChars: watch("password")?.length >= 8,
  };

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
      <div className="flex items-center flex-col">
        <div className="bg-white w-[55%] min-w-[325px] shadow rounded-2xl px-6 py-10 gap-10 flex flex-col">
          <h2 className="text-3xl font-semibold">Create your account</h2>
          <div className="flex flex-row gap-x-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <Label className="text-base" htmlFor="firstName">
                First name
              </Label>
              <Input placeholder="Enter your first name" {...register("firstName")} />
              <span className="text-red-500 text-sm">{errors?.firstName?.message}</span>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
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
          <div className="flex flex-col gap-y-2 items-start">
            <TooltipProvider>
              <Tooltip open={showRequirements}>
                <TooltipTrigger asChild>
                  <Label className="text-base" htmlFor="password">
                    Password
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <PasswordCheck passwordRequirements={passwordRequirements} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              placeholder="Enter your password"
              type="password"
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
              <Input
                placeholder="Re-enter your password"
                type="password"
                {...register("confirmPassword")}
              />
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
          <SlideBox currentStep={1} stepAmount={3} />
        </div>
      </div>
      <Toaster />
    </form>
  );
}

function PasswordCheck({ passwordRequirements }: any) {
  const { hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasMinChars } =
    passwordRequirements;
  const hasUpperCaseColor = hasUpperCase ? "text-green-primary" : "text-red-500";
  const hasLowerCaseColor = hasLowerCase ? "text-green-primary" : "text-red-500";
  const hasNumberColor = hasNumber ? "text-green-primary" : "text-red-500";
  const hasSpecialCharColor = hasSpecialChar ? "text-green-primary" : "text-red-500";
  const hasMinCharsColor = hasMinChars ? "text-green-primary" : "text-red-500";

  return (
    <div className="flex flex-col">
      {[
        { value: "Uppercase", render: hasUpperCase, renderColor: hasUpperCaseColor },
        { value: "Lowercase", render: hasLowerCase, renderColor: hasLowerCaseColor },
        { value: "Number", render: hasNumber, renderColor: hasNumberColor },
        { value: "Special character", render: hasSpecialChar, renderColor: hasSpecialCharColor },
        { value: "At least 8 characters", render: hasMinChars, renderColor: hasMinCharsColor },
      ].map((requirement, key) => {
        return (
          <div key={key} className="flex flex-row items-center gap-x-1">
            {requirement.render ? (
              <Check className="text-green-primary" />
            ) : (
              <X className="text-red-500" />
            )}
            <p className={`text-sm ${requirement.renderColor}`}>{requirement.value}</p>
          </div>
        );
      })}
    </div>
  );
}
