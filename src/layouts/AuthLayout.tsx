import { Outlet } from "react-router-dom";
import illustration from "../assets/illustration.png";
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="md:flex flex-col lg:flex-row w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center gap-16">
        <Logo className="h-6 text-gray-500" />

        <div className="max-w-md">
          <Outlet />
        </div>
      </div>

      <div className="hidden md:flex xl:w-1/2 h-full justify-center items-center p-4 lg:p-8 relative">
        <img
          src={illustration}
          className="object-cover w-full h-full max-w-[656px] min-w-[600px] max-h-[960px] select-none rounded-[32px]"
        />

        <div className="w-full max-w-[626px] lg:max-w-[580px] 2xl:max-w-[626px] bottom-10 bg-white p-8 absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />

          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck!
          </p>
        </div>
      </div>
    </div>
  );
}
