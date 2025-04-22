import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { articleApi } from '../../api/articleClient';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 200px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &.primary {
    background-color: #6c5ce7;
    color: white;
    
    &:hover {
      background-color: #5f50e6;
    }
  }
  
  &.secondary {
    background-color: #adb5bd;
    color: white;
    
    &:hover {
      background-color: #919aa1;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  color: #dc3545;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const ArticleNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      await articleApi.createArticle(formData);

      // 記事一覧ページに戻る
      navigate('/admin/articles');
    } catch (error) {
      console.error('Error creating article:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>新規記事作成</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">タイトル</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">カテゴリ</Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">公開日</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">内容</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="button" className="secondary" onClick={() => navigate('/admin/articles')}>
            キャンセル
          </Button>
          <Button type="submit" className="primary" disabled={loading}>
            {loading ? '作成中...' : '作成'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default ArticleNew; 