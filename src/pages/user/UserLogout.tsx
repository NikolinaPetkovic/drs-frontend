import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Obriši sve podatke o autentikaciji iz localStorage-a
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");

    // Redirektuj korisnika na login (ili početnu stranu)
    navigate("/");
  }, [navigate]);

  return null;
}
