import { Outlet } from "react-router-dom";
import UserSidebar from "@/components/user/UserSidebar";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}