import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/input/Input";
import Button from "@/components/button/Button";
import AuthLayout from "@/components/layout/Layout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      console.log("Ulogovan kao admin");
      navigate("/admin");
    } else if (username === "user" && password === "user") {
      console.log("Ulogovan kao user");
      navigate("/user");
    } else {
      alert("Neispravni podaci");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Dobrodošli</h2>
        </div>

        <TextInput
          label="Korisničko ime"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Unesite korisničko ime"
        />

        <TextInput
          label="Lozinka"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Unesite lozinku"
        />

        <Button type="submit">Sign In</Button>
      </form>
    </AuthLayout>
  );
}
