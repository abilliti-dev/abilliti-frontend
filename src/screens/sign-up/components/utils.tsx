import { Check, X } from "lucide-react";

export const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

export function hasUpperCase(str: string): boolean {
  if (!str) return false;
  return /[A-Z]/.test(str);
}

export function hasLowerCase(str: string): boolean {
  if (!str) return false;
  return /[a-z]/.test(str);
}

export function hasNumber(str: string): boolean {
  if (!str) return false;
  return /[0-9]/.test(str);
}

export function hasSpecialChar(str: string): boolean {
  if (!str) return false;
  return specialChars.test(str);
}

export function PasswordCheck({ passwordRequirements }: any) {
  const { hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasMinChars } =
    passwordRequirements;
  const hasUpperCaseColor = hasUpperCase ? "text-green-primary" : "text-red-500";
  const hasLowerCaseColor = hasLowerCase ? "text-green-primary" : "text-red-500";
  const hasNumberColor = hasNumber ? "text-green-primary" : "text-red-500";
  const hasSpecialCharColor = hasSpecialChar ? "text-green-primary" : "text-red-500";
  const hasMinCharsColor = hasMinChars ? "text-green-primary" : "text-red-500";

  return (
    <div className="flex flex-col">
      {[
        { value: "Uppercase", render: hasUpperCase, renderColor: hasUpperCaseColor },
        { value: "Lowercase", render: hasLowerCase, renderColor: hasLowerCaseColor },
        { value: "Number", render: hasNumber, renderColor: hasNumberColor },
        { value: "Special character", render: hasSpecialChar, renderColor: hasSpecialCharColor },
        { value: "At least 8 characters", render: hasMinChars, renderColor: hasMinCharsColor },
      ].map((requirement, key) => {
        return (
          <div key={key} className="flex flex-row items-center gap-x-1">
            {requirement.render ? (
              <Check className="text-green-primary" />
            ) : (
              <X className="text-red-500" />
            )}
            <p className={`text-sm ${requirement.renderColor}`}>{requirement.value}</p>
          </div>
        );
      })}
    </div>
  );
}
