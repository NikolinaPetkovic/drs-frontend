import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import TextInput from "@/components/input/Input";
import Button from "@/components/button/Button";
import { createUser } from "@/services/userService";

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await createUser({
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      phone: formData.phone,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    });

    alert("Korisnik uspešno dodat!");
    console.log("Backend response:", response);
  } catch (error: any) {
    console.error("Greška:", error);
    alert("Došlo je do greške prilikom dodavanja korisnika.");
  }
};

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 uppercase text-gray-800">
          Kreiranje korisnika
        </h1>
        <p className="text-gray-600 mb-6">
          Popunite formu za dodavanje novog korisnika.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow p-6 space-y-4 max-w-xl"
        >
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Ime"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextInput
              label="Prezime"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextInput
              label="Adresa"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextInput
              label="Grad"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <TextInput
              label="Država"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <TextInput
              label="Telefon"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextInput
              label="Korisničko ime"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextInput
              label="Lozinka"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button type="submit">Dodaj korisnika</Button>
        </form>
      </main>
    </div>
  );
}
