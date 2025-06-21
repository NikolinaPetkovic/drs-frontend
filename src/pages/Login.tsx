import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import TextInput from "@/components/input/Input";
import Button from "@/components/button/Button";
import AuthLayout from "@/components/layout/Layout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      console.log("Ulogovan kao admin");
      navigate("/admin"); 
    } else {
      alert("Neispravni podaci");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Dobrodosli</h2>
        </div>

        <TextInput
          label="Korisnicko ime"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Unesite korisnicko ime"
        />

        <TextInput
          label="Lozinka"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Unesite lozinku"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-blue-600"
            />
            Zapamti me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Zaboravljena lozinka?
          </a>
        </div>

        <Button type="submit">Sign In</Button>
      </form>
    </AuthLayout>
  );
}
