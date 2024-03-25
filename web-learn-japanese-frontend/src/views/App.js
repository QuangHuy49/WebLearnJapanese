import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// Tạo các component được tải trễ
const LazyLoginPage = React.lazy(() => import('../pages/LoginPage'));
const LazySignupPage = React.lazy(() => import('../pages/SignupPage'));
const LazyUserLayout = React.lazy(() => import('../pages/user/UserLayout'));
const LazyHomePage = React.lazy(() => import('../pages/user/HomePage'));
const LazyLessonUserPage = React.lazy(() => import('../pages/user/LessonPage'));
const LazyTestUserPage = React.lazy(() => import('../pages/user/TestPage'));
const LazyPostUserPage = React.lazy(() => import('../pages/user/PostPage'));
const LazyAdminLayout = React.lazy(() => import('../pages/admin/AdminLayout'));
const LazyDashboardPage = React.lazy(() => import('../pages/admin/DashboardPage'));
const LazyCategoryPage = React.lazy(() => import('../pages/admin/CategoryPage'));
const LazyLessonAdminPage = React.lazy(() => import('../pages/admin/LessonPage'));
const LazyTestAdminPage = React.lazy(() => import('../pages/admin/TestPage'));
const LazyUserPage = React.lazy(() => import('../pages/admin/UserPage'));
const LazyPostAdminPage = React.lazy(() => import('../pages/admin/PostPage'));

const TIMEOUT_DURATION = 1000;

function LoadingFallback() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-[#fbc4c2]'>
      <button type="button" className="bg-[#14375f] h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
        <div className="flex items-center justify-center m-[10px]"> 
          <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
          <div className="ml-2">Loading...</div>
        </div>
      </button>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, TIMEOUT_DURATION);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path='/login' element={<LazyLoginPage />} />
        <Route path='/signup' element={<LazySignupPage />} />

        <Route path='/admin' element={<LazyAdminLayout />}>
          <Route path='/admin' element={<LazyDashboardPage />} />
          <Route path='/admin/category' element={<LazyCategoryPage />} />
          <Route path='/admin/lesson' element={<LazyLessonAdminPage />} />
          <Route path='/admin/test' element={<LazyTestAdminPage />} />
          <Route path='/admin/user' element={<LazyUserPage />} />
          <Route path='/admin/post' element={<LazyPostAdminPage />} />
        </Route>
        <Route path='/' element={<LazyUserLayout />}>
          <Route path='/' element={<LazyHomePage />} />
          <Route path='/lesson' element={<LazyLessonUserPage />} />
          <Route path='/test' element={<LazyTestUserPage />} />
          <Route path='/post' element={<LazyPostUserPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
