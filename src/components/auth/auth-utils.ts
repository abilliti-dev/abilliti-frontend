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
