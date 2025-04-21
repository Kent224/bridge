import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo/master-logo.svg';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--header-height);
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 1px 20px rgba(31, 10, 59, 0.05);
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 0 1px 20px rgba(31, 10, 59, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  height: 40px;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 35px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: 100%;
    height: calc(100vh - var(--header-height));
    background-color: var(--white);
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: var(--spacing-xl) 0;
    z-index: 1000;
    box-shadow: var(--shadow-md);
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 var(--spacing-lg);
  }
`;

const NavItem = styled.li`
  margin: 0 var(--spacing-md);
  
  @media (max-width: 768px) {
    margin: var(--spacing-md) 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLinkStyled = styled(NavLink)`
  position: relative;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  padding: var(--spacing-xs) 0;
  text-decoration: none;
  transition: color var(--transition-fast);
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width var(--transition-normal);
  }
  
  &:hover {
    color: var(--primary-color);
    
    &::after {
      width: 100%;
    }
  }
  
  &.active {
    color: var(--primary-color);
    font-weight: var(--font-weight-bold);
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: var(--spacing-md);
    font-size: var(--font-size-lg);
    
    &::after {
      bottom: 5px;
    }
  }
`;

const LineButtonWrapper = styled.div`
  margin-left: var(--spacing-lg);
  
  @media (max-width: 768px) {
    display: block;
    margin: var(--spacing-xl) 0 0;
    width: 80%;
    max-width: 320px;
  }
`;

const Button = styled.a`
  display: inline-block;
  background: #06C755;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #05A847;
    transform: translateY(-2px);
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 16px;
    text-align: center;
    font-size: var(--font-size-md);
    
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
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  
  @media (max-width: 768px) {
    display: block;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuIcon = styled.span`
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text-primary);
  position: relative;
  transition: background-color var(--transition-fast);
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--text-primary);
    transition: transform var(--transition-fast);
  }
  
  &::before {
    top: -8px;
  }
  
  &::after {
    bottom: -8px;
  }
  
  ${props => props.isOpen && `
    background-color: transparent;
    
    &::before {
      transform: translateY(8px) rotate(45deg);
    }
    
    &::after {
      transform: translateY(-8px) rotate(-45deg);
    }
  `}
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer className={isScrolled ? 'scrolled' : ''}>
      <LogoWrapper to="/" onClick={closeMenu}>
        <LogoImage src={Logo} alt="Bridge Logo" />
      </LogoWrapper>
      
      <MenuButton onClick={toggleMenu}>
        <MenuIcon isOpen={isMenuOpen} />
      </MenuButton>
      
      <Nav isOpen={isMenuOpen}>
        <NavList>
          {/* 「私たちについて」ページは準備中につき非表示
          <NavItem>
            <NavLinkStyled to="/about" onClick={closeMenu}>
              私たちについて
            </NavLinkStyled>
          </NavItem>
          */}
          <NavItem>
            <NavLinkStyled to="/articles" onClick={closeMenu}>
              AIに関する記事
            </NavLinkStyled>
          </NavItem>
        </NavList>
        
        <LineButtonWrapper>
          <Button 
            href="https://lin.ee/aTshCxr"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINE で友だち追加
          </Button>
        </LineButtonWrapper>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;