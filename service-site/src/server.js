import express from 'express';
import cors from 'cors';
import articleRouter from './api/articleApi.js';

const app = express();
const port = 3001;

// CORSを有効化
app.use(cors());

// JSONボディパーサーを有効化
app.use(express.json());

// APIルートを設定
app.use('/api', articleRouter);

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
}); 