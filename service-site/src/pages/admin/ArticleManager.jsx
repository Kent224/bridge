import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveArticle as saveArticleToServer, syncArticlesToFiles, getArticlesFromLocalStorage, saveArticlesToLocalStorage } from '../../services/articleService';

const ArticleManagerContainer = styled.div`
  h1 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-lg);
    color: var(--text-primary);
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--gray-200);
`;

const Tab = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  background: ${props => props.active ? 'white' : 'var(--gray-100)'};
  border: 1px solid var(--gray-200);
  border-bottom: ${props => props.active ? 'none' : '1px solid var(--gray-200)'};
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  margin-right: var(--spacing-sm);
  font-weight: ${props => props.active ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)'};
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  cursor: pointer;
  position: relative;
  bottom: -1px;
  
  &:hover {
    background: ${props => props.active ? 'white' : 'var(--gray-200)'};
  }
`;

const Panel = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  padding: var(--spacing-lg);
  background: white;
  border: 1px solid var(--gray-200);
  border-top: none;
  border-radius: 0 var(--radius-md) var(--radius-md) var(--radius-md);
`;

const ArticleList = styled.div`
  margin-top: var(--spacing-md);
`;

const ArticleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
  
  &:hover {
    background: var(--gray-100);
  }
`;

const ArticleTitle = styled.div`
  flex: 1;
  
  h3 {
    font-size: var(--font-size-md);
    margin: 0;
    margin-bottom: var(--spacing-xs);
  }
  
  p {
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-md);
  background: ${props => props.primary ? 'var(--primary-color)' : props.danger ? 'var(--error-color)' : 'var(--gray-200)'};
  color: ${props => props.primary || props.danger ? 'white' : 'var(--text-primary)'};
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  
  &:hover {
    background: ${props => props.primary ? '#432978' : props.danger ? '#d32f2f' : 'var(--gray-300)'};
  }
`;

const SyncButton = styled(Button)`
  margin-left: var(--spacing-md);
  background-color: var(--warning-color);
  color: white;
  
  &:hover {
    background-color: #e08500;
  }
`;

const StatusMessage = styled.div`
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  text-align: center;
  font-size: var(--font-size-sm);
  
  &.success {
    background-color: rgba(52, 199, 89, 0.1);
    color: var(--success-color);
    border: 1px solid var(--success-color);
  }
  
  &.error {
    background-color: rgba(255, 59, 48, 0.1);
    color: var(--error-color);
    border: 1px solid var(--error-color);
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
  
  input, select, textarea {
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
  
  .quill {
    border-radius: var(--radius-md);
    
    .ql-toolbar {
      border-top-left-radius: var(--radius-md);
      border-top-right-radius: var(--radius-md);
      border-color: var(--gray-200);
    }
    
    .ql-container {
      border-bottom-left-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
      border-color: var(--gray-200);
      min-height: 300px;
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
`;

const ArticleManager = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState({
    id: null,
    title: '',
    noteUrl: '',
    category: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    slug: '',
    image: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  
  // カテゴリーのリスト
  const categories = ['基礎知識', 'ビジネス', 'スキル', 'ツール', '法律', '倫理', '未来予測', '芸術', '教育'];
  
  // 記事データの読み込み
  useEffect(() => {
    // ローカルストレージから記事データを読み込む
    const savedArticles = getArticlesFromLocalStorage();
    if (savedArticles && savedArticles.length > 0) {
      setArticles(savedArticles);
    }
  }, []);
  
  // タイトルからスラグを生成する関数
  const generateSlug = (title) => {
    // スペースをハイフンに変換し、アルファベット・数字・ハイフン以外の文字を削除
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // 特殊文字を削除
      .replace(/[\s_-]+/g, '-') // スペース、アンダースコア、ハイフンをハイフンに置換
      .replace(/^-+|-+$/g, ''); // 先頭と末尾のハイフンを削除
  };

  // タイトルが変更されたときにスラグを自動生成
  useEffect(() => {
    if (currentArticle.title && !currentArticle.id) { // 新規作成時のみ自動生成
      const newSlug = generateSlug(currentArticle.title);
      setCurrentArticle(prev => ({...prev, slug: newSlug}));
    }
  }, [currentArticle.title]);
  
  // 記事を保存する関数
  const saveArticleData = async () => {
    // バリデーション
    if (!currentArticle.title || !currentArticle.category || !currentArticle.content || !currentArticle.slug) {
      setStatusMessage({
        type: 'error',
        message: 'タイトル、カテゴリ、スラグ、本文は必須項目です'
      });
      return;
    }
    
    setIsSaving(true);
    setStatusMessage({ type: '', message: '' });
    
    let updatedArticles;
    const now = new Date().toISOString().split('T')[0];
    let updatedArticle;
    
    if (currentArticle.id) {
      // 既存記事の更新
      updatedArticle = { ...currentArticle, date: now };
      updatedArticles = articles.map(article => 
        article.id === currentArticle.id ? updatedArticle : article
      );
    } else {
      // 新規記事の追加
      updatedArticle = {
        ...currentArticle,
        id: Date.now(), // 簡易的なID生成
        date: now
      };
      updatedArticles = [...articles, updatedArticle];
    }
    
    // ローカルストレージに保存
    saveArticlesToLocalStorage(updatedArticles);
    setArticles(updatedArticles);
    
    // サーバーにも保存
    try {
      const result = await saveArticleToServer(updatedArticle);
      if (result.success) {
        setStatusMessage({
          type: 'success',
          message: `記事が正常に保存されました。ファイル: ${result.filePath}`
        });
      } else {
        console.error('Failed to save article to server:', result.error);
        setStatusMessage({
          type: 'error',
          message: `ローカルには保存されましたが、JSONファイルへの保存に失敗しました: ${result.error}`
        });
      }
    } catch (error) {
      console.error('Error saving article to server:', error);
      setStatusMessage({
        type: 'error',
        message: `ローカルには保存されましたが、JSONファイルへの保存に失敗しました: ${error.message}`
      });
    }
    
    setIsSaving(false);
    // フォームをリセット
    resetForm();
    
    // 記事一覧に戻る
    setActiveTab('list');
  };
  
  // 全記事をファイルに同期する関数
  const syncAllArticles = async () => {
    setIsSyncing(true);
    setStatusMessage({ type: '', message: '' });
    
    try {
      const result = await syncArticlesToFiles(articles);
      if (result.success) {
        setStatusMessage({
          type: 'success',
          message: 'すべての記事が正常にJSONファイルに同期されました'
        });
      } else {
        setStatusMessage({
          type: 'error',
          message: `記事の同期に失敗しました: ${result.error}`
        });
      }
    } catch (error) {
      console.error('Error syncing articles:', error);
      setStatusMessage({
        type: 'error',
        message: `記事の同期に失敗しました: ${error.message}`
      });
    }
    
    setIsSyncing(false);
  };
  
  // 編集モードに切り替える関数
  const editArticle = (article) => {
    setCurrentArticle(article);
    setActiveTab('edit');
  };
  
  // 記事を削除する関数
  const deleteArticle = (id) => {
    if (window.confirm('この記事を削除してもよろしいですか？')) {
      const articleToDelete = articles.find(article => article.id === id);
      const updatedArticles = articles.filter(article => article.id !== id);
      setArticles(updatedArticles);
      saveArticlesToLocalStorage(updatedArticles);
      
      // サーバーからも削除
      if (articleToDelete) {
        import('../../services/articleService').then(module => {
          module.deleteArticle(articleToDelete.id, articleToDelete.slug)
            .catch(error => {
              console.error('Error deleting article file:', error);
              setStatusMessage({
                type: 'error',
                message: `ローカルからは削除されましたが、JSONファイルの削除に失敗しました: ${error.message}`
              });
            });
        });
      }
    }
  };
  
  // フォームをリセットする関数
  const resetForm = () => {
    setCurrentArticle({
      id: null,
      title: '',
      noteUrl: '',
      category: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      slug: '',
      image: ''
    });
    setStatusMessage({ type: '', message: '' });
  };
  
  // 新規記事作成モードに切り替える関数
  const newArticle = () => {
    resetForm();
    setActiveTab('edit');
  };
  
  // リッチテキストエディターのモジュール設定
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  return (
    <ArticleManagerContainer>
      <h1>記事管理</h1>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'list'} 
          onClick={() => setActiveTab('list')}
        >
          記事一覧
        </Tab>
        <Tab 
          active={activeTab === 'edit'} 
          onClick={() => {
            if (activeTab !== 'edit') {
              newArticle();
            }
          }}
        >
          {currentArticle.id ? '記事を編集' : '新規記事作成'}
        </Tab>
      </TabContainer>
      
      <Panel active={activeTab === 'list'}>
        <div style={{ display: 'flex', marginBottom: 'var(--spacing-md)' }}>
          <Button primary onClick={newArticle}>
            新規記事作成
          </Button>
          <SyncButton onClick={syncAllArticles} disabled={isSyncing}>
            {isSyncing ? '同期中...' : '全記事をJSONファイルに同期'}
          </SyncButton>
        </div>
        
        {statusMessage.message && (
          <StatusMessage className={statusMessage.type}>
            {statusMessage.message}
          </StatusMessage>
        )}
        
        <ArticleList>
          {articles.length === 0 ? (
            <p>記事がありません。新規記事を作成してください。</p>
          ) : (
            articles.map(article => (
              <ArticleItem key={article.id}>
                <ArticleTitle>
                  <h3>{article.title}</h3>
                  <p>カテゴリ: {article.category} | 公開日: {article.date}</p>
                  {article.noteUrl && <p>note URL: {article.noteUrl}</p>}
                </ArticleTitle>
                <ActionButtons>
                  <Button onClick={() => editArticle(article)}>
                    編集
                  </Button>
                  <Button danger onClick={() => deleteArticle(article.id)}>
                    削除
                  </Button>
                </ActionButtons>
              </ArticleItem>
            ))
          )}
        </ArticleList>
      </Panel>
      
      <Panel active={activeTab === 'edit'}>
        {statusMessage.message && (
          <StatusMessage className={statusMessage.type}>
            {statusMessage.message}
          </StatusMessage>
        )}
        
        <FormGroup>
          <label htmlFor="title">タイトル*</label>
          <input 
            type="text" 
            id="title" 
            value={currentArticle.title} 
            onChange={(e) => setCurrentArticle({...currentArticle, title: e.target.value})}
            placeholder="記事のタイトルを入力"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="noteUrl">note URL (オプション)</label>
          <input 
            type="url" 
            id="noteUrl" 
            value={currentArticle.noteUrl} 
            onChange={(e) => setCurrentArticle({...currentArticle, noteUrl: e.target.value})}
            placeholder="https://note.com/example/n/n1234567890"
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="category">カテゴリ*</label>
          <select 
            id="category" 
            value={currentArticle.category} 
            onChange={(e) => setCurrentArticle({...currentArticle, category: e.target.value})}
            required
          >
            <option value="">カテゴリを選択</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="image">画像URL (オプション)</label>
          <input 
            type="url" 
            id="image" 
            value={currentArticle.image || ''} 
            onChange={(e) => setCurrentArticle({...currentArticle, image: e.target.value})}
            placeholder="https://example.com/images/article-image.jpg"
          />
          <small style={{ display: 'block', marginTop: '5px', color: 'var(--text-tertiary)' }}>
            記事のヘッダー画像URLを入力してください。Unsplashなどの無料画像サービスが利用できます。
          </small>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="slug">スラグ (URL)*</label>
          <input 
            type="text" 
            id="slug" 
            value={currentArticle.slug} 
            onChange={(e) => setCurrentArticle({...currentArticle, slug: e.target.value})}
            placeholder="記事のURL（例: my-first-article）"
            required
          />
          <small style={{ display: 'block', marginTop: '5px', color: 'var(--text-tertiary)' }}>
            URLに使用される識別子です。アルファベット、数字、ハイフンのみ使用できます。
          </small>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="content">本文*</label>
          <ReactQuill 
            id="content"
            theme="snow"
            value={currentArticle.content}
            onChange={(content) => setCurrentArticle({...currentArticle, content})}
            modules={modules}
            placeholder="記事の内容を入力してください..."
          />
        </FormGroup>
        
        <FormActions>
          <Button onClick={() => {
            setActiveTab('list');
            resetForm();
          }}>
            キャンセル
          </Button>
          <Button 
            primary 
            onClick={saveArticleData}
            disabled={isSaving}
          >
            {isSaving ? '保存中...' : (currentArticle.id ? '更新' : '投稿')}
          </Button>
        </FormActions>
      </Panel>
    </ArticleManagerContainer>
  );
};

export default ArticleManager; 