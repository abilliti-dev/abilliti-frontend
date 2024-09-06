import { useEffect, useState } from "react";
import VerifyAccountSlide from "./components/verify-account-slide";
import SignUpCompleteSlide from "./components/sign-up-complete-slide";
import CreateAccountSlide from "./components/create-account-slide";
import Confetti from "react-confetti";
import AuthLayout from "@/layouts/auth-layout";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [showCreateAccountSlide, setShowCreateAccountSlide] = useState<boolean>(true);
  const [showVerifyAccountSlide, setShowVerifyAccountSlide] = useState<boolean>(false);
  const [showSignUpCompleteSlide, setShowSignUpCompleteSlide] = useState<boolean>(false);

  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AuthLayout>
      {showSignUpCompleteSlide && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
        />
      )}
      {showCreateAccountSlide && (
        <CreateAccountSlide
          setShowCreateAccountSlide={setShowCreateAccountSlide}
          setShowVerifyAccountSlide={setShowVerifyAccountSlide}
          setEmail={setEmail}
        />
      )}
      {showVerifyAccountSlide && (
        <VerifyAccountSlide
          email={email}
          setShowCreateAccountSlide={setShowCreateAccountSlide}
          setShowVerifyAccountSlide={setShowVerifyAccountSlide}
          setShowSignUpCompleteSlide={setShowSignUpCompleteSlide}
        />
      )}
      {showSignUpCompleteSlide && <SignUpCompleteSlide />}
    </AuthLayout>
  );
}
