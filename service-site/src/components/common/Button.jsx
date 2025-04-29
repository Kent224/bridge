import React from 'react';
import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background: var(--gradient-primary);
    color: var(--white);
    
    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
      color: var(--white);
    }
  `,
  secondary: css`
    background: var(--white);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    
    &:hover {
      background: rgba(156, 39, 176, 0.05);
      transform: translateY(-2px);
    }
  `,
  line: css`
    background: #06C755;
    color: var(--white);
    
    &:hover {
      background: #05A847;
      transform: translateY(-2px);
      color: var(--white);
    }
  `,
  text: css`
    background: transparent;
    color: var(--primary-color);
    padding: 0;
    
    &:hover {
      color: var(--secondary-color);
      text-decoration: underline;
    }
  `,
};

const sizes = {
  small: css`
    padding: 8px 16px;
    font-size: var(--font-size-sm);
  `,
  medium: css`
    padding: 12px 24px;
    font-size: var(--font-size-md);
  `,
  large: css`
    padding: 16px 32px;
    font-size: var(--font-size-lg);
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  border: none;
  gap: var(--spacing-sm);
  
  ${props => variants[props.variant]}
  ${props => sizes[props.size]}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

const Button = ({
  variant = 'primary',
  size = 'medium',
  type = 'button',
  fullWidth = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      type={type}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 