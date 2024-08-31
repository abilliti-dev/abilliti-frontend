import { hasLowerCase, hasNumber, hasSpecialChar, hasUpperCase } from "@/lib/auth-utils";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface PasswordCheckProps {
  password: string;
}

export type TPasswordRequirements = {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasMinChars: boolean;
};

export default function PasswordCheck({ password }: PasswordCheckProps) {
  const [requirements, setRequirements] = useState<TPasswordRequirements>({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinChars: false,
  });

  useEffect(() => {
    setRequirements({
      hasUpperCase: hasUpperCase(password),
      hasLowerCase: hasLowerCase(password),
      hasNumber: hasNumber(password),
      hasSpecialChar: hasSpecialChar(password),
      hasMinChars: password.length >= 8,
    });
  }, [password]);

  return (
    <div className="flex flex-col">
      {[
        { value: "Uppercase", requirementMet: requirements.hasUpperCase },
        { value: "Lowercase", requirementMet: requirements.hasLowerCase },
        { value: "Number", requirementMet: requirements.hasNumber },
        {
          value: "Special character",
          requirementMet: requirements.hasSpecialChar,
        },
        {
          value: "At least 8 characters",
          requirementMet: requirements.hasMinChars,
        },
      ].map((requirement, key) => {
        return (
          <div key={key} className="flex flex-row items-center gap-x-1">
            {requirement.requirementMet ? (
              <Check className="text-green-primary" />
            ) : (
              <X className="text-red-500" />
            )}
            <p
              className={`text-sm ${
                requirement.requirementMet ? "text-green-primary" : "text-red-500"
              }`}
            >
              {requirement.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
