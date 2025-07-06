import { useEffect, useState } from "react";
import {
  getMyApprovedPosts,
  getMyRejectedPosts,
  deletePost,
  updatePost,
  type Post,
} from "@/services/postService";

type PostStatus = "draft" | "pending" | "approved" | "rejected";

export default function UserPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editModal, setEditModal] = useState<Post | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editImage, setEditImage] = useState<string | File>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [approved, rejected] = await Promise.all([
          getMyApprovedPosts(),
          getMyRejectedPosts(),
        ]);
        const all = [...approved, ...rejected];
        const sorted = all.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPosts(sorted);
      } catch (err) {
        console.error("Greška prilikom dohvatanja objava:", err);
      }
    };

    fetchPosts();
  }, []);

  const getStatusColor = (status: PostStatus) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      case "draft":
        return "text-gray-500";
    }
  };

  const handleEdit = (post: Post) => {
    setEditModal(post);
    setEditText(post.text || "");
    setEditImage(post.image || "");
  };

  const handleSaveEdit = async () => {
    if (editModal) {
      try {
        const formData = new FormData();
        formData.append("text", editText);
        if (editImage instanceof File) {
          formData.append("image", editImage);
        }

        await updatePost(editModal.id, formData);

        const updatedPosts = posts.map((p) =>
          p.id === editModal.id
            ? {
                ...p,
                text: editText,
                image:
                  editImage instanceof File
                    ? URL.createObjectURL(editImage)
                    : editImage,
              }
            : p
        );
        setPosts(updatedPosts);
        setEditModal(null);
      } catch (error) {
        console.error("Greška prilikom izmene objave:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeleteModalId(null);
    } catch (err) {
      console.error("Greška prilikom brisanja:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Moje objave</h1>

      {posts.length > 0 ? (
        <div className="space-y-6 max-w-2xl">
          {posts.map((post) => (
            <div key={post.id} className="p-6 bg-white rounded shadow border">
              <div className="mb-2 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleString("sr-RS")}
                </p>
                <span
                  className={`text-sm font-medium ${getStatusColor(
                    post.status as PostStatus
                  )}`}
                >
                  {post.status === "rejected"
                    ? `Odbijeno (${post.rejection_count || 0})`
                    : post.status === "approved"
                    ? "Odobreno"
                    : post.status === "pending"
                    ? "Na čekanju"
                    : "Nacrt"}
                </span>
              </div>
              <p className="text-base mb-3">{post.text}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post slika"
                  className="w-full rounded border mb-3"
                />
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="px-4 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Izmeni
                </button>
                <button
                  onClick={() => setDeleteModalId(post.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Obriši
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-base">
          Trenutno nemate nijednu objavu.
        </p>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Izmena objave</h2>

            <label className="block mb-2 text-sm">Tekst</label>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
              rows={4}
            />

            <label className="block mb-2 text-sm">Slika (opcionalno)</label>
            {editImage && (
              <img
                src={
                  editImage instanceof File
                    ? URL.createObjectURL(editImage)
                    : editImage
                }
                alt="Trenutna slika"
                className="w-full h-auto mb-4 rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setEditImage(file);
                }
              }}
              className="mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditModal(null)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Otkaži
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sačuvaj
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Brisanje objave</h2>
            <p className="mb-6">Da li želite da obrišete ovu objavu?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Ne
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Da
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
