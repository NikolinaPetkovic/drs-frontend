import { useState, useEffect } from "react";

type Post = {
  id: number;
  userFullName: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

export default function UserFriendsPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: 1,
        userFullName: "Ana Jovanović",
        content: "opis",
        imageUrl: "https://via.placeholder.com/400x200",
        createdAt: "2025-06-27T14:20:00",
      },
      {
        id: 2,
        userFullName: "Marko Petrović",
        content: "opis",
        createdAt: "2025-06-28T09:00:00",
      },
    ];
    const sorted = mockPosts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setPosts(sorted);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Objave prijatelja</h1>

      {posts.length > 0 ? (
        <div className="space-y-6 max-w-2xl">
          {posts.map((post) => (
            <div key={post.id} className="p-6 bg-white rounded shadow border">
              <div className="mb-2">
                <p className="text-lg font-semibold">{post.userFullName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString("sr-RS")}
                </p>
              </div>
              <p className="text-base mb-3">{post.content}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
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
