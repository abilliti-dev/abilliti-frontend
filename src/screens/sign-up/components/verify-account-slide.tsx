import { confirmSignUp } from "@/auth/authService";
import OneTimePin from "@/components/one-time-pin";
import SlideBox from "@/components/slide-box";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { CodeMismatchException } from "@aws-sdk/client-cognito-identity-provider";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function VerifyAccountSlide({
  email,
  setShowCreateAccountSlide,
  setShowVerifyAccountSlide,
  setShowSignUpCompleteSlide,
}: any) {
  const [pin, setPin] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleVerifyAccount = async () => {
    setIsSubmitting(true);
    try {
      await confirmSignUp(email, pin);
      setShowVerifyAccountSlide(false);
      setShowSignUpCompleteSlide(true);
    } catch (error) {
      if (error instanceof CodeMismatchException) {
        toast({
          title: "Invalid code",
          description: "Please try again",
        });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex items-center h-full flex-col gap-4">
      <div className="flex flex-col bg-white w-[55%] min-w-[325px] shadow rounded-2xl px-6 py-10 gap-8">
        <h1 className="text-3xl font-semibold">Verify your email</h1>
        <p>Check {email} for a verification code</p>
        <div className="flex flex-col items-center">
          <OneTimePin pin={pin} setPin={setPin} maxLength={6} />
        </div>
        <div className="flex flex-row justify-between">
          <Button
            type="button"
            className="px-8"
            onClick={() => {
              setShowCreateAccountSlide(true);
              setShowVerifyAccountSlide(false);
            }}
          >
            Back
          </Button>
          <Button
            className="px-8"
            onClick={handleVerifyAccount}
            disabled={pin.length !== 6 || isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </div>
        <SlideBox currentStep={2} stepAmount={3} />
      </div>
      <Toaster />
    </div>
  );
}
