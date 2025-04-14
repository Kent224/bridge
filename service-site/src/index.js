import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contents from './pages/Contents';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// 管理者画面用のコンポーネント
import RequireAuth from './components/RequireAuth';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ArticleManager from './pages/admin/ArticleManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      {/* 通常のサイトルート */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contents" element={<Contents />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticleDetail />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          {/* 今後、個別のコンテンツページを追加する場合はここに追加 */}
          <Route path="*" element={<div>ページが見つかりません</div>} />
        </Route>
        
        {/* 管理者画面ルート */}
        <Route path="/admin" element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }>
          <Route index element={<Dashboard />} />
          <Route path="articles" element={<ArticleManager />} />
          <Route path="users" element={<div>ユーザー管理（実装予定）</div>} />
          <Route path="settings" element={<div>設定（実装予定）</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
); 