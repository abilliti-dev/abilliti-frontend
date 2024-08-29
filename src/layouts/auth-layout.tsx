import Logo from "@/components/logo";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="bg-green-bg w-full h-screen flex gap-y-16 items-center justify-center">
      <div className="w-full flex items-center h-full pt-[10vh] flex-col gap-4">
        <Logo className="mb-2" />
        <div className="bg-white w-[95%] sm:w-[60%] md:w-[50%] min-w-[325px] max-w-[750px] shadow rounded-2xl px-6 py-10">
          {children}
        </div>
      </div>
    </section>
  );
}
