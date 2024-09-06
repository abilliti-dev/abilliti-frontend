import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import AuthLayout from "@/layouts/auth-layout";
import CompletionSlide from "@/screens/forgot-password/components/completion-slide";
import ResetPasswordSlide from "@/screens/forgot-password/components/reset-password-slide";
import VerifyCodeSlide from "@/screens/forgot-password/components/verify-code-slide";

export type TCurrentSlide = {
  resetPassword: boolean;
  verifyCode: boolean;
  completion: boolean;
};

export default function ForgotPasswordPage() {
  const [currentSlide, setCurrentSlide] = useState<TCurrentSlide>({
    resetPassword: true,
    verifyCode: false,
    completion: false,
  });
  const [email, setEmail] = useState("");

  return (
    <AuthLayout>
      {currentSlide.resetPassword && <ResetPasswordSlide {...{ setCurrentSlide, setEmail }} />}
      {currentSlide.verifyCode && <VerifyCodeSlide {...{ setCurrentSlide, email }} />}
      {currentSlide.completion && <CompletionSlide />}
      <Toaster />
    </AuthLayout>
  );
}
