import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 左から右へのシマーエフェクト
const shimmerAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// 光彩の明滅エフェクト - 暗い時は元のデザインに戻る
const glowPulse = keyframes`
  0%, 100% {
    filter: drop-shadow(0px 0px 0px rgba(140, 86, 201, 0));
    opacity: 1;
  }
  50% {
    filter: drop-shadow(0px 0px 15px rgba(97, 97, 207, 0.8));
    opacity: 0.95;
  }
`;

const StyledSVG = styled.svg`
  #highlight {
    animation: ${shimmerAnimation} 3s ease-in-out infinite;
  }
  
  animation: ${glowPulse} 4s ease-in-out infinite;
  width: 100%;
  height: auto;
`;

const BridgeLogo = ({ width = 400, height = 120 }) => {
  // ロゴが完全に読み込まれたらアニメーションを開始
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledSVG 
      width={width} 
      height={height} 
      viewBox="0 0 400 120" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <defs>
        {/* ベースとなるロゴのグラデーション */}
        <linearGradient id="bridge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9c27b0" />
          <stop offset="33%" stopColor="#673ab7" />
          <stop offset="66%" stopColor="#3f51b5" />
          <stop offset="100%" stopColor="#2196f3" />
        </linearGradient>
        
        {/* 光沢効果用のグラデーション - 左から右へ */}
        <linearGradient id="shimmer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="10%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="15%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="20%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
        
        {/* マスク用 */}
        <mask id="text-mask">
          <text x="30" y="90" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="700" fontSize="100" letterSpacing="-3" fill="white">Bridge</text>
        </mask>
        
        {/* 周囲光彩効果用フィルター - 6mm相当に拡大 */}
        <filter id="outer-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* 周囲の光彩効果 - 明滅時に使用 */}
      <g className="glow-element">
        <text 
          x="30" 
          y="90" 
          fontFamily="'Helvetica Neue', Arial, sans-serif" 
          fontWeight="700" 
          fontSize="100" 
          letterSpacing="-3" 
          fill="rgba(140, 86, 201, 0.2)"
          filter="url(#outer-glow)"
        >
          Bridge
        </text>
      </g>
      
      {/* メインロゴテキスト - 元のデザイン */}
      <text 
        x="30" 
        y="90" 
        fontFamily="'Helvetica Neue', Arial, sans-serif" 
        fontWeight="700" 
        fontSize="100" 
        letterSpacing="-3" 
        fill="url(#bridge-gradient)"
      >
        Bridge
      </text>
      
      {/* 光沢エフェクト - 左から右へ */}
      <rect id="highlight" x="-200" y="0" width="800" height="120" fill="url(#shimmer-gradient)" mask="url(#text-mask)" opacity="0.8" />
    </StyledSVG>
  );
};

export default BridgeLogo; 