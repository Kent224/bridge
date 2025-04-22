import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { articleApi } from '../../api/articleClient';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #5f50e6;
  }
`;

const SecondaryButton = styled.button`
  background-color: #ff9f43;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #ff8f30;
  }
`;

const ArticleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  
  &.edit {
    background-color: #6c5ce7;
    color: white;
    
    &:hover {
      background-color: #5f50e6;
    }
  }
  
  &.delete {
    background-color: #ff6b6b;
    color: white;
    
    &:hover {
      background-color: #ff5252;
    }
  }

  &.cancel {
    background-color: #adb5bd;
    color: white;
    
    &:hover {
      background-color: #919aa1;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 1.2em;
  color: #666;
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  color: #dc3545;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.div`
  background-color: #f0fff4;
  color: #28a745;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const ArticleList = () => {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleApi.getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setLoading(true);
      setError(null);
      
      await articleApi.deleteArticle(deleteTarget.id);
      
      setArticles(prev => prev.filter(article => article.id !== deleteTarget.id));
      setSuccessMessage('記事を削除しました。');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting article:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setDeleteTarget(null);
    }
  };

  const handleEdit = (article) => {
    navigate(`/admin/articles/edit/${article.id}`);
  };

  const handleNewArticle = () => {
    navigate('/admin/articles/new');
  };

  return (
    <Container>
      <Header>
        <Title>記事管理</Title>
        <ActionButtons>
          <PrimaryButton onClick={handleNewArticle}>新規記事作成</PrimaryButton>
        </ActionButtons>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      {loading ? (
        <LoadingSpinner>読み込み中...</LoadingSpinner>
      ) : (
        <ArticleTable>
          <thead>
            <tr>
              <Th>タイトル</Th>
              <Th>カテゴリ</Th>
              <Th>公開日</Th>
              <Th>操作</Th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <Td>{article.title}</Td>
                <Td>{article.category}</Td>
                <Td>{article.date}</Td>
                <Td>
                  <Button className="edit" onClick={() => handleEdit(article)}>
                    編集
                  </Button>
                  <Button className="delete" onClick={() => setDeleteTarget(article)}>
                    削除
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </ArticleTable>
      )}

      {deleteTarget && (
        <Dialog open={true} onClose={() => setDeleteTarget(null)}>
          <Modal>
            <ModalContent>
              <ModalTitle>記事の削除</ModalTitle>
              <p>以下の記事を削除してもよろしいですか？</p>
              <p><strong>{deleteTarget.title}</strong></p>
              <ButtonGroup>
                <Button className="cancel" onClick={() => setDeleteTarget(null)}>
                  キャンセル
                </Button>
                <Button className="delete" onClick={handleDelete}>
                  削除
                </Button>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        </Dialog>
      )}
    </Container>
  );
};

export default ArticleList; 