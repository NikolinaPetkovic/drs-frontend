import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function LogoutPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    navigate("/"); 
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Da li želite da se odjavite?
          </h1>

          <div className="flex justify-center gap-6">
             <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Da
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Ne
          </button>
          </div>
        </div>
      </main>
    </div>
  );
}
