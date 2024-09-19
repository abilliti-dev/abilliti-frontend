import Logo from "@/components/logo";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="bg-green-bg w-full h-screen flex gap-y-16 items-center justify-center overflow-scroll">
      <div className="w-full flex items-center h-full md:pt-[10vh] pt-[2vh] flex-col gap-4 md:gap-8">
        <Logo className="w-36 md:w-64" />
        <div className="bg-white w-[95%] sm:w-[60%] md:w-[50%] min-w-[315px] max-w-[750px] shadow rounded-2xl px-6 py-4">
          {children}
        </div>
      </div>
    </section>
  );
}
