// THIS_IS_TEST_EDIT_20240824_PLEASE_CHECK_IF_VISIBLE
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BridgeLogo from '../components/common/BridgeLogo.jsx';
import article1 from '../data/articles/article1.json';
import article2 from '../data/articles/article2.json';
import article3 from '../data/articles/article3.json';
import article4 from '../data/articles/article4.json';
import article5 from '../data/articles/article5.json';
import article6 from '../data/articles/article6.json';
import article7 from '../data/articles/article7.json';
import article8 from '../data/articles/article8.json';
import article9 from '../data/articles/article9.json';
import article10 from '../data/articles/article10.json';

const articles = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10
];

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
    height: 100vh;
    padding: 0;
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

const HeroRight = styled.div`
  flex: 1;
  position: relative;
  background-image: url('/images/bridge-fv.png');
  background-size: cover;
  background-position: center;
  
  @media (max-width: 768px) {
    flex: none;
    order: 1;
    height: 50%;
    width: 100%;
    background-position: center;
    background-size: cover;
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
    flex: none;
    order: 2;
    height: 50%;
    padding: var(--spacing-lg) var(--spacing-md);
    justify-content: flex-start;
    align-items: flex-start;
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
    margin: 0 0 var(--spacing-md);
    width: 180px;
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

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xxl);
  color: var(--white);
  line-height: 1.5;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.8;
    text-align: left;
    margin-bottom: 0;
    padding: 0;
    br {
      display: none;
    }
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
    font-size: clamp(1.8rem, 8vw, 2.5rem);
    margin-bottom: var(--spacing-xl);
    
    &::after {
      height: 3px;
      width: ${({ inView }) => (inView ? '60px' : '0')};
    }
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
    font-size: clamp(0.95rem, 4vw, 1.1rem);
    line-height: 2;
    padding: 0;
    text-align: center;
    br {
      display: none;
    }
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
    font-size: clamp(1.8rem, 8vw, 2.5rem);
    margin-bottom: var(--spacing-xl);
    
    &::after {
      height: 3px;
      width: ${({ inView }) => (inView ? '60px' : '0')};
    }
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
    font-size: clamp(0.95rem, 4vw, 1.1rem);
    line-height: 2;
    text-align: center;
    margin-bottom: var(--spacing-xl);
    padding: 0;
    br {
      display: none;
    }
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
    padding: 0;
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
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
    
    &:hover {
      transform: none;
    }
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
  
  @media (max-width: 768px) {
    font-size: calc(var(--font-size-md) * 1.1);
    text-align: center;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
    }
  }
`;

const SolutionCardText = styled.p`
  font-size: var(--font-size-md);
  line-height: 1.6;
  color: var(--text-secondary);
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
    text-align: center;
    line-height: 1.8;
  }
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
    font-size: clamp(1.8rem, 8vw, 2.5rem);
    margin-bottom: var(--spacing-lg);
    
    &::after {
      height: 3px;
      width: ${({ inView }) => (inView ? '60px' : '0')};
    }
  }
`;

const ContentDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--spacing-xxl);
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    margin: 0 auto var(--spacing-xl);
    padding: 0 var(--spacing-md);
    line-height: 1.8;
    br {
      display: none;
    }
  }
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
  
  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }
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
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const ArticleTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: calc(var(--font-size-md) * 1.1);
  }
`;

const ArticleExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
`;

const ViewMoreButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--white);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: 30px;
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md);
  transition: all 0.3s ease;
  margin: var(--spacing-xl) auto;
  width: 30%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: 24px;
    width: 16px;
    height: 2px;
    background: var(--white);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &::before {
    content: "";
    position: absolute;
    right: 24px;
    width: 8px;
    height: 8px;
    border-right: 2px solid var(--white);
    border-top: 2px solid var(--white);
    transform: rotate(45deg) scale(0);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    padding-right: 48px;
    
    &::after {
      transform: scaleX(1);
    }

    &::before {
      transform: rotate(45deg) scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 70%;
    font-size: var(--font-size-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    margin: var(--spacing-lg) auto;
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
    padding: 0 var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin: 0;
    padding: 0 0 0 8px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
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
    font-size: clamp(2rem, 8vw, 3rem);
    margin-bottom: var(--spacing-xl);
    text-align: left;
    br.sp-only {
      display: inline;
    }
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
    line-height: 1.8;
    text-align: left;
    br {
      display: none;
    }
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

const FloatingLineButton = styled.a`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 16px;
    z-index: 1000;
    background: linear-gradient(90deg, #06C755 0%, #39e09b 100%);
    color: #fff;
    font-weight: bold;
    font-size: 1.1rem;
    border-radius: 32px;
    box-shadow: 0 4px 16px rgba(6, 199, 85, 0.18);
    padding: 16px 0;
    text-decoration: none;
    transition: background 0.2s, box-shadow 0.2s;
    text-align: center;
  }
`;

const Home = () => {
  // ページ読み込み時のアニメーション制御用ステート
  const [isLoaded, setIsLoaded] = useState(false);
  
  // スクロール検出のための参照
  const [contentsTitleRef, contentsTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  
  const [questionTitleRef, questionTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  
  const [solutionTitleRef, solutionTitleInView] = useInView({
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
  
  const [showFloatingLine, setShowFloatingLine] = useState(false);
  
  useEffect(() => {
    // コンポーネントがマウントされた後にアニメーションを開始
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたら表示
      setShowFloatingLine(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  const featuredArticles = articles.slice(0, 3).map(article => ({
    ...article,
    content: article.content.replace(/<[^>]*>/g, '')
  }));

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
        <ContentTitle ref={contentsTitleRef} inView={contentsTitleInView}>CONTENTS</ContentTitle>
        <ContentDescription>
          AIの理解を深めるための
          <br />
          厳選されたコンテンツをご紹介します
        </ContentDescription>
        
        <ArticlesGrid>
          {articles.slice(0, 3).map(article => (
            <ArticleCard key={article.id}>
              <ArticleImage>
                <img src={article.image} alt={article.title} />
              </ArticleImage>
              <ArticleContent>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleExcerpt>
                  {article.content.replace(/<[^>]*>/g, '').slice(0, 100)}...
                </ArticleExcerpt>
                <div style={{ marginTop: '10px', color: 'var(--text-tertiary)' }}>
                  {article.date} | {article.category}
                </div>
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
          <CTATitle>
            今すぐBridgeを<br className="sp-only" />始めよう
          </CTATitle>
          <CTADescription>
            LINEで友だち追加するだけで、<br />
            AIについて学び始めることができます。<br />
            定期的に配信されるコンテンツや、<br />
            質問対応など、様々なサービスをご利用いただけます。
          </CTADescription>
          {/* LINE友達追加ボタンを削除 */}
        </CTAContent>
      </CTASection>
      {showFloatingLine && (
        <FloatingLineButton
          href="https://lin.ee/aTshCxr"
          target="_blank"
          rel="noopener noreferrer"
        >
          LINEで友だち追加
        </FloatingLineButton>
      )}
    </HomeContainer>
  );
};

export default Home;