import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/auth/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const session = await signIn(email, password);
      console.log("Sign in successful");
      if (session && typeof session.AccessToken !== "undefined") {
        sessionStorage.setItem("accessToken", session.AccessToken);
        if (sessionStorage.getItem("accessToken")) {
          window.location.href = "/home";
        } else {
          console.error("Session token was not set properly.");
        }
      } else {
        console.error("SignIn session or AccessToken is undefined.");
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

  return (
    <section className="bg-green-bg w-full h-screen flex items-center justify-center">
      <div className="w-full flex items-center h-full flex-col gap-4">
        <div className="mt-12 mb-2">
          <img src="/Abilliti.svg" alt="logo" />
        </div>

        <div className="bg-white w-[30%] min-w-[325px] shadow rounded-2xl px-6 py-10">
          <h2 className="text-3xl text-center font-semibold">Welcome back</h2>
          <div className="flex flex-col gap-8 my-4">
            <div className="flex flex-col gap-2">
              <Label className="text-base" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-base" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <a
                href="/forgot-password"
                className="text-green-primary underline text-sm w-fit"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <Button className="w-full mt-8">Sign in</Button>
          <div className="flex items-center justify-center gap-2 mt-4">
            <p>Don't have an account?</p>
            <a href="/sign-up" className="text-green-primary underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
