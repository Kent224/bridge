import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
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
  
  &.sync {
    background-color: #00b894;
    color: white;
    
    &:hover {
      background-color: #00a885;
    }
  }
`;

const SyncButton = styled(Button)`
  margin-bottom: 20px;
`;

const DraftArticleList = ({ articles, onEdit, onSync }) => {
  return (
    <Container>
      <SyncButton className="sync" onClick={onSync}>
        コードに反映する
      </SyncButton>
      <ArticleTable>
        <thead>
          <tr>
            <Th>タイトル</Th>
            <Th>カテゴリ</Th>
            <Th>最終更新日</Th>
            <Th>操作</Th>
          </tr>
        </thead>
        <tbody>
          {articles && articles.map(article => (
            <tr key={article.id}>
              <Td>{article.title}</Td>
              <Td>{article.category}</Td>
              <Td>{new Date(article.date).toLocaleDateString()}</Td>
              <Td>
                <Button className="edit" onClick={() => onEdit(article)}>
                  編集
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>
    </Container>
  );
};

export default DraftArticleList; 