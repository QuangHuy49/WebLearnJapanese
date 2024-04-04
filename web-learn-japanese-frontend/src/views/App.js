import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AdminLayout from '../pages/admin/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import CategoryPage from '../pages/admin/CategoryPage';
import LessonAdminPage from '../pages/admin/lesson/LessonPage';
import AddLessonAdminPage from '../pages/admin/lesson/AddLessonPage';
import EditLessonAdminPage from '../pages/admin/lesson/EditLessonPage';
import DetailLessonAdminLayout from '../pages/admin/lesson/detail_lesson/DetailLessonLayout';
import TestAdminPage from '../pages/admin/TestPage';
import UserPage from '../pages/admin/UserPage';
import PostAdminPage from '../pages/admin/PostPage';
import UserLayout from '../pages/user/UserLayout';
import HomePage from '../pages/user/HomePage';
import LessonUserPage from '../pages/user/LessonPage';
import TestUserPage from '../pages/user/TestPage';
import PostUserPage from '../pages/user/PostPage';
import VocabularyPage from '../pages/admin/lesson/detail_lesson/vocabulary/VocabularyPage';
import KaiwaPage from '../pages/admin/lesson/detail_lesson/kaiwa/KaiwaPage';
import GrammarPage from '../pages/admin/lesson/detail_lesson/grammar/GrammarPage';
import AddVocabularyPage from '../pages/admin/lesson/detail_lesson/vocabulary/AddVocabularyPage';
import EditVocabularyPage from '../pages/admin/lesson/detail_lesson/vocabulary/EditVocabularyPage';
import MyCoursePage from '../pages/user/MyCoursePage';
import LessonDetailPage from '../pages/user/LessonDetailPage';
import AddKaiwaPage from '../pages/admin/lesson/detail_lesson/kaiwa/AddKaiwaPage';
import EditKaiwaPage from '../pages/admin/lesson/detail_lesson/kaiwa/EditKaiwaPage';
import AddGrammarPage from '../pages/admin/lesson/detail_lesson/grammar/AddGrammarPage';
import EditGrammarPage from '../pages/admin/lesson/detail_lesson/grammar/EditGrammarPage';

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
        <Route path='/admin/lesson/edit-lesson/:id' element={<EditLessonAdminPage />} />

        <Route path='/admin/lesson/detail-lesson/:id' element={<DetailLessonAdminLayout />}>
          <Route path='/admin/lesson/detail-lesson/:id' element={<VocabularyPage />} />
          <Route path='/admin/lesson/detail-lesson/:id/kaiwa' element={<KaiwaPage />} />
          <Route path='/admin/lesson/detail-lesson/:id/grammar' element={<GrammarPage />} />
        </Route>

        <Route path='/admin/add-vocabulary' element={<AddVocabularyPage />} />
        <Route path='/admin/edit-vocabulary/:id' element={<EditVocabularyPage />} />

        <Route path='/admin/add-kaiwa' element={<AddKaiwaPage />} />
        <Route path='/admin/edit-kaiwa/:id' element={<EditKaiwaPage />} />

        <Route path='/admin/add-grammar' element={<AddGrammarPage />} />
        <Route path='/admin/edit-grammar/:id' element={<EditGrammarPage />} />

        <Route path='/admin/test' element={<TestAdminPage />} />
        <Route path='/admin/user' element={<UserPage />} />
        <Route path='/admin/post' element={<PostAdminPage />} />
      </Route>
      <Route path='/' element={<UserLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/lesson' element={<LessonUserPage />} />
        <Route path='/test' element={<TestUserPage />} />
        <Route path='/post' element={<PostUserPage />} />
        <Route path='/my-course' element={<MyCoursePage />} />
        <Route path='/lesson-detail/:id' element={<LessonDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
