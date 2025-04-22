import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
let articles = [];

// 全記事を取得
router.get('/articles', (req, res) => {
  try {
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: '記事の取得に失敗しました。' });
  }
});

// 特定の記事を取得
router.get('/articles/:id', (req, res) => {
  try {
    const article = articles.find(a => a.id === req.params.id);
    if (!article) {
      return res.status(404).json({ error: '記事が見つかりませんでした。' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: '記事の取得に失敗しました。' });
  }
});

// 新規記事を作成
router.post('/articles', (req, res) => {
  try {
    const { title, content, category, date } = req.body;
    
    // バリデーション
    if (!title || !content || !category || !date) {
      return res.status(400).json({ error: '必須項目が不足しています。' });
    }

    const newArticle = {
      id: uuidv4(),
      title,
      content,
      category,
      date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    articles.push(newArticle);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: '記事の作成に失敗しました。' });
  }
});

// 記事を更新
router.put('/articles/:id', (req, res) => {
  try {
    const { title, content, category, date } = req.body;
    
    // バリデーション
    if (!title || !content || !category || !date) {
      return res.status(400).json({ error: '必須項目が不足しています。' });
    }

    const index = articles.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: '記事が見つかりませんでした。' });
    }

    articles[index] = {
      ...articles[index],
      title,
      content,
      category,
      date,
      updatedAt: new Date().toISOString()
    };

    res.json(articles[index]);
  } catch (error) {
    res.status(500).json({ error: '記事の更新に失敗しました。' });
  }
});

// 記事を削除
router.delete('/articles/:id', (req, res) => {
  try {
    const index = articles.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: '記事が見つかりませんでした。' });
    }

    articles.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: '記事の削除に失敗しました。' });
  }
});

export default router; 