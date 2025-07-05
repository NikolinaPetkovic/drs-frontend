import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/input/Input";
import Button from "@/components/button/Button";
import AuthLayout from "@/components/layout/Layout";
import { login } from "@/services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    setErrorMessage("");

    try {
      const data = await login(username, password);

      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("user_id", data.user_id.toString());
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "user") {
        navigate("/user");
      } else {
        setErrorMessage("Nepoznata korisnička uloga.");
        setUsernameError(true);
        setPasswordError(true);
      }
    } catch (err: any) {
      setUsernameError(true);
      setPasswordError(true);
      setErrorMessage("Neispravno korisničko ime ili lozinka.");
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
          error={usernameError}
          errorMessage={usernameError ? errorMessage : ""}
        />

        <TextInput
          label="Lozinka"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Unesite lozinku"
          error={passwordError}
          errorMessage={passwordError ? errorMessage : ""}
        />

        <Button type="submit">Sign In</Button>
      </form>
    </AuthLayout>
  );
}
