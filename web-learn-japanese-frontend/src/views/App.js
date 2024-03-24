import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import UserLayout from '../pages/user/UserLayout';
import HomePage from '../pages/user/HomePage';
import LessonUserPage from '../pages/user/LessonPage';
import TestUserPage from '../pages/user/TestPage';
import PostUserPage from '../pages/user/PostPage';
import AdminLayout from '../pages/admin/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import CatogoryPage from '../pages/admin/CatgoryPage';
import LessonAdminPage from '../pages/admin/LessonPage';
import TestAdminPage from '../pages/admin/TestPage';
import UserPage from '../pages/admin/UserPage';
import PostAdminPage from '../pages/admin/PostPage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin' element={<DashboardPage />} />
          <Route path='/admin/category' element={<CatogoryPage />} />
          <Route path='/admin/lesson' element={<LessonAdminPage />} />
          <Route path='/admin/test' element={<TestAdminPage />} />
          <Route path='/admin/user' element={<UserPage />} />
          <Route path='/admin/post' element={<PostAdminPage />} />
        </Route>
        <Route path='/' element={<UserLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/lesson' element={<LessonUserPage />} />
          <Route path='/test' element={<TestUserPage />} />
          <Route path='/post' element={<PostUserPage />} />
        </Route>
    </Routes>
  );
}

export default App;
