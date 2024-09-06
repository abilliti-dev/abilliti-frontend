import StepsBars from "@/components/steps-bar";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";

export default function CompletionSlide() {
  return (
    <div>
      <div className="flex flex-start flex-col gap-y-4">
        <h1 className="text-3xl font-semibold">Your password has been reset.</h1>
        <p>You can now sign in with your new password.</p>
      </div>

      <div className="w-full items-center justify-center flex py-12">
        <CircleCheckBig className="w-32 h-32 md:w-40 md:h-40 text-green-primary" />
      </div>

      <div className="flex w-full my-8">
        <Button className="flex-1" onClick={() => (window.location.href = "/login")}>
          Log in
        </Button>
      </div>

      <StepsBars stepAmount={3} currentStep={3} />
    </div>
  );
}
