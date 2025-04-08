import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e0a3b 0%, #191453 50%, #0c1e54 100%);
`;

const LoginForm = styled.form`
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  width: 400px;
  max-width: 90%;
  box-shadow: var(--shadow-lg);
  
  h2 {
    text-align: center;
    margin-bottom: var(--spacing-xl);
    color: var(--text-primary);
  }
  
  p.error {
    color: red;
    margin-bottom: var(--spacing-md);
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-lg);
  
  label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-secondary);
  }
  
  input {
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-md);
    font-size: var(--font-size-md);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(88, 52, 173, 0.1);
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: all var(--transition-normal);
  
  &:hover {
    background: #432978;
  }
  
  &:disabled {
    background: var(--gray-300);
    cursor: not-allowed;
  }
`;

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  
  // 実際のプロダクションでは、サーバーサイドの認証を使用してください
  // このデモでは簡易的な認証のみを実装しています
  useEffect(() => {
    // ローカルストレージから認証状態を確認
    const authToken = localStorage.getItem('adminAuthToken');
    if (authToken) {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);
  
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // 簡易的な認証（実際のアプリではサーバーサイドで行うべき）
    if (username === 'admin' && password === 'bridge2024') {
      // 認証成功
      localStorage.setItem('adminAuthToken', 'dummy-token');
      setIsAuthenticated(true);
    } else {
      // 認証失敗
      setError('ユーザー名またはパスワードが正しくありません');
    }
  };
  
  // 認証チェック中はローディング表示
  if (isChecking) {
    return <div>認証情報を確認中...</div>;
  }
  
  // 認証されていない場合はログインフォームを表示
  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <LoginForm onSubmit={handleLogin}>
          <h2>管理者ログイン</h2>
          
          {error && <p className="error">{error}</p>}
          
          <FormGroup>
            <label htmlFor="username">ユーザー名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={!username || !password}>
            ログイン
          </SubmitButton>
        </LoginForm>
      </LoginContainer>
    );
  }
  
  // 認証されている場合は子コンポーネントを表示
  return children;
};

export default RequireAuth; 