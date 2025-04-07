import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BridgeLogo from '../components/BridgeLogo';

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
  padding: calc(var(--spacing-xxl) * 2) var(--spacing-lg);
  background: var(--white);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(88, 52, 173, 0.1) 0%, rgba(88, 52, 173, 0.5) 50%, rgba(88, 52, 173, 0.1) 100%);
  }
`;

const ContentsSectionTitle = styled.h2`
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

const SectionSubtitle = styled.p`
  font-size: var(--font-size-lg);
  text-align: left;
  max-width: 800px;
  margin: 0 auto var(--spacing-xxl);
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    line-height: 1.8;
    padding: 0 var(--spacing-md);
  }
`;

const ContentCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  max-width: var(--max-width);
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
`;

const ContentCard = styled(motion.div)`
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const ContentImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  }
  
  ${ContentCard}:hover &::after {
    animation: shimmer 1.5s infinite;
    
    @keyframes shimmer {
      0% {
        opacity: 0.5;
      }
      50% {
        opacity: 0.8;
      }
      100% {
        opacity: 0.5;
      }
    }
  }
`;

const ContentInfo = styled.div`
  padding: var(--spacing-xl);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
`;

const ContentDescription = styled.p`
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
  flex: 1;
`;

const ContentLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--primary-color);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform var(--transition-normal);
  }
  
  &:hover {
    text-decoration: none;
    
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  
  span {
    margin-left: var(--spacing-xs);
    transition: transform var(--transition-fast);
  }
  
  &:hover span {
    transform: translateX(3px);
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
                非エンジニアでも、<br />
                AIの力を理解し、活用できる。<br />
                今日から始められるAI情報取得。
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
            更新されています。<br />
            <QuestionHighlight>「経済の流れについていけていない...」</QuestionHighlight><br />
            と言う方、必見。
          </QuestionText>
        </QuestionContainer>
      </QuestionSection>
      <SolutionSection>
        <SolutionContainer>
          <SolutionTitle ref={solutionTitleRef} inView={solutionTitleInView}>SOLUTION</SolutionTitle>
          <SolutionText>
            Bridgeは、日常に溶け込むLINEを活用した<br />
            新しいAI学習体験を提供します。
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
        <ContentsSectionTitle ref={contentsTitleRef} inView={contentsTitleInView}>CONTENTS</ContentsSectionTitle>
        <SectionSubtitle>
          AIの理解を深めるための<br />
          厳選されたコンテンツをご紹介します
        </SectionSubtitle>
        <ContentCards 
          ref={contentCardsRef}
          variants={cardsContainerVariants}
          initial="hidden"
          animate={contentCardsInView ? "visible" : "hidden"}
        >
          <ContentCard variants={cardVariants}>
            <ContentImage />
            <ContentInfo>
              <ContentTitle>AIの基礎知識</ContentTitle>
              <ContentDescription>
                AIとは何か、どのように機能するのか、基本的な概念を分かりやすく解説します。
              </ContentDescription>
              <ContentLink to="/contents/ai-basics">詳しく見る<span>→</span></ContentLink>
            </ContentInfo>
          </ContentCard>
          <ContentCard variants={cardVariants}>
            <ContentImage />
            <ContentInfo>
              <ContentTitle>ビジネスでのAI活用法</ContentTitle>
              <ContentDescription>
                業務効率化からマーケティングまで、ビジネスシーンでのAI活用方法を紹介します。
              </ContentDescription>
              <ContentLink to="/contents/business-ai">詳しく見る<span>→</span></ContentLink>
            </ContentInfo>
          </ContentCard>
          <ContentCard variants={cardVariants}>
            <ContentImage />
            <ContentInfo>
              <ContentTitle>AIとの上手な対話方法</ContentTitle>
              <ContentDescription>
                AIから最適な回答を得るためのプロンプトの書き方や対話のコツを解説します。
              </ContentDescription>
              <ContentLink to="/contents/prompt-engineering">詳しく見る<span>→</span></ContentLink>
            </ContentInfo>
          </ContentCard>
        </ContentCards>
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