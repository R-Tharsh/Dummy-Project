import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import RootLayout from "./Layout/RootLayout";
import ProfileScreen from "./Screens/ProfileScreen";
import PostsPage from "./Screens/PostsPage";
import PostDetailPage from "./Screens/PostDetailPage";
import UserCrudScreen from "./Screens/UserCrudScreen"; // Import the new screen
import CrudPage from "./Screens/CrudPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />

          <Route path="/crud" element={<CrudPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
