import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// すべての記事を取得
export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

// 記事を保存
export const saveArticle = async (article) => {
  try {
    const response = await axios.post(`${API_URL}/articles`, article);
    return response.data;
  } catch (error) {
    console.error('Error saving article:', error);
    return { success: false, error: error.message };
  }
};

// 記事を削除
export const deleteArticle = async (id, slug) => {
  try {
    const response = await axios.delete(`${API_URL}/articles/${id}/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting article:', error);
    return { success: false, error: error.message };
  }
};

// ローカルストレージの記事をすべてファイルに同期
export const syncArticlesToFiles = async (articles) => {
  try {
    const response = await axios.post(`${API_URL}/articles/sync`, { articles });
    return response.data;
  } catch (error) {
    console.error('Error syncing articles:', error);
    return { success: false, error: error.message };
  }
};

// ローカルストレージ関連のユーティリティ（ブラウザ用）
export const getArticlesFromLocalStorage = () => {
  try {
    const articlesJson = localStorage.getItem('articles');
    return articlesJson ? JSON.parse(articlesJson) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveArticlesToLocalStorage = (articles) => {
  try {
    localStorage.setItem('articles', JSON.stringify(articles));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}; 