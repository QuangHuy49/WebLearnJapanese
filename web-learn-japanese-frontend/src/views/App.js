import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AdminLayout from '../pages/admin/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';

import TypeAdminPage from '../pages/admin/type/TypePage';
import AddTypeAdminPage from '../pages/admin/type/AddTypePage';
import EditTypeAdminPage from '../pages/admin/type/EditTypePage';

import LessonAdminPage from '../pages/admin/lesson/LessonPage';
import AddLessonAdminPage from '../pages/admin/lesson/AddLessonPage';
import EditLessonAdminPage from '../pages/admin/lesson/EditLessonPage';

import UserAdminPage from '../pages/admin/user/UserPage';
import AddUserAdminPage from '../pages/admin/user/AddUserPage';
import EditUserAdminPage from '../pages/admin/user/EditUserPage';

import TestAdminPage from '../pages/admin/TestPage';
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
        <Route path='/admin/type' element={<TypeAdminPage/>} />
        <Route path='/admin/type/add-type' element={<AddTypeAdminPage />} />
        <Route path='/admin/type/edit-type/:id' element={<EditTypeAdminPage />} />

        <Route path='/admin/lesson' element={<LessonAdminPage />} />
        <Route path='/admin/lesson/add-lesson' element={<AddLessonAdminPage />} />
        <Route path='/admin/lesson/edit-lesson/:id' element={<EditLessonAdminPage />} />

        <Route path='/admin/test' element={<TestAdminPage />} />

        <Route path='/admin/user' element={<UserAdminPage />} />
        <Route path='/admin/user/add-user' element={<AddUserAdminPage />} />
        <Route path='/admin/user/edit-user/:id' element={<EditUserAdminPage />} />

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
