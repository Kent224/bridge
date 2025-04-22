import axios from 'axios';

// 記事ディレクトリが存在しない場合は作成
const ensureArticlesDir = async () => {
  try {
    await axios.post('/api/articles/ensureDir');
    return true;
  } catch (error) {
    console.error('Error creating articles directory:', error);
    return false;
  }
};

// すべての記事ファイルのパスを取得
const getArticleFilePaths = async () => {
  try {
    await ensureArticlesDir();
    const response = await axios.get('/api/articles/filePaths');
    return response.data;
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
};

// すべての記事データを読み込む
export const loadAllArticles = async () => {
  try {
    const response = await axios.get('/api/articles');
    return response.data;
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
};

// 記事データを保存
export const saveArticleToFile = async (article) => {
  try {
    const response = await axios.post('/api/articles', article);
    return response.data;
  } catch (error) {
    console.error('Error saving article:', error);
    return null;
  }
};

// 記事を削除
export const deleteArticleFile = async (articleId) => {
  try {
    await axios.delete(`/api/articles/${articleId}`);
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
};

// 記事データを同期
export const syncArticlesToFiles = async (articles) => {
  try {
    const response = await axios.post('/api/articles/sync', { articles });
    return response.data;
  } catch (error) {
    console.error('Error syncing articles:', error);
    return false;
  }
};

// 特定の記事を取得
export const getArticle = async (articleId) => {
  try {
    const response = await axios.get(`/api/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}; 