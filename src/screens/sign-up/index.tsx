import { useState } from "react";
import VerifyAccountSlide from "./components/verify-account-slide";
import SignUpCompleteSlide from "./components/sign-up-complete-slide";
import CreateAccountSlide from "./components/create-account-slide";
import Logo from "@/components/logo";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [showCreateAccountSlide, setShowCreateAccountSlide] = useState<boolean>(false);
  const [showVerifyAccountSlide, setShowVerifyAccountSlide] = useState<boolean>(true);
  const [showSignUpCompleteSlide, setShowSignUpCompleteSlide] = useState<boolean>(false);

  return (
    <section className="bg-green-bg w-full h-screen flex justify-center overflow-scroll fixed">
      <div className="w-full">
        <Logo className="m-8 h-12" />
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
      </div>
    </section>
  );
}
