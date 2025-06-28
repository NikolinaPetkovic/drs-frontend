import { useState, type ChangeEvent } from "react";

export default function UserCreatePostPage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text && !image) {
      alert("Molimo unesite tekst ili sliku.");
      return;
    }

    console.log("Tekst:", text);
    console.log("Slika:", image);

    setText("");
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Kreiraj objavu</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <textarea
          className="w-full p-4 text-base border rounded shadow-sm resize-none focus:outline-none focus:ring focus:ring-blue-300"
          rows={5}
          placeholder="Podeli nešto sa prijateljima..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-base text-gray-600 file:mr-4 file:py-3 file:px-6
            file:rounded file:border-0 file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {previewUrl && (
          <div className="mt-4">
            <p className="text-base text-gray-600 mb-2">Pregled slike:</p>
            <img
              src={previewUrl}
              alt="Pregled"
              className="max-w-full h-auto rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-6 text-base bg-green-500 text-white rounded hover:bg-green-600"
        >
          Objavi
        </button>
      </form>
    </div>
  );
}
