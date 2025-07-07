import api from "./api";

export type Post = {
  id: number;
  text: string;
  user_id: number;
  created_at: string;
  status: string;
  image: string | null;
  rejection_count: number;
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

export const updatePost = async (id: number, data: FormData) => {
  return await api.put(`/posts/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getFriendPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/friends");
  return response.data;
};

export const getMyPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/my");
  return response.data;
};

export const getMyApprovedPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/my/approved");
  return response.data;
};

export const getMyRejectedPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/my/rejected");
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
