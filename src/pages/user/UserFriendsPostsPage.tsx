import { useState, useEffect } from "react";
import { getFriendPosts } from "@/services/postService";

type Post = {
  id: number;
  text: string;
  image_url?: string;
  created_at: string;
  user?: {
    first_name: string;
    last_name: string;
  };
};

export default function UserFriendsPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getFriendPosts();
        const sorted = data.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPosts(sorted);
      } catch (error) {
        console.error("Greška pri dohvatanju objava:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Objave prijatelja</h1>

      {posts.length > 0 ? (
        <div className="space-y-6 max-w-2xl">
          {posts.map((post) => (
            <div key={post.id} className="p-6 bg-white rounded shadow border">
              <div className="mb-2">
                <p className="text-lg font-semibold">
                  {post.user
                    ? `${post.user.first_name} ${post.user.last_name}`
                    : "Nepoznat korisnik"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleString("sr-RS")}
                </p>
              </div>
              <p className="text-base mb-3">{post.text}</p>
              {post.image_url && (
                <img
                  src={`http://localhost:5000${post.image_url}`}
                  alt="Post slika"
                  className="w-full rounded border"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-base">Trenutno nema objava za prikaz.</p>
      )}
    </div>
  );
}
