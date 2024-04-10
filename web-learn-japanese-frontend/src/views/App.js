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
import DetailLessonAdminLayout from '../pages/admin/lesson/detail_lesson/DetailLessonLayout';
import TestAdminPage from '../pages/admin/test/TestPage';
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
import LessonBasicN5 from '../pages/user/LessonBasicN5';
import LessonBasicN4 from '../pages/user/LessonBasicN4';
import AddTestPage from '../pages/admin/test/AddTestPage';
import EditTestPage from '../pages/admin/test/EditTestPage';
import QuestionPage from '../pages/admin/test/question/QuestionPage';
import AddQuestionPage from '../pages/admin/test/question/AddQuestionPage';
import EditQuestionPage from '../pages/admin/test/question/EditQuestionPage';
import AnswerPage from '../pages/admin/test/question/answer/AnswerPage';
import EditAnswerPage from '../pages/admin/test/question/answer/EditAnswerPage';

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
        <Route path='/admin/test/add-test' element={<AddTestPage />} />
        <Route path='/admin/test/edit-test/:id' element={<EditTestPage />} />

        <Route path='/admin/test/question/:id' element={<QuestionPage />} />
        <Route path='/admin/test/add-question' element={<AddQuestionPage />} />
        <Route path='/admin/test/edit-question/:id' element={<EditQuestionPage />} />

        <Route path='/admin/test/question/answer/:id' element={<AnswerPage />} />
        <Route path='/admin/test/question/answer/edit-answer/:id' element={<EditAnswerPage />} />

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
        <Route path='/my-course' element={<MyCoursePage />} />
        <Route path='/lesson-detail/:id' element={<LessonDetailPage />} />
        <Route path='/lesson-basic-n5' element={<LessonBasicN5 />} />
        <Route path='/lesson-basic-n4' element={<LessonBasicN4 />} />
      </Route>
    </Routes>
  );
}

export default App;
