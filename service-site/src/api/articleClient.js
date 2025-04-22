import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const articleApi = {
  // 全記事を取得
  getAllArticles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || '記事の取得に失敗しました。');
    }
  },

  // 特定の記事を取得
  getArticle: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || '記事の取得に失敗しました。');
    }
  },

  // 新規記事を作成
  createArticle: async (articleData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/articles`, articleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || '記事の作成に失敗しました。');
    }
  },

  // 記事を更新
  updateArticle: async (id, articleData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || '記事の更新に失敗しました。');
    }
  },

  // 記事を削除
  deleteArticle: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/articles/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.error || '記事の削除に失敗しました。');
    }
  }
}; 