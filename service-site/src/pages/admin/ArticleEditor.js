import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
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
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 200px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &.save {
    background-color: #6c5ce7;
    color: white;

    &:hover {
      background-color: #5f50e6;
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

const ArticleEditor = ({ article, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    category: '',
    date: '',
    image: '',
    slug: '',
    noteUrl: '',
    relatedArticles: []
  });

  useEffect(() => {
    if (article) {
      setFormData(article);
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const categories = [
    '基礎知識',
    'ビジネス',
    'スキル',
    'ツール',
    '法律',
    '倫理',
    '未来予測',
    '芸術',
    '教育'
  ];

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>タイトル</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>カテゴリ</Label>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">カテゴリを選択</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>本文</Label>
          <TextArea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>スラッグ</Label>
          <Input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>画像URL</Label>
          <Input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>note URL</Label>
          <Input
            type="url"
            name="noteUrl"
            value={formData.noteUrl}
            onChange={handleChange}
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="button" className="cancel" onClick={onCancel}>
            キャンセル
          </Button>
          <Button type="submit" className="save">
            保存
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default ArticleEditor; 