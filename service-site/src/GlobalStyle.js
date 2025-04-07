import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #9c27b0;
    --secondary-color: #2196f3;
    --gradient-primary: linear-gradient(to right, #9c27b0, #673ab7, #3f51b5, #2196f3);
    --gradient-subtle: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(63, 81, 181, 0.1));
    --dark-bg: #121212;
    --light-bg: #f9f9f9;
    --text-primary: #333333;
    --text-secondary: #666666;
    --text-tertiary: #999999;
    --white: #ffffff;
    --max-width: 1200px;
    --header-height: 80px;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 16px;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --font-primary: 'Noto Sans JP', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-xxl: 2rem;
    --font-size-xxxl: 3rem;
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
    --gray-200: #e9e9e9;
    --gray-400: #acacac;
    --primary-light: rgba(156, 39, 176, 0.1);
    --secondary-light: rgba(33, 150, 243, 0.1);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-primary);
    color: var(--text-primary);
    background-color: var(--light-bg);
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-secondary);
    font-weight: var(--font-weight-bold);
    line-height: 1.3;
    margin-bottom: var(--spacing-md);
  }

  h1 {
    font-size: var(--font-size-xxxl);
  }

  h2 {
    font-size: var(--font-size-xxl);
  }

  h3 {
    font-size: var(--font-size-xl);
  }

  h4 {
    font-size: var(--font-size-lg);
  }

  p {
    margin-bottom: var(--spacing-md);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  a:hover {
    color: var(--secondary-color);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: var(--spacing-md);
  }

  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  @media (max-width: 768px) {
    :root {
      --header-height: 60px;
      --font-size-xxxl: 2.5rem;
      --font-size-xxl: 1.75rem;
      --font-size-xl: 1.3rem;
      --spacing-xxl: 36px;
      --spacing-xl: 24px;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: var(--spacing-sm);
    }
    
    button, a {
      /* タッチターゲットサイズを確保 */
      min-height: 44px;
      min-width: 44px;
    }
    
    .container {
      padding: 0 var(--spacing-md);
    }
  }

  @media (max-width: 480px) {
    :root {
      --header-height: 50px;
      --font-size-xxxl: 2rem;
      --font-size-xxl: 1.5rem;
      --font-size-xl: 1.1rem;
      --spacing-xxl: 28px;
      --spacing-xl: 20px;
    }
    
    body {
      font-size: 14px;
    }
    
    .container {
      padding: 0 var(--spacing-sm);
    }
  }
`;

export default GlobalStyle; 