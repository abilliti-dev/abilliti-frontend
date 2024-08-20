import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface IAuthContext {
  error: string | undefined;
  setError: Dispatch<SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [error, setError] = useState<string | undefined>("");

  return <AuthContext.Provider value={{ error, setError }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }

  return ctx;
}
