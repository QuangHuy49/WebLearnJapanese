import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserLayout from '../pages/user/UserLayout';
import HomePage from '../pages/user/HomePage';
import LoginPage from '../pages/user/LoginPage';
import SignupPage from '../pages/user/SignupPage';
import AdminLayout from '../pages/admin/AdminLayout';
import DashboardLayout from '../pages/admin/DashboardLayout';
import CatogoryLayout from '../pages/admin/CatgoryLayout';
import LessonLayout from '../pages/admin/LessonLayout';
import TestLayout from '../pages/admin/TestLayout';
import UserAdminLayout from '../pages/admin/UserLayout';
import PostLayout from '../pages/admin/PostLayout';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      
      <Route path='/' element={<UserLayout />}>
        <Route path='/' element={<HomePage />} />
        
      </Route>

      <Route path='/admin' element={<AdminLayout />}>
        <Route path='/admin' element={<DashboardLayout />} />
        <Route path='/admin/category' element={<CatogoryLayout />} />
        <Route path='/admin/lesson' element={<LessonLayout />} />
        <Route path='/admin/test' element={<TestLayout />} />
        <Route path='/admin/user' element={<UserAdminLayout />} />
        <Route path='/admin/post' element={<PostLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
