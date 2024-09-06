import SlideBox from "@/components/slide-box";
import { Button } from "@/components/ui/button";

export default function SignUpCompleteSlide() {
  return (
    <div className="px-6 pt-10 pb-5">
      <div className="gap-4 flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Account created!</h1>
        <p>You may now log in to your account.</p>
        <Button
          className="w-36"
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
  );
}
