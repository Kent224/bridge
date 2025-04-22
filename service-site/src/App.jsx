import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contents from './pages/Contents';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// 管理画面のコンポーネント
import ArticleList from './pages/Admin/ArticleList.jsx';
import ArticleNew from './pages/Admin/ArticleNew.jsx';
import ArticleEdit from './pages/Admin/ArticleEdit.jsx';

const App = () => {
  return (
    <Routes>
      {/* メインサイトのルート */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contents" element={<Contents />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<ArticleDetail />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>

      {/* 管理画面のルート */}
      <Route path="/admin/articles" element={<ArticleList />} />
      <Route path="/admin/articles/new" element={<ArticleNew />} />
      <Route path="/admin/articles/edit/:id" element={<ArticleEdit />} />
    </Routes>
  );
};

export default App; 