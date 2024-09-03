import { useEffect } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

export default function OneTimePin({ pin, setPin, maxLength }: any) {
  useEffect(() => {
    if (pin.length === maxLength && document) {
      (document.activeElement as HTMLElement).blur();
    }
  }, [pin]);

  return (
    <InputOTP maxLength={maxLength} value={pin} onChange={(pin) => setPin(pin)} autoFocus>
      <InputOTPGroup>
        {Array.from({ length: maxLength }, (_, i) => i).map((i: number, key) => (
          <InputOTPSlot index={i} key={key} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
