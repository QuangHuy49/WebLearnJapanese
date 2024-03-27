import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AdminLayout from '../pages/admin/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import CategoryPage from '../pages/admin/CategoryPage';
import LessonAdminPage from '../pages/admin/lesson/LessonPage';
import AddLessonAdminPage from '../pages/admin/lesson/AddLessonPage';
import TestAdminPage from '../pages/admin/TestPage';
import UserPage from '../pages/admin/UserPage';
import PostAdminPage from '../pages/admin/PostPage';
import UserLayout from '../pages/user/UserLayout';
import HomePage from '../pages/user/HomePage';
import LessonUserPage from '../pages/user/LessonPage';
import TestUserPage from '../pages/user/TestPage';
import PostUserPage from '../pages/user/PostPage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />

      <Route path='/admin' element={<AdminLayout />}>
        <Route path='/admin' element={<DashboardPage />} />
        <Route path='/admin/category' element={<CategoryPage />} />
        <Route path='/admin/lesson' element={<LessonAdminPage />} />
        <Route path='/admin/lesson/add-lesson' element={<AddLessonAdminPage />} />
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
