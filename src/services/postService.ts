import api from "./api";

export type Post = {
  id: number;
  text: string;
  user_id: number;
  created_at: string;
  status: string;
  image: string | null;
  user?: {
    first_name: string;
    last_name: string;
  };
};

export const getPendingPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/pending");
  return response.data;
};

export const approvePost = async (id: number): Promise<void> => {
  await api.patch(`/posts/${id}/approve`);
};

export const rejectPost = async (id: number): Promise<void> => {
  await api.post(`/posts/${id}/reject`);
};

export const createPost = async (formData: FormData) => {
  await api.post("/posts/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFriendPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/friends");
  return response.data;
};




