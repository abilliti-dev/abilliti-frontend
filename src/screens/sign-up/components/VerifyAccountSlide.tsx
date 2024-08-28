import OneTimePin from "@/components/OneTimePin";
import { useState } from "react";

export default function VerifyAccountSlide() {
  const [pin, setPin] = useState<string>("");
  console.log(pin);
  return (
    <div className="w-full flex items-center h-full flex-col gap-4">
      <div className="bg-white w-[55%] min-w-[325px] shadow rounded-2xl px-6 py-10">
        <OneTimePin pin={pin} setPin={setPin} maxLength={6} />
      </div>
    </div>
  );
}
