export interface LoginResponse {
  access_token: string;
  user_id: number;
  role: "admin" | "coach" | string;
}
