import { confirmSignUp } from "@/auth/authService";
import OneTimePin from "@/components/one-time-pin";
import SlideBox from "@/components/slide-box";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { CodeMismatchException } from "@aws-sdk/client-cognito-identity-provider";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export interface VerifyAccountSlideProps {
  email: string;
  setShowCreateAccountSlide: Dispatch<SetStateAction<boolean>>;
  setShowVerifyAccountSlide: Dispatch<SetStateAction<boolean>>;
  setShowSignUpCompleteSlide: Dispatch<SetStateAction<boolean>>;
}

export default function VerifyAccountSlide({
  email,
  setShowCreateAccountSlide,
  setShowVerifyAccountSlide,
  setShowSignUpCompleteSlide,
}: VerifyAccountSlideProps) {
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
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">Verify your email</h1>
      <p>
        Check <strong>{email}</strong> for a verification code
      </p>
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

      <Toaster />
    </div>
  );
}
