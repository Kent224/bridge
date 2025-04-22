const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(express.json());

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, '../../dist')));

const ARTICLES_DIR = path.join(__dirname, '../data/articles');

// 記事ディレクトリが存在しない場合は作成
const ensureArticlesDir = async () => {
  try {
    await fs.ensureDir(ARTICLES_DIR);
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
    const files = await fs.readdir(ARTICLES_DIR);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(ARTICLES_DIR, file));
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
};

// 記事データをJSONファイルとして保存
const saveArticleToFile = async (article) => {
  try {
    await ensureArticlesDir();
    const fileName = `article${article.id}.json`;
    const filePath = path.join(ARTICLES_DIR, fileName);
    await fs.writeJSON(filePath, article, { spaces: 2 });
    return filePath;
  } catch (error) {
    console.error('Error saving article to file:', error);
    throw error;
  }
};

// 全記事を取得
app.get('/api/articles', async (req, res) => {
  try {
    const filePaths = await getArticleFilePaths();
    const articlesPromises = filePaths.map(async filePath => {
      try {
        return await fs.readJSON(filePath);
      } catch (error) {
        console.error(`Error reading article file ${filePath}:`, error);
        return null;
      }
    });
    
    const articles = (await Promise.all(articlesPromises))
      .filter(article => article !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json(articles);
  } catch (error) {
    console.error('Error loading articles:', error);
    res.status(500).json({ error: 'Failed to load articles' });
  }
});

// 特定の記事を取得するAPI
app.get('/api/articles/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    const filePath = path.join(ARTICLES_DIR, `article${articleId}.json`);
    
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = await fs.readJSON(filePath);
    res.json(article);
  } catch (error) {
    console.error('Error loading article:', error);
    res.status(500).json({ error: 'Failed to load article' });
  }
});

// 記事を保存
app.post('/api/articles', async (req, res) => {
  try {
    const article = req.body;
    
    if (!article.id || !article.title || !article.content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const filePath = await saveArticleToFile(article);
    res.json({ success: true, filePath });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

// 記事を削除
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    const filePath = path.join(ARTICLES_DIR, `article${articleId}.json`);
    
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await fs.remove(filePath);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// 記事を同期
app.post('/api/articles/sync', async (req, res) => {
  try {
    const { articles } = req.body;
    
    if (!Array.isArray(articles)) {
      return res.status(400).json({ error: 'Articles must be an array' });
    }

    await ensureArticlesDir();
    await fs.emptyDir(ARTICLES_DIR);
    
    const savePromises = articles.map(article => saveArticleToFile(article));
    await Promise.all(savePromises);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error syncing articles:', error);
    res.status(500).json({ error: 'Failed to sync articles' });
  }
});

// 記事ディレクトリの存在確認エンドポイント
app.post('/api/articles/ensureDir', async (req, res) => {
  try {
    await ensureArticlesDir();
    res.json({ success: true });
  } catch (error) {
    console.error('Error ensuring articles directory:', error);
    res.status(500).json({ error: 'Failed to ensure articles directory' });
  }
});

// SPAのルーティングに対応するフォールバックルート
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 