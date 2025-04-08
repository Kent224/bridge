const fs = require('fs-extra');
const path = require('path');

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

// すべての記事データを読み込む
const loadAllArticles = async () => {
  try {
    const filePaths = await getArticleFilePaths();
    const articlesPromises = filePaths.map(async filePath => {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    });
    
    return await Promise.all(articlesPromises);
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
};

// 記事データをファイルに保存
const saveArticleToFile = async (article) => {
  try {
    await ensureArticlesDir();
    const fileName = `${article.id}-${article.slug}.json`;
    const filePath = path.join(ARTICLES_DIR, fileName);
    await fs.writeFile(filePath, JSON.stringify(article, null, 2), 'utf8');
    return filePath;
  } catch (error) {
    console.error('Error saving article to file:', error);
    return null;
  }
};

// 記事ファイルを削除
const deleteArticleFile = async (articleId, slug) => {
  try {
    const filePath = path.join(ARTICLES_DIR, `${articleId}-${slug}.json`);
    await fs.remove(filePath);
    return true;
  } catch (error) {
    console.error('Error deleting article file:', error);
    return false;
  }
};

// 記事データを同期する（ローカルストレージの内容をファイルシステムに書き出す）
const syncArticlesToFiles = async (articles) => {
  try {
    await ensureArticlesDir();
    
    // すべての記事ファイルを削除
    const existingFiles = await getArticleFilePaths();
    for (const filePath of existingFiles) {
      await fs.remove(filePath);
    }
    
    // 新しい記事を保存
    const savePromises = articles.map(saveArticleToFile);
    await Promise.all(savePromises);
    
    return true;
  } catch (error) {
    console.error('Error syncing articles to files:', error);
    return false;
  }
};

module.exports = {
  loadAllArticles,
  saveArticleToFile,
  deleteArticleFile,
  syncArticlesToFiles
}; 