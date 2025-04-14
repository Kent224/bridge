import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { articles as defaultArticles } from '../data/articles';

// スタイル定義
const PageContainer = styled.div`
  padding-top: var(--header-height);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e0a3b 0%, #191453 50%, #0c1e54 100%);
  padding: calc(var(--spacing-xl) * 2) var(--spacing-lg);
  color: var(--white);
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 5vw, 2.5rem);
  }
`;

const PageDescription = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    padding: 0 var(--spacing-sm);
  }
`;

const ContentSection = styled.section`
  padding: calc(var(--spacing-xl) * 3) var(--spacing-lg);
  background: var(--white);
  
  @media (max-width: 768px) {
    padding: calc(var(--spacing-xl) * 1.5) var(--spacing-md);
  }
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    gap: var(--spacing-md);
  }
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--spacing-xs);
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }
  }
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--light-bg)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-secondary)'};
  border: none;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'var(--gray-200)'};
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(88, 52, 173, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: var(--spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
`;

const ArticleCard = styled.article`
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const ArticleImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
  
  ${ArticleCard}:hover & img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ArticleCategory = styled.span`
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  background: var(--primary-color);
  color: var(--white);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  z-index: 2;
`;

const ArticleSource = styled.span`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: ${props => props.type === 'note' ? '#41C9B4' : 'var(--primary-color)'};
  color: var(--white);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  z-index: 2;
`;

const ArticleContent = styled.div`
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
`;

const ArticleDate = styled.span`
  margin-right: var(--spacing-md);
`;

const ArticleTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  @media (max-width: 768px) {
    font-size: calc(var(--font-size-md) * 1.1);
  }
`;

const ArticleExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex: 1;
`;

const ArticleReadMore = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  display: inline-flex;
  align-items: center;
  
  span {
    margin-left: var(--spacing-xs);
    transition: transform var(--transition-fast);
  }
  
  &:hover {
    span {
      transform: translateX(4px);
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: calc(var(--spacing-xl) * 2);
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-xl);
    flex-wrap: wrap;
  }
`;

const PageButton = styled.button`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--white)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--gray-200)'};
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'var(--light-bg)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const ArticleCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  
  &:hover {
    text-decoration: none;
  }
`;

// 記事一覧ページコンポーネント
const Articles = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 15; // 1ページあたりの記事数（3列×5行）
  
  // 記事データの読み込み
  useEffect(() => {
    // ローカルストレージから記事データを取得
    const localArticles = localStorage.getItem('articles');
    const parsedLocalArticles = localArticles ? JSON.parse(localArticles) : [];
    
    // デフォルトの記事データとローカルストレージのデータを結合
    setArticles([...defaultArticles, ...parsedLocalArticles]);
  }, []);
  
  // カテゴリーの一覧を記事データから抽出
  const categories = ['all', ...new Set(articles.map(article => article.category))];
  
  // カテゴリーと検索条件でフィルタリングされた記事
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  // ページネーション用の記事配列を作成
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // ページ変更ハンドラー
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // ページトップにスクロール
  };

  // ページ番号の配列を生成
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // 記事の内容から抜粋を生成する関数
  const generateExcerpt = (content, maxLength = 150) => {
    if (!content) return '';
    
    // HTMLタグを除去
    const plainText = content.replace(/<[^>]+>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    
    // 最大長さまでの文字列を取得し、最後の単語が切れないように調整
    let excerpt = plainText.substring(0, maxLength);
    const lastSpaceIndex = excerpt.lastIndexOf(' ');
    
    if (lastSpaceIndex > 0) {
      excerpt = excerpt.substring(0, lastSpaceIndex);
    }
    
    return excerpt + '...';
  };

  return (
    <PageContainer>
      <HeroSection>
        <PageTitle>AIに関する記事</PageTitle>
        <PageDescription>
          AIの最新トレンド、活用事例、基礎知識など、さまざまな角度からAIについて解説します。
        </PageDescription>
      </HeroSection>
      
      <ContentSection>
        <Container>
          <FilterBar>
            <Categories>
              {categories.map(category => (
                <CategoryButton
                  key={category}
                  active={activeCategory === category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1); // カテゴリー変更時にページを1に戻す
                  }}
                >
                  {category}
                </CategoryButton>
              ))}
            </Categories>
            
            <SearchBar>
              <SearchInput 
                type="text" 
                placeholder="記事を検索..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // 検索時にページを1に戻す
                }}
              />
              <SearchIcon>🔍</SearchIcon>
            </SearchBar>
          </FilterBar>
          
          <ArticlesGrid>
            {currentArticles.map(article => (
              <ArticleCardLink
                key={article.id}
                to={`/articles/${article.slug}`}
              >
                <ArticleCard>
                  <ArticleImage>
                    <img src={article.image} alt={article.title} />
                    <ArticleCategory>{article.category}</ArticleCategory>
                    {article.source && (
                      <ArticleSource type={article.source.type}>
                        {article.source.type === 'note' && 'note記事'}
                      </ArticleSource>
                    )}
                  </ArticleImage>
                  <ArticleContent>
                    <ArticleMeta>
                      <ArticleDate>{article.date}</ArticleDate>
                    </ArticleMeta>
                    <ArticleTitle>
                      {article.title}
                    </ArticleTitle>
                    <ArticleExcerpt>{generateExcerpt(article.content)}</ArticleExcerpt>
                    <span>続きを読む →</span>
                  </ArticleContent>
                </ArticleCard>
              </ArticleCardLink>
            ))}
          </ArticlesGrid>
          
          {totalPages > 1 && (
            <Pagination>
              <PageButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </PageButton>
              {getPageNumbers().map(number => (
                <PageButton
                  key={number}
                  active={currentPage === number}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </PageButton>
              ))}
              <PageButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </PageButton>
            </Pagination>
          )}
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

export default Articles; 