import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contents from './pages/Contents';

// アニメーション付きフローティングボタン
const MobileLineButton = styled.a`
  position: fixed;
  bottom: ${props => props.visible ? '20px' : '-80px'};
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80%;
  max-width: 320px;
  background-color: #06C755;
  color: white;
  border-radius: 8px;
  padding: 15px 20px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  z-index: 10000;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: none;
  transition: bottom 0.3s ease-in-out;

  &::before {
    content: 'L';
    background-color: white;
    color: #06C755;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: inline-block;
    text-align: center;
    line-height: 22px;
    margin-right: 8px;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function App() {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // ヒーローセクションの高さを取得（ビューポートの高さを仮定）
      const heroHeight = window.innerHeight;
      
      // フッターの位置を取得
      const footer = document.querySelector('footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      
      // スクロール位置がヒーローセクションを過ぎていて、
      // かつフッターにまだ達していない場合にボタンを表示
      if (window.scrollY > heroHeight * 0.5 && footerTop > window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    
    // スクロールイベントにリスナーを追加
    window.addEventListener('scroll', handleScroll);
    
    // コンポーネントアンマウント時にイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contents" element={<Contents />} />
      </Routes>
      <Footer />
      <MobileLineButton 
        href="https://lin.ee/aTshCxr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINEで友だち追加"
        className={`mobile-line-button ${showButton ? 'visible' : ''}`}
        visible={showButton}
      >
        LINE で友だち追加
      </MobileLineButton>
    </Router>
  );
}

export default App; 