import { useState } from "react";
import TextInput from "@/components/input/Input";
import Button from "@/components/button/Button";

export default function AdminDashboard() {
  const admin = {
    firstName: "Admin",
    lastName: "Super",
    address: "Ulica 1",
    city: "Beograd",
    country: "Srbija",
    phone: "+381601234567",
    email: "admin@example.com",
    username: "admin",
  };

  const [form, setForm] = useState({
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Validacija + poziv backend endpointa za kreiranje korisnika
    console.log("Slanje korisnika:", form);

    // primer za slanje requesta:
    // await axios.post("/api/users", form);

    // reset forme
    setForm({
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
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fiksni podaci administratora */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Administrator</h2>
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Ime" name="firstName" value={admin.firstName} onChange={() => {}} disabled />
            <TextInput label="Prezime" name="lastName" value={admin.lastName} onChange={() => {}} disabled />
            <TextInput label="Adresa" name="address" value={admin.address} onChange={() => {}} disabled />
            <TextInput label="Grad" name="city" value={admin.city} onChange={() => {}} disabled />
            <TextInput label="Država" name="country" value={admin.country} onChange={() => {}} disabled />
            <TextInput label="Telefon" name="phone" value={admin.phone} onChange={() => {}} disabled />
            <TextInput label="Email" name="email" value={admin.email} onChange={() => {}} disabled />
            <TextInput label="Korisničko ime" name="username" value={admin.username} onChange={() => {}} disabled />
          </div>
        </div>

        {/* Forma za dodavanje korisnika */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Dodaj korisnika</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <TextInput label="Ime" name="firstName" value={form.firstName} onChange={handleChange} required />
              <TextInput label="Prezime" name="lastName" value={form.lastName} onChange={handleChange} required />
              <TextInput label="Adresa" name="address" value={form.address} onChange={handleChange} required />
              <TextInput label="Grad" name="city" value={form.city} onChange={handleChange} required />
              <TextInput label="Država" name="country" value={form.country} onChange={handleChange} required />
              <TextInput label="Telefon" name="phone" value={form.phone} onChange={handleChange} required />
              <TextInput label="Email" name="email" value={form.email} onChange={handleChange} required />
              <TextInput label="Korisničko ime" name="username" value={form.username} onChange={handleChange} required />
              <TextInput label="Lozinka" name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="mt-6">
              <Button type="submit">Kreiraj korisnika</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
