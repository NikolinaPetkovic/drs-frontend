import type { ReactNode } from "react";
import logo from "@/assets/logo.png";


export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex w-1/3 items-center justify-center bg-gradient-to-br from-fuchsia-600 via-purple-700 to-blue-900 p-10 text-white">
        <div className="max-w-sm">
          <img src={logo} alt="DRS Logo" className="w-70 mx-auto" />
        </div>
      </div>

      <div className="w-full lg:w-2/3 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
