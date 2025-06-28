import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth_token");
    navigate("/");
  }, [navigate]);

  return null;
}
