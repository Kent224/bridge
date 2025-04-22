import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ArticleList from './ArticleList';
import DraftArticleList from './DraftArticleList';
import ArticleEditor from './ArticleEditor';
import { loadAllArticles, saveArticleToFile, deleteArticleFile, syncArticlesToFiles } from '../../utils/fileUtils';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CreateButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;

  &:hover {
    background-color: #5f50e6;
  }
`;

const StyledTabs = styled(Tabs)`
  .react-tabs__tab-list {
    border-bottom: 1px solid #ddd;
    margin: 0 0 20px;
    padding: 0;
  }

  .react-tabs__tab {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  .react-tabs__tab--selected {
    background: #fff;
    border-color: #ddd;
    border-radius: 5px 5px 0 0;
    color: #6c5ce7;
  }
`;

const ArticleManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [draftArticles, setDraftArticles] = useState([]);

  // 記事データの読み込み
  useEffect(() => {
    loadAllArticles().then(loadedArticles => {
      if (loadedArticles) {
        setArticles(loadedArticles);
      }
    });
  }, []);

  const handleCreateNew = () => {
    const newArticle = {
      id: Date.now(),
      title: '',
      content: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      slug: '',
      noteUrl: '',
      relatedArticles: []
    };
    setEditingArticle(newArticle);
    setDraftArticles([...draftArticles, newArticle]);
    setSelectedTab(2);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setSelectedTab(2);
  };

  const handleSaveDraft = (article) => {
    const existingIndex = draftArticles.findIndex(draft => draft.id === article.id);
    if (existingIndex >= 0) {
      setDraftArticles(draftArticles.map((draft, index) => 
        index === existingIndex ? article : draft
      ));
    } else {
      setDraftArticles([...draftArticles, article]);
    }
    setSelectedTab(1);
  };

  const handleSync = async () => {
    try {
      // 下書き記事をファイルとして保存
      for (const article of draftArticles) {
        await saveArticleToFile(article);
      }
      
      // 記事一覧を更新
      const updatedArticles = await loadAllArticles();
      setArticles(updatedArticles);
      
      // 下書き記事をクリア
      setDraftArticles([]);
      
      // 記事一覧タブに移動
      setSelectedTab(0);
    } catch (error) {
      console.error('Error syncing articles:', error);
    }
  };

  return (
    <Container>
      <Title>記事管理</Title>
      <CreateButton onClick={handleCreateNew}>新規記事作成</CreateButton>
      
      <StyledTabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
        <TabList>
          <Tab>記事一覧</Tab>
          <Tab>編集中記事一覧</Tab>
          <Tab>記事編集詳細</Tab>
        </TabList>

        <TabPanel>
          <ArticleList articles={articles} onEdit={handleEdit} />
        </TabPanel>
        <TabPanel>
          <DraftArticleList 
            articles={draftArticles}
            onEdit={handleEdit}
            onSync={handleSync}
          />
        </TabPanel>
        <TabPanel>
          {selectedTab === 2 && (
            <ArticleEditor 
              article={editingArticle}
              onSave={handleSaveDraft}
              onCancel={() => setSelectedTab(0)}
            />
          )}
        </TabPanel>
      </StyledTabs>
    </Container>
  );
};

export default ArticleManagement; 