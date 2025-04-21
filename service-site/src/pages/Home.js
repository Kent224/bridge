// THIS_IS_TEST_EDIT_20240824_PLEASE_CHECK_IF_VISIBLE
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BridgeLogo from '../components/BridgeLogo';
import { articles } from '../data/articles';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// キラキラ光沢エフェクト用のキーフレーム
const shimmerEffect = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`;

const floatingEffect = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// 文字用の光沢エフェクト
const textShimmerEffect = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const glowEffect = keyframes`
  0% {
    filter: drop-shadow(0px 0px 8px rgba(123, 67, 151, 0.2));
  }
  50% {
    filter: drop-shadow(0px 0px 15px rgba(123, 67, 151, 0.4));
  }
  100% {
    filter: drop-shadow(0px 0px 8px rgba(123, 67, 151, 0.2));
  }
`;

// パーティクルアニメーション
const particleDrift = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const particleFade = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
`;

// ヒーローセクション - モダンスタイル
const HeroSection = styled.section`
  position: relative;
  display: flex;
  padding: 0;
  background: linear-gradient(135deg, #0f0322 0%, #0a0a1e 50%, #08142e 100%);
  color: var(--text-primary);
  overflow: hidden;
  height: calc(100vh - var(--header-height));
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(106, 57, 175, 0.1), transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(42, 78, 177, 0.1), transparent 40%);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 80vh;
  }
`;

const Particle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  z-index: 2;
  
  &:nth-child(1) {
    width: 100px;
    height: 100px;
    top: 10%;
    left: 10%;
    animation: ${particleDrift} 25s infinite ease-in-out, ${particleFade} 8s infinite ease-in-out;
  }
  
  &:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 20%;
    right: 15%;
    animation: ${particleDrift} 20s infinite ease-in-out reverse, ${particleFade} 10s infinite ease-in-out;
  }
  
  &:nth-child(3) {
    width: 80px;
    height: 80px;
    bottom: 15%;
    left: 20%;
    animation: ${particleDrift} 30s infinite ease-in-out, ${particleFade} 12s infinite ease-in-out;
  }
  
  &:nth-child(4) {
    width: 60px;
    height: 60px;
    bottom: 30%;
    right: 5%;
    animation: ${particleDrift} 22s infinite ease-in-out reverse, ${particleFade} 9s infinite ease-in-out;
  }
  
  &:nth-child(5) {
    width: 120px;
    height: 120px;
    top: 40%;
    left: 30%;
    animation: ${particleDrift} 28s infinite ease-in-out, ${particleFade} 11s infinite ease-in-out;
  }
  
  @media (max-width: 768px) {
    opacity: 0.5;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xxl);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(149, 70, 207, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(79, 109, 205, 0.1) 0%, transparent 40%);
    z-index: 1;
    animation: ${glowEffect} 8s infinite ease-in-out;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg) var(--spacing-md);
    order: 2;
    min-height: 50vh;
  }
`;

const HeroRight = styled.div`
  flex: 1;
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1601972599720-36938d4ecd31?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  
  @media (max-width: 768px) {
    height: 40vh;
    order: 1;
    flex: none;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 2;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// ロゴにシマーエフェクトを追加
const LogoWrapper = styled(motion.div)`
  position: relative;
  margin-bottom: var(--spacing-xxl);
  width: 300px;
  max-width: 100%;
  
  @media (max-width: 768px) {
    margin: 0 auto var(--spacing-xl);
    width: 240px;
  }
`;

// 光沢感のあるテキストコンポーネント
const ShimmerText = styled.span`
  display: inline-block;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.9) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: ${textShimmerEffect} 3s linear infinite;
  font-weight: inherit;
  filter: drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.3));
  
  @media (max-width: 768px) {
    animation-duration: 2.5s;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    background-size: 200% auto;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.4));
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 7vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  text-align: left;
  margin-bottom: var(--spacing-xl);
  color: var(--white);
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.8;
    text-align: left;
    margin-bottom: var(--spacing-xl);
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xxl);
  color: var(--white);
  line-height: 1.5;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    line-height: 1.8;
    text-align: left;
    margin-bottom: var(--spacing-xl);
    padding: 0 var(--spacing-sm);
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 var(--spacing-lg);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  background: #06C755;
  color: var(--white);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 10px rgba(6, 199, 85, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(6, 199, 85, 0.4);
    background: #05A847;
    color: var(--white);
  }
  
  @media screen and (max-width: 768px) {
    display: none !important; /* スマホビューでは必ず非表示 */
  }
`;

// セクションタイトル下の棒のアニメーション
const lineExtendAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 80px;
  }
`;

// 問題提起セクション - PIVOTスタイル
const QuestionSection = styled.section`
  padding: calc(var(--spacing-xxl) * 2) var(--spacing-xl);
  background: var(--white);
  position: relative;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) var(--spacing-md);
  }
`;

const QuestionContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const QuestionTitle = styled.h2`
  font-size: clamp(2rem, 7vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: calc(var(--spacing-xl) * 1.5);
  color: var(--text-primary);
  letter-spacing: -0.02em;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: ${({ inView }) => (inView ? '80px' : '0')};
    height: 4px;
    background: var(--gradient-primary);
    margin: 0.8rem auto 0;
    border-radius: 2px;
    animation: ${({ inView }) => (inView ? lineExtendAnimation : 'none')} 1s ease-out forwards;
  }
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-xl);
  }
`;

const QuestionText = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: var(--font-weight-medium);
  line-height: 1.8;
  text-align: left;
  max-width: 800px;
  margin: 0 auto var(--spacing-xxl);
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.3rem);
    line-height: 1.8;
    padding: 0 var(--spacing-md);
  }
`;

const QuestionHighlight = styled.span`
  color: var(--primary-color);
  font-weight: var(--font-weight-bold);
`;

// 解決策セクション
const SolutionSection = styled.section`
  padding: calc(var(--spacing-xxl) * 2) var(--spacing-xl);
  background: var(--light-bg);
  position: relative;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) var(--spacing-md);
  }
`;

const SolutionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SolutionTitle = styled.h2`
  font-size: clamp(2rem, 7vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: calc(var(--spacing-xl) * 1.5);
  color: var(--text-primary);
  letter-spacing: -0.02em;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: ${({ inView }) => (inView ? '80px' : '0')};
    height: 4px;
    background: var(--gradient-primary);
    margin: 0.8rem auto 0;
    border-radius: 2px;
    animation: ${({ inView }) => (inView ? lineExtendAnimation : 'none')} 1s ease-out forwards;
  }
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-xl);
  }
`;

const SolutionText = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: var(--font-weight-medium);
  line-height: 1.8;
  text-align: left;
  max-width: 800px;
  margin: 0 auto var(--spacing-xxl);
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.3rem);
    line-height: 1.8;
    text-align: left;
  }
`;

// アニメーション付きのカードコンテナ
const SolutionCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  margin-top: calc(var(--spacing-xl) * 2);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);
  }
`;

const SolutionCard = styled(motion.div)`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
`;

const SolutionCardTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--gradient-primary);
    border-radius: 1.5px;
  }
`;

const SolutionCardText = styled.p`
  font-size: var(--font-size-md);
  line-height: 1.6;
  color: var(--text-secondary);
  flex: 1;
`;

const SolutionCTA = styled.div`
  text-align: center;
  margin-top: calc(var(--spacing-xl) * 2);
`;

const SolutionButton = styled.a`
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  background: #06C755;
  color: var(--white);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 10px rgba(6, 199, 85, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(6, 199, 85, 0.4);
    background: #05A847;
    color: var(--white);
  }
  
  @media (max-width: 768px) {
    width: 80%;
    display: block;
    margin: 0 auto;
    text-align: center;
    padding: var(--spacing-md) var(--spacing-md);
    font-size: var(--font-size-sm);
  }
`;

// コンテンツセクション
const ContentsSection = styled.section`
  padding: calc(var(--spacing-xl) * 2) var(--spacing-lg);
  background: var(--white);
`;

const ContentTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  font-weight: var(--font-weight-bold);
`;

const ContentDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--spacing-xxl);
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  max-width: var(--max-width);
  margin: 0 auto var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    padding: 0 var(--spacing-md);
  }
`;

const ArticleCard = styled.article`
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
`;

const ArticleImage = styled.div`
  height: 200px;
  background: var(--light-bg);
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
  
  ${ArticleCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ArticleContent = styled.div`
  padding: var(--spacing-lg);
`;

const ArticleTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
`;

const ArticleExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
`;

const ViewMoreButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--primary-color);
  color: var(--white);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
`;

// CTAセクション
const CTASection = styled.section`
  padding: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1e0a3b 0%, #191453 50%, #0c1e54 100%);
  color: var(--white);
  position: relative;
  justify-content: flex-start;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 40%, rgba(149, 70, 207, 0.15) 0%, transparent 70%),
                radial-gradient(circle at 70% 60%, rgba(79, 109, 205, 0.12) 0%, transparent 70%);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    min-height: 80vh;
    height: auto;
    padding: calc(var(--spacing-xl) * 2) 0;
  }
`;

// タイトル用の光彩エフェクト
const titleGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0px 0px 0px rgba(140, 86, 201, 0));
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  }
  50% {
    filter: drop-shadow(0px 0px 15px rgba(97, 97, 207, 0.8));
    text-shadow: 0 0 15px rgba(123, 67, 151, 0.5);
  }
`;

const CTAContent = styled.div`
  max-width: 900px;
  margin: 0 0 0 var(--spacing-xl);
  padding: 0;
  position: relative;
  z-index: 2;
  text-align: left;
  
  @media (max-width: 768px) {
    margin: 0 0 0 var(--spacing-md);
    padding: 0 var(--spacing-md) 0 0;
  }
`;

const CTATitle = styled.h2`
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: calc(var(--spacing-xxl));
  color: var(--white);
  position: relative;
  z-index: 2;
  letter-spacing: -0.02em;
  text-align: left;
  animation: ${titleGlow} 4s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 7vw, 3rem);
    margin-bottom: var(--spacing-xl);
  }
`;

const CTADescription = styled.p`
  font-size: clamp(var(--font-size-lg), 2.5vw, var(--font-size-xl));
  line-height: 1.8;
  max-width: 800px;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  position: relative;
  z-index: 2;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    line-height: 1.7;
    padding: 0;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  background: #06C755;
  color: var(--white);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 10px rgba(6, 199, 85, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(6, 199, 85, 0.4);
    background: #05A847;
    color: var(--white);
  }
  
  @media (max-width: 768px) {
    display: none; /* スマホビューでは非表示（フローティングボタンがあるため） */
  }
`;

const Home = () => {
  // ページ読み込み時のアニメーション制御用ステート
  const [isLoaded, setIsLoaded] = useState(false);
  
  // スクロール検出のための参照
  const [questionTitleRef, questionTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  
  const [solutionTitleRef, solutionTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  
  const [contentsTitleRef, contentsTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  
  const [solutionCardsRef, solutionCardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contentCardsRef, contentCardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    // コンポーネントがマウントされた後にアニメーションを開始
    setIsLoaded(true);
  }, []);
  
  // アニメーションのバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  // カード用アニメーションバリアント
  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // 表示する記事データを定義
  const featuredArticles = [
    {
      id: 1,
      title: '完全初心者向け：生成AI基礎知識ガイド',
      content: '生成AIの基本から主要なツール紹介、プロンプトのコツ、活用例までを初心者にも丁寧に解説したガイドです。専門用語はかみ砕いて説明されており、実践に活せるテクニックや事例も豊富です。AIを初めて学ぶ人でも安心して読み進められ、「生成AIってこういうことか！」と理解できる内容になっています。',
      date: '2025年3月9日',
      category: '生成AI基礎',
      image: 'https://assets.st-note.com/production/uploads/images/169336079/rectangle_large_type_2_74f59179d21f86df1238e455ca9b5ec9.png'
    },
    {
      id: 2,
      title: '生成AIとは？初心者でも理解できるAI活用方法【2025年最新版】',
      content: '話題の「生成AI」とは何かを解説し、従来のAIとの違いやAIを実用的な活用方法を初心者向けに紹介していきます。ChatGPT登場以降の社会のインパクトや2025年最新動向にも触れ、生成AIが私たちの生活や仕事にどう関わるかを分かりやすく説明。専門知識ゼロでも「生成AIって結局こういうことね！」と理解でき、実践できる内容です。',
      date: '2025年1月9日',
      category: '生成AI活用',
      image: 'https://assets.st-note.com/production/uploads/images/177065072/rectangle_large_type_2_bc1ee58b4f43ec7d312728752d97653d.png'
    },
    {
      id: 3,
      title: '生成AIの使い方【初心者向け】',
      content: '生成AIの基本的な使い方を初心者向けに解説。ChatGPTやBingなどの具体的な活用方法を、実践的な例を交えながら紹介しています。',
      date: '2025年1月10日',
      category: '生成AI活用',
      image: 'https://assets.st-note.com/production/uploads/images/177065072/rectangle_large_type_2_bc1ee58b4f43ec7d312728752d97653d.png'
    }
  ];

  const handleViewMore = () => {
    window.scrollTo(0, 0);
  };

  return (
    <HomeContainer>
      <HeroSection>
        <Particle />
        <Particle />
        <Particle />
        <Particle />
        <Particle />
        
        <HeroLeft>
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <HeroContent>
              <LogoWrapper 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 100,
                  delay: 0.3
                }}
              >
                <BridgeLogo width="100%" height="auto" />
              </LogoWrapper>
              
              <HeroSubtitle 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 100,
                  delay: 0.5
                }}
              >
                非エンジニアも気づいている人は始めている。<br />
                LINEで簡単にAI知識を習得していくなら、Bridge
              </HeroSubtitle>
              
              <ButtonGroup 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 100,
                  delay: 0.7
                }}
              >
                <SecondaryButton 
                  href="https://lin.ee/aTshCxr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINE で友だち追加
                </SecondaryButton>
              </ButtonGroup>
            </HeroContent>
          </motion.div>
        </HeroLeft>
        <HeroRight />
      </HeroSection>

      <QuestionSection>
        <QuestionContainer>
          <QuestionTitle ref={questionTitleRef} inView={questionTitleInView}>PROBLEM</QuestionTitle>
          <QuestionText>
            AIの情報は日々目まぐるしく<br />
            更新されていっていますよね。<br />
            <QuestionHighlight>「経済の流れについていけていない...」</QuestionHighlight><br />
            と言う方、必見。
          </QuestionText>
        </QuestionContainer>
      </QuestionSection>
      <SolutionSection>
        <SolutionContainer>
          <SolutionTitle ref={solutionTitleRef} inView={solutionTitleInView}>SOLUTION</SolutionTitle>
          <SolutionText>
            Bridgeは、日常的にLINEを通じて<br />
            簡単で効率的なAI知識の学習体験を提供します。
          </SolutionText>
          
          <SolutionCards 
            ref={solutionCardsRef}
            variants={cardsContainerVariants}
            initial="hidden"
            animate={solutionCardsInView ? "visible" : "hidden"}
          >
            <SolutionCard variants={cardVariants}>
              <SolutionCardTitle>気軽にアクセス</SolutionCardTitle>
              <SolutionCardText>
                毎日使うLINEで、スキマ時間を活用して効率的に学べます。新しいアプリをインストールする必要もなく、チャット感覚でAIについて学べます。
              </SolutionCardText>
            </SolutionCard>
            <SolutionCard variants={cardVariants}>
              <SolutionCardTitle>わかりやすい解説</SolutionCardTitle>
              <SolutionCardText>
                専門用語を噛み砕いた解説で、初心者でも理解できる内容になっています。AIの基本から応用まで、段階的に知識を深められます。
              </SolutionCardText>
            </SolutionCard>
            <SolutionCard variants={cardVariants}>
              <SolutionCardTitle>質問し放題</SolutionCardTitle>
              <SolutionCardText>
                わからないことがあれば、AIチャットボットがいつでも回答。あなただけのパーソナルティーチャーとして、疑問をその場で解決します。
              </SolutionCardText>
            </SolutionCard>
          </SolutionCards>
          
          <SolutionCTA>
            {/* LINE友達追加ボタンを削除 */}
          </SolutionCTA>
        </SolutionContainer>
      </SolutionSection>

      <ContentsSection>
        <ContentTitle>CONTENTS</ContentTitle>
        <ContentDescription>
          AIの理解を深めるための
          <br />
          厳選されたコンテンツをご紹介します
        </ContentDescription>
        
        <ArticlesGrid>
          {featuredArticles.map(article => (
            <ArticleCard key={article.id}>
              <ArticleImage>
                <img src={article.image} alt={article.title} />
              </ArticleImage>
              <ArticleContent>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleExcerpt>
                  {article.content.slice(0, 100)}...
                </ArticleExcerpt>
              </ArticleContent>
            </ArticleCard>
          ))}
        </ArticlesGrid>
        
        <ViewMoreButton to="/articles" onClick={handleViewMore}>
          もっと見る
        </ViewMoreButton>
      </ContentsSection>

      <CTASection>
        <Particle />
        <Particle />
        <Particle />
        <Particle />
        <Particle />
        
        <CTAContent>
          <CTATitle>今すぐBridgeを<br />始めよう</CTATitle>
          <CTADescription>
            LINEで友だち追加するだけで、<br />
            AIについて学び始めることができます。<br />
            定期的に配信されるコンテンツや、<br />
            質問対応など、様々なサービスをご利用いただけます。
          </CTADescription>
          {/* LINE友達追加ボタンを削除 */}
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;