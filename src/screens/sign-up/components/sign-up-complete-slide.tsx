import SlideBox from "@/components/slide-box";
import { Button } from "@/components/ui/button";

export default function SignUpCompleteSlide() {
  return (
    <div className="w-full flex items-center h-full flex-col gap-4">
      <div className="bg-white w-[30%] min-w-[325px] shadow rounded-2xl px-6 py-10">
        <div className="gap-4 flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Account created!</h1>
          <p>You may now log in to your account.</p>
          <Button
            className="w-20"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </Button>
        </div>
        <div className="pt-8">
          <SlideBox currentStep={3} stepAmount={3} />
        </div>
      </div>
    </div>
  );
}
