import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import GlobalStyle from './styles/GlobalStyle';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contents from './pages/Contents.jsx';
import Articles from './pages/Articles.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';

// 管理画面のコンポーネント
import ArticleList from './pages/admin/ArticleList.jsx';
import ArticleNew from './pages/admin/ArticleNew.jsx';
import ArticleEdit from './pages/admin/ArticleEdit.jsx';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
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
    </>
  );
};

export default App; 