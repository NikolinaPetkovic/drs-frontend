import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/AdminPage.tsx";
import AdminInfoPage from "@/pages/admin/AdminInfoPage";
import CreateUserPage from "@/pages/admin/CreateUserPage";
import BlockedUsersPage from "@/pages/admin/BlockedUsersPage";
import LogoutPage from "@/pages/admin/LogoutPage";
import UserCreatePostPage from "@/pages/user/UserCreatePostPage";
import UserRequestsPage from "@/pages/user/UserRequestsPage";
import UserAddFriendsPage from "@/pages/user/UserAddFriendsPage";
import UserFriendsPostsPage from "@/pages/user/UserFriendsPostsPage";
import UserFriendsListPage from "@/pages/user/UserFriendsListPage";
import UserSettingsPage from "@/pages/user/UserSettingsPage";
import UserLogout from "@/pages/user/UserLogout";
import UserLayout from "@/components/layout/UserLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/admin" element={<AdminDashboard />} />
       <Route path="/admin/info" element={<AdminInfoPage />} />
        <Route path="/admin/create-user" element={<CreateUserPage />} />
        <Route path="/admin/blocked-users" element={<BlockedUsersPage />} />
        <Route path="/admin/logout" element={<LogoutPage />} />
        <Route path="/user" element={<UserLayout />}>
          <Route path="create-post" element={<UserCreatePostPage />} />
          <Route path="requests" element={<UserRequestsPage />} />
          <Route path="add-friends" element={<UserAddFriendsPage />} />
          <Route path="friends-posts" element={<UserFriendsPostsPage />} />
          <Route path="friends" element={<UserFriendsListPage />} />
          <Route path="settings" element={<UserSettingsPage />} />
          <Route path="logout" element={<UserLogout />} />
        </Route>
    </Routes>
  );
}
