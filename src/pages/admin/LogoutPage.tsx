import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Odjavljujem vas...</h1>
    </div>
  );
}
