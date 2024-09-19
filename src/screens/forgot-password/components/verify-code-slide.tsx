import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TCurrentSlide } from "..";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatCountdownTime } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import { Controller, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PasswordCheck from "@/components/auth/password-check";
import { confirmResetPassword, resetPassword } from "@/auth/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import StepsBars from "@/components/steps-bar";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export interface VerifyCodeSlideProps {
  email: string;
  setCurrentSlide: Dispatch<SetStateAction<TCurrentSlide>>;
}

interface VerifyCodeFormData {
  pin: string;
  newPassword: string;
  confirmNewPassword: string;
}

const VerifyCodeSchema: ZodType<VerifyCodeFormData> = z
  .object({
    pin: z.string().length(6, "Must input full 6-digit code"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const COUNTDOWN_TIME = 60;

export default function VerifyCodeSlide({ email, setCurrentSlide }: VerifyCodeSlideProps) {
  const [isSendingNewCode, setIsSendingNewCode] = useState(false);
  const [newCodeRefresher, setNewCodeRefresher] = useState(0);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout>();
  const [showRequirements, setShowRequirements] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    watch,
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      pin: "",
    },
  });

  const password = watch("newPassword", "");

  useEffect(() => {
    if (newCodeRefresher === COUNTDOWN_TIME) {
      clearInterval(refreshInterval);
      setNewCodeRefresher(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCodeRefresher]);

  const handleBackClick = () => {
    setCurrentSlide((prev) => ({ ...prev, verifyCode: false, resetPassword: true }));
  };

  const handleSendNewCode = async () => {
    setIsSendingNewCode(true);
    const resetPasswordResponse = await resetPassword(email);

    if (resetPasswordResponse.error) {
      setIsSendingNewCode(false);
      toast({
        title: "Uh oh! Something went wrong",
        description: "There was an error while sending a new code. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setNewCodeRefresher(1);
    setRefreshInterval(
      setInterval(() => {
        setNewCodeRefresher((prev) => prev + 1);
      }, 1000)
    );
    toast({ title: "Code sent", description: "We sent a new code to your email." });
    setIsSendingNewCode(false);
  };

  const handleSetNewPassword = async (data: VerifyCodeFormData) => {
    const resetPasswordResponse = await confirmResetPassword(data.pin, email, data.newPassword);
    if (resetPasswordResponse.error) {
      toast({
        title: "Uh oh! Something went wrong",
        description: resetPasswordResponse.error,
        variant: "destructive",
      });
      return;
    }

    setCurrentSlide((prev) => ({
      ...prev,
      verifyCode: false,
      completion: true,
    }));
  };

  return (
    <form onSubmit={handleSubmit(handleSetNewPassword)}>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-semibold">Check your email</h1>
          <p>
            We sent a 6-digit code to <b>{email}</b>.
          </p>
        </div>
        <div className="flex flex-col gap-y-2 items-center">
          <Controller
            control={control}
            name="pin"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-12 h-12 md:w-18 md:h-18 md:text-base"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          <span className="text-red-500 text-sm">{errors.pin?.message}</span>

          <div className="flex items-center flex-row flex-wrap gap-x-2 justify-center sm:justify-start">
            <p>Didn't receive the email?</p>
            <Button
              type="button"
              className="hover:bg-white/90 px-0"
              variant="ghost"
              disabled={isSendingNewCode || !!newCodeRefresher}
              onClick={handleSendNewCode}
            >
              {isSendingNewCode ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : newCodeRefresher ? (
                <p>Send code again {formatCountdownTime(newCodeRefresher, COUNTDOWN_TIME)}</p>
              ) : (
                <p className="underline hover:text-black/70">Click to resend</p>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 items-start">
          <TooltipProvider>
            <Tooltip open={showRequirements}>
              <TooltipTrigger asChild>
                <Label className="text-base" htmlFor="password">
                  New password
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <PasswordCheck {...{ password }} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Input
            id="new-password"
            placeholder="Enter your new password"
            type="password"
            {...register("newPassword")}
            onFocus={() => setShowRequirements(true)}
            onBlur={() => setShowRequirements(false)}
          />
          <span className="text-red-500 text-sm">{errors.newPassword?.message}</span>

          <Label className="text-base" htmlFor="confirm-new-password">
            Confirm new password
          </Label>
          <Input
            id="confirm-new-password"
            type="password"
            {...register("confirmNewPassword")}
            placeholder="Re-enter your new password"
          />
          <span className="text-red-500 text-sm">{errors.confirmNewPassword?.message}</span>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="secondary" className="w-24" onClick={handleBackClick} type="button">
            Back
          </Button>
          <Button className="w-24" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
          </Button>
        </div>
        <StepsBars stepAmount={3} currentStep={2} />
      </div>
    </form>
  );
}
