import { useState } from "react";
import VerifyAccountSlide from "./components/VerifyAccountSlide";
import SignUpCompleteSlide from "./components/SignUpCompleteSlide";
import CreateAccountSlide from "./components/CreateAccountSlide";

export default function SignUpPage() {
  const [showCreateAccountSlide, setShowCreateAccountSlide] = useState<boolean>(true);
  const [showVerifyAccountSlide, setShowVerifyAccountSlide] = useState<boolean>(false);
  const [showSignUpCompleteSlide, setShowSignUpCompleteSlide] = useState<boolean>(false);

  return (
    <section className="bg-green-bg w-full h-screen flex justify-center overflow-scroll fixed">
      <div className="w-full">
        <div className="m-8">
          <img className="h-12" src="/Abilliti.svg" alt="logo" />
        </div>
        {showCreateAccountSlide && (
          <CreateAccountSlide
            setShowCreateAccountSlide={setShowCreateAccountSlide}
            setShowVerifyAccountSlide={setShowVerifyAccountSlide}
          />
        )}
        {showVerifyAccountSlide && <VerifyAccountSlide />}
        {showSignUpCompleteSlide && <SignUpCompleteSlide />}
      </div>
    </section>
  );
}
