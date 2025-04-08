const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { loadAllArticles, saveArticleToFile, deleteArticleFile, syncArticlesToFiles } = require('../utils/fileUtils');

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// すべての記事を取得するAPI
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await loadAllArticles();
    res.json(articles);
  } catch (error) {
    console.error('Error loading articles:', error);
    res.status(500).json({ error: 'Failed to load articles' });
  }
});

// 記事を保存するAPI
app.post('/api/articles', async (req, res) => {
  try {
    const article = req.body;
    if (!article.id || !article.title || !article.slug) {
      return res.status(400).json({ error: 'Invalid article data' });
    }

    const filePath = await saveArticleToFile(article);
    if (filePath) {
      res.json({ success: true, filePath });
    } else {
      res.status(500).json({ error: 'Failed to save article' });
    }
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

// 記事を削除するAPI
app.delete('/api/articles/:id/:slug', async (req, res) => {
  try {
    const { id, slug } = req.params;
    const success = await deleteArticleFile(id, slug);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Failed to delete article' });
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// ローカルストレージの記事データをすべてファイルに同期するAPI
app.post('/api/articles/sync', async (req, res) => {
  try {
    const { articles } = req.body;
    if (!Array.isArray(articles)) {
      return res.status(400).json({ error: 'Invalid articles data' });
    }

    const success = await syncArticlesToFiles(articles);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Failed to sync articles' });
    }
  } catch (error) {
    console.error('Error syncing articles:', error);
    res.status(500).json({ error: 'Failed to sync articles' });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Article API server running on port ${PORT}`);
});

module.exports = app; 